<?php
/*
 * Copyright (c) 2011 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:09:16 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.UwmMergerController.php/Import) ENABLED START
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');
// PROTECTED REGION END

/**
 * @class UwmMergerController
 * @ingroup Controller
 * @brief Imports a UML file and merges it with the repository.
 * 
 * <b>Input actions:</b>
 * - @em mergeUwm Imports a UML file.
 * 
 * <b>Output actions:</b>
 * - @em failure If a fatal error occurs
 * - @em ok In any other case
 * 
 * @param[in] modelFile The UML file to import.
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class UwmMergerController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.UwmMergerController.php/Body) ENABLED START
	const UPLOAD_NAME = 'modelFile';

	private static $uploadErrors = array (
	UPLOAD_ERR_INI_SIZE=>'The uploaded file exceeds the upload_max_filesize directive in php.ini.',
	UPLOAD_ERR_FORM_SIZE=>'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.',
	UPLOAD_ERR_PARTIAL=>'The uploaded file was only partially uploaded.',
	UPLOAD_ERR_NO_FILE=>'No file was uploaded.',
	UPLOAD_ERR_NO_TMP_DIR=>'Missing a temporary folder.',
	UPLOAD_ERR_CANT_WRITE=>'Failed to write file to disk.',
	UPLOAD_ERR_EXTENSION=>'File upload stopped by extension.'
	);

	private $dom;
	private $persistenceFacade;

	private $idMap = array ();

	private $asyncCache = array();

	private $errorMsg = '';
	private $errorOccured = false;

	private $lastTime = 0;

	private $propertyFilePath;

	private $parentObjs;

	private function check($msg)
	{
		$newTime = microtime(true);
		Log::debug(($newTime-$this->lastTime).": $msg", __CLASS__);
		$this->lastTime = $newTime;
	}

	public function executeKernel()
	{
		$this->persistenceFacade = PersistenceFacade::getInstance();

		$umlFilePath = $this->getFilePath();

		if ($umlFilePath) {
			$uwmFilePath = $this->transformToUwm($umlFilePath);

			if ($uwmFilePath) {
				$this->importUwm($uwmFilePath);


				//$this->importUwm($umlFilePath);

				//unlink($uwmFilePath);
			}

			//unlink($this->propertyFilePath);
			//unlink($umlFilePath);
		}

		if (!$this->errorOccured) {
			$this->_response->setValue('success', true);
			$this->_response->setAction('ok');
		} else {
			$this->_response->setValue('errorMsg', $this->errorMsg);
			$this->_response->setValue('success', false);
			$this->_response->setAction('failure');
		}

		return false;
	}

	private function getFilePath() {
		$result = false;

		$fileSpec = $_FILES[self::UPLOAD_NAME];
		if ($fileSpec) {
			if ($fileSpec['error'] == UPLOAD_ERR_OK) {
					
				$tmpName = OawUtil::tempName();
				if (move_uploaded_file($fileSpec['tmp_name'], $tmpName)) {
					$result = $tmpName;
				} else {
					$this->addErrorMsg('Error while moving uploaded file.');
				}
			} else {
				$this->addErrorMsg(self::$UPLOAD_ERRORS[$fileSpec['error']]);
			}
		} else {
			$this->addErrorMsg('No file was uploaded.');
		}

		return $result;
	}

	private function transformToUwm($umlFilePath) {
		$result = false;

		$tmpUwmPath = OawUtil::tempName();

		$this->propertyFilePath = OawUtil::createPropertyFile($tmpUwmPath, $umlFilePath);

		$this->check("start generator");

		$runCfg = OawUtil::runOaw($this->propertyFilePath, 'cartridge/UmlConnector/workflow/uml2cwm.oaw');

		$this->check('Generator finished');

		if ($runCfg /*&& strpos($runCfg['stdout'], 'ERROR') === false*/) {
			$result = $tmpUwmPath;
		} else {
			$this->addErrorMsg('Generator failed!<br />Output: '.nl2br($runCfg['stdout']).'<br />'.nl2br($runCfg['stderr']).'<br />Returncode: '.$runCfg['returncode']);
		}

		return $result;
	}

	private function importUwm($uwmFilePath) {
		$this->check("start input");

		$this->dom = new XMLReader();
		$this->dom->open($uwmFilePath);

		$this->persistenceFacade->startTransaction();

		try {
			while ($this->dom->read()) {
				if ($this->dom->nodeType == XMLReader::ELEMENT) {
					$elementName = $this->dom->name;

					if ($elementName != 'CwmExport' && $elementName != 'Child' && $elementName != 'Parent' && $elementName != 'ManyToMany' && $elementName != 'Diagram') {
						$this->findExisting($elementName);
					}
				}
			}

			$this->dom->close();

			$this->dom = new XMLReader();
			$this->dom->open($uwmFilePath);

			$this->parentObjs = array ();

			while ($this->dom->read()) {
				if ($this->dom->nodeType == XMLReader::ELEMENT) {
					$elementName = $this->dom->name;

					switch($elementName) {
						case 'CwmExport':
						case 'Parent':
						case 'Diagram':
							//do nothing
							break;

						case 'Child':
							$this->updateChild($elementName);
							break;

						case 'ManyToMany':
							$this->updateManyToMany($elementName);
							break;

						case 'Model':
							array_push($this->parentObjs, $this->load($this->dom->getAttribute('id')));
							break;

						default:
							$this->updateTreeAndValues($elmentName);
							break;
					}
				}
					
				if ($this->dom->isEmptyElement || $this->dom->nodeType == XMLReader::END_ELEMENT) {
					$elementName = $this->dom->name;

					if ($elementName != 'CwmExport' && $elementName != 'Parent' && $elementName != 'Diagram' && $elementName != 'Child' && $elementName != 'ManyToMany') {
						$obj = array_pop($this->parentObjs);
						if ($obj) {
							//$obj->save();
						} else {
							$this->addErrorMsg('No Parent close: '.$this->dom->getAttribute('id'));
						}
					}
				}
			}

		}
		catch(Exception $ex) {
			$this->addErrorMsg('Exeption occured!<br />'.$ex->getMessage());
		}

		if (!$this->errorOccured) {
			$this->persistenceFacade->commitTransaction();
		} else {
			$this->persistenceFacade->rollbackTransaction();
		}

		$this->check("import finished");
	}

	private function findExisting($elementName) {
		$query = PersistenceFacade::createObjectQuery($elementName);
			
		$elementTpl = $query->getObjectTemplate($elementName);

		$name = $this->dom->getAttribute('Name');

		$elementTpl->setValue('Name', "= '".mysql_escape_string($name)."'", DATATYPE_ATTRIBUTE);

		$elementResultList = $query->execute(1);

		if (count($elementResultList) > 0) {
			$foundObj = $elementResultList[0];
			if (count($elementResultList) > 1) {
				$oid = $foundObj->getBaseOID();

				Log::warn("Found more than one match for $name, using first ($oid)", __CLASS__);
			}

			$id = $this->dom->getAttribute('id');

			$this->idMap[$id] = $foundObj;
			$this->check('ID mapping: '.$id.' -- '.$foundObj->getBaseOID());
		}
	}

	private function updateChild($elementName) {
		$this->check("child targetOid: ".$this->dom->getAttribute('targetOid'));
	}

	private static $roleTargetToSourceMapper = array(
		'ChiNodeSource' => 'ChiNodeTarget',
		'ChiNodeTarget' => 'ChiNodeSource',
		'NMChiNodeChiMany2ManyChiNodeEnd' => 'NodeManyToManySource',
		'NodeManyToManySource' => 'NMChiNodeChiMany2ManyChiNodeEnd'
		);

		private function updateManyToMany($elementName) {
			$this->check("manyToMany targetOid: ".$this->dom->getAttribute('targetOid'));
			
			$relationType = $this->dom->getAttribute('relationType');
			if (
				$relationType == 'aggregation' ||
				$relationType == 'association' ||
				$relationType == 'composition'
			) {
				$childObj = $this->load($this->dom->getAttribute('targetOid'));
	
				if ($childObj) {
					$this->check("target: ".$childObj->getOID());
					$parentObj = array_pop($this->parentObjs);
	
					if ($parentObj) {
						$this->check("source: ".$parentObj->getOID());
	
						// get the source and target roles for the relation
						$targetRole = $this->dom->getAttribute('targetRole');
						if (!$targetRole) {
							$targetRole = $this->dom->getAttribute('targetType');
						}
						$sourceRole = $parentObj->getType();
						if (array_key_exists($targetRole, self::$roleTargetToSourceMapper)) {
							$sourceRole = self::$roleTargetToSourceMapper[$targetRole];
						}
	
						// create templates of the role types and copy the values of
						// source and target to them (this is necessary in order to
						// have the correct source and target types)
						$parentTemplate = $this->persistenceFacade->create($sourceRole, 1);
						$parentObj->copyValues($parentTemplate);
						$childTemplate = $this->persistenceFacade->create($targetRole, 1);
						$childObj->copyValues($childTemplate);
	
						// create the nm instance
						$linkType = $this->findAssociationType($parentTemplate, $childTemplate);
						if (!$linkType) {
							$this->addErrorMsg("Cannot find linkType: $sourceRole => $targetRole");
						}
						$this->check('manyToMany linkType: '.$linkType);
	
						$childChildren = $childObj->getChildren();
						$parentChildren = $parentObj->getChildren();
	
						$foundLink = null;
						
						$assocName = $this->dom->getAttribute('Name');
	
						foreach($childChildren as $currChildChild) {
							$this->check('currParentChild type: ' . $currChildChild->getType());
	
							if ($currChildChild->getType() == $linkType) {
								$this->check("Found right linkType");

								$this->check("assocName: $assocName");
								
								foreach($parentChildren as $currParentChild) {
									if (
										($currChildChild->getBaseOID() == $currParentChild->getBaseOID()) &&
										(trim($assocName) == '' || $assocName == $currChildChild->getName())
									) {
										
										$this->check('found link: ' . $currChildChild->getBaseOID() . ' sourceName: ' . $currChildChild->getSourceName() . ' targetName: ' . $currChildChild->getTargetName());
										$foundLink = $currChildChild;
	
										if ($currChildChild->getSourceName() != '' && $currChildChild->getTargetName() != '') {
											break;
										}
									}
								}
							}
						}
	
						if ($foundLink) {
							$this->check('selected link: ' . $foundLink->getBaseOID());
							
							$valueNames = array('Name', 'relationType', 'sourceName', 'sourceMultiplicity', 'sourceNavigability', 'targetName', 'targetMultiplicity', 'targetNavigability', 'action', 'config', 'context');
							foreach ($valueNames as $currValueName)	{
								$attrValue = $this->dom->getAttribute($currValueName);
	
								if ($attrValue) {
									$foundLink->setValue($currValueName, $this->resolveValue($foundLink, $currValueName, $attrValue));
								}
							}
	
							$foundLink->save();
						}
	
						array_push($this->parentObjs, $parentObj);
					} else {
						$this->addErrorMsg('No Parent ManyToMany: '.$this->dom->getAttribute('targetOid'));
					}
				}
			}
		}

		private function updateTreeAndValues($elmentName) {
			$this->check("newChild id: ".$this->dom->getAttribute('id'));
				
			$newChild = $this->load($this->dom->getAttribute('id'));
			
			if ($newChild instanceof ChiValue) {
				
				//secure for ambigious ChiValue names
				$parent = array_pop($this->parentObjs);
				
				$newChildName = $newChild->getName();
				
				$parent->loadChildren();
				$children = $parent->getChildren();
				foreach($children as $currChild) {
					if ($currChild instanceof ChiValue) {
						if ($newChildName == $currChild->getName()) {
							$newChild = $currChild;
							
							break;
						}
					}
				}
				
				$this->check('found ChiValue: ' . $newChild->getBaseOID() . ' PropertyType ' . $this->dom->getAttribute('PropertyType'));
				$target = $this->load($this->dom->getAttribute('PropertyType'));
				
				if ($target) {
					$this->check('found target ' . $target->getBaseOID());
					$targetOidParts = PersistenceFacade::decomposeOID($target->getBaseOID());
					
					$id = $targetOidParts['id'][0];
					
					$this->check("extracted id: $id");
					if ($id) {
						$newChild->setPropertyType($id);
						$this->check("Setting PropertyType of " . $newChild->getName() . " to $id");
						
						$newChild->save();
					}
				}
				
				array_push($this->parentObjs, $parent);
			}
				
			array_push($this->parentObjs, $newChild);
		}

		private function resolveValue($newObj, $attrName, $value) {
			$properties = $newObj->getValueProperties($attrName);

			$inputType = $properties['input_type'];

			if (strpos($inputType, 'async') !== false) {
				list (, $displayTypesString) = explode(':', $inputType);
				$displayTypes = explode('|', $displayTypesString);

				$foundTargetType = false;
				$fistDisplayType = null;
				$firstDisplayValues = null;
				$valueParts = explode(' - ', $value);
				$computedValue = '';
				$foundMatchingNode = null;

				foreach ($displayTypes as $displayType) {
					$this->check("Found async: attrName: $attrName value: $value displayType: $displayType");

					if (!$fistDisplayType) {
						$firstDisplayType = $displayType;
					}

					//Resolve external ids to internal OIDs
					if ($displayType == 'ChiNode') {
						$oid = $this->idMap[$value];

						if (PersistenceFacade::isValidOID($oid)) {
							$foundMatchingNode = $this->persistenceFacade->load($oid);
							$this->check("Found ChiNode value: $oid");

							break;
						}
					}

					if (array_key_exists($displayType, $this->asyncCache)) {
						$typeCache = $this->asyncCache[$displayType];
						if (array_key_exists($value, $typeCache)) {
							$foundMatchingNode = $typeCache[$value];
							$this->check('Found cached object: ' . $foundMatchingNode->getRealOID());

							break;
						}
					} else {
						$this->asyncCache[$displayType] == array();
					}


					$query = PersistenceFacade::createObjectQuery($displayType);

					$displayTypeTpl = $query->getObjectTemplate($displayType);
					$displayValueString = $displayTypeTpl->getProperty('display_value');

					$displayValues = explode('|', $displayValueString);
					if (!$firstDisplayValues) {
						$firstDisplayValues = $displayValues;
					}

					$computedValue = '';
					$firstCompute = true;

					foreach ($displayValues as $index=>$displayValue) {
						if (trim($valueParts[$index]) != '') {
							$displayTypeTpl->setValue($displayValue, "= '".mysql_escape_string($valueParts[$index])."'", DATATYPE_ATTRIBUTE);
							if (!$firstCompute) {
								$computedValue .= ' - ';
							} else {
								$firstCompute = false;
							}

							$computedValue .= $valueParts[$index];
						}
					}

					$displayResultList = $query->execute(BUILDDEPTH_SINGLE);

					if (count($displayResultList) > 0) {
						if (!$foundMatchingNode) {
							$foundMatchingNode = $displayResultList[0];

							$this->asyncCache[$displayType][$value] = $foundMatchingNode;
						}

						foreach ($displayResultList as $currResult) {
							if (in_array($currResult->getOID(), $this->idMap)) {
								$foundMatchingNode = $currResult;

								$foundTargetType = true;

								break;
							}
						}

						if ($foundTargetType) {
							break;
						}
					}
				}

				if ($foundMatchingNode) {
					$value = $foundMatchingNode->getValue('id');

					$foundTargetType = true;
				}

				if (!$foundTargetType) {
					$displayObj = $this->persistenceFacade->create($firstDisplayType);

					foreach ($firstDisplayValues as $index=>$displayValue) {
						$displayObj->setValue($displayValue, $valueParts[$index]);
					}

					$displayObj->save();

					$value = $displayObj->getValue('id');
				}
			}

			return $value;
		}

		/**
		 * Search for an child type of parent that establishes the association between a given
		 * parent and child or vice versa.
		 * @param parent A template of the parent object (with children attached)
		 * @param child The child to check
		 * @return The type
		 */
		private function findAssociationType( & $parent, & $child)
		{
			foreach ($parent->getChildren() as $possibleChild)
			{
				if (in_array('manyToMany', $possibleChild->getPropertyNames()))
				{
					$associationEnds = $possibleChild->getProperty('manyToMany');
					if (in_array($child->getType(), $associationEnds))
					return $possibleChild->getType();
				}
			}
			foreach ($child->getChildren() as $possibleChild)
			{
				if (in_array('manyToMany', $possibleChild->getPropertyNames()))
				{
					$associationEnds = $possibleChild->getProperty('manyToMany');
					if (in_array($parent->getType(), $associationEnds))
					return $possibleChild->getType();
				}
			}
			return null;
		}

		private function load($xmlId) {
			$result = null;

			$result = $this->idMap[$xmlId];

			return $result;
		}

		private function addErrorMsg($msg) {
			$this->errorMsg .= "$msg<br />\n";
			$this->errorOccured = true;
		}

		public function hasView()
		{
			return false;
		}

		private function last($arr) {
			return $arr[count($arr)-1];
		}

		// PROTECTED REGION END

}
?>
