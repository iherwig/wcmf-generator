<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:15 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class NMFeatureRequirements
 * NMFeatureRequirements description: 
 *
 * @author 
 * @version 1.0
 */
class NMFeatureRequirementsBase extends Node
{
    function NMFeatureRequirementsBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct('NMFeatureRequirements', $oid);
      else
        parent::__construct($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMFeatureRequirements");
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
      if ($name == 'fk_chifeature_id') $displayName = Message::get("fk_chifeature_id");
      if ($name == 'fk_chirequirement_id') $displayName = Message::get("fk_chirequirement_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chifeature_id') $description = Message::get("");
      if ($name == 'fk_chirequirement_id') $description = Message::get("");
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
    function getFkChifeatureId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chifeature_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chifeature_id', DATATYPE_IGNORE);
    }
    function setFkChifeatureId($fk_chifeature_id)
    {
      return $this->setValue('fk_chifeature_id', $fk_chifeature_id, DATATYPE_IGNORE);
    }
    function getFkChirequirementId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chirequirement_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chirequirement_id', DATATYPE_IGNORE);
    }
    function setFkChirequirementId($fk_chirequirement_id)
    {
      return $this->setValue('fk_chirequirement_id', $fk_chirequirement_id, DATATYPE_IGNORE);
    }
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // foreign key: ChiRequirement
      if ($name == 'getChiRequirementOID')
    {
      $fkValue = $this->getValue('fk_chirequirement_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiRequirement', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiRequirement')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiRequirement'), $arguments);
          }
          else {
        $this->setValue('fk_chirequirement_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // foreign key: ChiFeature
      if ($name == 'getChiFeatureOID')
    {
      $fkValue = $this->getValue('fk_chifeature_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiFeature', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiFeature')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiFeature'), $arguments);
          }
          else {
        $this->setValue('fk_chifeature_id', $node->getDBID(), DATATYPE_IGNORE);
    }
        }
        return;
      }
      // parent: ChiRequirement
      if ($name == 'getChiRequirementParents') {
      return $this->getParentsEx(null, 'ChiRequirement', null, null);
    }
      // parent: ChiFeature
      if ($name == 'getChiFeatureParents') {
      return $this->getParentsEx(null, 'ChiFeature', null, null);
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
