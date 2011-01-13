<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:16 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.DisplayRelatedController.php/Import) ENABLED START

require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/model/class.NodeUtil.php");
// PROTECTED REGION END

/**
 * @class DisplayRelatedController
 * @ingroup Controller
 * @brief Returns all data of an object with given OID and all parents and children. 
 * @note Currently not working, requires further investigation. 
 * 
 * <b>Input actions:</b> 
 * - @em displayRelated Returns all data of an object and its parents and childs. 
 * 
 * <b>Output actions:</b> 
 * - @em failure If a fatal error occurs 
 * - @em ok In any other case 
 * 
 * @param[in] oid The OID of the object to display.
 * @param[out] node All data of the selected object.
 * @param[out] related All data of all direct parents and all direct childs of the selected object. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??displayRelated = DisplayRelatedController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class DisplayRelatedController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.DisplayRelatedController.php/Body) ENABLED START
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

// PROTECTED REGION END

}
?>
