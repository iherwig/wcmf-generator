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
			$affectedoid = $this->_request->getValue('oid'); // 'ChiBusinessUseCase:15475'
			$tablename = 'History';
			$objlist = array ();
			$orderby = array ('timestamp DESC');
			$searchlimit = 5000;
		
			// history table
			$persistenceFacade = & PersistenceFacade::getInstance();
			$objQuery = & $persistenceFacade->createObjectQuery($tablename);
			// only for object oid
			$objTpl = & $objQuery->getObjectTemplate($tablename);
			$objTpl->setValue("affectedoid", $affectedoid, DATATYPE_ATTRIBUTE);
			// searchlimit if needed
			$pagingInfo = new PagingInfo($searchlimit);
			//$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby, $pagingInfo);
			// search
			$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby);
		
			// write new array with unserialized data tab
			$objlistuns = self::getDataValue($objlist);
		
			//	Set the next action
			$this->_response->setAction('ok');
		
			//	Response
			$this->_response->setValue('changelist', $objlistuns);
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
				
					$tmp[id] = $v[3]['id']['value'];
				
					$datatabval = unserialize($v[1]['data']['value']);
					foreach ($datatabval as $z=>$zz) {
						$tmp[data][$z] = $zz;
					}
					$tmp[duplicate] = $v[1]['duplicate']['value'];
					$tmp[eventtype] = $v[1]['eventtype']['value'];
					$tmp[affectedoid] = $v[1]['affectedoid']['value'];
					$tmp[otherid] = $v[1]['otherid']['value'];
					$tmp[timestamp] = self::makeReadableTimestamp($v[1]['timestamp']['value']);
					$tmp[user] = $v[1]['user']['value'];
					$tmp[timestamporig] = $v[1]['timestamp']['value'];
				
					array_push($arrdatatabval, $tmp);
				
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
