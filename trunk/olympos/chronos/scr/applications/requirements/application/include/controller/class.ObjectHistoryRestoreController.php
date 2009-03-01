<?php

require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");

class ObjectHistoryRestoreController extends Controller
{

	var $ids;
	var $arrids;

	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
		switch($this->_request->getAction()) {
			case 'restorehistliststate':
			
				// init values
				$this->ids = $this->_request->getValue('ids');
				$id = $this->ids;
				$histtable = 'History';
				$persistenceFacade = & PersistenceFacade::getInstance();
				$currentUser = self::getCurrentUser();
				$currentTimestamp = self::getTimeStamp();
			
				// get history entry from History Table
				$objQueryHistEntry = & $persistenceFacade->createObjectQuery($histtable);
				$objTplHistEntry = & $objQueryHistEntry->getObjectTemplate($histtable);
				$objTplHistEntry->setValue("id", $id, DATATYPE_IGNORE);
				$objlistHistEntry = $objQueryHistEntry->execute(BUILDDEPTH_SINGLE, null);
				$objlistHistEntryUnserialized = self::getDataValue($objlistHistEntry);
				$timestamp = $objlistHistEntryUnserialized[0]['timestamp'];
				$affectedoid = $objlistHistEntryUnserialized[0]['affectedoid'];
				$otype = strstr($affectedoid, ':', true);
				$oid = strstr($affectedoid, ':', false);
				list ($otype, $oid) = explode(':', $affectedoid);
				
				// get history entries with affectedoid and since timstamp from History Table
				$objQueryHistList = & $persistenceFacade->createObjectQuery($histtable);
				$objTplHistList = & $objQueryHistList->getObjectTemplate($histtable);
				$objTplHistList->setValue("affectedoid", $affectedoid, DATATYPE_ATTRIBUTE);
				$objTplHistList->setValue("timestamp", '> '.$timestamp, DATATYPE_ATTRIBUTE);
				$objlistHistList = $objQueryHistList->execute(BUILDDEPTH_SINGLE, array ('timestamp DESC'));
				array_push($objlistHistList, $objlistHistEntry[0]);
				//print_r($objlistHistList);
				
				//current values of object to oldValueArray
				$ObjCurVal = $persistenceFacade->load($affectedoid);
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
				$objlistHistListUnserialized = self::getDataValue($objlistHistList);//unserialize data
				foreach ($objlistHistListUnserialized as $keyHistList=>$valHistList) {//histlistzeilen
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
				$persistenceFacade->save($ObjCurVal);
				
				//current values of object to newValueArray
				//$ObjCurVal = $persistenceFacade->load($affectedoid);
				$newValueArray = array ();
				foreach ($ObjCurVal as $keyCurValNew=>$valCurValNew) {
					if($keyCurValNew == '_data' ){
						foreach($valCurValNew as $keyVCVNew=>$valVCVNew){
							foreach($valVCVNew as $keyVVCVNew=>$valVVCVNew){
								array_push($newValueArray, array ($keyVVCVNew=>$valVVCVNew[value]));
							}
						}
					}
				}
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

							$objQueryHistWrite = & $persistenceFacade->createObjectQuery($histtable);
							$objTplHistWrite = & $objQueryHistWrite->getObjectTemplate($histtable); //new row
							
							$objTplHistWrite->setValue('id', null, DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('data', $dataHistEntrySer , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('duplicate', 'tbd' , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('eventtype', 'changeProperty', DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('affectedoid', $affectedoid, DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('otheroid', 'tbd' , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('timestamp', $currentTimestamp , DATATYPE_ATTRIBUTE);
							$objTplHistWrite->setValue('user', $currentUser , DATATYPE_ATTRIBUTE);
							$persistenceFacade->save($objTplHistWrite);
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
	//$this->_response->setValue('', '' );
	return false;

	return false;
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
