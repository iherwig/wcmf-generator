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
			$domObj = array ('ChiBusinessUseCase','ChiBusinessUseCaseCore','ChiWorkerExternal');
			$datastore = array ();
		
			//	create and execute query
			$persistenceFacade = & PersistenceFacade::getInstance(); // get the persistence information (database)
			
			$objlist = array();
			foreach ($domObj as $key=>$val){
				$objQuery = &$persistenceFacade->createObjectQuery($val);
				$objTpl = & $objQuery->getObjectTemplate($val);
				$objTpl->setValue("Name", $searchstring, DATATYPE_ATTRIBUTE);
				$pagingInfo = new PagingInfo($searchlimitend);
				$pagingInfo->setIndex($searchlimitstart);
				$objlistpart = $objQuery->execute(BUILDDEPTH_SINGLE, null, $pagingInfo);

				//	Fill Datastore
				foreach ($objlistpart as $key=>$val)
				array_push($datastore, array ('type'=>$val->getType(), 'val'=>$val->getName()));
			}
		
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
