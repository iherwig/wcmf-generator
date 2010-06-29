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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:44:01 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.AutoCompleteController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/security/class.RightsManager.php");
// PROTECTED REGION END

/**
 * @class AutoCompleteController
 * @ingroup Controller
 * @brief Used for autocompletion
 * 
 * <b>Input actions:</b> 
 * - @em autocomplete List found Objects with searchstring inherited in name, limit to limit_end entries 
 * 
 * <b>Output actions:</b> 
 * - @em ok in any case 
 * 
 * @param[in] query searchstring typed in to find Objects inheriting searchstring as substring in name
 * @param[in] limit_end limit for paging info (wcmf)
 * @param[in] limit_start index for paging info (wcmf)
 * @param[out] totalcount counts elements of returned datastore
 * @param[out] data returned datastore
 * @param[out] fields defines format of returned datastore 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??autocomplete = AutoCompleteController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class AutoCompleteController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.AutoCompleteController.php/Body) ENABLED START
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
				$objQuery = &PersistenceFacade::createObjectQuery($val);
				$objTpl = & $objQuery->getObjectTemplate($val);
				$objTpl->setValue("Name", "LIKE '%".$searchstring."%'", DATATYPE_ATTRIBUTE);
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

// PROTECTED REGION END

}
?>
