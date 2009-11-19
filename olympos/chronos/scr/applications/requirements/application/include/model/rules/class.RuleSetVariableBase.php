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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Nov 19 17:27:37 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class RuleSetVariable
 * RuleSetVariable description: 
 *
 * @author 
 * @version 1.0
 */
class RuleSetVariableBase extends ChiBase
{
    function RuleSetVariableBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiBase($oid, 'RuleSetVariable');
      else
        parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("RuleSetVariable");
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
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_productionruleset_id') $displayName = Message::get("fk_productionruleset_id");
      if ($name == 'context') $displayName = Message::get("context");
      if ($name == 'ruleValue') $displayName = Message::get("ruleValue");
      if ($name == 'variableType') $displayName = Message::get("variableType");
      if ($name == 'isEditable') $displayName = Message::get("isEditable");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Version') $displayName = Message::get("Version");
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
      if ($name == 'fk_productionruleset_id') $description = Message::get("");
      if ($name == 'context') $description = Message::get("");
      if ($name == 'ruleValue') $description = Message::get("");
      if ($name == 'variableType') $description = Message::get("");
      if ($name == 'isEditable') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Author') $description = Message::get("");
      if ($name == 'Version') $description = Message::get("the model version of this object");
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
    function getFkProductionrulesetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_productionruleset_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_productionruleset_id', DATATYPE_IGNORE);
    }
    function setFkProductionrulesetId($fk_productionruleset_id)
    {
      return $this->setValue('fk_productionruleset_id', $fk_productionruleset_id, DATATYPE_IGNORE);
    }
    function getContext($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('context', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('context', DATATYPE_ATTRIBUTE);
    }
    function setContext($context)
    {
      return $this->setValue('context', $context, DATATYPE_ATTRIBUTE);
    }
    function getRuleValue($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('ruleValue', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('ruleValue', DATATYPE_ATTRIBUTE);
    }
    function setRuleValue($ruleValue)
    {
      return $this->setValue('ruleValue', $ruleValue, DATATYPE_ATTRIBUTE);
    }
    function getVariableType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('variableType', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('variableType', DATATYPE_ATTRIBUTE);
    }
    function setVariableType($variableType)
    {
      return $this->setValue('variableType', $variableType, DATATYPE_ATTRIBUTE);
    }
    function getIsEditable($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('isEditable', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('isEditable', DATATYPE_ATTRIBUTE);
    }
    function setIsEditable($isEditable)
    {
      return $this->setValue('isEditable', $isEditable, DATATYPE_ATTRIBUTE);
    }
    function getProductionRuleSetOID()
    {
      $fkValue = $this->getValue('fk_productionruleset_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ProductionRuleSet', 'id' => array($fkValue)));
      else
        return null;
    }
    function setProductionRuleSet($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setProductionRuleSet'), $args);
        }
        else {
          $this->setValue('fk_productionruleset_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getProductionRuleSetParents()
    {
      return $this->getParentsEx(null, 'ProductionRuleSet', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getFigureChildren() instead
     */
    function getFigureList()
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
    function getFigureChildren()
    {
      return $this->getChildrenEx(null, 'Figure', array('fk_rulesetvariable_id' => $this->getDBID()), null, false);
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
