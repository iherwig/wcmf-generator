<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 21.11.08 23:18. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class NMUserRole
 * NMUserRole description: 
 *
 * @author <ingo@wemove.com>
 * @version 1.0
 */
class NMUserRoleBase extends Node
{
    function NMUserRoleBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::Node('NMUserRole', $oid);
    else
      parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMUserRole");
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
      if ($name == 'fk_role_id') $displayName = Message::get("fk_role_id");
      if ($name == 'fk_user_id') $displayName = Message::get("fk_user_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_role_id') $description = Message::get("");
      if ($name == 'fk_user_id') $description = Message::get("");
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
    function getFkRoleId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_role_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_role_id', DATATYPE_IGNORE);
    }
    function setFkRoleId($fk_role_id)
    {
      return $this->setValue('fk_role_id', $fk_role_id, DATATYPE_IGNORE);
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
    function getUserRDBOID()
    {
      $fkValue = $this->getValue('fk_user_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'UserRDB', 'id' => array($fkValue)));
      else
        return null;
    }
    function setUserRDB(&$node)
    {
      if ($node != null)
        $this->setValue('fk_user_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getRoleRDBOID()
    {
      $fkValue = $this->getValue('fk_role_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'RoleRDB', 'id' => array($fkValue)));
      else
        return null;
    }
    function setRoleRDB(&$node)
    {
      if ($node != null)
        $this->setValue('fk_role_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getUserRDBParents()
    {
      return $this->getParentsEx(null, 'UserRDB', null, null);
    }
    function getRoleRDBParents()
    {
      return $this->getParentsEx(null, 'RoleRDB', null, null);
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
