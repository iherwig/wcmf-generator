<?php
require_once (BASE."wcmf/lib/presentation/class.Controller.php");
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/model/class.NodeUtil.php");

class DisplayRelatedController extends Controller
{
	/**
	 * @see Controller::initialize()
	 */
	function initialize( & $request, & $response)
	{
		if (strlen($request->getContext()) == 0)
		{
			$request->setContext('cms');
			$response->setContext('cms');
		}
	
		parent::initialize($request, $response);
	}

	/**
	 * @see Controller::hasView()
	 */
	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		$persistenceFacade = & PersistenceFacade::getInstance();
		$rightsManager = & RightsManager::getInstance();
	
		$oid = $this->_request->getValue('oid');
		if (PersistenceFacade::isValidOID($this->_request->getValue('oid')) && $rightsManager->authorize($oid, '', ACTION_READ))
		{
			$node = & $persistenceFacade->load($oid, BUILDDEPTH_SINGLE);
		
			$node->loadChildren();
			$relatedList = $node->getChildren();
		
			$node->loadParents();
			$relatedList = array_merge($relatedList, $node->getParents());
		
			$this->_response->setValue('node', $node);
			$this->_response->setValue('related', $relatedList);
		
			return false;
		}
	
	}

}

?>
