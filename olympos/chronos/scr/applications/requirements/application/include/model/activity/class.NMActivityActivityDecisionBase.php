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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 15:15:27 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class NMActivityActivityDecision
 * NMActivityActivityDecision description: 
 *
 * @author 
 * @version 1.0
 */
class NMActivityActivityDecisionBase extends Node
{
    function NMActivityActivityDecisionBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Node('NMActivityActivityDecision', $oid);
      else
        parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMActivityActivityDecision");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_activitydecision_id') $displayName = Message::get("fk_activitydecision_id");
      if ($name == 'fk_activity_id') $displayName = Message::get("fk_activity_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_activitydecision_id') $description = Message::get("");
      if ($name == 'fk_activity_id') $description = Message::get("");
      return Message::get($description);
    }
    /**
     * See if the node is an association object, that implements a many to many relation
     */
    function isManyToManyObject()
    {
      return true;
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
    function getFkActivitydecisionId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activitydecision_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activitydecision_id', DATATYPE_IGNORE);
    }
    function setFkActivitydecisionId($fk_activitydecision_id)
    {
      return $this->setValue('fk_activitydecision_id', $fk_activitydecision_id, DATATYPE_IGNORE);
    }
    function getFkActivityId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activity_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activity_id', DATATYPE_IGNORE);
    }
    function setFkActivityId($fk_activity_id)
    {
      return $this->setValue('fk_activity_id', $fk_activity_id, DATATYPE_IGNORE);
    }
    function getActivityOID()
    {
      $fkValue = $this->getValue('fk_activity_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Activity', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivity(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activity_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityDecisionOID()
    {
      $fkValue = $this->getValue('fk_activitydecision_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivityDecision', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivityDecision(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activitydecision_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActivityParents()
    {
      return $this->getParentsEx(null, 'Activity', null, null);
    }
    function getActivityDecisionParents()
    {
      return $this->getParentsEx(null, 'ActivityDecision', null, null);
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
