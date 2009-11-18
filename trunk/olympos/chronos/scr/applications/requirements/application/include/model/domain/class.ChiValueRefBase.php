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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 16:43:41 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseExtended.php");

/**
 * @class ChiValueRef
 * ChiValueRef description: 
 *
 * @author 
 * @version 1.0
 */
class ChiValueRefBase extends EntityBaseExtended
{
    function ChiValueRefBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::EntityBaseExtended($oid, 'ChiValueRef');
      else
        parent::EntityBaseExtended($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiValueRef");
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
      if ($name == 'fk_chinodemanytomany_id') $displayName = Message::get("fk_chinodemanytomany_id");
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
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
      if ($name == 'fk_chinodemanytomany_id') $description = Message::get("");
      if ($name == 'fk_chinode_id') $description = Message::get("");
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
    function getFkChinodemanytomanyId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
    }
    function setFkChinodemanytomanyId($fk_chinodemanytomany_id)
    {
      return $this->setValue('fk_chinodemanytomany_id', $fk_chinodemanytomany_id, DATATYPE_IGNORE);
    }
    function getFkChinodeId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinode_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
    }
    function setFkChinodeId($fk_chinode_id)
    {
      return $this->setValue('fk_chinode_id', $fk_chinode_id, DATATYPE_IGNORE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    function getChiNodeOID()
    {
      $fkValue = $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNode($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiNode'), $args);
        }
        else {
          $this->setValue('fk_chinode_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiNodeManyToManyOID()
    {
      $fkValue = $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNodeManyToMany', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNodeManyToMany($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiNodeManyToMany'), $args);
        }
        else {
          $this->setValue('fk_chinodemanytomany_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiNodeParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getChiNodeManyToManyParents()
    {
      return $this->getParentsEx(null, 'ChiNodeManyToMany', null, null);
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
