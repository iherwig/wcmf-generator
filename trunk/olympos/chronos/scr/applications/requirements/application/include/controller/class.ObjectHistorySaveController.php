<?php

require_once (BASE."wcmf/application/controller/class.SaveController.php");

class ObjectHistorySaveController extends SaveController
{

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
		return true;
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

					$affectedObj  = $this->persistenceFacade->load($key);
		
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
									foreach($arrSecTabNames as $k=>$arrSecTabName){
										$this->ObjOldVal = $this->persistenceFacade->load($arrSecTabName.':'.$affectedObj->getValue($name));
										if($this->ObjOldVal){
											$tmp['oldValueDisp'] = $this->ObjOldVal->getValue('Name');
										}
										$this->ObjNewVal = $this->persistenceFacade->load($arrSecTabName.':'.$this->node->getValue($name));
										if($this->ObjNewVal){
											$tmp['newValueDisp'] = $this->ObjNewVal->getValue('Name');
										}
									}
									
									array_push($this->data, array ($name=>$tmp));
			
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
			parent::executeKernel();
		
			return false;
		}
	}

	private function getChangeList() {
		$this->requestdata = $this->_request->getData();
		$this->changelistarray = array ();
	}

	private function prepareWriteToTable() {
		$this->tablename = 'History';
		$this->persistenceFacade = & PersistenceFacade::getInstance();
		$this->objQuery = & $this->persistenceFacade->createObjectQuery($this->tablename);
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
		$this->changelist['duplicate'] = 'tbd';
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

}

?>
