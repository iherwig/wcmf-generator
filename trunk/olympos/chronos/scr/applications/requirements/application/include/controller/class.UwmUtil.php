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
require_once BASE . 'application/include/controller/iface.UwmExporterReferenceStrategy.php';

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

	private static $IGNORED_ATTRIBUTES = array(
		'id',
		'_proxyOid'
		);

		private static $METHOD_NAME_SEARCH = array(
		'ChiBusinessUseCase',
		'ChiBusinessUseCaseCore',
		'ChiNode',
		'ChiBusinessProcess'
		);

		private static $METHOD_NAME_REPLACE = array(
		'UseCase',
		'UseCase',
		'Class',
		'BusinessProcess'
		);

		private static $dom;
		private static $persistenceFacade;
		private static $encodingUtil;
		// list of already exported nodes
		private static $exportedNodes = null;
		private static $oidNameMap = null;
		// list of nodes that are referenced and have to be included in the export
		// these will be exported in a package appended to the end
		private static $referencedNodes = null;

		private static $language = null;

		private static $lastTime = 0;

		private static $processVirtualPackages = true;

		/**
		 * @var UwmExporterReferenceStrategy
		 */
		private static $referenceStrategy = null;

		private static function check($msg)
		{
			$newTime = microtime(true);
			Log::debug(($newTime - self::$lastTime).": $msg. Bytes used: ".memory_get_usage(true), __CLASS__);
			self::$lastTime = $newTime;
		}

		/**
		 * Export a model/package to the intern xml format
		 * @param tmpUwmExportPath The name of the xml file
		 * @param startOid The object id of the instance to start with; may also be an array of start oids
		 * @param language The language to translate to. Optional [default: null]
		 * @param virtualPackages True/False wether to export diagrams as packages or not. If yes,
		 * all other package content will be ignored. Optional [default: false].
		 * @param referenceStrategy Strategy deciding which objects should be loaded if they are referenced [default: null].
		 * @return A problem report (should be empty if no problems occured).
		 */
		public static function exportXml($tmpUwmExportPath, $startOid, $language = null, $virtualPackages = false, UwmExporterReferenceStrategy $referenceStrategy = null) {
			if ($startOid == null) {
				Log::error("No id given\n".WCMFException::getStackTrace(), __CLASS__);
				return;
			}
			self::$language = $language;
			self::$processVirtualPackages = $virtualPackages;
			self::$exportedNodes = array();
			self::$oidNameMap = array();
			self::$referencedNodes = array();
			self::$referenceStrategy = $referenceStrategy;

			self::$dom = new XMLWriter();
			//self::$dom->setIndent(true);
			//self::$dom->setIndentString("\t");
			self::$dom->openURI($tmpUwmExportPath);
			self::$dom->startDocument(self::XML_VERSION, self::ENCODING, self::STANDALONE);

			self::$dom->startElement("CwmExport");

			self::$persistenceFacade = PersistenceFacade::getInstance();
			self::$encodingUtil = new EncodingUtil();

			$startOidList = is_array($startOid) ? $startOid : array($startOid);

			foreach ($startOidList as $currStartOid) {
				$rootType = PersistenceFacade::getOIDParameter($currStartOid, 'type');
				if ($rootType == 'Model') {
					$currModel = self::$persistenceFacade->load($currStartOid);
					if ($currModel) {
						self::processModel($currModel);
					} else {
						Log::error('Unknown model id ' . $currStartOid, __CLASS__);
					}
				} else if ($rootType == 'Package' || ($rootType == 'Diagram' && self::$processVirtualPackages)) {
					$currPackage = self::$persistenceFacade->load($currStartOid);
					if ($currPackage) {
						self::$dom->startElement('Model');
						self::processPackage($currPackage);
						self::processReferencedNodes();
						self::$dom->endElement();
					} else {
						Log::error('Unknown package id ' . $currStartOid, __CLASS__);
					}
				} else if (strlen(trim($rootType)) > 0) {
					$currNode = self::$persistenceFacade->load($currStartOid);
					if ($currNode) {
						self::$dom->startElement('Model');
						self::$dom->startElement('Package');
						self::$dom->writeAttribute('Name', 'Main Package');
						$success = self::callProcessing($currNode);
						// add the referenced nodes
						self::$dom->endElement();
						self::processReferencedNodes();
						self::$dom->endElement();
					} else {
						Log::error('Unknown diagram id ' . $currStartOid, __CLASS__);
					}
				} else {
					self::processModels();
				}
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
		 * Calls the 'ProcessXxx' method according to the type of $node.
		 *
		 * @param Node $node The node to process.
		 * @return boolean <code>true</code> if the method could be found, <code>false</code> otherwise.
		 */
		private static function callProcessing($node) {
			$result = null;

			$type = $node->getBaseType();

			$mappedType = str_replace(self::$METHOD_NAME_SEARCH, self::$METHOD_NAME_REPLACE, $type);

			$methodName = "process$mappedType";

			if (method_exists('UwmUtil', $methodName)) {
				Log::info("found dynamic method $methodName", __CLASS__);

				call_user_func(array('UwmUtil', $methodName), $node);

				$result = true;
			} else {
				Log::error("Cannot find dynamic method $methodName", __CLASS__);

				$result = false;
			}

			return $result;
		}

		/**
		 * Write all node attributes to the xml file.
		 * @param node The node whose attributes to write
		 */
		private static function appendAttributes($node, $ignoredAttributes = array())
		{
			self::translateNode($node);
			self::$dom->writeAttribute('id', $node->getBaseOID());

			$valueNames = $node->getValueNames();

			foreach ($valueNames as $currValueName)
			{
				if (
					!in_array($currValueName, self::$IGNORED_ATTRIBUTES) &&
					!in_array($currValueName, $ignoredAttributes)
				) {
					$value = self::$encodingUtil->convertIsoToCp1252Utf8($node->getValue($currValueName));
					if ($value !== null && $value !== '') {
						self::$dom->writeAttribute($currValueName, $value);
					}
				}
			}
		}

		/**
		 * Register an exported node.
		 * @param node The node to register
		 */
		private static function registerExportedNode($node, $callStrategy = true)
		{
			if ($node)
			{
				$oid = $node->getBaseOID();
				self::$exportedNodes[] = $oid;
				self::$oidNameMap[$oid] = $node->getDisplayValue();

				if (self::$referenceStrategy) {
					Log::debug('calling referenceStrategy on ' . $node->getOid(), __CLASS__);
					self::registerReference(self::$referenceStrategy->getReferences($node));
				}
			}
		}

		private static function registerReference($referenceOid) {
			$list = is_array($referenceOid) ? $referenceOid : array($referenceOid);

			Log::debug(var_export($list, true), __CLASS__);
			self::$referencedNodes = array_unique(array_merge(self::$referencedNodes, $list));
			Log::debug(var_export(self::$referencedNodes, true), __CLASS__);
		}

		/**
		 * Check if a node is already exported.
		 * @param oid The oid of the node
		 * @return True/False
		 */
		private static function isExportedNode($oid)
		{
			return array_key_exists($oid, self::$oidNameMap);
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
			self::processReferencedNodes();
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
						else {
							self::processDiagram($currChild);
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
					Log::error('Invalid child of BusinessProcess: ' . $currChild->getId(), __CLASS__);
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
					Log::error('Invalid child of UseCase: ' . $currChild->getId(), __CLASS__);
				}
			}

			self::$dom->endElement();
		}

		private static function processClass($currNode) {
			self::check($currNode->getId());
			self::$dom->startElement($currNode->getType());

			self::appendAttributes($currNode);
			self::registerExportedNode($currNode);

			Log::debug("Processing class " . $currNode->getBaseOID() . ' (' . $currNode->getName() . ')');

			$currNode->loadChildren();
			$children = $currNode->getChildren();

			Log::debug('loaded ' . count($children) . ' children');


			//Fix for doubled aggregations
			$processedM2m = array();

			foreach ($children as $currChild)
			{
				$childType = self::getRealType($currChild);

				if ($childType != 'Figure') {
					//				if ($childType == 'NMChiControllerActionKeyChiController' || $childType == 'NMChiControllerActionKeyChiView') {
					//					self::processNode($currChild);
					//				} else if (self::processManyToMany($currChild, $currNode)) {
					if (self::processManyToMany($currChild, $currNode, &$processedM2m)) {
						//do nothing
					} else if ($childType == 'ChiValue' || $childType == 'Operation') {
						self::processAttribute($currChild);
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
				if ($currChild->getBaseType() == 'PoductionRuleSet') {
					self::processProductionRuleSet($currChild);
				} else if ($currChild->getType() != 'Figure') {
					self::processNode($currChild);
				}
			}

			self::$dom->endElement();
		}

		private static function processDiagram($currNode) {
			self::check($currNode->getId());
			self::$dom->startElement($currNode->getType());

			self::appendAttributes($currNode);
			self::registerExportedNode($currNode);

			$currNode->loadChildren('Figure');
			$children = $currNode->getChildren();
			foreach ($children as $currChild)
			{
				if ($currChild->getType() == 'Figure') {
					self::processFigure($currChild);
				}
			}

			self::$dom->endElement();
		}

		private static function processFigure($currNode) {

			self::check($currNode->getId());
			self::$dom->startElement($currNode->getType());

			// get the alias of the object represented by the figure
			$alias = '';
			$parentoids = $currNode->getProperty('parentoids') ;
			foreach ($parentoids as $poid) {
				// the object represented by the figure is the parent, that is no diagram
				if (PersistenceFacade::getOIDParameter($poid, 'type') != 'Diagram') {
					$persistenceFacade = &PersistenceFacade::getInstance();
					$obj = &$persistenceFacade->load($poid, BUILDDEPTH_SINGLE);
					if ($obj) {
						$alias = $obj->getValue('Alias', DATATYPE_ATTRIBUTE);
					}
					// store the referenced node in order to make sure that it is included in the export
					self::registerReference($poid);
					break;
				}
			}

			self::appendAttributes($currNode);
			self::$dom->writeAttribute('Alias', $alias);
			self::registerExportedNode($currNode);

			$currNode->loadParents();
			$parents = $currNode->getParents();
			foreach ($parents as $currParent) {
				self::processParent($currParent);
			}

			self::$dom->endElement();
		}

		private static function processProductionRuleSet($currNode) {
			self::check($currNode->getId());
			self::$dom->startEleent($currNode->getBaseType());

			self::appendAttributes($currNode);
			self::registerExportedNode($currNode);

			$currNode->loadChildren();
			$children = $currNode->getChildren();
			foreach ($children as $currChild) {
				self::processChild($currChild);
			}

			self::$dom->endElement();
		}

		private static function processProductionRule($currNode) {
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
				else {
					self::processChild($currChild);
				}
			}

			$parents = $currNode->getParents();
			foreach ($parents as $currParent) {
				self::processParent($currParent);
			}

			self::$dom->endElement();
		}

		private static function processAttribute($currNode)
		{
			self::check($currNode->getId());
			self::$dom->startElement($currNode->getBaseType());

			if ($currNode->getType() == 'ChiValue')
			{
				//Rewriting PropertyType attribute
				$propertyType = self::extractPropertyType($currNode->getPropertyType(), $currNode->getBaseOID());

				self::appendAttributes($currNode, array('PropertyType'));
				self::$dom->writeAttribute('PropertyType', $propertyType);
			}
			else
			{
				self::appendAttributes($currNode);
			}

			self::registerExportedNode($currNode);

			$currNode->loadChildren();
			$children = $currNode->getChildren();
			foreach ($children as $currChild)
			{
				if (self::processManyToMany($currChild, $currNode)) {
					//do nothing
				}
				else {
					self::processChild($currChild);

					if ($currChild->getType() == 'ChiValueRef') {
						// store the references in order to make sure that it is included in the export
						self::registerReference($currChild->getOID());
						self::registerReference($currChild->getReferenceType());
						self::registerReference($currChild->getReferenceValue());
					}

				}
			}

			$parents = $currNode->getParents();
			foreach ($parents as $currParent) {
				self::processParent($currParent);
			}

			self::$dom->endElement();
		}

		private static function processParent($currParent) {
			self::$dom->startElement('Parent');
			self::$dom->writeAttribute('targetType', $currParent->getType());
			self::$dom->writeAttribute('targetOid', $currParent->getBaseOID());
			self::$dom->endElement();
		}

		private static function processChild($currChild) {
			self::$dom->startElement('Child');
			self::$dom->writeAttribute('targetType', $currChild->getType());
			self::$dom->writeAttribute('targetOid', $currChild->getBaseOID());
			self::$dom->endElement();
		}

		private static $specialChildren = array('ChiNode' => array('NodeSourceEnd'), 'ChiController' => array('SourceEnd', 'SourceActionKeyEnd', 'NMChiControllerActionKeyChiView'), 'ChiNodeManyToMany' => array('NMChiNodeChiMany2ManyChiNodeEnd'));

		private static function processManyToMany($currChild, $parent, $processedM2m = array()) {

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

          // check if the association is a self-relation
          $isSelfRelation = true;
					foreach ($parents as $currParent) {
            if ($currParent->getBaseOID() != $parent->getBaseOID()) {
              $isSelfRelation = false;
            }
          }

					foreach ($parents as $currParent)
					{
						if (($currParent->getBaseOID() != $parent->getBaseOID() || $isSelfRelation) &&
                    array_search($currChild->getBaseOID(), $processedM2m) === false)
						{
							$className = self::getRealType($currParent);

							self::$dom->startElement('ManyToMany');
							self::$dom->writeAttribute('targetType', $className);
							self::$dom->writeAttribute('targetOid', $currParent->getBaseOID());
							self::$dom->writeAttribute('targetRole', $currParent->getType());

							$currChildArray = array($currChild);

							$valueNames = array('Name', 'relationType', 'sourceName', 'sourceMultiplicity', 'sourceNavigability', 'targetName', 'targetMultiplicity', 'targetNavigability', 'action', 'config', 'context');

							self::translateNode($currChild);

							foreach ($valueNames as $currValueName)
							{
								$value = self::$encodingUtil->convertIsoToCp1252Utf8($currChild->getValue($currValueName));
								if ($value !== null && $value !== '') {
									self::$dom->writeAttribute($currValueName, $value);
								}
							}


							self::$dom->endElement();

							$processedM2m[] = $currChild->getBaseOID();
						}
					}
				}
			}

			return $result;
		}

		/**
		 * Add a package including all referenced nodes that were not exported yet.
		 */
		private static function processReferencedNodes() {
			$persistenceFacade = PersistenceFacade::getInstance();

			// create the enclosing package
			$package = &$persistenceFacade->create('Package', BUILDDEPTH_SINGLE);
			$package->setOID(PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array(0))));
			$package->setName('Referenced Nodes');

			// add the referenced nodes to the package
			while(count(self::$referencedNodes) > 0) {
				$oid = self::$referencedNodes[0];

				if (!self::isExportedNode($oid)) {
					$node = $persistenceFacade->load($oid, BUILDDEPTH_SINGLE);
					if ($node) {
						$package->addChild($node);
						self::registerExportedNode($node);
					}
					else {
						Log::error("Object for referenced oid: ".$oid." does not exist", __CLASS__);
					}
				}

				unset(self::$referencedNodes[0]);
				self::$referencedNodes = array_values(self::$referencedNodes);
			}
			self::processPackage($package);
		}

		private static function getRealType($node) {
			return $node->getBaseType();
		}

		private static function translateNode(&$node) {
			$nodes = array ($node);
			if (self::$language) {
				$localization = Localization::getInstance();
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
				Log::error($parser->getErrorMsg(), __CLASS__);
			} else {
				$dirName = $params[self::INI_UML_FILE_STORAGE];
				$fileName = str_replace(':', '-', $oid) . '.uml';
				$fullPath = "$dirName/$fileName";

				$result = $fullPath;
			}

			return $result;
		}

		public static function extractPropertyType($propertyType, $parentOid) {
			$result = $propertyType;
			if (strlen($propertyType) > 0)
			{
				$oidParts = PersistenceFacade::decomposeOID($parentOid);

				Log::debug("ChiValue decomposed: " . print_r($oidParts, true), __CLASS__);

				$oidParts['type'] = 'ChiNode';
				$oidParts['id'] = $propertyType;

				$typeOid = PersistenceFacade::composeOID($oidParts);
				Log::debug("found ChiValue type: $typeOid", __CLASS__);
				if (PersistenceFacade::isValidOID($typeOid)) {
					Log::debug('found valid oid', __CLASS__);
					$result = $typeOid;
				}
			}
			else {
				Log::error("ChiValue : ".$parentOid." does not have a PropertyType assigned", __CLASS__);
			}
			return $result;
		}
}
