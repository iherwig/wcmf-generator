<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Apr 26 17:27:50 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Relation.php");

/**
 * @class ChiActionKey
 * ChiActionKey description: An action key used in Chronos. An action key associates two controllers (to define a control flow) or a view with a controller (to define a view attachment). Controller, Views and Associations define the application flow.
 *
 * @author 
 * @version 1.0
 */
class ChiActionKeyBase extends Relation
{
    function ChiActionKeyBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiActionKey');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiActionKey");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("An action key used in Chronos. An action key associates two controllers (to define a control flow) or a view with a controller (to define a view attachment). Controller, Views and Associations define the application flow.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'action') $displayName = Message::get("action");
      if ($name == 'config') $displayName = Message::get("config");
      if ($name == 'context') $displayName = Message::get("context");
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
      if ($name == 'action') $description = Message::get("The Action which triggeres this association");
      if ($name == 'config') $description = Message::get("The configuration file in which this association will be placed");
      if ($name == 'context') $description = Message::get("The Context in which this association is valid");
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
    function getAction($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('action', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('action', DATATYPE_ATTRIBUTE);
    }
    function setAction($action)
    {
      return $this->setValue('action', $action, DATATYPE_ATTRIBUTE);
    }
    function getConfig($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('config', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('config', DATATYPE_ATTRIBUTE);
    }
    function setConfig($config)
    {
      return $this->setValue('config', $config, DATATYPE_ATTRIBUTE);
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
