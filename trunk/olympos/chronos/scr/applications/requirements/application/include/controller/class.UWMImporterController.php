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

require_once (BASE.'wcmf/lib/presentation/class.Controller.php');
require_once (BASE.'wcmf/lib/persistence/class.PersistenceFacade.php');

require_once ('class.OawUtil.php');

class UWMImporterController extends Controller
{
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

	private $errorMsg = '';
	private $errorOccured = false;

	private $lastTime = 0;

	private $propertyFilePath;

	private $parentObjs;

	private function check($msg)
	{
		$newTime = microtime(true);
	
		//echo $newTime-$this->lastTime, ": $msg<br/ >\n";
	
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
				
				unlink($uwmFilePath);
			}
		
			unlink($this->propertyFilePath);
			unlink($umlFilePath);
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
	
		$runCfg = OawUtil::runOaw($this->propertyFilePath, 'templates/uwm/uml22uwm.oaw');
	
		$this->check('Generator finished');
	
		if ($runCfg && strpos($runCfg['stdout'], 'ERROR') === false) {
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
				
					if ($elementName != 'UwmExport' && $elementName != 'Child' && $elementName != 'Parent' && $elementName != 'ManyToMany' && $elementName != 'Diagram') {
						$this->createAndSaveDisplayValues($elementName);
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
						case 'UwmExport':
						case 'Parent':
						case 'Diagram':
							//do nothing
							break;
					
						case 'Child':
							$this->associateChild($elementName);
							break;
					
						case 'ManyToMany':
							$this->associateManyToMany($elementName);
							break;
					
						case 'Model':
							array_push($this->parentObjs, $this->load($this->dom->getAttribute('id')));
							break;
					
						default:
							$this->associateTreeAndSaveValues($elmentName);
							break;
					}
				}
			
				if ($this->dom->isEmptyElement || $this->dom->nodeType == XMLReader::END_ELEMENT) {
					$elementName = $this->dom->name;
				
					if ($elementName != 'UwmExport' && $elementName != 'Parent' && $elementName != 'Diagram' && $elementName != 'Child' && $elementName != 'ManyToMany') {
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

	private function createAndSaveDisplayValues($elementName) {
		$newObj = $this->persistenceFacade->create($elementName);
		$id = $this->dom->getAttribute('id');
	
		$displayValuesString = $newObj->getProperty('display_value');
		$displayValues = explode('|', $displayValuesString);
	
		$this->dom->moveToFirstAttribute();
		while ($this->dom->moveToNextAttribute()) {
			$attrName = $this->dom->name;
		
			if ($attrName != 'id' && in_array($attrName, $displayValues)) {
				$value = trim($this->dom->value);
			
				if ($value != '') {
					$newObj->setValue($attrName, $value);
				}
			}
		}
	
		$newObj->save();
	
		$this->idMap[$id] = $newObj->getOID();
		$this->check('ID mapping: '.$id.' -- '.$newObj->getOID());
	}

	private function associateChild($elementName) {
		$this->check("child targetOid: ".$this->dom->getAttribute('targetOid'));
		$childObj = $this->load($this->dom->getAttribute('targetOid'));
	
		if ($childObj) {
			$parentObj = array_pop($this->parentObjs);
		
			if ($parentObj) {
				$parentObj->addChild($childObj);
				$parentObj->save();
				$parentObj = $this->persistenceFacade->load($parentObj->getOID(), BUILDTYPE_SINGLE);
			
				$childObj->save();
			
				array_push($this->parentObjs, $parentObj);
			} else {
				$this->addErrorMsg('No Parent Child: '.$this->dom->getAttribute('targetOid'));
			}
		}
	}

	private function associateManyToMany($elementName) {
		$this->check("manyToMany targetOid: ".$this->dom->getAttribute('targetOid'));
		$childObj = $this->load($this->dom->getAttribute('targetOid'));
	
		if ($childObj) {
			$parentObj = array_pop($this->parentObjs);
		
			if ($parentObj) {
				$parentTemplate = $this->persistenceFacade->create($parentObj->getType(), 1);
				$childTemplate = $this->persistenceFacade->create($this->dom->getAttribute('targetType'), 1);
			
				$linkType = $this->findAssociationType($parentTemplate, $childTemplate);
				$this->check('manyToMany linkType: '.$linkType);
				$link = $this->persistenceFacade->create($linkType, BUILDTYPE_SINGLE);
			
				$this->check('link oid: '.$link->getOID());
			
				$parentObj->addChild($link);
				$link->save();
				$parentObj->save();
				$parentObj = $this->persistenceFacade->load($parentObj->getOID(), BUILDTYPE_SINGLE);
			
				$link = $this->persistenceFacade->load($link->getOID(), BUILDTYPE_SINGLE);
				$childObj->addChild($link);
				$link->save();
			
				$childObj->save();
			
				array_push($this->parentObjs, $parentObj);
			} else {
				$this->addErrorMsg('No Parent ManyToMany: '.$this->dom->getAttribute('targetOid'));
			}
		}
	}

	private function associateTreeAndSaveValues($elmentName) {
		$this->check("newChild id: ".$this->dom->getAttribute('id'));
	
		$newChild = $this->load($this->dom->getAttribute('id'));
	
		$this->saveValues($newChild);
	
		$parentObj = array_pop($this->parentObjs);
		if ($parentObj) {
			$parentObj->addChild($newChild);
			$parentObj->save();
			$parentObj = $this->persistenceFacade->load($parentObj->getOID(), BUILDTYPE_SINGLE);
		
			array_push($this->parentObjs, $parentObj);
		
			$newChild->save();
			$newChild = $this->persistenceFacade->load($newChild->getOID(), BUILDTYPE_SINGLE);
		} else {
			$this->addErrorMsg('No Parent Default: '.$this->dom->getAttribute('id'));
			;
		}
		array_push($this->parentObjs, $newChild);
	}

	private function saveValues($newObj) {
		$newObjDisplayValuesString = $newObj->getProperty('display_value');
		$newObjDisplayValues = explode('|', $newObjDisplayValuesString);
	
		$this->dom->moveToFirstAttribute();
		while ($this->dom->moveToNextAttribute()) {
			$attrName = $this->dom->name;
		
			if ($attrName != 'id' && !in_array($attrName, $newObjDisplayValues)) {
				$value = trim($this->dom->value);
			
				if ($value != '') {
					$value = $this->resolveValue($newObj, $attrName, $value);
				
					$newObj->setValue($attrName, $value);
				}
			}
		}
	
		$this->dom->moveToElement();
	
		$newObj->save();
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
				if (!$fistDisplayType) {
					$firstDisplayType = $displayType;
				}
			
				$query = $this->persistenceFacade->createObjectQuery($displayType);
			
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
	
		$oid = $this->idMap[$xmlId];
		if ($oid) {
			$result = $this->persistenceFacade->load($oid, BUILDTYPE_SINGLE);
		}
	
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

}

?>
