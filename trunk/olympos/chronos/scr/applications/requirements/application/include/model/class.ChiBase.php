<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Jul 01 16:44:46 CEST 2009. 
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
	
	$praefix = 'Chi';
	$countertype = $this->_type;
	$persistenceFacade = & PersistenceFacade::getInstance(); 
	$objQuery = &$persistenceFacade->createObjectQuery('Counter');
	$objTpl = & $objQuery->getObjectTemplate('Counter');
	$objlistpart = $objQuery->execute(BUILDDEPTH_SINGLE, null);
	$countalt = $objlistpart[0]->getValue($countertype);
	$count = ++$countalt;
	$objlistpart[0]->setValue($countertype, $count);
	$objlistpart[0]->save();
	
	switch ($countertype) {
		
		case 'ChiRequirement' :{
		$suffix = 'Req';
		}break;
		case 'ChiFeature' :{
		$suffix = 'Fea';
		}break;
		case 'ChiIssue' :{
		$suffix = 'Iss';
		}break;
		case 'ChiGoal' :{
		$suffix = 'Goa';
		}break;
		
		case 'ChiBusinessUseCase' :{
		$suffix = 'BUC';
		}break;
		case 'ChiBusinessUseCaseCore' :{
		$suffix = 'BUCC';
		}break;
		case 'ChiBusinessProcess' :{
		$suffix = 'BPr';
		}break;
		case 'ChiBusinessPartnerActive' :{
		$suffix = 'BPA';
		}break;case 'ChiBusinessPartnerPassive' :{
		$suffix = 'BPP';
		}break;case 'ChiWorkerExternal' :{
		$suffix = 'WorE';
		}break;case 'ChiWorkerInternal' :{
		$suffix = 'WorI';
		}break;case 'ChiWorker' :{
		$suffix = 'Wor';
		}break;case 'ChiBusinessPartner' :{
		$suffix = 'BP';
		}break;
		
		case 'Activity' :{
		$suffix = 'Act';
		}break;
		case 'ActivityDecision' :{
		$suffix = 'ActD';
		}break;
		case 'ActivityReceive' :{
		$suffix = 'ActR';
		}break;
		case 'ActivitySend' :{
		$suffix = 'ActS';
		}break;
		case 'ActivityInitial' :{
		$suffix = 'ActI';
		}break;
		case 'ActivityFinal' :{
		$suffix = 'ActF';
		}break;
		
		case 'ChiObject' :{
		$suffix = 'Obj';
		}break;
		case 'ChiController' :{
		$suffix = 'Contr';
		}break;
		case 'ChiNode' :{
		$suffix = 'Nod';
		}break;
		case 'ChiView' :{
		$suffix = 'View';
		}break;
		
		case 'ChiSystem' :{
		$suffix = 'Syst';
		}break;
		
		case 'ChiValue' :{
		$suffix = 'Val';
		}break;
		case 'Operation' :{
		$suffix = 'Op';
		}break;

	};
    
    // set alias on nodes with appropriate attribute
    if (in_array('Alias', $this->getValueNames(DATATYPE_ATTRIBUTE)))
      $this->setValue('Alias', sprintf('%s%03u%s',$praefix,$count,$suffix), DATATYPE_ATTRIBUTE);

  }
// PROTECTED REGION END
}
?>
