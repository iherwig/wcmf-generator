<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:54 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBase.php");

/**
 * @class Counter
 * Counter description: the class counter hosts counter properties for all the objects actually supportedby the system.
 * This class is a single tone and exisst only one time in each CWM instance.
 *
 * @author 
 * @version 1.0
 */
class CounterBase extends EntityBase
{
    function CounterBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'Counter');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Counter");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("the class counter hosts counter properties for all the objects actually supportedby the system. This class is a single tone and exisst only one time in each CWM instance.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'Activity') $displayName = Message::get("Activity");
      if ($name == 'ActivityDecision') $displayName = Message::get("ActivityDecision");
      if ($name == 'ActivityFinal') $displayName = Message::get("ActivityFinal");
      if ($name == 'ActivityInitial') $displayName = Message::get("ActivityInitial");
      if ($name == 'ActivityReceive') $displayName = Message::get("ActivityReceive");
      if ($name == 'ActivitySend') $displayName = Message::get("ActivitySend");
      if ($name == 'ChiBusinessPartner') $displayName = Message::get("ChiBusinessPartner");
      if ($name == 'ChiBusinessPartnerActive') $displayName = Message::get("ChiBusinessPartnerActive");
      if ($name == 'ChiBusinessPartnerPassive') $displayName = Message::get("ChiBusinessPartnerPassive");
      if ($name == 'ChiBusinessProcess') $displayName = Message::get("ChiBusinessProcess");
      if ($name == 'ChiBusinessUseCase') $displayName = Message::get("ChiBusinessUseCase");
      if ($name == 'ChiBusinessUseCaseCore') $displayName = Message::get("ChiBusinessUseCaseCore");
      if ($name == 'ChiController') $displayName = Message::get("ChiController");
      if ($name == 'ChiFeature') $displayName = Message::get("ChiFeature");
      if ($name == 'ChiGoal') $displayName = Message::get("ChiGoal");
      if ($name == 'ChiIssue') $displayName = Message::get("ChiIssue");
      if ($name == 'ChiNode') $displayName = Message::get("ChiNode");
      if ($name == 'ChiRequirement') $displayName = Message::get("ChiRequirement");
      if ($name == 'ChiSystem') $displayName = Message::get("ChiSystem");
      if ($name == 'ChiValue') $displayName = Message::get("ChiValue");
      if ($name == 'ChiView') $displayName = Message::get("ChiView");
      if ($name == 'ChiWorker') $displayName = Message::get("ChiWorker");
      if ($name == 'ChiWorkerExternal') $displayName = Message::get("ChiWorkerExternal");
      if ($name == 'ChiWorkerInternal') $displayName = Message::get("ChiWorkerInternal");
      if ($name == 'Operation') $displayName = Message::get("Operation");
      if ($name == 'Diagram') $displayName = Message::get("Diagram");
      if ($name == 'ActivitySet') $displayName = Message::get("ActivitySet");
      if ($name == 'ProductionRuleSet') $displayName = Message::get("ProductionRuleSet");
      if ($name == 'ProductionRule') $displayName = Message::get("ProductionRule");
      if ($name == 'RuleSetVariable') $displayName = Message::get("RuleSetVariable");
      if ($name == 'RuleVariable') $displayName = Message::get("RuleVariable");
      if ($name == 'RuleCondition') $displayName = Message::get("RuleCondition");
      if ($name == 'RuleAction') $displayName = Message::get("RuleAction");
      if ($name == 'created') $displayName = Message::get("created");
      if ($name == 'creator') $displayName = Message::get("creator");
      if ($name == 'last_editor') $displayName = Message::get("last_editor");
      if ($name == 'modified') $displayName = Message::get("modified");
      if ($name == 'umi') $displayName = Message::get("umi");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'Activity') $description = Message::get("");
      if ($name == 'ActivityDecision') $description = Message::get("");
      if ($name == 'ActivityFinal') $description = Message::get("");
      if ($name == 'ActivityInitial') $description = Message::get("");
      if ($name == 'ActivityReceive') $description = Message::get("");
      if ($name == 'ActivitySend') $description = Message::get("");
      if ($name == 'ChiBusinessPartner') $description = Message::get("");
      if ($name == 'ChiBusinessPartnerActive') $description = Message::get("");
      if ($name == 'ChiBusinessPartnerPassive') $description = Message::get("");
      if ($name == 'ChiBusinessProcess') $description = Message::get("");
      if ($name == 'ChiBusinessUseCase') $description = Message::get("");
      if ($name == 'ChiBusinessUseCaseCore') $description = Message::get("");
      if ($name == 'ChiController') $description = Message::get("");
      if ($name == 'ChiFeature') $description = Message::get("");
      if ($name == 'ChiGoal') $description = Message::get("");
      if ($name == 'ChiIssue') $description = Message::get("");
      if ($name == 'ChiNode') $description = Message::get("");
      if ($name == 'ChiRequirement') $description = Message::get("");
      if ($name == 'ChiSystem') $description = Message::get("");
      if ($name == 'ChiValue') $description = Message::get("");
      if ($name == 'ChiView') $description = Message::get("");
      if ($name == 'ChiWorker') $description = Message::get("");
      if ($name == 'ChiWorkerExternal') $description = Message::get("");
      if ($name == 'ChiWorkerInternal') $description = Message::get("");
      if ($name == 'Operation') $description = Message::get("");
      if ($name == 'Diagram') $description = Message::get("");
      if ($name == 'ActivitySet') $description = Message::get("");
      if ($name == 'ProductionRuleSet') $description = Message::get("");
      if ($name == 'ProductionRule') $description = Message::get("");
      if ($name == 'RuleSetVariable') $description = Message::get("");
      if ($name == 'RuleVariable') $description = Message::get("");
      if ($name == 'RuleCondition') $description = Message::get("");
      if ($name == 'RuleAction') $description = Message::get("");
      if ($name == 'created') $description = Message::get("the creation date of this object");
      if ($name == 'creator') $description = Message::get("the user that created this object");
      if ($name == 'last_editor') $description = Message::get("the last user that edited this object");
      if ($name == 'modified') $description = Message::get("the date when this object was modified");
      if ($name == 'umi') $description = Message::get("the model version of this object");
      return Message::get($description);
    }
    /**
     * See if the node is an association object, that implements a many to many relation
     */
    function isManyToManyObject()
    {
      return false;
    }
    /**
     * Getter/Setter for properties
     */
    function getId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('id', DATATYPE_IGNORE);
      else
        return $this->getValue('id', DATATYPE_IGNORE);
    }
    function setId($id)
    {
      return $this->setValue('id', $id, DATATYPE_IGNORE);
    }
    function getActivity($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Activity', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Activity', DATATYPE_ATTRIBUTE);
    }
    function setActivity($Activity)
    {
      return $this->setValue('Activity', $Activity, DATATYPE_ATTRIBUTE);
    }
    function getActivityDecision($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivityDecision', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivityDecision', DATATYPE_ATTRIBUTE);
    }
    function setActivityDecision($ActivityDecision)
    {
      return $this->setValue('ActivityDecision', $ActivityDecision, DATATYPE_ATTRIBUTE);
    }
    function getActivityFinal($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivityFinal', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivityFinal', DATATYPE_ATTRIBUTE);
    }
    function setActivityFinal($ActivityFinal)
    {
      return $this->setValue('ActivityFinal', $ActivityFinal, DATATYPE_ATTRIBUTE);
    }
    function getActivityInitial($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivityInitial', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivityInitial', DATATYPE_ATTRIBUTE);
    }
    function setActivityInitial($ActivityInitial)
    {
      return $this->setValue('ActivityInitial', $ActivityInitial, DATATYPE_ATTRIBUTE);
    }
    function getActivityReceive($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivityReceive', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivityReceive', DATATYPE_ATTRIBUTE);
    }
    function setActivityReceive($ActivityReceive)
    {
      return $this->setValue('ActivityReceive', $ActivityReceive, DATATYPE_ATTRIBUTE);
    }
    function getActivitySend($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivitySend', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivitySend', DATATYPE_ATTRIBUTE);
    }
    function setActivitySend($ActivitySend)
    {
      return $this->setValue('ActivitySend', $ActivitySend, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessPartner($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessPartner', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessPartner', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessPartner($ChiBusinessPartner)
    {
      return $this->setValue('ChiBusinessPartner', $ChiBusinessPartner, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessPartnerActive($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessPartnerActive', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessPartnerActive', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessPartnerActive($ChiBusinessPartnerActive)
    {
      return $this->setValue('ChiBusinessPartnerActive', $ChiBusinessPartnerActive, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessPartnerPassive($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessPartnerPassive', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessPartnerPassive', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessPartnerPassive($ChiBusinessPartnerPassive)
    {
      return $this->setValue('ChiBusinessPartnerPassive', $ChiBusinessPartnerPassive, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessProcess($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessProcess', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessProcess', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessProcess($ChiBusinessProcess)
    {
      return $this->setValue('ChiBusinessProcess', $ChiBusinessProcess, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessUseCase($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessUseCase', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessUseCase', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessUseCase($ChiBusinessUseCase)
    {
      return $this->setValue('ChiBusinessUseCase', $ChiBusinessUseCase, DATATYPE_ATTRIBUTE);
    }
    function getChiBusinessUseCaseCore($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiBusinessUseCaseCore', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiBusinessUseCaseCore', DATATYPE_ATTRIBUTE);
    }
    function setChiBusinessUseCaseCore($ChiBusinessUseCaseCore)
    {
      return $this->setValue('ChiBusinessUseCaseCore', $ChiBusinessUseCaseCore, DATATYPE_ATTRIBUTE);
    }
    function getChiController($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiController', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiController', DATATYPE_ATTRIBUTE);
    }
    function setChiController($ChiController)
    {
      return $this->setValue('ChiController', $ChiController, DATATYPE_ATTRIBUTE);
    }
    function getChiFeature($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiFeature', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiFeature', DATATYPE_ATTRIBUTE);
    }
    function setChiFeature($ChiFeature)
    {
      return $this->setValue('ChiFeature', $ChiFeature, DATATYPE_ATTRIBUTE);
    }
    function getChiGoal($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiGoal', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiGoal', DATATYPE_ATTRIBUTE);
    }
    function setChiGoal($ChiGoal)
    {
      return $this->setValue('ChiGoal', $ChiGoal, DATATYPE_ATTRIBUTE);
    }
    function getChiIssue($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiIssue', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiIssue', DATATYPE_ATTRIBUTE);
    }
    function setChiIssue($ChiIssue)
    {
      return $this->setValue('ChiIssue', $ChiIssue, DATATYPE_ATTRIBUTE);
    }
    function getChiNode($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiNode', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiNode', DATATYPE_ATTRIBUTE);
    }
    function setChiNode($ChiNode)
    {
      return $this->setValue('ChiNode', $ChiNode, DATATYPE_ATTRIBUTE);
    }
    function getChiRequirement($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiRequirement', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiRequirement', DATATYPE_ATTRIBUTE);
    }
    function setChiRequirement($ChiRequirement)
    {
      return $this->setValue('ChiRequirement', $ChiRequirement, DATATYPE_ATTRIBUTE);
    }
    function getChiSystem($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiSystem', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiSystem', DATATYPE_ATTRIBUTE);
    }
    function setChiSystem($ChiSystem)
    {
      return $this->setValue('ChiSystem', $ChiSystem, DATATYPE_ATTRIBUTE);
    }
    function getChiValue($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiValue', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiValue', DATATYPE_ATTRIBUTE);
    }
    function setChiValue($ChiValue)
    {
      return $this->setValue('ChiValue', $ChiValue, DATATYPE_ATTRIBUTE);
    }
    function getChiView($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiView', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiView', DATATYPE_ATTRIBUTE);
    }
    function setChiView($ChiView)
    {
      return $this->setValue('ChiView', $ChiView, DATATYPE_ATTRIBUTE);
    }
    function getChiWorker($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiWorker', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiWorker', DATATYPE_ATTRIBUTE);
    }
    function setChiWorker($ChiWorker)
    {
      return $this->setValue('ChiWorker', $ChiWorker, DATATYPE_ATTRIBUTE);
    }
    function getChiWorkerExternal($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiWorkerExternal', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiWorkerExternal', DATATYPE_ATTRIBUTE);
    }
    function setChiWorkerExternal($ChiWorkerExternal)
    {
      return $this->setValue('ChiWorkerExternal', $ChiWorkerExternal, DATATYPE_ATTRIBUTE);
    }
    function getChiWorkerInternal($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ChiWorkerInternal', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ChiWorkerInternal', DATATYPE_ATTRIBUTE);
    }
    function setChiWorkerInternal($ChiWorkerInternal)
    {
      return $this->setValue('ChiWorkerInternal', $ChiWorkerInternal, DATATYPE_ATTRIBUTE);
    }
    function getOperation($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Operation', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Operation', DATATYPE_ATTRIBUTE);
    }
    function setOperation($Operation)
    {
      return $this->setValue('Operation', $Operation, DATATYPE_ATTRIBUTE);
    }
    function getDiagram($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Diagram', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Diagram', DATATYPE_ATTRIBUTE);
    }
    function setDiagram($Diagram)
    {
      return $this->setValue('Diagram', $Diagram, DATATYPE_ATTRIBUTE);
    }
    function getActivitySet($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ActivitySet', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ActivitySet', DATATYPE_ATTRIBUTE);
    }
    function setActivitySet($ActivitySet)
    {
      return $this->setValue('ActivitySet', $ActivitySet, DATATYPE_ATTRIBUTE);
    }
    function getProductionRuleSet($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ProductionRuleSet', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ProductionRuleSet', DATATYPE_ATTRIBUTE);
    }
    function setProductionRuleSet($ProductionRuleSet)
    {
      return $this->setValue('ProductionRuleSet', $ProductionRuleSet, DATATYPE_ATTRIBUTE);
    }
    function getProductionRule($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ProductionRule', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ProductionRule', DATATYPE_ATTRIBUTE);
    }
    function setProductionRule($ProductionRule)
    {
      return $this->setValue('ProductionRule', $ProductionRule, DATATYPE_ATTRIBUTE);
    }
    function getRuleSetVariable($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('RuleSetVariable', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('RuleSetVariable', DATATYPE_ATTRIBUTE);
    }
    function setRuleSetVariable($RuleSetVariable)
    {
      return $this->setValue('RuleSetVariable', $RuleSetVariable, DATATYPE_ATTRIBUTE);
    }
    function getRuleVariable($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('RuleVariable', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('RuleVariable', DATATYPE_ATTRIBUTE);
    }
    function setRuleVariable($RuleVariable)
    {
      return $this->setValue('RuleVariable', $RuleVariable, DATATYPE_ATTRIBUTE);
    }
    function getRuleCondition($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('RuleCondition', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('RuleCondition', DATATYPE_ATTRIBUTE);
    }
    function setRuleCondition($RuleCondition)
    {
      return $this->setValue('RuleCondition', $RuleCondition, DATATYPE_ATTRIBUTE);
    }
    function getRuleAction($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('RuleAction', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('RuleAction', DATATYPE_ATTRIBUTE);
    }
    function setRuleAction($RuleAction)
    {
      return $this->setValue('RuleAction', $RuleAction, DATATYPE_ATTRIBUTE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
    }

    /**
     * Node class overrides
     */
     
    /**
     * @see Node::loadChildren()
     * Override this to also load the children of many-to-many relations
     */
    function loadChildren($type, $buildDepth=BUILDDEPTH_SINGLE, $forceUpdate=false)
    {
      // do default
      parent::loadChildren($type, $buildDepth, $forceUpdate);
    }
    /**
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties, $useRegExp=true)
    {
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties, $useRegExp);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      // do default
      parent::addChild($child, $addtype);
    }
    /**
     * @see Node::deleteChild()
     * Override this to delete association objects if necessary
     */
    function deleteChild($childOID, $reallyDelete=false)
    {
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
