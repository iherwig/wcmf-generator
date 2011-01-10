<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:54 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class History
 * History description: 
 *
 * @author 
 * @version 1.0
 */
class HistoryBase extends Node
{
    function HistoryBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct('History', $oid);
      else
        parent::__construct($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("History");
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
      if ($name == 'data') $displayName = Message::get("data");
      if ($name == 'duplicate') $displayName = Message::get("duplicate");
      if ($name == 'eventtype') $displayName = Message::get("eventtype");
      if ($name == 'affectedoid') $displayName = Message::get("affectedoid");
      if ($name == 'otheroid') $displayName = Message::get("otheroid");
      if ($name == 'timestamp') $displayName = Message::get("timestamp");
      if ($name == 'user') $displayName = Message::get("user");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'data') $description = Message::get("");
      if ($name == 'duplicate') $description = Message::get("");
      if ($name == 'eventtype') $description = Message::get("");
      if ($name == 'affectedoid') $description = Message::get("");
      if ($name == 'otheroid') $description = Message::get("");
      if ($name == 'timestamp') $description = Message::get("");
      if ($name == 'user') $description = Message::get("");
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
    function getData($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('data', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('data', DATATYPE_ATTRIBUTE);
    }
    function setData($data)
    {
      return $this->setValue('data', $data, DATATYPE_ATTRIBUTE);
    }
    function getDuplicate($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('duplicate', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('duplicate', DATATYPE_ATTRIBUTE);
    }
    function setDuplicate($duplicate)
    {
      return $this->setValue('duplicate', $duplicate, DATATYPE_ATTRIBUTE);
    }
    function getEventtype($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('eventtype', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('eventtype', DATATYPE_ATTRIBUTE);
    }
    function setEventtype($eventtype)
    {
      return $this->setValue('eventtype', $eventtype, DATATYPE_ATTRIBUTE);
    }
    function getAffectedoid($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('affectedoid', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('affectedoid', DATATYPE_ATTRIBUTE);
    }
    function setAffectedoid($affectedoid)
    {
      return $this->setValue('affectedoid', $affectedoid, DATATYPE_ATTRIBUTE);
    }
    function getOtheroid($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('otheroid', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('otheroid', DATATYPE_ATTRIBUTE);
    }
    function setOtheroid($otheroid)
    {
      return $this->setValue('otheroid', $otheroid, DATATYPE_ATTRIBUTE);
    }
    function getTimestamp($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('timestamp', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('timestamp', DATATYPE_ATTRIBUTE);
    }
    function setTimestamp($timestamp)
    {
      return $this->setValue('timestamp', $timestamp, DATATYPE_ATTRIBUTE);
    }
    function getUser($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('user', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('user', DATATYPE_ATTRIBUTE);
    }
    function setUser($user)
    {
      return $this->setValue('user', $user, DATATYPE_ATTRIBUTE);
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
