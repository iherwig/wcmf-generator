<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0012 from model/requirements.xmi on 25.08.08 19:09. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiWorker.php");

/**
 * @class ChiWorkerExternal
 * ChiWorkerExternal description: A Chi External Worker is an employee that interacts directly with ChiBusinesPartner outside the enterprise.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiWorkerExternalBase extends ChiWorker
{
    function ChiWorkerExternalBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiWorker($oid, 'ChiWorkerExternal');
    else
      parent::ChiWorker($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiWorkerExternal");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Chi External Worker is an employee that interacts directly with ChiBusinesPartner outside the enterprise.");
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
      if ($name == 'is_OfflineUser') $displayName = Message::get("is_OfflineUser");
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
      if ($name == 'is_OfflineUser') $description = Message::get("");
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
    function getIsOfflineUser($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('is_OfflineUser', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('is_OfflineUser', DATATYPE_ATTRIBUTE);
    }
    function setIsOfflineUser($is_OfflineUser)
    {
      return $this->setValue('is_OfflineUser', $is_OfflineUser, DATATYPE_ATTRIBUTE);
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
