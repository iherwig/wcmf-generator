<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Wed Mar 23 15:36:14 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Relation.php");

/**
 * @class NMChiNodeChiMany2Many
 * NMChiNodeChiMany2Many description: 
 *
 * @author 
 * @version 1.0
 */
class NMChiNodeChiMany2ManyBase extends Relation
{
    function NMChiNodeChiMany2ManyBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'NMChiNodeChiMany2Many');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMChiNodeChiMany2Many");
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
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
      if ($name == 'fk_chinodemanytomany_id') $displayName = Message::get("fk_chinodemanytomany_id");
      if ($name == 'fk_name') $displayName = Message::get("fk_name");
      if ($name == 'sourceName') $displayName = Message::get("sourceName");
      if ($name == 'sourceMultiplicity') $displayName = Message::get("sourceMultiplicity");
      if ($name == 'sourceNavigability') $displayName = Message::get("sourceNavigability");
      if ($name == 'targetName') $displayName = Message::get("targetName");
      if ($name == 'targetMultiplicity') $displayName = Message::get("targetMultiplicity");
      if ($name == 'targetNavigability') $displayName = Message::get("targetNavigability");
      if ($name == 'relationType') $displayName = Message::get("relationType");
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
      if ($name == 'fk_chinode_id') $description = Message::get("");
      if ($name == 'fk_chinodemanytomany_id') $description = Message::get("");
      if ($name == 'fk_name') $description = Message::get("");
      if ($name == 'sourceName') $description = Message::get("");
      if ($name == 'sourceMultiplicity') $description = Message::get("");
      if ($name == 'sourceNavigability') $description = Message::get("");
      if ($name == 'targetName') $description = Message::get("");
      if ($name == 'targetMultiplicity') $description = Message::get("");
      if ($name == 'targetNavigability') $description = Message::get("");
      if ($name == 'relationType') $description = Message::get("the type of relation");
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
    function getFkChinodeId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinode_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
    }
    function setFkChinodeId($fk_chinode_id)
    {
      return $this->setValue('fk_chinode_id', $fk_chinode_id, DATATYPE_IGNORE);
    }
    function getFkChinodemanytomanyId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
    }
    function setFkChinodemanytomanyId($fk_chinodemanytomany_id)
    {
      return $this->setValue('fk_chinodemanytomany_id', $fk_chinodemanytomany_id, DATATYPE_IGNORE);
    }
    function getFkName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('fk_name', DATATYPE_ATTRIBUTE);
    }
    function setFkName($fk_name)
    {
      return $this->setValue('fk_name', $fk_name, DATATYPE_ATTRIBUTE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // foreign key: ChiNodeManyToMany
      if ($name == 'getChiNodeManyToManyOID')
    {
      $fkValue = $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiNodeManyToMany', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiNodeManyToMany')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiNodeManyToMany'), $arguments);
          }
          else {
        $this->setValue('fk_chinodemanytomany_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // foreign key: NMChiNodeChiMany2ManyChiNodeEnd
      if ($name == 'getNMChiNodeChiMany2ManyChiNodeEndOID')
    {
      $fkValue = $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setNMChiNodeChiMany2ManyChiNodeEnd')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setNMChiNodeChiMany2ManyChiNodeEnd'), $arguments);
          }
          else {
        $this->setValue('fk_chinode_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // parent: ChiNodeManyToMany
      if ($name == 'getChiNodeManyToManyParents') {
      return $this->getParentsEx(null, 'ChiNodeManyToMany', null, null);
    }
      // parent: NMChiNodeChiMany2ManyChiNodeEnd
      if ($name == 'getNMChiNodeChiMany2ManyChiNodeEndParents') {
      return $this->getParentsEx(null, 'ChiNode', null, null);
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
