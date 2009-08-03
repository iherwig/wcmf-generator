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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 13:49:08 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.GlossaryController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
// PROTECTED REGION END

/**
 * @class GlossaryController
 * @ingroup Controller
 * @brief @class GlossaryController
 * @ingroup Controller
 * @brief @class
 * @ingroup Controller
 * @brief returns list of requested Glossary entries (used for paging) and whole list count 
 * <b>Input actions:</b> - @em glossary returns list of requested Glossary entries from start to limit (used for paging) and whole list count 
 * <b>Output actions:</b> - @em ok in any case 
 * @param[in] start position of first partial list entry in whole list
 * @param[in] limit count of partial list entries
 * @param[out] glossary returns partial list from start to limit
 * @param[out] gescount counts entries from whole list ignoring start and limit  
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??glossary = GlossaryController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class GlossaryController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.GlossaryController.php/Body) ENABLED START
	function hasView()
	{
		return false;
	}

	function executeKernel()
	{
		// execute this code only if the action is glossary
		if ($this->_request->getAction() == 'glossary') {
		
			//get history table as objectlist
			$strt = $this->_request->getValue('start');
			$limit = $this->_request->getValue('limit');
			
			$tablename = 'Glossary';
			$objlist = array ();
			$orderby = array ('name');
			
			// Glossar table
			$persistenceFacade = & PersistenceFacade::getInstance();
			$objQuery = & $persistenceFacade->createObjectQuery($tablename);
			$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby );
			
			//start/limit (index of paging info not working properly)
			if($strt and $limit){
				$pageobjlist = array();
				$ct = 1;
				foreach ($objlist as $k=>$v){
					if ( ($ct >= $strt) and ($ct < ($strt + $limit)) ){
						array_push($pageobjlist, $v);
					}
					$ct = $ct+1;
				}
			}else{
				$pageobjlist = $objlist ;
				$ct = $objlist.count+2;
			};

// write new array with unserialized data tab
			$pageobjlistuns = self::getDataValue($pageobjlist);
			

			//	Set the next action
			$this->_response->setAction('ok');
			
			//	Response
			$this->_response->setValue('glossary', $pageobjlistuns );
			$this->_response->setValue('gescount', $ct-1 );
			
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
					'entrytype'=>$v[1]['entryType']['value'],
					'name'=>$v[1]['Name']['value'],
					'notes'=>$v[1]['Notes']['value'],
					'created'=>$v[1]['created']['value'],
					'creator'=>$v[1]['creator']['value'],
					'last_editor'=>$v[1]['last_editor']['value'],
					'modified'=>$v[1]['modified']['value'],
					
					));
				
				}
			
			}
		}
		return $arrdatatabval;
	}
// PROTECTED REGION END

}
?>
