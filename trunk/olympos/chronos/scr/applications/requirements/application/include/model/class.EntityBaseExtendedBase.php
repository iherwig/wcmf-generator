<?php
/**
 * This file was generated by wCMFGenerator 2.6.0001 from model/requirements.xmi on 03.04.08 20:09. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBase.php");

/**
 * @class EntityBaseExtended
 * EntityBaseExtended description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class EntityBaseExtendedBase extends EntityBase
{
    function EntityBaseExtendedBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::EntityBase($oid, 'EntityBaseExtended');
    else
      parent::EntityBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("EntityBaseExtended");
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
      if ($name == 'Name') $displayName = Message::get("Name");
      if ($name == 'Notes') $displayName = Message::get("Notes");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'Name') $description = Message::get("");
      if ($name == 'Notes') $description = Message::get("the actual descritpion");
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
    function getName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Name', DATATYPE_ATTRIBUTE);
    }
    function setName($Name)
    {
      return $this->setValue('Name', $Name, DATATYPE_ATTRIBUTE);
    }
    function getNotes($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Notes', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Notes', DATATYPE_ATTRIBUTE);
    }
    function setNotes($Notes)
    {
      return $this->setValue('Notes', $Notes, DATATYPE_ATTRIBUTE);
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
     * @see Node::getChildren()
     * Override this to include the children of many-to-many relations
     */
    function getChildren()
    {
      // get default children
      $children = parent::getChildren();

      return $children;
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
