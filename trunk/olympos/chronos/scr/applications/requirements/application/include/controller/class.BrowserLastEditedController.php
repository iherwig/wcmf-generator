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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Nov 30 13:42:18 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.BrowserLastEditedController.php/Import) ENABLED START

require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
require_once (BASE."wcmf/lib/model/class.Node.php");
require_once (BASE."wcmf/lib/security/class.RightsManager.php");

// PROTECTED REGION END

/**
 * @class BrowserLastEditedController
 * @ingroup Controller
 * @brief @class BrowserLastEditedController
 * @ingroup Controller
 * @brief Returns the most recently edited objects. 
 * <b>Input actions:</b> - @em lastEdited Returns most recently edited objects. 
 * <b>Output actions:</b> - @em failure If a fatal error occurs - @em ok In any other case 
 * @param[out] list The most recently edited objects, most recent first.
 * @param[out] count Number of returned objects. 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??lastEdited = BrowserLastEditedController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class BrowserLastEditedController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.BrowserLastEditedController.php/Body) ENABLED START
	const LIMIT = 10;
	const TABLENAME = 'History';
	private static $INVALID_TYPES = array('Figure', 'Diagram');

	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		//get history table as objectlist
		$objlist = array ();
		$orderby = array ('timestamp DESC');
	
		// history table
		$persistenceFacade = PersistenceFacade::getInstance();
		$objQuery = $persistenceFacade->createObjectQuery(self::TABLENAME);
		// searchlimit if needed
		//	$pagingInfo = new PagingInfo($limit);
		//	$pagingInfo->setIndex($strt);
		//	$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby, $pagingInfo);
		// search
		$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby);
	
		//start/limit (index of paging info not working properly)
		
		$resultList = array ();
		$resultOids = array ();
	
		foreach ($objlist as $objKey=>$currObj) {
			$currOid = $currObj->getAffectedOid();
			if ($this->isValidType($currOid) && array_search($currOid, $resultOids) === false) {
				$node = $persistenceFacade->load($currOid);
				if ($node) {
					$resultList[] = $node;
					$resultOids[] = $currOid;
				}
			}
		
			if (count($resultOids) >= self::LIMIT) {
				break;
			}
		}
	
		// write new array with unserialized data tab
		//$pageobjlistuns = self::getDataValue($pageobjlist);
		
		//	Set the next action
		$this->_response->setAction('ok');
	
		//	Response
		$this->_response->setValue('list', $resultList);
		$this->_response->setValue('count', count($resultList));
	
		return false;
	}

	private function isValidType($oid) {
		list($type, $id) = explode(':', $oid);
		return array_search($type, self::$INVALID_TYPES) === false;
	}
// PROTECTED REGION END

}
?>
