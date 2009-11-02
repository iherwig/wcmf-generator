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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Nov 02 16:53:14 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class NMUserRole
 * NMUserRole description: 
 *
 * @author 
 * @version 1.0
 */
class NMUserRoleBase extends Node
{
    function NMUserRoleBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Node('NMUserRole', $oid);
      else
        parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMUserRole");
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
      if ($name == 'fk_user_id') $displayName = Message::get("fk_user_id");
      if ($name == 'fk_role_id') $displayName = Message::get("fk_role_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'fk_user_id') $description = Message::get("");
      if ($name == 'fk_role_id') $description = Message::get("");
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
    function getFkUserId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_user_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_user_id', DATATYPE_IGNORE);
    }
    function setFkUserId($fk_user_id)
    {
      return $this->setValue('fk_user_id', $fk_user_id, DATATYPE_IGNORE);
    }
    function getFkRoleId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_role_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_role_id', DATATYPE_IGNORE);
    }
    function setFkRoleId($fk_role_id)
    {
      return $this->setValue('fk_role_id', $fk_role_id, DATATYPE_IGNORE);
    }
    function getRoleRDBOID()
    {
      $fkValue = $this->getValue('fk_role_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'RoleRDB', 'id' => array($fkValue)));
      else
        return null;
    }
    function setRoleRDB($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setRoleRDB'), $args);
        }
        else {
          $this->setValue('fk_role_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getUserRDBOID()
    {
      $fkValue = $this->getValue('fk_user_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'UserRDB', 'id' => array($fkValue)));
      else
        return null;
    }
    function setUserRDB($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setUserRDB'), $args);
        }
        else {
          $this->setValue('fk_user_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getRoleRDBParents()
    {
      return $this->getParentsEx(null, 'RoleRDB', null, null);
    }
    function getUserRDBParents()
    {
      return $this->getParentsEx(null, 'UserRDB', null, null);
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
