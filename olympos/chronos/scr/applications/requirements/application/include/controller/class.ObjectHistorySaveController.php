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
				if (PersistenceFacade::isValidOID($key) && PersistenceFacade::isKnownType(PersistenceFacade::getOIDParameter($key, 'type'))) {
					$this->node = & $value;
				
					$this->data = array ();
					foreach ($this->node->getDataTypes() as $dataType) {
						foreach ($this->node->getValueNames($dataType) as $name) {
							if ($name !== 'id') {
								$tmp = array ();
								$tmp['oldValue'] = '';
								$tmp['newValue'] = $this->node->getValue($name, $dataType);
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
		//'id'; //id generated index
		//'affectedoid'; //oid of changed object
		//'eventtype'; //change type //enum('create','delete','changeProperty','associate','disassociate')
		//'data':{//serialized//
		//		'&fieldname'//title column//:{
		//				'oldvalue':&fieldoldvalue	//value column
		//				'newvalue':&fieldnewvalue	//value column
		//				}1x
		//		}nx
		//'user'; //modified by
		//'timestamp'; //modified when
		//'otheroid'; //
		//'duplicate'; //
		$this->changelist['id'] = null;
		$this->changelist['data'] = serialize($this->data);
		$this->changelist['duplicate'] = 'tbd';
		$this->changelist['eventtype'] = 'tbd';
		$this->changelist['affectedoid'] = $oid;
		$this->changelist['otheroid'] = 'tbd';
		$this->changelist['timestamp'] = self::getTimeStamp();
		$this->changelist['user'] = self::getCurrentUser();
	
	}
	
	private function getCurrentUser(){
		
		$rightsManager = RightsManager::getInstance();
      	$authUser = &$rightsManager->getAuthUser();
		$currUser = $authUser->getLogin();

		return $currUser;
	}
	
	private function getTimeStamp(){
		
		//$now   = mktime(date("H"), date("i"), date("s"), date("m")  , date("d"), date("Y"));
		$now   = microtime( true );
		return $now;
	}

}

?>
