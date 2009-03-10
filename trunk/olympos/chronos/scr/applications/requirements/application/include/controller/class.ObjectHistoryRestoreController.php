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
	var	$currentTimestamp;
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
				self::getHistoryFromTable();
				
				// get history entries with affectedoid and since timstamp from History Table
				self::getObjHistListSince();
				
				//current values of object to oldValueArray
				$ObjCurVal = $this->persistenceFacade->load($this->affectedoid);
				$oldValueArray = array ();
				foreach ($ObjCurVal as $keyCurValOld=>$valCurValOld) {
					if($keyCurValOld == '_data' ){
						foreach($valCurValOld as $keyVCVOld=>$valVCVOld){
							foreach($valVCVOld as $keyVVCVOld=>$valVVCVOld){
								array_push($oldValueArray, array($keyVVCVOld=>$valVVCVOld[value]));
							}
						}
					}
				}
				//echo '<BR/><BR/>oldValueArray<BR/>'; print_r($oldValueArray);
				
				//overwrite values of $ObjCurVal to all in histlist, newest change first, last than is the right save on end
				// get from objectDatabase and write $ObjCurVal->setValue() there 
				$this->objlistHistListUnserialized = self::getDataValue($this->objlistHistList);//unserialize data
				foreach ($this->objlistHistListUnserialized as $keyHistList=>$valHistList) {//histlistzeilen
					foreach ($valHistList as $histcolname=>$histcolvalue) {//histlistzeilenfelder
						if ($histcolname == 'data') {
							foreach ($histcolvalue as $aendkey=>$aendval) {
								foreach ($aendval as $fieldname=>$fieldvalues) {
									$fieldvalue = $fieldvalues[oldValue];
									foreach ($ObjCurVal as $curDataKey=>$curDataVal) {
										if($curDataKey == '_data' ){
											foreach($curDataVal as $curDVVkey=>$curDVVval){
												foreach($curDVVval as $colname=>$curDVVVval){
													$colvalue = $curDVVVval[value] ;
													if ($fieldname == $colname and ($colname !==0)) {
														$ObjCurVal->setValue($colname, $fieldvalue);
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
				$this->persistenceFacade->save($ObjCurVal);
				
				//current values of object to newValueArray
				//$ObjCurVal = $this->persistenceFacade->load($this->affectedoid);
				$newValueArray = array ();
				foreach ($ObjCurVal as $keyCurValNew=>$valCurValNew) {
					if($keyCurValNew == '_data' ){
						foreach($valCurValNew as $keyVCVNew=>$valVCVNew){
							foreach($valVCVNew as $keyVVCVNew=>$valVVCVNew){
								array_push($newValueArray, array ($keyVVCVNew=>$valVVCVNew[value]));
								if($keyVVCVNew =='Name'){$retval = $valVVCVNew[value];}
							}
						}
					}
				}
				//echo $retval ;
				//echo '<BR/><BR/>newValueArray<BR/>'; print_r($newValueArray);
				
				
				//if values differ between $oldValueArray and $newValueArray write to HistoryTable and save
				foreach ($oldValueArray as $keyOldValue=>$valOldValue) {
					foreach ($newValueArray as $keyNewValue=>$valNewValue) {
						if ($keyOldValue == $keyNewValue and $valOldValue !== $valNewValue) {
							
							foreach ($valOldValue as $kov=>$vol){
							foreach ($valNewValue as $knv=>$vnv){
							
							$dataHistEntry = array ();
							$tmp = array ();
							$tmp['oldValue'] = $vol;
							$tmp['newValue'] = $vnv;
							array_push($dataHistEntry , array ($knv=>$tmp));
							
							}
							}
							
							$dataHistEntrySer = serialize($dataHistEntry);
							//echo '<br>dataHistEntrySer: ' ; print_r(serialize($dataHistEntry));

							$objQueryHistWrite = & $this->persistenceFacade->createObjectQuery($this->histtable);
							$objTplHistWrite = & $objQueryHistWrite->getObjectTemplate($this->histtable); //new row
							
							$objTplHistWrite->setValue('id', null, DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('data', $dataHistEntrySer , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('duplicate', 'tbd' , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('eventtype', 'changeProperty', DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('affectedoid', $this->affectedoid, DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('otheroid', 'tbd' , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('timestamp', $this->currentTimestamp , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('user', $this->currentUser , DATATYPE_ATTRIBUTE);
							$this->persistenceFacade->save($objTplHistWrite);
						}
					}
				}
			
			
			
			
			
			break;
			case 'restorehistlistfields':
			
				$this->ids = $this->_request->getValue('ids');
				$this->arrids = array ();
				$this->arrids = spliti(',', $this->ids);
				print_r($this->arrids);
			
				break;
	}

	
	//	Set the next action
	$this->_response->setAction('ok');
	//	Response
	$this->_response->setValue('NewName', $retval );
	return false;

}

private function getObjHistListSince(){
	
	// get history entries with affectedoid and since timstamp from History Table
	$this->objQueryHistList = & $this->persistenceFacade->createObjectQuery($this->histtable);
	$this->objTplHistList = & $this->objQueryHistList->getObjectTemplate($this->histtable);
	$this->objTplHistList->setValue("affectedoid", $this->affectedoid, DATATYPE_ATTRIBUTE);
	$this->objTplHistList->setValue("timestamp", '> '.$this->timestamp, DATATYPE_ATTRIBUTE);
	$this->objlistHistList = $this->objQueryHistList->execute(BUILDDEPTH_SINGLE, array ('timestamp DESC'));
	array_push($this->objlistHistList, $this->objlistHistEntry[0]);
	//print_r($this->objlistHistList);
					
}

private function getHistoryFromTable(){
	
	// get history entry from History Table
	$this->objQueryHistEntry = & $this->persistenceFacade->createObjectQuery($this->histtable);
	$this->objTplHistEntry = & $this->objQueryHistEntry->getObjectTemplate($this->histtable);
	$this->objTplHistEntry->setValue("id", $this->id, DATATYPE_IGNORE);
	$this->objlistHistEntry = $this->objQueryHistEntry->execute(BUILDDEPTH_SINGLE, null);
	$this->objlistHistEntryUnserialized = self::getDataValue($this->objlistHistEntry);
	$this->timestamp = $this->objlistHistEntryUnserialized[0]['timestamp'];
	$this->affectedoid = $this->objlistHistEntryUnserialized[0]['affectedoid'];
	$this->otype = strstr($this->affectedoid, ':', true);
	$this->oid = strstr($this->affectedoid, ':', false);
	list ($this->otype, $this->oid) = explode(':', $this->affectedoid);
	//echo '<br/>this->affectedoid: '; print_r($this->affectedoid);
	
}

private function initValues(){
	
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
