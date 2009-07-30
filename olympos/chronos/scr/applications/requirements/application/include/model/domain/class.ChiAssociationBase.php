<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 30 11:28:53 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Relation.php");

/**
 * @class ChiAssociation
 * ChiAssociation description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class ChiAssociationBase extends Relation
{
    function ChiAssociationBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Relation($oid, 'ChiAssociation');
      else
        parent::Relation($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiAssociation");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("this class handle all the relationships between ChiNodes.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chinodetarget_id') $displayName = Message::get("fk_chinodetarget_id");
      if ($name == 'fk_chinodesource_id') $displayName = Message::get("fk_chinodesource_id");
      if ($name == 'fk_name') $displayName = Message::get("fk_name");
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
      if ($name == 'fk_chinodetarget_id') $description = Message::get("");
      if ($name == 'fk_chinodesource_id') $description = Message::get("");
      if ($name == 'fk_name') $description = Message::get("");
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
    function getFkChinodetargetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinodetarget_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinodetarget_id', DATATYPE_IGNORE);
    }
    function setFkChinodetargetId($fk_chinodetarget_id)
    {
      return $this->setValue('fk_chinodetarget_id', $fk_chinodetarget_id, DATATYPE_IGNORE);
    }
    function getFkChinodesourceId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinodesource_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinodesource_id', DATATYPE_IGNORE);
    }
    function setFkChinodesourceId($fk_chinodesource_id)
    {
      return $this->setValue('fk_chinodesource_id', $fk_chinodesource_id, DATATYPE_IGNORE);
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
    function getChiNodeSourceOID()
    {
      $fkValue = $this->getValue('fk_chinodesource_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNodeSource(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chinodesource_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiNodeTargetOID()
    {
      $fkValue = $this->getValue('fk_chinodetarget_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNodeTarget(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chinodetarget_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiNodeSourceParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getChiNodeTargetParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
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
