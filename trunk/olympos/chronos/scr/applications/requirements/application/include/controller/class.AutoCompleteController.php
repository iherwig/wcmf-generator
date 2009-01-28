<?php
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/security/class.RightsManager.php");

class AutoCompleteController extends Controller
{
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
	
		// execute this code only if the action is autocomplete
		if ($this->_request->getAction() == 'autocomplete') {
		
			//	get Params;
			/*$searchstring = $this->_request->getValue('substr');*/
			$searchstring = $_REQUEST["query"];
			$searchlimitend = $_REQUEST["limit_end"];
			$searchlimitstart = $_REQUEST["limit_start"];
			/*$domObj =  $_REQUEST["domobj"];*/
			$domObj = array ('ChiBusinessUseCase', 'ChiWorkerExternal');
		
			//	create and execute query
			$persistenceFacade = & PersistenceFacade::getInstance(); // get the persistence information (database)
		
			$usecaseQuery = & PersistenceFacade::createObjectQuery($domObj[0]);
			$usecaseTpl = & $usecaseQuery->getObjectTemplate('ChiBusinessUseCase');
			$usecaseTpl->setValue("Name", $searchstring, DATATYPE_ATTRIBUTE);
			$pagingInfo = new PagingInfo($searchlimitend);
			$pagingInfo->setIndex($searchlimitstart);
			$usecaselist = $usecaseQuery->execute(BUILDDEPTH_SINGLE, null, $pagingInfo);
		
			$workerQuery = & PersistenceFacade::createObjectQuery($domObj[1]);
			$workerTpl = & $workerQuery->getObjectTemplate($domObj[1]);
			$workerTpl->setValue("Name", $searchstring, DATATYPE_ATTRIBUTE);
			$pagingInfo = new PagingInfo($searchlimitend);
			$pagingInfo->setIndex($searchlimitstart);
			$workerlist = $workerQuery->execute(BUILDDEPTH_SINGLE, null, $pagingInfo);
		
			//	Create and Fill Datastore
			$datastore = array ();
			foreach ($usecaselist as $key=>$val)
			/*array_push($datastore, array ('key'=>$key, 'val'=>$val->getName()));*/
			array_push($datastore, array ('type'=>$val->getType(), 'val'=>$val->getName()));
			foreach ($workerlist as $key=>$val)
			array_push($datastore, array ('type'=>$val->getType(), 'val'=>$val->getName()));
		
			//	Set the next action
			$this->_response->setAction('ok');
			//	Response
			$this->_response->setValue('totalCount', count($datastore));
			$this->_response->setValue('fields', array ( array ('name'=>'type', 'mapping'=>'type'), array ('name'=>'val', 'mapping'=>'val')));
			$this->_response->setValue('data', $datastore);
		
		}
		;
	
		//	Success
		return false;
	}

}

?>
