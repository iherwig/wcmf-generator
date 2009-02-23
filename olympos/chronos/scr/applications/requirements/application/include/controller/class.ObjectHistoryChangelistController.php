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
			 $orderby = array('timestamp DESC');
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
			 $this->_response->setValue('changelist', $objlistuns );
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
				
					$datatabval = unserialize($v[1]['data']['value']);
					array_push($arrdatatabval,
					array (
					'id'=>$v[3]['id']['value'],
					'data'=>$datatabval[0],
					'duplicate'=>$v[1]['duplicate']['value'],
					'eventtype'=>$v[1]['eventtype']['value'],
					'affectedoid'=>$v[1]['affectedoid']['value'],
					'otherid'=>$v[1]['otherid']['value'],
					'timestamp'=>$v[1]['timestamp']['value'],
					'user'=>$v[1]['user']['value']
					)
					);
				}
			
			}
		}
	
		return $arrdatatabval;
	}

}

?>
