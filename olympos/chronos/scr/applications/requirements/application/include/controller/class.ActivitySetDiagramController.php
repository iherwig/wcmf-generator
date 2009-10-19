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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Oct 19 17:03:10 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
 require_once(BASE."wcmf/lib/presentation/class.Controller.php");
// PROTECTED REGION ID(application/include/controller/class.ActivitySetDiagramController.php/Import) ENABLED START
require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
//require_once (BASE."wcmf/lib/model/class.Node.php");
//require_once (BASE."wcmf/lib/security/class.RightsManager.php");
// PROTECTED REGION END

/**
 * @class ActivitySetDiagramController
 * @ingroup Controller
 * @brief @class 
 * @ingroup Controller
 * @brief given oid of activityset adds elements of activityset to this activityset in diagram view
 * <b>Input actions:</b> - @em actsdiagr
 * <b>Output actions:</b> - @em ok in any case
 * @param[in] oid of selected activityset
 * @param[out] oid of processed activityset
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??actsdiagr = ActivitySetDiagramController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class ActivitySetDiagramController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.ActivitySetDiagramController.php/Body) ENABLED START
	var $currentUser ; 
	var $currentTimestamp ; 
	var $currentReadableTimestamp ; 
	
	function hasView()
	{
		return true;
	}

	function executeKernel()
	{	
		// execute this code only if the action is autocomplete
		if ($this->_request->getAction() == 'actsdiagr') {
		
			//init values
			$actsoid = $this->_request->getValue('oid');
			$actstype = substr($actsoid,0,strpos($actsoid,':'));
			$actsid = substr($actsoid,strpos($actsoid,':')+1);
			
		//	echo '<br/> actsid: '; print_r($actsid);
			$this->currentUser = self::getCurrentUser();
			$this->currentTimestamp = self::getTimeStamp();
			$this->currentReadableTimestamp = self::makeReadableTimestamp($this->currentTimestamp);
			$persistenceFacade = & PersistenceFacade::getInstance(); // get the persistence information (database)
		
			// search all elems with 	fk_activityset_id = $actsid
			$ObjActs = $persistenceFacade->load($actsoid);
		//	echo '<br/>ObjActs: '; print_r($ObjActs);
			foreach($ObjActs as $k=>$v){
				if($k == '_properties'){
					foreach($v as $k=>$v){
						if($k == 'childoids'){
							$actschildoids = $v;
						}
					}
				}
			}
		//	echo '<br/> actsname: '; print_r($ObjActs->getName());
			
	
			//for all childs of activityset create figure and set position
			$posx = 5050;
			$posy = 5050;
			$posct = 0;
			
			foreach($actschildoids as $k=>$v){
				
				$oid = strval($v);
				$chldtype = substr($oid,0,strpos($oid,':'));
				$chldid = substr($oid,strpos($oid,':')+1);
				
				$posct = $posct +1;
				$posx = $posx + 100;
				if( $posct > 9 ){
					$posy = $posy + 100;
					$posx = $posx - 1000;
					$posct = 0;
				};
					
					$ObjCurVal = $persistenceFacade->load($v);
					// e.g. Goal echo '<br/> chldtype: '.$chldtype;
					//create figure and set fk_activityset_id to actsid and fk_activity_id to $chldid
					$objQueryFigureWrite = & $persistenceFacade->createObjectQuery('Figure');
					$objTplFigureWrite = & $objQueryFigureWrite->getObjectTemplate('Figure'); //new row
					$objTplFigureWrite->setValue('fk_activityset_id', $actsid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('fk_'.strtolower($chldtype).'_id', $chldid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('Width', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('Height', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionX', $posx, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionY', $posy, DATATYPE_ATTRIBUTE);
					$persistenceFacade->save($objTplFigureWrite);

			}
					
			//	Set the next action
			$this->_response->setAction('ok');
			//	Response
			$this->_response->setValue('oid', 'ActivitySet:'.$actsid );
		
		};
	
		//	Success
		return false;
	}

	private function getCurrentUser() {
	
		$rightsManager = RightsManager::getInstance();
		$authUser = & $rightsManager->getAuthUser();
		$currUser = $authUser->getLogin();
	
		return $currUser;
	}

	private function getTimeStamp() {
	
		$now = microtime();
		return substr($now, -10).substr($now, 2, 6);
	
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
