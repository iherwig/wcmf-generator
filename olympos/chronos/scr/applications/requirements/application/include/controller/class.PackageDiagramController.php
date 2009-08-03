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
// PROTECTED REGION ID(application/include/controller/class.PackageDiagramController.php/Import) ENABLED START

require_once (BASE."wcmf/lib/persistence/class.PersistenceFacade.php");
require_once (BASE."wcmf/lib/persistence/class.ObjectQuery.php");
//require_once (BASE."wcmf/lib/model/class.Node.php");
//require_once (BASE."wcmf/lib/security/class.RightsManager.php");

// PROTECTED REGION END

/**
 * @class PackageDiagramController
 * @ingroup Controller
 * @brief @class
 * @ingroup Controller
 * @brief given oid of package creates a new diagram named like package and elements of package added to this diagram 
 * <b>Input actions:</b> - @em packdiagr 
 * <b>Output actions:</b> - @em ok in any case 
 * @param[in] oid of selected package
 * @param[out] oid of the new diagram 
 * 
 * The following configuration settings are defined for this controller:
 *
 * [actionmapping]
 * ??packdiagr = PackageDiagramController
 *
 * [views]
 * 
 * @author 
 * @version 1.0
 */
class PackageDiagramController extends Controller
{
// PROTECTED REGION ID(application/include/controller/class.PackageDiagramController.php/Body) ENABLED START
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
		if ($this->_request->getAction() == 'packdiagr') {
		
			//init values
			$packageoid = $this->_request->getValue('oid');
			$packagetype = substr($packageoid,0,strpos($packageoid,':'));
			$packageid = substr($packageoid,strpos($packageoid,':')+1);
			
			//echo '<br/> packageid: '; print_r($packageid);
			$this->currentUser = self::getCurrentUser();
			$this->currentTimestamp = self::getTimeStamp();
			$this->currentReadableTimestamp = self::makeReadableTimestamp($this->currentTimestamp);
			$persistenceFacade = & PersistenceFacade::getInstance(); // get the persistence information (database)
		
			// search all elems with fk_package_id = $packageid
			$ObjPackage = $persistenceFacade->load($packageoid);
			//echo '<br/>ObjPackage: '; print_r($ObjPackage);
			foreach($ObjPackage as $k=>$v){
				if($k == '_properties'){
					foreach($v as $k=>$v){
						if($k == 'childoids'){
							$packagechildoids = $v;
						}
					}
				}
			}
			//echo '<br/> packagename: '; print_r($ObjPackage->getName());
			
			// create new diagram entry
			$objQueryDiagrWrite = & $persistenceFacade->createObjectQuery('Diagram');
			$objTplDiagrWrite = & $objQueryDiagrWrite->getObjectTemplate('Diagram'); //new row
			$objTplDiagrWrite->setValue('Name', $ObjPackage->getName(), DATATYPE_ATTRIBUTE);
			$objTplDiagrWrite->setValue('fk_package_id', $packageid , DATATYPE_IGNORE);
			$persistenceFacade->save($objTplDiagrWrite);
			
			// read diagramid of created diagram
			$diagramid = $objTplDiagrWrite->getValue('id');
			//echo '<br/> diagramid: '; print_r($diagramid);
			
			//for all childs of package - not diagram create figure and set position
			$posx = 5050;
			$posy = 5050;
			$posct = 0;
			
			foreach($packagechildoids as $k=>$v){
				
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
				
				if( $chldtype !== 'Diagram'){
					
					$ObjCurVal = $persistenceFacade->load($v);
					// e.g. Goal echo '<br/> chldtype: '.$chldtype;
					//create figure and set fk_diagram_id to diagramid
					$objQueryFigureWrite = & $persistenceFacade->createObjectQuery('Figure');
					$objTplFigureWrite = & $objQueryFigureWrite->getObjectTemplate('Figure'); //new row
					$objTplFigureWrite->setValue('fk_diagram_id', $diagramid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('fk_'.strtolower($chldtype).'_id', $chldid , DATATYPE_IGNORE);
					$objTplFigureWrite->setValue('Width', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('Height', 50, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionX', $posx, DATATYPE_ATTRIBUTE);
					$objTplFigureWrite->setValue('PositionY', $posy, DATATYPE_ATTRIBUTE);
					$persistenceFacade->save($objTplFigureWrite);
					
				}
			}
					
			//	Set the next action
			$this->_response->setAction('ok');
			//	Response
			$this->_response->setValue('oid', 'Diagram:'.$diagramid );
		
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
