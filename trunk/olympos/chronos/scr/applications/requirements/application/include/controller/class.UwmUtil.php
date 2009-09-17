<?php
/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

require_once (BASE."wcmf/lib/model/class.NodeUtil.php");
require_once (BASE.'wcmf/lib/util/class.EncodingUtil.php');

/**
 * @class UwmUtil
 * @brief Provides methods common to UML Web Modeler functionality.
 *
 * @author 	Niko <enikao@users.sourceforge.net>
 */
class UwmUtil {
	const XML_VERSION = "1.0";
	const ENCODING = "UTF-8";
	const STANDALONE = "yes";

	const INI_SECTION = 'generator';
	const INI_UML_FILE_STORAGE = 'umlFileStorage';

	private static $dom;
	private static $persistenceFacade;
	private static $encodingUtil;
	private static $exportedNodes = null;
	private static $oidNameMap = null;

	private static $language = null;

	private static $lastTime = 0;

	private static $processVirtualPackages = true;

	private static function check($msg)
	{
		$newTime = microtime(true);
		Log::debug(($newTime - self::$lastTime).": $msg", __CLASS__);
		self::$lastTime = $newTime;
	}

	/**
	 * Export a model/package to the intern xml format
	 * @param tmpUwmExportPath The name of the xml file
	 * @param startModel A Model instance to start with (maybe null, if startPackage is given)
	 * @param startPackage A Package instance to start with (maybe null, if startModel is given)
	 * @param language The language to translate to. Optional [default: null]
	 * @param virtualPackages True/False wether to export diagrams as packages or not. If yes,
	 * all other package content will be ignored. Optional [default: false].
	 * @return A problem report (should be empty if no problems occured).
	 */
	public static function exportXml($tmpUwmExportPath, $startModel, $startPackage, $language = null,
			$virtualPackages = false) {
		self::$language = $language;
		self::$processVirtualPackages = $virtualPackages;
		self::$exportedNodes = array();
		self::$oidNameMap = array();

		self::$dom = new XMLWriter();
		//self::$dom->setIndent(true);
		//self::$dom->setIndentString("\t");
		self::$dom->openURI($tmpUwmExportPath);
		self::$dom->startDocument(self::XML_VERSION, self::ENCODING, self::STANDALONE);

		self::$dom->startElement("CwmExport");

		self::$persistenceFacade = PersistenceFacade::getInstance();
		self::$encodingUtil = new EncodingUtil();

		if ($startModel) {
			$currModel = self::$persistenceFacade->load($startModel);
			if ($currModel) {
				self::processModel($currModel);
			} else {
				echo 'Error: Unknown model id ' . $startModel;
			}
		} else if ($startPackage) {
			$currPackage = self::$persistenceFacade->load($startPackage);
			if ($currPackage) {
				self::$dom->startElement('Model');
				self::processPackage($currPackage);
				self::$dom->endElement();
			} else {
				echo 'Error: Unknown package id ' . $startPackage;
			}
		} else {
			self::processModels();
		}

		self::$dom->endElement();


		self::$dom->endDocument();
		self::$dom->flush();

		self::$dom = null;
		
		// create the problem report
		$report = "";
		// find duplicates
		$duplicates = array();
		$counts = array_count_values(self::$exportedNodes);
		foreach ($counts as $oid => $count)
		{
			if ($count > 1) {
				$duplicates[] = self::$oidNameMap[$oid];
			}
		}
		if (sizeof($duplicates) > 0) {
			$report = "There are duplicate objects in the export:\n";
			$report .= join("\n", $duplicates);
		}
		return $report;
	}

	/**
	 * Write all node attributes to the xml file.
	 * @param node The node whose attributes to write
	 */
	private static function appendAttributes($node)
	{
		self::translateNode($node);

		$valueNames = $node->getValueNames();

		foreach ($valueNames as $currValueName)
		{
			$value = self::$encodingUtil->convertIsoToCp1252Utf8($node->getValue($currValueName));
			if ($value !== null && $value !== '') {
				self::$dom->writeAttribute($currValueName, $value);
			}
		}
	}

	/**
	 * Register an exported node.
	 * @param node The node to register
	 */
	private static function registerExportedNode($node)
	{
		if ($node)
		{
			$oid = $node->getOID();
			self::$exportedNodes[] = $oid;
			self::$oidNameMap[$oid] = $node->getDisplayValue();
		}
	}

	private static function processModels()
	{
		$modelIds = self::$persistenceFacade->getOIDs('Model');
		foreach ($modelIds as $currModelId)
		{
			self::check($currModelId);
			$currModel = self::$persistenceFacade->load($currModelId);

			self::processModel($currModel);
		}
	}

	private static function processModel($currModel) {
		self::check($currModel->getId());
		self::$dom->startElement('Model');

		self::appendAttributes($currModel);
		self::registerExportedNode($currModel);

		self::$dom->startElement('Package');

		self::translateNode($currModel);

		$value = self::$encodingUtil->convertIsoToCp1252Utf8($currModel->getName());
		self::$dom->writeAttribute('Name', $value);

		$currModel->loadChildren();
		$packages = $currModel->getPackageChildren();
		foreach ($packages as $currPackage)
		{
			self::processPackage($currPackage);

			$currPackage = $currPackage->getNextSibling();
		}

		unset ($currModel);
		self::$dom->endElement();
		self::$dom->endElement();
	}

	private static function processPackage($currPackage)
	{
		self::check($currPackage->getId());
		self::$dom->startElement('Package');

		self::appendAttributes($currPackage);
		self::registerExportedNode($currPackage);

		$children = self::getChildren($currPackage);
		foreach ($children as $currChild)
		{
			$childType = $currChild->getType();

			switch($childType) {
				case 'Package':
					// always process packages
					self::processPackage($currChild);
					break;

				case 'Diagram':
					if (self::$processVirtualPackages) {
						self::processPackage($currChild);
					}
					break;

				case 'ChiBusinessProcess':
					if (self::shouldProcessChild($currPackage, $currChild)) {
						self::processBusinessProcess($currChild);
					}
					break;

				case 'ChiBusinessUseCase':
				case 'ChiBusinessUseCaseCore':
					if (self::shouldProcessChild($currPackage, $currChild)) {
						self::processUseCase($currChild);
					}
					break;

				case 'ChiNode':
				case 'ChiController':
				case 'ChiSystem':
					if (self::shouldProcessChild($currPackage, $currChild)) {
						self::processClass($currChild);
					}
					break;

				default:
					if (self::shouldProcessChild($currPackage, $currChild)) {
						self::processNode($currChild);
					}
			}
		}

		self::$dom->endElement();
	}
	
	/**
	 * Check if a child object should be processed according to the
	 * current setting of processVirtualPackages.
	 * @param parent The parent object
	 * @param child The child object
	 * @return True/False
	 */
	private static function shouldProcessChild($parent, $child)
	{
		if (self::$processVirtualPackages) {
			if ($parent->getType() == 'Package') {
				return false;
			}
		}
		else {
			if ($parent->getType() == 'Diagram') {
				return false;
			}
		}
		return true;
	}

	/**
	 * Get the children to write into the xml format.
	 * If currPackage is a Package, it's children will be returned,
	 * if currPackage is a virtual Package (= Diagramm), the objects depicted
	 * by the Figure children will be returned
	 * @param currPackage A Package or Diagram object
	 * @return An array of Nodes
	 */
	private static function getChildren($currPackage)
	{
		$currPackage->loadChildren();
		
		if ($currPackage->getType() == 'Package') 
		{
			return $currPackage->getChildren();
		}
		else if ($currPackage->getType() == 'Diagram')
		{
			// load the figures
			$children = $currPackage->getChildren();
			$persistenceFacade = &PersistenceFacade::getInstance();
			for ($i=0; $i<sizeof($children); $i++)
			{
				$currFigure = &$children[$i];
				// load the model element that is represented by the figure
				foreach ($currFigure->getProperty('parentoids') as $parentOID) {
					if (PersistenceFacade::getOIDParameter($parentOID, 'type') != 'Diagram') {
						$currChild = &$persistenceFacade->load($parentOID, BUILDDEPTH_SINGLE);
						// exchange the figure with the object
						$currPackage->deleteChild($currFigure->getOID(), true);
						$currPackage->addChild($currChild);
						break;
					}
				}
			}
			return $currPackage->getChildren();
		}
	}

	private static function processBusinessProcess($currNode) {
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getType());

		self::appendAttributes($currNode);
		self::registerExportedNode($currNode);

		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			$childType = self::getRealType($currChild);

			if ($childType == 'ChiBusinessUseCase' || $childType == 'ChiBusinessUseCaseCore') {
				self::processUseCase($currChild);
			} else if (self::processManyToMany($currChild, $currNode)) {
				//do nothing
			} else if ($childType != 'Figure') {
				$logger = LoggerManager::getLogger('OawUtil');

				$logger->error('Invalid child of BusinessProcess: ' . $currChild->getId(), __FILE__, __LINE__);
			}
		}

		self::$dom->endElement();
	}

	private static function processUseCase($currNode) {
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getType());

		self::appendAttributes($currNode);
		self::registerExportedNode($currNode);

		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			$childType = self::getRealType($currChild);

			if ($childType == 'ActivitySet') {
				self::processActivitySet($currChild);
			} else if (self::processManyToMany($currChild, $currNode)) {
				//do nothing
			} else if ($childType == 'ChiController') {
				self::processChild($currChild);
			} else if ($childType != 'Figure') {
				$logger = LoggerManager::getLogger('OawUtil');

				$logger->error('Invalid child of UseCase: ' . $currChild->getId(), __FILE__, __LINE__);
			}
		}

		self::$dom->endElement();
	}

	private static function processClass($currNode) {
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getType());

		self::appendAttributes($currNode);
		self::registerExportedNode($currNode);

		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			$childType = self::getRealType($currChild);

			if ($childType != 'Figure') {
//				if ($childType == 'NMChiControllerActionKeyChiController' || $childType == 'NMChiControllerActionKeyChiView') {
//					self::processNode($currChild);
//				} else if (self::processManyToMany($currChild, $currNode)) {
				if (self::processManyToMany($currChild, $currNode)) {
					//do nothing
				} else if ($childType == 'ChiValue' || $childType == 'Operation') {
					self::processNode($currChild);
				} else {
					self::processChild($currChild);
				}
			}
		}

		self::$dom->endElement();
	}

	private static function processActivitySet($currNode) {
		self::check($currNode->getId());
		self::$dom->startElement('ActivitySet');

		self::appendAttributes($currNode);
		self::registerExportedNode($currNode);

		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			if ($currChild->getType() != 'Figure') {
				self::processNode($currChild);
			}
		}

		self::$dom->endElement();
	}

	private static function processNode($currNode)
	{
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getBaseType());

		self::appendAttributes($currNode);
		self::registerExportedNode($currNode);

		$currNode->loadChildren();
		$children = $currNode->getChildren();
		foreach ($children as $currChild)
		{
			if (self::processManyToMany($currChild, $currNode)) {
				//do nothing
			}
			/*else if ($currNode->getType() != 'Diagram' && $currChild->getType() == 'Figure')
			 {
			 self::processNode($currChild);
			 }*/
			else {
				self::processChild($currChild);
			}
		}

		$parents = $currNode->getParents();
		foreach ($parents as $currParent) {
			self::$dom->startElement('Parent');
			self::$dom->writeAttribute('targetType', $currParent->getType());
			self::$dom->writeAttribute('targetOid', $currParent->getValue('id'));
			self::$dom->endElement();
		}

		self::$dom->endElement();
	}

	private static function processChild($currChild) {
		self::$dom->startElement('Child');
		self::$dom->writeAttribute('targetType', $currChild->getType());
		self::$dom->writeAttribute('targetOid', $currChild->getValue('id'));
		self::$dom->endElement();
	}

	private static $specialChildren = array('ChiNode' => array('NodeSourceEnd'), 'ChiController' => array('SourceEnd', 'SourceActionKeyEnd', 'NMChiControllerActionKeyChiView'), 'ChiNodeManyToMany' => array('NMChiNodeChiMany2ManyChiNodeEnd'));

	private static function processManyToMany($currChild, $parent) {
		$result = false;

		if ($currChild->isManyToManyObject())
		{
			$result = true;

			$processThisManyToMany = true;

			if ($currChild->getType() != $currChild->getBaseType()) {
				if (array_key_exists( $parent->getBaseType(), self::$specialChildren)) {
					if (array_search($currChild->getType(), self::$specialChildren[$parent->getBaseType()], true) === false) {
						$processThisManyToMany = false;
					}
				}
			}

			if ($processThisManyToMany) {
				$currChild->loadParents();
				$parents = $currChild->getParents();
				foreach ($parents as $currParent)
				{
					if ($currParent->getId() != $parent->getId())
					{
						$className = self::getRealType($currParent);

						self::$dom->startElement('ManyToMany');
						self::$dom->writeAttribute('targetType', $className);
						self::$dom->writeAttribute('targetOid', $currParent->getValue('id'));
						self::$dom->writeAttribute('targetRole', $currParent->getType());

						$currChildArray = array($currChild);

						$valueNames = array('relationType', 'sourceMultiplicity', 'sourceNavigability', 'targetMultiplicity', 'targetNavigability', 'action', 'config', 'context');

						self::translateNode($currChild);

						foreach ($valueNames as $currValueName)
						{
							$value = self::$encodingUtil->convertIsoToCp1252Utf8($currChild->getValue($currValueName));
							if ($value !== null && $value !== '') {
								self::$dom->writeAttribute($currValueName, $value);
							}
						}


						self::$dom->endElement();
					}
				}
			}		}

			return $result;
	}

	private static function getRealType($node) {
		return $node->getBaseType();
	}

	private static function translateNode(&$node) {
		$nodes = array ($node);
		if (self::$language) {
			$localization = &Localization::getInstance();
			$localization->loadTranslation($node, self::$language, true, false);
			NodeUtil::translateValues($nodes, self::$language);
		}
		else {
			NodeUtil::translateValues($nodes);
		}
	}

	public static function prepareUmlFile($oid) {
		$result = null;

		$parser = InifileParser::getInstance();
		if (($params = $parser->getSection(self::INI_SECTION)) === false) {
			$logger = LoggerManager::getLogger('GenerateUmlController');

			$logger->error($parser->getErrorMsg(), __FILE__, __LINE__);
		} else {
			$dirName = $params[self::INI_UML_FILE_STORAGE];
			$fileName = str_replace(':', '-', $oid) . '.uml';
			$fullPath = "$dirName/$fileName";

			$result = $fullPath;
		}

		return $result;
	}
}