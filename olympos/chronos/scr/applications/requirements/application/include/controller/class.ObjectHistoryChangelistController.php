<?php

require_once(BASE."wcmf/lib/presentation/class.Controller.php");
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
		$tablename = 'History' ;
		$objlist = array();
		$searchlimit = 30 ; 
		$orderby = 'timestamp';
		
		$persistenceFacade = & PersistenceFacade::getInstance(); 
		$objQuery = &$persistenceFacade->createObjectQuery($tablename);
		$pagingInfo = new PagingInfo($searchlimit);
		$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby, $pagingInfo);

		//	Set the next action
		$this->_response->setAction('ok');

		//	Response
		$this->_response->setValue('changelist', $objlist );
		return false;
		
		}
	}
}
?>