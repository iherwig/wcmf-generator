<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:11:12 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class Locktable
 * Locktable description: 
 *
 * @author 
 * @version 1.0
 */
class LocktableBase extends Node
{
    function LocktableBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct('Locktable', $oid);
      else
        parent::__construct($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Locktable");
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
      if ($name == 'fk_user_id') $displayName = Message::get("fk_user_id");
      if ($name == 'objectid') $displayName = Message::get("objectid");
      if ($name == 'sessionid') $displayName = Message::get("sessionid");
      if ($name == 'since') $displayName = Message::get("since");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_user_id') $description = Message::get("");
      if ($name == 'objectid') $description = Message::get("");
      if ($name == 'sessionid') $description = Message::get("");
      if ($name == 'since') $description = Message::get("");
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
    function getObjectid($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('objectid', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('objectid', DATATYPE_ATTRIBUTE);
    }
    function setObjectid($objectid)
    {
      return $this->setValue('objectid', $objectid, DATATYPE_ATTRIBUTE);
    }
    function getSessionid($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('sessionid', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('sessionid', DATATYPE_ATTRIBUTE);
    }
    function setSessionid($sessionid)
    {
      return $this->setValue('sessionid', $sessionid, DATATYPE_ATTRIBUTE);
    }
    function getSince($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('since', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('since', DATATYPE_ATTRIBUTE);
    }
    function setSince($since)
    {
      return $this->setValue('since', $since, DATATYPE_ATTRIBUTE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // foreign key: UserRDB
      if ($name == 'getUserRDBOID')
    {
      $fkValue = $this->getValue('fk_user_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'UserRDB', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setUserRDB')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setUserRDB'), $arguments);
          }
          else {
        $node->addChild($this);
    }
        }
        return;
      }
      // parent: UserRDB
      if ($name == 'getUserRDBParents') {
      return $this->getParentsEx(null, 'UserRDB', null, null);
    }
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
