<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jan 05 15:38:17 CET 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/application/controller/class.SaveController.php");
// PROTECTED REGION ID(application/include/controller/class.ObjectHistorySaveController.php/Import) ENABLED START
require_once (BASE."wcmf/application/controller/class.SaveController.php");

// PROTECTED REGION END

/**
 * @class ObjectHistorySaveController
 * @ingroup Controller
 * @brief @class
 * @ingroup Controller
 * @brief saves history list entries bevore saving the changes itsself 
 * <b>Input actions:</b> - @em save 
 * <b>Output actions:</b> - @em classical save controller 
 * @param[in] $this-&gt;_request-&gt;getData(), key value, changed property and changed value
 * @param[out] changelist array of id,data,duplicate,eventtype,affectedoid,otheroid,timestamp,user to write to history list as new entry 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??save = ObjectHistorySaveController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class ObjectHistorySaveController extends SaveController
{
// PROTECTED REGION ID(application/include/controller/class.ObjectHistorySaveController.php/Body) ENABLED START
	var $requestdata;
	var $changelistarray;
	var $tablename;
	var $persistenceFacade;
	var $objQuery;
	var $node;
	var $changelist;
	var $data;

	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
	
		// execute this code only if the action is save
		if ($this->_request->getAction() == 'save') {
		
			//get ChangeList
			self::getChangeList();
		
			//prepare write to table
			self::prepareWriteToTable();

			foreach ($this->requestdata as $key=>$value) {
				if ( PersistenceFacade::isValidOID($key) && PersistenceFacade::isKnownType( PersistenceFacade::getOIDParameter($key, 'type'))) {
					$this->node = & $value;
				
					$this->data = array ();
					$prt = array();

					$affectedObj = $this->persistenceFacade->load($key);
          
          // make sure that the affected object still exists in the database
					if ($affectedObj != null) {
		
						foreach ($this->node->getDataTypes() as $dataType) {
							foreach ($this->node->getValueNames($dataType) as $name) {

								if ($name !== 'id') {

									$tmp = array ();
									$tmp['oldValue'] = $affectedObj->getValue($name);  //value of fieldname GoalType from Object
									$tmp['newValue'] = $this->node->getValue($name);  // value changed of fieldname GoalType from Request
									//$name //Fieldname like GoalType

									//mapping from Fieldname like 'GoalType' to secondTableName like 'ChiGoalType' in this direction
									$secTabNamesRDB = $affectedObj->getValueProperties($name);
									$secTabNamesIT = $secTabNamesRDB['input_type'];
									if ((strpos($secTabNamesIT, 'select') !== false) and ((strpos($secTabNamesIT, 'async') !== false) or (strpos($secTabNamesIT, 'asyncmult') !== false))) {
										list (, $secTabNames) = explode(':', $secTabNamesIT);
										$arrSecTabNames = explode('|', $secTabNames);
									}
									foreach($arrSecTabNames as $k=>$arrSecTabName) {
										if (is_int($this->node->getValue($name))) {
											$this->ObjOldVal = $this->persistenceFacade->load($arrSecTabName.':'.$affectedObj->getValue($name));
											if($this->ObjOldVal){
												$tmp['oldValueDisp'] = $this->ObjOldVal->getValue('Name');
											}
											$this->ObjNewVal = $this->persistenceFacade->load($arrSecTabName.':'.$this->node->getValue($name));
											if($this->ObjNewVal){
												$tmp['newValueDisp'] = $this->ObjNewVal->getValue('Name');
											}
										}
									}
									
									array_push($this->data, array ($name=>$tmp));
								}
							}
						}
					}
          
					self::setChangeList($key); // set changeList
					self::writeToTable(); //write to table

					array_push($this->changelistarray, $this->changelist);
				}
			}
		
			
			//	Response
			//$this->_response->setValue('affectedObj old', $affectedObj);
			//$this->_response->setValue('this->node new', $this->node);
			$this->_response->setValue('changelist', $this->changelist);
		
			//call SaveController
			return parent::executeKernel();
		}
	}

	private function getChangeList() {
		$this->requestdata = $this->_request->getData();
		$this->changelistarray = array ();
	}

	private function prepareWriteToTable() {
		$this->tablename = 'History';
		$this->persistenceFacade = & PersistenceFacade::getInstance();
		$this->objQuery = & PersistenceFacade::createObjectQuery($this->tablename);
	}

	private function writeToTable() {
	
		$objTpl = & $this->objQuery->getObjectTemplate($this->tablename); //new row
		$objTpl->setValue('id', $this->changelist['id'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('data', $this->changelist['data'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('duplicate', $this->changelist['duplicate'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('eventtype', $this->changelist['eventtype'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('affectedoid', $this->changelist['affectedoid'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('timestamp', $this->changelist['timestamp'], DATATYPE_ATTRIBUTE);
		$objTpl->setValue('user', $this->changelist['user'], DATATYPE_ATTRIBUTE);
		$this->persistenceFacade->save($objTpl);
	
	}

	private function setChangeList($oid) {
	
		$this->changelist = array ();
		$this->changelist['id'] = null;
		$this->changelist['data'] = serialize($this->data);
		$this->changelist['duplicate'] = false;
		$this->changelist['eventtype'] = 'changeProperty';
		$this->changelist['affectedoid'] = $oid;
		$this->changelist['otheroid'] = 'tbd';
		$this->changelist['timestamp'] = self::getTimeStamp();
		$this->changelist['user'] = self::getCurrentUser();
	
	}

	private function getCurrentUser() {
	
		$rightsManager = RightsManager::getInstance();
		$authUser = & $rightsManager->getAuthUser();
		$currUser = $authUser->getLogin();
	
		return $currUser;
	}

	private function getTimeStamp() {
	
		$now = microtime();
		return substr($now, -10).substr($now, 2, 6);
		
	}

// PROTECTED REGION END

}
?>
