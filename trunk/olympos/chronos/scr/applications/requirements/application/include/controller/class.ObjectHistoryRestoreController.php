<?php

require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");

class ObjectHistoryRestoreController extends Controller
{
	var $ids;
	var $arrids;
	var $id;
	var $histtable;
	var $persistenceFacade;
	var $currentUser;
	var $currentTimestamp;
	var $objQueryHistEntry;
	var $objTplHistEntry;
	var $objlistHistEntryUnserialized;
	var $timestamp;
	var $affectedoid;
	var $otype;
	var $oid;
	var $objQueryHistList;
	var $objTplHistList;
	var $objlistHistList;
	var $ObjCurVal;
	var $oldValueArray;
	var $newValueArray;
	var $retval;

	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
		switch($this->_request->getAction()) {
			case 'restorehistliststate':
			
				// init values
				self::initValues();
			
				// get history entry from History Table
				self::getHistoryFromTable($this->id);
			
				// get history entries with affectedoid and since timstamp from History Table
				self::getObjHistListSince();
			
				//current values of object to oldValueArray
				$this->ObjCurVal = $this->persistenceFacade->load($this->affectedoid);
				$this->oldValueArray = self::curValOfObjToValArray();
			
				//overwrite values of $this->ObjCurVal to all in histlist, newest change first, last than is the right save on end
				// get from objectDatabase and write $this->ObjCurVal->setValue() there
				self::restoreObjCurVal();
			
				//current values of object to newValueArray
				$this->newValueArray = self::curValOfObjToValArray();
			
				//if values differ between $this->oldValueArray and $this->newValueArray write to HistoryTable and save
				self::writeHistTableDiffOldNewArray();
			
				
				break;
			case 'restorehistlistfields':
			
				// init values
				self::initValuesListfields();
			
				foreach ($this->arrids as $key=>$elemid) {
				
					echo '<br/><br/>elemid: ';
					print_r($elemid);
				
					// get history entry from History Table
					self::getHistoryFromTable($elemid);
					// echo 'this->objlistHistEntryUnserialized: '; print_r($this->objlistHistEntryUnserialized);
					
					// current values of object to oldValueArray
					$this->ObjCurVal = $this->persistenceFacade->load($this->affectedoid);
					$this->oldValueArray = self::curValOfObjToValArray();
					
					// overwrite values of $this->ObjCurVal
					self::restoreObjCurValListfields();
				
					// current values of object to newValueArray
					$this->newValueArray = self::curValOfObjToValArray();
				
					// if values differ between $this->oldValueArray and $this->newValueArray write to HistoryTable and save
					self::writeHistTableDiffOldNewArray();
				
				}
			
			break;
	}

	//	Set the next action
	$this->_response->setAction('ok');
	//	Response
	$this->_response->setValue('NewName', $this->retval);
	return false;

}

private function writeHistTableDiffOldNewArray() {

	//if values differ between $this->oldValueArray and $this->newValueArray write to HistoryTable and save
	foreach ($this->oldValueArray as $keyOldValue=>$valOldValue) {
		foreach ($this->newValueArray as $keyNewValue=>$valNewValue) {
			if ($keyOldValue == $keyNewValue and $valOldValue !== $valNewValue) {
			
				foreach ($valOldValue as $kov=>$vol) {
					foreach ($valNewValue as $knv=>$vnv) {
					
						$dataHistEntry = array ();
						$tmp = array ();
						$tmp['oldValue'] = $vol;
						$tmp['newValue'] = $vnv;
						array_push($dataHistEntry, array ($knv=>$tmp));
					
					}
				}
			
				$dataHistEntrySer = serialize($dataHistEntry);
				//echo '<br>dataHistEntrySer: ' ; print_r(serialize($dataHistEntry));
				
				$objQueryHistWrite = & $this->persistenceFacade->createObjectQuery($this->histtable);
				$objTplHistWrite = & $objQueryHistWrite->getObjectTemplate($this->histtable); //new row
			
				$objTplHistWrite->setValue('id', null, DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('data', $dataHistEntrySer, DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('duplicate', 'tbd', DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('eventtype', 'changeProperty', DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('affectedoid', $this->affectedoid, DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('otheroid', 'tbd', DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('timestamp', $this->currentTimestamp, DATATYPE_ATTRIBUTE);
				$objTplHistWrite->setValue('user', $this->currentUser, DATATYPE_ATTRIBUTE);
				$this->persistenceFacade->save($objTplHistWrite);
			}
		}
	}
}

private function restoreObjCurValListfields() {
	// overwrite values of $this->ObjCurVal to the one in histlist
	// get from objectDatabase and write $this->ObjCurVal->setValue() there
	foreach ($this->objlistHistEntryUnserialized as $histcolname=>$histcolvalue) {//histlistrowfields
		if ($histcolname == 'data') {
			foreach ($histcolvalue as $aendkey=>$aendval) {
				foreach ($aendval as $fieldname=>$fieldvalues) {
					foreach ($fieldvalues as $fieldname0=>$fieldvalues0) {
						$fieldvalue = $fieldvalues0[oldValue];
						foreach ($this->ObjCurVal as $curDataKey=>$curDataVal) {
							if ($curDataKey == '_data') {
								foreach ($curDataVal as $curDVVkey=>$curDVVval) {
									foreach ($curDVVval as $colname=>$curDVVVval) {
										$colvalue = $curDVVVval[value];
										if ($fieldname0 == $colname and ($colname !== 0)) {
										
											echo '<br/>'.'colname ';
											print_r($colname);
											echo '<br/>'.'fieldvalue ';
											print_r($fieldvalue);
											$this->ObjCurVal->setValue($colname, $fieldvalue);
										}
									}
								}
							}
						}
					}
				
				}
			}
		}
	}
	$this->persistenceFacade->save($this->ObjCurVal);
}

private function restoreObjCurVal() {

	//overwrite values of $this->ObjCurVal to all in histlist, newest change first, last than is the right save on end
	// get from objectDatabase and write $this->ObjCurVal->setValue() there
	$this->objlistHistListUnserialized = self::getDataValue($this->objlistHistList);//unserialize data
	foreach ($this->objlistHistListUnserialized as $keyHistList=>$valHistList) {//histlistzeilen
		foreach ($valHistList as $histcolname=>$histcolvalue) {//histlistzeilenfelder
			if ($histcolname == 'data') {
				foreach ($histcolvalue as $aendkey=>$aendval) {
					foreach ($aendval as $fieldname=>$fieldvalues) {
						$fieldvalue = $fieldvalues[oldValue];
						foreach ($this->ObjCurVal as $curDataKey=>$curDataVal) {
							if ($curDataKey == '_data') {
								foreach ($curDataVal as $curDVVkey=>$curDVVval) {
									foreach ($curDVVval as $colname=>$curDVVVval) {
										$colvalue = $curDVVVval[value];
										if ($fieldname == $colname and ($colname !== 0)) {
											$this->ObjCurVal->setValue($colname, $fieldvalue);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	$this->persistenceFacade->save($this->ObjCurVal);

}

private function curValOfObjToValArray() {

	//current values of object to ValueArray
	$ValueArray = array ();
	foreach ($this->ObjCurVal as $keyCurVal=>$valCurVal) {
		if ($keyCurVal == '_data') {
			foreach ($valCurVal as $keyVCV=>$valVCV) {
				foreach ($valVCV as $keyVVCV=>$valVVCV) {
					array_push($ValueArray, array ($keyVVCV=>$valVVCV[value]));
					if ($keyVVCV == 'Name') {
						$this->retval = $valVVCV[value];
					}
				}
			}
		}
	}
	//echo $retval ;
	//echo '<BR/><BR/>ValueArray<BR/>'; print_r($ValueArray); echo '<BR/><BR/>ende ValueArray<BR/>';
	return $ValueArray;

}

private function getObjHistListSince() {

	// get history entries with affectedoid and since timstamp from History Table
	$this->objQueryHistList = & $this->persistenceFacade->createObjectQuery($this->histtable);
	$this->objTplHistList = & $this->objQueryHistList->getObjectTemplate($this->histtable);
	$this->objTplHistList->setValue("affectedoid", $this->affectedoid, DATATYPE_ATTRIBUTE);
	$this->objTplHistList->setValue("timestamp", '> '.$this->timestamp, DATATYPE_ATTRIBUTE);
	$this->objlistHistList = $this->objQueryHistList->execute(BUILDDEPTH_SINGLE, array ('timestamp DESC'));
	array_push($this->objlistHistList, $this->objlistHistEntry[0]);
	//print_r($this->objlistHistList);
	
}

private function getHistoryFromTable($tmpid) {

	// get history entry from History Table
	$this->objQueryHistEntry = & $this->persistenceFacade->createObjectQuery($this->histtable);
	$this->objTplHistEntry = & $this->objQueryHistEntry->getObjectTemplate($this->histtable);
	$this->objTplHistEntry->setValue("id", $tmpid, DATATYPE_IGNORE);
	$this->objlistHistEntry = $this->objQueryHistEntry->execute(BUILDDEPTH_SINGLE, null);
	$this->objlistHistEntryUnserialized = self::getDataValue($this->objlistHistEntry);
	$this->timestamp = $this->objlistHistEntryUnserialized[0]['timestamp'];
	$this->affectedoid = $this->objlistHistEntryUnserialized[0]['affectedoid'];
	$this->otype = strstr($this->affectedoid, ':', true);
	$this->oid = strstr($this->affectedoid, ':', false);
	list ($this->otype, $this->oid) = explode(':', $this->affectedoid);
	//echo '<br/>this->affectedoid: '; print_r($this->affectedoid);
	
}

private function initValuesListfields() {
	// init values
	$this->ids = $this->_request->getValue('ids');
	$this->arrids = array ();
	$this->arrids = spliti(',', $this->ids);
	$this->histtable = 'History';
	$this->persistenceFacade = & PersistenceFacade::getInstance();
	$this->currentUser = self::getCurrentUser();
	$this->currentTimestamp = self::getTimeStamp();
}

private function initValues() {

	// init values
	$this->ids = $this->_request->getValue('ids');
	$this->id = $this->ids;
	$this->histtable = 'History';
	$this->persistenceFacade = & PersistenceFacade::getInstance();
	$this->currentUser = self::getCurrentUser();
	$this->currentTimestamp = self::getTimeStamp();

}

private function getDataValue($objlist) {

	$datatab = $objlist;
	$arrdatatabval = array ();
	foreach ($objlist as $key=>$val) {
		$datatab = & $val;
		foreach ($datatab as $k=>$v) {
		
			if ($k == '_data') {
			
				array_push($arrdatatabval, array (
				'id'=>$v[3]['id']['value'],
				'data'=>unserialize($v[1]['data']['value']),
				'duplicate'=>$v[1]['duplicate']['value'],
				'eventtype'=>$v[1]['eventtype']['value'],
				'affectedoid'=>$v[1]['affectedoid']['value'],
				'otherid'=>$v[1]['otherid']['value'],
				'timestamp'=>$v[1]['timestamp']['value'],
				'user'=>$v[1]['user']['value']
				));
			
			}
		
		}
	}

	return $arrdatatabval;
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
