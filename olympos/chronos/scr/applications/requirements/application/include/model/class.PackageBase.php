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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 17 13:20:21 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseExtended.php");

/**
 * @class Package
 * Package description: a package is a class that contains other classes including packages sef
 *
 * @author 
 * @version 1.0
 */
class PackageBase extends EntityBaseExtended
{
    function PackageBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::EntityBaseExtended($oid, 'Package');
      else
        parent::EntityBaseExtended($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Package");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("a package is a class that contains other classes including packages sef");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_model_id') $displayName = Message::get("fk_model_id");
      if ($name == 'Name') $displayName = Message::get("Name");
      if ($name == 'Notes') $displayName = Message::get("Notes");
      if ($name == 'created') $displayName = Message::get("created");
      if ($name == 'creator') $displayName = Message::get("creator");
      if ($name == 'last_editor') $displayName = Message::get("last_editor");
      if ($name == 'modified') $displayName = Message::get("modified");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_model_id') $description = Message::get("");
      if ($name == 'Name') $description = Message::get("the name of this object.");
      if ($name == 'Notes') $description = Message::get("the actual description of the object.");
      if ($name == 'created') $description = Message::get("the creation date of this object");
      if ($name == 'creator') $description = Message::get("the user that created this object");
      if ($name == 'last_editor') $description = Message::get("the last user that edited this object");
      if ($name == 'modified') $description = Message::get("the date when this object was modified");
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
     * Getter/Setter
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
    function getFkPackageId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_package_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_package_id', DATATYPE_IGNORE);
    }
    function setFkPackageId($fk_package_id)
    {
      return $this->setValue('fk_package_id', $fk_package_id, DATATYPE_IGNORE);
    }
    function getFkModelId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_model_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_model_id', DATATYPE_IGNORE);
    }
    function setFkModelId($fk_model_id)
    {
      return $this->setValue('fk_model_id', $fk_model_id, DATATYPE_IGNORE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    function getModelOID()
    {
      $fkValue = $this->getValue('fk_model_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Model', 'id' => array($fkValue)));
      else
        return null;
    }
    function setModel($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setModel'), $args);
        }
        else {
          $this->setValue('fk_model_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getPackageOID()
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
      else
        return null;
    }
    function setPackage($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setPackage'), $args);
        }
        else {
          $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getModelParents()
    {
      return $this->getParentsEx(null, 'Model', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getChiBaseChildren() instead
     */
    function getChiBaseList()
    {
      Log::warn("use of deprecated method getChiBaseList. use getChiBaseChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBaseChildren();
    }
    function getChiBaseChildren()
    {
      return $this->getChildrenEx(null, 'ChiBase', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getPackageChildren() instead
     */
    function getPackageList()
    {
      Log::warn("use of deprecated method getPackageList. use getPackageChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getPackageChildren();
    }
    function getPackageChildren()
    {
      return $this->getChildrenEx(null, 'Package', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getDiagramChildren() instead
     */
    function getDiagramList()
    {
      Log::warn("use of deprecated method getDiagramList. use getDiagramChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getDiagramChildren();
    }
    function getDiagramChildren()
    {
      return $this->getChildrenEx(null, 'Diagram', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getGlossaryChildren() instead
     */
    function getGlossaryList()
    {
      Log::warn("use of deprecated method getGlossaryList. use getGlossaryChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getGlossaryChildren();
    }
    function getGlossaryChildren()
    {
      return $this->getChildrenEx(null, 'Glossary', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getPropertyChildren() instead
     */
    function getPropertyList()
    {
      Log::warn("use of deprecated method getPropertyList. use getPropertyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getPropertyChildren();
    }
    function getPropertyChildren()
    {
      return $this->getChildrenEx(null, 'Property', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiValueChildren() instead
     */
    function getChiValueList()
    {
      Log::warn("use of deprecated method getChiValueList. use getChiValueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueChildren();
    }
    function getChiValueChildren()
    {
      return $this->getChildrenEx(null, 'ChiValue', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getFeatureChildren() instead
     */
    function getFeatureList()
    {
      Log::warn("use of deprecated method getFeatureList. use getFeatureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFeatureChildren();
    }
    function getFeatureChildren()
    {
      return $this->getChildrenEx(null, 'Feature', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiClassChildren() instead
     */
    function getChiClassList()
    {
      Log::warn("use of deprecated method getChiClassList. use getChiClassChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiClassChildren();
    }
    function getChiClassChildren()
    {
      return $this->getChildrenEx(null, 'ChiClass', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiViewChildren() instead
     */
    function getChiViewList()
    {
      Log::warn("use of deprecated method getChiViewList. use getChiViewChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiViewChildren();
    }
    function getChiViewChildren()
    {
      return $this->getChildrenEx(null, 'ChiView', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiControllerChildren() instead
     */
    function getChiControllerList()
    {
      Log::warn("use of deprecated method getChiControllerList. use getChiControllerChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiControllerChildren();
    }
    function getChiControllerChildren()
    {
      return $this->getChildrenEx(null, 'ChiController', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiNodeChildren() instead
     */
    function getChiNodeList()
    {
      Log::warn("use of deprecated method getChiNodeList. use getChiNodeChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiNodeChildren();
    }
    function getChiNodeChildren()
    {
      return $this->getChildrenEx(null, 'ChiNode', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiNodeManyToManyChildren() instead
     */
    function getChiNodeManyToManyList()
    {
      Log::warn("use of deprecated method getChiNodeManyToManyList. use getChiNodeManyToManyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiNodeManyToManyChildren();
    }
    function getChiNodeManyToManyChildren()
    {
      return $this->getChildrenEx(null, 'ChiNodeManyToMany', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getOperationChildren() instead
     */
    function getOperationList()
    {
      Log::warn("use of deprecated method getOperationList. use getOperationChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getOperationChildren();
    }
    function getOperationChildren()
    {
      return $this->getChildrenEx(null, 'Operation', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiIssueChildren() instead
     */
    function getChiIssueList()
    {
      Log::warn("use of deprecated method getChiIssueList. use getChiIssueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiIssueChildren();
    }
    function getChiIssueChildren()
    {
      return $this->getChildrenEx(null, 'ChiIssue', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiFeatureChildren() instead
     */
    function getChiFeatureList()
    {
      Log::warn("use of deprecated method getChiFeatureList. use getChiFeatureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiFeatureChildren();
    }
    function getChiFeatureChildren()
    {
      return $this->getChildrenEx(null, 'ChiFeature', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiRequirementChildren() instead
     */
    function getChiRequirementList()
    {
      Log::warn("use of deprecated method getChiRequirementList. use getChiRequirementChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiRequirementChildren();
    }
    function getChiRequirementChildren()
    {
      return $this->getChildrenEx(null, 'ChiRequirement', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiGoalChildren() instead
     */
    function getChiGoalList()
    {
      Log::warn("use of deprecated method getChiGoalList. use getChiGoalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiGoalChildren();
    }
    function getChiGoalChildren()
    {
      return $this->getChildrenEx(null, 'ChiGoal', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessUseCaseChildren() instead
     */
    function getChiBusinessUseCaseList()
    {
      Log::warn("use of deprecated method getChiBusinessUseCaseList. use getChiBusinessUseCaseChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessUseCaseChildren();
    }
    function getChiBusinessUseCaseChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessUseCase', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessUseCaseCoreChildren() instead
     */
    function getChiBusinessUseCaseCoreList()
    {
      Log::warn("use of deprecated method getChiBusinessUseCaseCoreList. use getChiBusinessUseCaseCoreChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessUseCaseCoreChildren();
    }
    function getChiBusinessUseCaseCoreChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessUseCaseCore', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessProcessChildren() instead
     */
    function getChiBusinessProcessList()
    {
      Log::warn("use of deprecated method getChiBusinessProcessList. use getChiBusinessProcessChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessProcessChildren();
    }
    function getChiBusinessProcessChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessProcess', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActorChildren() instead
     */
    function getActorList()
    {
      Log::warn("use of deprecated method getActorList. use getActorChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActorChildren();
    }
    function getActorChildren()
    {
      return $this->getChildrenEx(null, 'Actor', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessPartnerChildren() instead
     */
    function getChiBusinessPartnerList()
    {
      Log::warn("use of deprecated method getChiBusinessPartnerList. use getChiBusinessPartnerChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessPartnerChildren();
    }
    function getChiBusinessPartnerChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessPartner', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessPartnerPassiveChildren() instead
     */
    function getChiBusinessPartnerPassiveList()
    {
      Log::warn("use of deprecated method getChiBusinessPartnerPassiveList. use getChiBusinessPartnerPassiveChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessPartnerPassiveChildren();
    }
    function getChiBusinessPartnerPassiveChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessPartnerPassive', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiBusinessPartnerActiveChildren() instead
     */
    function getChiBusinessPartnerActiveList()
    {
      Log::warn("use of deprecated method getChiBusinessPartnerActiveList. use getChiBusinessPartnerActiveChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiBusinessPartnerActiveChildren();
    }
    function getChiBusinessPartnerActiveChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessPartnerActive', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiWorkerChildren() instead
     */
    function getChiWorkerList()
    {
      Log::warn("use of deprecated method getChiWorkerList. use getChiWorkerChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiWorkerChildren();
    }
    function getChiWorkerChildren()
    {
      return $this->getChildrenEx(null, 'ChiWorker', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiWorkerInternalChildren() instead
     */
    function getChiWorkerInternalList()
    {
      Log::warn("use of deprecated method getChiWorkerInternalList. use getChiWorkerInternalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiWorkerInternalChildren();
    }
    function getChiWorkerInternalChildren()
    {
      return $this->getChildrenEx(null, 'ChiWorkerInternal', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiWorkerExternalChildren() instead
     */
    function getChiWorkerExternalList()
    {
      Log::warn("use of deprecated method getChiWorkerExternalList. use getChiWorkerExternalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiWorkerExternalChildren();
    }
    function getChiWorkerExternalChildren()
    {
      return $this->getChildrenEx(null, 'ChiWorkerExternal', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getRuleVariableChildren() instead
     */
    function getRuleVariableList()
    {
      Log::warn("use of deprecated method getRuleVariableList. use getRuleVariableChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getRuleVariableChildren();
    }
    function getRuleVariableChildren()
    {
      return $this->getChildrenEx(null, 'RuleVariable', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getRuleConditionChildren() instead
     */
    function getRuleConditionList()
    {
      Log::warn("use of deprecated method getRuleConditionList. use getRuleConditionChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getRuleConditionChildren();
    }
    function getRuleConditionChildren()
    {
      return $this->getChildrenEx(null, 'RuleCondition', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getRuleActionChildren() instead
     */
    function getRuleActionList()
    {
      Log::warn("use of deprecated method getRuleActionList. use getRuleActionChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getRuleActionChildren();
    }
    function getRuleActionChildren()
    {
      return $this->getChildrenEx(null, 'RuleAction', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getProductionRuleChildren() instead
     */
    function getProductionRuleList()
    {
      Log::warn("use of deprecated method getProductionRuleList. use getProductionRuleChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getProductionRuleChildren();
    }
    function getProductionRuleChildren()
    {
      return $this->getChildrenEx(null, 'ProductionRule', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiSystemChildren() instead
     */
    function getChiSystemList()
    {
      Log::warn("use of deprecated method getChiSystemList. use getChiSystemChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiSystemChildren();
    }
    function getChiSystemChildren()
    {
      return $this->getChildrenEx(null, 'ChiSystem', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivityFinalChildren() instead
     */
    function getActivityFinalList()
    {
      Log::warn("use of deprecated method getActivityFinalList. use getActivityFinalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityFinalChildren();
    }
    function getActivityFinalChildren()
    {
      return $this->getChildrenEx(null, 'ActivityFinal', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivityInitialChildren() instead
     */
    function getActivityInitialList()
    {
      Log::warn("use of deprecated method getActivityInitialList. use getActivityInitialChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityInitialChildren();
    }
    function getActivityInitialChildren()
    {
      return $this->getChildrenEx(null, 'ActivityInitial', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivitySendChildren() instead
     */
    function getActivitySendList()
    {
      Log::warn("use of deprecated method getActivitySendList. use getActivitySendChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivitySendChildren();
    }
    function getActivitySendChildren()
    {
      return $this->getChildrenEx(null, 'ActivitySend', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivityReceiveChildren() instead
     */
    function getActivityReceiveList()
    {
      Log::warn("use of deprecated method getActivityReceiveList. use getActivityReceiveChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityReceiveChildren();
    }
    function getActivityReceiveChildren()
    {
      return $this->getChildrenEx(null, 'ActivityReceive', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivityDecisionChildren() instead
     */
    function getActivityDecisionList()
    {
      Log::warn("use of deprecated method getActivityDecisionList. use getActivityDecisionChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityDecisionChildren();
    }
    function getActivityDecisionChildren()
    {
      return $this->getChildrenEx(null, 'ActivityDecision', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivityChildren() instead
     */
    function getActivityList()
    {
      Log::warn("use of deprecated method getActivityList. use getActivityChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityChildren();
    }
    function getActivityChildren()
    {
      return $this->getChildrenEx(null, 'Activity', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiObjectChildren() instead
     */
    function getChiObjectList()
    {
      Log::warn("use of deprecated method getChiObjectList. use getChiObjectChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiObjectChildren();
    }
    function getChiObjectChildren()
    {
      return $this->getChildrenEx(null, 'ChiObject', array('fk_package_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getActivitySetChildren() instead
     */
    function getActivitySetList()
    {
      Log::warn("use of deprecated method getActivitySetList. use getActivitySetChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivitySetChildren();
    }
    function getActivitySetChildren()
    {
      return $this->getChildrenEx(null, 'ActivitySet', array('fk_package_id' => $this->getDBID()), null, false);
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
