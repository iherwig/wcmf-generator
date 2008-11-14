<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 13.11.08 20:44. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class EntityBase
 * EntityBase description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class EntityBaseBase extends Node
{
    function EntityBaseBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::Node('EntityBase', $oid);
    else
      parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("EntityBase");
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
      if ($name == 'created') $description = Message::get("");
      if ($name == 'creator') $description = Message::get("");
      if ($name == 'last_editor') $description = Message::get("");
      if ($name == 'modified') $description = Message::get("");
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
    function getCreated($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('created', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('created', DATATYPE_ATTRIBUTE);
    }
    function setCreated($created)
    {
      return $this->setValue('created', $created, DATATYPE_ATTRIBUTE);
    }
    function getCreator($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('creator', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('creator', DATATYPE_ATTRIBUTE);
    }
    function setCreator($creator)
    {
      return $this->setValue('creator', $creator, DATATYPE_ATTRIBUTE);
    }
    function getLastEditor($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('last_editor', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('last_editor', DATATYPE_ATTRIBUTE);
    }
    function setLastEditor($last_editor)
    {
      return $this->setValue('last_editor', $last_editor, DATATYPE_ATTRIBUTE);
    }
    function getModified($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('modified', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('modified', DATATYPE_ATTRIBUTE);
    }
    function setModified($modified)
    {
      return $this->setValue('modified', $modified, DATATYPE_ATTRIBUTE);
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
