<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 08.09.08 19:43. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class Model
 * Model description: a model is the start of the Chronos onthology tree.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ModelBase extends ChiBase
{
    function ModelBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiBase($oid, 'Model');
    else
      parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("Model");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("a model is the start of the Chronos onthology tree.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chibusinessprocess_id') $displayName = Message::get("fk_chibusinessprocess_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chibusinessprocess_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
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
    function getFkChibusinessprocessId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessprocessId($fk_chibusinessprocess_id)
    {
      return $this->setValue('fk_chibusinessprocess_id', $fk_chibusinessprocess_id, DATATYPE_IGNORE);
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
    function getPackageOID()
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
      else
        return null;
    }
    function setPackage(&$node)
    {
      if ($node != null)
        $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessProcessOID()
    {
      $fkValue = $this->getValue('fk_chibusinessprocess_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessProcess', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessProcess(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessprocess_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getChiBusinessProcessParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessProcess', null, null);
    }
    /**
     * @deprecated use getPackageChildren() instead
     */
    function getPackageList()
    {
      Message::log("use of deprecated method getPackageList. use getPackageChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getPackageChildren();
    }
    function getPackageChildren()
    {
      return $this->getChildrenEx(null, 'Package', array('fk_model_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiBusinessProcessChildren() instead
     */
    function getChiBusinessProcessList()
    {
      Message::log("use of deprecated method getChiBusinessProcessList. use getChiBusinessProcessChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiBusinessProcessChildren();
    }
    function getChiBusinessProcessChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessProcess', array('fk_model_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getFigureChildren() instead
     */
    function getFigureList()
    {
      Message::log("use of deprecated method getFigureList. use getFigureChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getFigureChildren();
    }
    function getFigureChildren()
    {
      return $this->getChildrenEx(null, 'Figure', array('fk_model_id' => $this->getDBID()), null);
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
