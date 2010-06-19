<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:17:31 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class Property
 * Property description: this class reppresent an UML property
 *
 * @author 
 * @version 1.0
 */
class PropertyBase extends ChiBase
{
    function PropertyBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'Property');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Property");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("this class reppresent an UML property");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chicontroller_id') $displayName = Message::get("fk_chicontroller_id");
      if ($name == 'fk_chisystem_id') $displayName = Message::get("fk_chisystem_id");
      if ($name == 'default') $displayName = Message::get("default");
      if ($name == 'PropertyType') $displayName = Message::get("PropertyType");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Version') $displayName = Message::get("Version");
      if ($name == 'Name') $displayName = Message::get("Name");
      if ($name == 'Notes') $displayName = Message::get("Notes");
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
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chicontroller_id') $description = Message::get("");
      if ($name == 'fk_chisystem_id') $description = Message::get("");
      if ($name == 'default') $description = Message::get("his reppresent the default value that a property takes automagically.");
      if ($name == 'PropertyType') $description = Message::get("this is the type of this property (e.g. string. int, etc.). not necessary");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Author') $description = Message::get("");
      if ($name == 'Version') $description = Message::get("the model version of this object");
      if ($name == 'Name') $description = Message::get("the name of this object.");
      if ($name == 'Notes') $description = Message::get("the actual description of the object.");
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
    function getFkChicontrollerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chicontroller_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
    }
    function setFkChicontrollerId($fk_chicontroller_id)
    {
      return $this->setValue('fk_chicontroller_id', $fk_chicontroller_id, DATATYPE_IGNORE);
    }
    function getFkChisystemId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chisystem_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chisystem_id', DATATYPE_IGNORE);
    }
    function setFkChisystemId($fk_chisystem_id)
    {
      return $this->setValue('fk_chisystem_id', $fk_chisystem_id, DATATYPE_IGNORE);
    }
    function getDefault($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('default', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('default', DATATYPE_ATTRIBUTE);
    }
    function setDefault($default)
    {
      return $this->setValue('default', $default, DATATYPE_ATTRIBUTE);
    }
    function getPropertyType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('PropertyType', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('PropertyType', DATATYPE_ATTRIBUTE);
    }
    function setPropertyType($PropertyType)
    {
      return $this->setValue('PropertyType', $PropertyType, DATATYPE_ATTRIBUTE);
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
      // foreign key: ChiSystem
      if ($name == 'getChiSystemOID')
    {
      $fkValue = $this->getValue('fk_chisystem_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiSystem', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiSystem')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiSystem'), $arguments);
          }
          else {
        $this->setValue('fk_chisystem_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // foreign key: ChiController
      if ($name == 'getChiControllerOID')
    {
      $fkValue = $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiController')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiController'), $arguments);
          }
          else {
        $this->setValue('fk_chicontroller_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
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
        $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // parent: ChiSystem
      if ($name == 'getChiSystemParents') {
      return $this->getParentsEx(null, 'ChiSystem', null, null);
    }
      // parent: ChiController
      if ($name == 'getChiControllerParents') {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
      // parent: Package
      if ($name == 'getPackageParents') {
      return $this->getParentsEx(null, 'Package', null, null);
    }
      // child: Figure
      if ($name == 'getFigureList')
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
      if ($name == 'getFigureChildren') {
        return $this->getChildrenEx(null, 'Figure', array('fk_property_id' => $this->getDBID()), null, false);
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
