<?php
/*
 * Copyright (c) 2011 The Olympos Development Team.
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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:09:09 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBaseBase.php");
// PROTECTED REGION ID(application/include/model/class.ChiBase.php/Import) ENABLED START
require_once(BASE."application/include/model/class.Counter.php");
require_once(BASE."application/include/model/class.CounterRDBMapper.php");
// PROTECTED REGION END

/**
 * @class ChiBase
 * ChiBase description: 
 *
 * @author 
 * @version 1.0
 */
class ChiBase extends ChiBaseBase
{
// PROTECTED REGION ID(application/include/model/class.ChiBase.php/Body) ENABLED START
	function beforeInsert() 
	{
		parent::beforeInsert();
		$this->setDefaultAlias();
		$this->setDefaultStatus();
	}
	function afterLoad()
	{
		parent::afterLoad();
		// set alias for legacy data
		if (in_array('Alias', $this->getValueNames(DATATYPE_ATTRIBUTE)))
		{
			if (strlen($this->getAlias()) == 0)
			{
				$this->setDefaultAlias();
				$this->save();
			}
		}
  }
	
	function setDefaultAlias()
	{
		// set alias on nodes with appropriate attribute
		if (in_array('Alias', $this->getValueNames(DATATYPE_ATTRIBUTE)))
		{
			$praefix = 'Chi';
			$countertype = $this->_type;
			$objQuery = &PersistenceFacade::createObjectQuery('Counter');
			$objTpl = & $objQuery->getObjectTemplate('Counter');
			$objlistpart = $objQuery->execute(BUILDDEPTH_SINGLE, null);
			if (sizeof($objlistpart) == 0) {
				WCMFException::throwEx("Alias counter is not initialized", __FILE__, __LINE__);
			}
			
			$countalt = $objlistpart[0]->getValue($countertype);
			$count = ++$countalt;
			$objlistpart[0]->setValue($countertype, $count);
			$objlistpart[0]->save();
			
			switch ($countertype) {
				
				case 'ChiRequirement' :{
					$suffix = 'Req';
					break;
				}
				case 'ChiFeature' :{
					$suffix = 'Fea';
					break;
				}
				case 'ChiIssue' :{
					$suffix = 'Iss';
					break;
				}
				case 'ChiGoal' :{
					$suffix = 'Goa';
					break;
				}
				case 'ChiBusinessUseCase' :{
					$suffix = 'BUC';
					break;
				}
				case 'ChiBusinessUseCaseCore' :{
					$suffix = 'BUCC';
					break;
				}
				case 'ChiBusinessProcess' :{
					$suffix = 'BPr';
					break;
				}
				case 'ChiBusinessPartnerActive' :{
					$suffix = 'BPA';
					break;
				}
				case 'ChiBusinessPartnerPassive' :{
					$suffix = 'BPP';
					break;
				}
				case 'ChiWorkerExternal' :{
					$suffix = 'WorE';
					break;
				}
				case 'ChiWorkerInternal' :{
					$suffix = 'WorI';
					break;
				}
				case 'ChiWorker' :{
					$suffix = 'Wor';
					break;
				}
				case 'ChiBusinessPartner' :{
					$suffix = 'BP';
					break;
				}
				
				case 'Activity' :{
					$suffix = 'Act';
					break;
				}
				case 'ActivityDecision' :{
					$suffix = 'ActD';
					break;
				}
				case 'ActivityReceive' :{
					$suffix = 'ActR';
					break;
				}
				case 'ActivitySend' :{
					$suffix = 'ActS';
					break;
				}
				case 'ActivityInitial' :{
					$suffix = 'ActI';
					break;
				}
				case 'ActivityFinal' :{
					$suffix = 'ActF';
					break;
				}
				
				case 'ChiObject' :{
					$suffix = 'Obj';
					break;
				}
				case 'ChiController' :{
					$suffix = 'Contr';
					break;
				}
				case 'ChiNode' :{
					$suffix = 'Nod';
					break;
				}
				case 'ChiView' :{
					$suffix = 'View';
					break;
				}
				
				case 'ChiSystem' :{
					$suffix = 'Syst';
					break;
				}
				
				case 'ChiValue' :{
					$suffix = 'Val';
					break;
				}
				case 'Operation' :{
					$suffix = 'Op';
					break;
				}
				case 'Diagram' :{
					$suffix = 'Dia';
					break;
				}
				case 'ActivitySet' :{
					$suffix = 'ActSet';
					break;
				}

				case 'ProductionRuleSet' :{
					$suffix = 'PrSet';
					break;
				}
				case 'ProductionRuleSet' :{
					$suffix = 'PrSetVar';
					break;
				}
				case 'ProductionRule' :{
					$suffix = 'Pr';
					break;
				}
				case 'ProductionRule' :{
					$suffix = 'PrVar';
					break;
				}
				case 'ProductionRule' :{
					$suffix = 'PrCond';
					break;
				}
				case 'ProductionRule' :{
					$suffix = 'PrAct';
					break;
				}
			};
    
			$this->setValue('Alias', sprintf('%s%03u%s',$praefix,$count,$suffix), DATATYPE_ATTRIBUTE);
		}
	}

	function setDefaultStatus()
	{
		$defaultStatus = $this->getDefaultStatus();
		$this->setValue('Status', $defaultStatus, DATATYPE_ATTRIBUTE);
	}
	
	/**
	 * Get the default status id value for this instance. The base implementation
	 * returns the id of the first ChiBaseStatus object found. Subclasses may return another status.
	 * @return An id of the default status.
	 */
	function getDefaultStatus()
	{
		$persistenceFacade = &PersistenceFacade::getInstance(); 
		$status = &$persistenceFacade->loadFirstObject('ChiBaseStatus', BUIDLDEPTH_SINGLE);
		if ($status != null) {
			return $status->getDBID();
		}
		return null;
	}
// PROTECTED REGION END
}
?>
