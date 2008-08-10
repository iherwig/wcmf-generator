<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0010 from model/requirements.xmi on 10.08.08 11:37. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseExtended.php");

/**
 * @class ChiBase
 * ChiBase description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiBaseBase extends EntityBaseExtended
{
    function ChiBaseBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::EntityBaseExtended($oid, 'ChiBase');
    else
      parent::EntityBaseExtended($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiBase");
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
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Version') $displayName = Message::get("Version");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("");
      if ($name == 'Version') $description = Message::get("");
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
    function getAlias($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Alias', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Alias', DATATYPE_ATTRIBUTE);
    }
    function setAlias($Alias)
    {
      return $this->setValue('Alias', $Alias, DATATYPE_ATTRIBUTE);
    }
    function getVersion($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Version', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Version', DATATYPE_ATTRIBUTE);
    }
    function setVersion($Version)
    {
      return $this->setValue('Version', $Version, DATATYPE_ATTRIBUTE);
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
