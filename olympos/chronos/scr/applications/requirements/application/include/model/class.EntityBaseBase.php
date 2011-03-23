<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Wed Mar 23 15:35:56 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class EntityBase
 * EntityBase description: 
 *
 * @author 
 * @version 1.0
 */
class EntityBaseBase extends Node
{
    function EntityBaseBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct('EntityBase', $oid);
      else
        parent::__construct($type, $oid);
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
    function getUmi($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('umi', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('umi', DATATYPE_ATTRIBUTE);
    }
    function setUmi($umi)
    {
      return $this->setValue('umi', $umi, DATATYPE_ATTRIBUTE);
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
