<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:43:29 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiSystem
 * ChiSystem description: a ChiSystem is a entity for the configuration of a specific technology. it is transformed in a section within a configuration file.
 *
 * @author 
 * @version 1.0
 */
class ChiSystemBase extends ChiBase
{
    function ChiSystemBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiSystem');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiSystem");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("a ChiSystem is a entity for the configuration of a specific technology. it is transformed in a section within a configuration file.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'config') $displayName = Message::get("config");
      if ($name == 'plattform') $displayName = Message::get("plattform");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Version') $displayName = Message::get("Version");
      if ($name == 'umi') $displayName = Message::get("umi");
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
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'config') $description = Message::get("this is the name of the file where the pairs value name &amp; initial value will be generated ");
      if ($name == 'plattform') $description = Message::get("this is the target platform for this configuration item");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Author') $description = Message::get("");
      if ($name == 'Version') $description = Message::get("the model version of this object");
      if ($name == 'umi') $description = Message::get("the model version of this object");
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
    function getFkPackageId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_package_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_package_id', DATATYPE_IGNORE);
    }
    function setFkPackageId($fk_package_id)
    {
      return $this->setValue('fk_package_id', $fk_package_id, DATATYPE_IGNORE);
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
    function getPlattform($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('plattform', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('plattform', DATATYPE_ATTRIBUTE);
    }
    function setPlattform($plattform)
    {
      return $this->setValue('plattform', $plattform, DATATYPE_ATTRIBUTE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // foreign key: Package
      if ($name == 'getPackageOID')
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setPackage')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setPackage'), $arguments);
          }
          else {
        $node->addChild($this);
    }
        }
        return;
      }
      // parent: Package
      if ($name == 'getPackageParents') {
      return $this->getParentsEx(null, 'Package', null, null);
    }
      // child: Property
      if ($name == 'getPropertyList')
    {
      Log::warn("use of deprecated method getPropertyList. use getPropertyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getPropertyChildren();
    }
      if ($name == 'getPropertyChildren') {
        return $this->getChildrenEx(null, 'Property', array('fk_chisystem_id' => $this->getDBID()), null, false);
    }
      // child: Figure
      if ($name == 'getFigureList')
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
      if ($name == 'getFigureChildren') {
        return $this->getChildrenEx(null, 'Figure', array('fk_chisystem_id' => $this->getDBID()), null, false);
    }
      // child: ChiValue
      if ($name == 'getChiValueList')
    {
      Log::warn("use of deprecated method getChiValueList. use getChiValueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueChildren();
    }
      if ($name == 'getChiValueChildren') {
        return $this->getChildrenEx(null, 'ChiValue', array('fk_chisystem_id' => $this->getDBID()), null, false);
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
