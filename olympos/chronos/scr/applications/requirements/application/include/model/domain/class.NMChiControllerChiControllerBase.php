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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-18 13:16. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Relation.php");

/**
 * @class NMChiControllerChiController
 * NMChiControllerChiController description: this class handle all the relationships between ChiControllers.
 *
 * @author 
 * @version 1.0
 */
class NMChiControllerChiControllerBase extends Relation
{
    function NMChiControllerChiControllerBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Relation($oid, 'NMChiControllerChiController');
      else
        parent::Relation($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMChiControllerChiController");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("this class handle all the relationships between ChiControllers.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chicontrollersource_id') $displayName = Message::get("fk_chicontrollersource_id");
      if ($name == 'fk_chicontrollertarget_id') $displayName = Message::get("fk_chicontrollertarget_id");
      if ($name == 'sourceMultiplicity') $displayName = Message::get("sourceMultiplicity");
      if ($name == 'sourceNavigability') $displayName = Message::get("sourceNavigability");
      if ($name == 'targetMultiplicity') $displayName = Message::get("targetMultiplicity");
      if ($name == 'targetNavigability') $displayName = Message::get("targetNavigability");
      if ($name == 'relationType') $displayName = Message::get("relationType");
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
      if ($name == 'fk_chicontrollersource_id') $description = Message::get("");
      if ($name == 'fk_chicontrollertarget_id') $description = Message::get("");
      if ($name == 'sourceMultiplicity') $description = Message::get("");
      if ($name == 'sourceNavigability') $description = Message::get("");
      if ($name == 'targetMultiplicity') $description = Message::get("");
      if ($name == 'targetNavigability') $description = Message::get("");
      if ($name == 'relationType') $description = Message::get("the type of relation");
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
    function getFkChicontrollersourceId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chicontrollersource_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chicontrollersource_id', DATATYPE_IGNORE);
    }
    function setFkChicontrollersourceId($fk_chicontrollersource_id)
    {
      return $this->setValue('fk_chicontrollersource_id', $fk_chicontrollersource_id, DATATYPE_IGNORE);
    }
    function getFkChicontrollertargetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chicontrollertarget_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chicontrollertarget_id', DATATYPE_IGNORE);
    }
    function setFkChicontrollertargetId($fk_chicontrollertarget_id)
    {
      return $this->setValue('fk_chicontrollertarget_id', $fk_chicontrollertarget_id, DATATYPE_IGNORE);
    }
    function getChiControllerTargetOID()
    {
      $fkValue = $this->getValue('fk_chicontrollertarget_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiControllerTarget(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chicontrollertarget_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiControllerSourceOID()
    {
      $fkValue = $this->getValue('fk_chicontrollersource_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiControllerSource(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chicontrollersource_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiControllerTargetParents()
    {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
    function getChiControllerSourceParents()
    {
      return $this->getParentsEx(null, 'ChiController', null, null);
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
    function getChildrenEx($oid, $type, $values, $properties)
    {
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties);
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
