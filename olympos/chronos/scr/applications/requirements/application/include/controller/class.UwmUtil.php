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

	private static $language = null;

	private static $lastTime = 0;

	private static function check($msg)
	{
		$newTime = microtime(true);

		//echo $newTime - self::$lastTime, ": $msg<br/ >";

		self::$lastTime = $newTime;
	}

	public static function exportXml($tmpUwmExportPath, $startModel, $startPackage, $language = null) {
		self::$language = $language;

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
	}

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

		$currPackage->loadChildren();
		$children = $currPackage->getChildren();
		foreach ($children as $currChild)
		{
			$childType = $currChild->getType();

			switch($childType) {
				case 'Package':
					self::processPackage($currChild);
					break;

				case 'ChiBusinessProcess':
					self::processBusinessProcess($currChild);
					break;

				case 'ChiBusinessUseCase':
				case 'ChiBusinessUseCaseCore':
					self::processUseCase($currChild);
					break;

				case 'ChiNode':
				case 'ChiController':
				case 'ChiSystem':
					self::processClass($currChild);
					break;

				default:
					self::processNode($currChild);
			}
		}

		self::$dom->endElement();
	}

	private static function processBusinessProcess($currNode) {
		self::check($currNode->getId());
		self::$dom->startElement($currNode->getType());

		self::appendAttributes($currNode);

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
			Localization::loadTranslation($node, self::$language, true, false);
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
