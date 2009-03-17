<?php

require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");

class ObjectHistoryChangelistController extends Controller
{

	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
		// execute this code only if the action is histlist
		if ($this->_request->getAction() == 'histlist') {
		
			//get history table as objectlist
			$affectedoid = $this->_request->getValue('oid'); // 'ChiGoal:18635'
			$strt = $this->_request->getValue('start');
			$limit = $this->_request->getValue('limit');
			$tablename = 'History';
			$objlist = array ();
			$orderby = array ('timestamp DESC');
			
			// history table
			$persistenceFacade = & PersistenceFacade::getInstance();
			$objQuery = & $persistenceFacade->createObjectQuery($tablename);
			// only for object oid
			$objTpl = & $objQuery->getObjectTemplate($tablename);
			$objTpl->setValue("affectedoid", $affectedoid, DATATYPE_ATTRIBUTE);
			// searchlimit if needed
			//	$pagingInfo = new PagingInfo($limit);
			//	$pagingInfo->setIndex($strt);
			//	$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby, $pagingInfo);
			// search
			$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby );
			
			//start/limit (index of paging info not working properly)
			$pageobjlist = array();
			$ct = 1;
			foreach ($objlist as $k=>$v){
				if ( ($ct >= $strt) and ($ct < ($strt + $limit)) ){
					array_push($pageobjlist, $v);
				}
				$ct = $ct+1;
			}

			// write new array with unserialized data tab
			$pageobjlistuns = self::getDataValue($pageobjlist);
			
			//	Set the next action
			$this->_response->setAction('ok');
			
			//	Response
			$this->_response->setValue('changelist', $pageobjlistuns );
			return false;
		
		}
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
					'timestamp'=>self::makeReadableTimestamp($v[1]['timestamp']['value']),
					'user'=>$v[1]['user']['value'],
					'timestamporig'=>$v[1]['timestamp']['value']
					
					));
				
				}
			
			}
		}
		return $arrdatatabval;
	}

	private function makeReadableTimestamp($unreadableTimestamp) {
	
		$lastpart = substr($unreadableTimestamp, 0, 10);
		$firstpart = substr($unreadableTimestamp, -6);
		$prepart = '0.';
		$betwpart = '00 ';
		$unixTimestamp = $prepart.$firstpart.$betwpart.$lastpart;
		$readableTimestamp = date("Y-m-d H:i:s", $lastpart);
	
		return $readableTimestamp;
	}

}

?>
