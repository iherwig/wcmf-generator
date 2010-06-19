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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:17:46 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.ObjectHistoryChangelistController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
// PROTECTED REGION END

/**
 * @class ObjectHistoryChangelistController
 * @ingroup Controller
 * @brief Returns list of requested object changes from start to limit entries (used for paging) and whole list count 
 * 
 * <b>Input actions:</b> 
 * - @em histlist returns list of requested object changes from start to limit entries (used for paging) and whole list count 
 * 
 * <b>Output actions:</b> 
 * - @em ok in any case 
 * 
 * @param[in] oid string oid of requested object in format type:id
 * @param[in] start position of first partial list entry in whole list
 * @param[in] limit count of partial list entries
 * @param[out] changelist returns partial list from start to limit
 * @param[out] gescount counts entries from whole list ignoring start and limit 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??histlist = ObjectHistoryChangelistController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class ObjectHistoryChangelistController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.ObjectHistoryChangelistController.php/Body) ENABLED START
  
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{
		// execute this code only if the action is histlist
		if ($this->_request->getAction() == 'histlist') {
		
			//get history table as objectlist
			$affectedoid = $this->_request->getValue('oid'); // 'ChiGoal:18635'
			$strt = $this->_request->getValue('start');
			$limit = $this->_request->getValue('limit');
			$tablename = 'History';
			$objlist = array ();
			$orderby = array ('timestamp DESC');
			
			// history table
			$objQuery = & PersistenceFacade::createObjectQuery($tablename);
			// only for object oid
			$objTpl = & $objQuery->getObjectTemplate($tablename);
			$objTpl->setValue("affectedoid", $affectedoid, DATATYPE_ATTRIBUTE);
			// searchlimit if needed
			//	$pagingInfo = new PagingInfo($limit);
			//	$pagingInfo->setIndex($strt);
			//	$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby, $pagingInfo);
			// search
			$objlist = $objQuery->execute(BUILDDEPTH_SINGLE, $orderby );
			
			//start/limit (index of paging info not working properly)
			$pageobjlist = array();
			$ct = 1;
			foreach ($objlist as $k=>$v){
				if ( ($ct >= $strt) and ($ct < ($strt + $limit)) ){
					array_push($pageobjlist, $v);
				}
				$ct = $ct+1;
			}

			// write new array with unserialized data tab
			$pageobjlistuns = self::getDataValue($pageobjlist);
			
			//	Set the next action
			$this->_response->setAction('ok');
			
			//	Response
			$this->_response->setValue('changelist', $pageobjlistuns );
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
					'data'=>unserialize($v[1]['data']['value']),
					'duplicate'=>$v[1]['duplicate']['value'],
					'eventtype'=>$v[1]['eventtype']['value'],
					'affectedoid'=>$v[1]['affectedoid']['value'],
					'otherid'=>$v[1]['otherid']['value'],
					'timestamp'=>self::makeReadableTimestamp($v[1]['timestamp']['value']),
					'user'=>$v[1]['user']['value'],
					'timestamporig'=>$v[1]['timestamp']['value']
					
					));
				
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

// PROTECTED REGION END

}
?>
