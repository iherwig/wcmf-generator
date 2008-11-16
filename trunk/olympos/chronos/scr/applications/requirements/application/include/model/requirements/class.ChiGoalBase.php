<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 16.11.08 18:45. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiGoal
 * ChiGoal description: a Measurable scope that the enterprise wants to achieve. 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiGoalBase extends ChiBase
{
    function ChiGoalBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::ChiBase($oid, 'ChiGoal');
    else
      parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiGoal");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("a Measurable scope that the enterprise wants to achieve. ");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_figure_id') $displayName = Message::get("fk_figure_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chigoal_id') $displayName = Message::get("fk_chigoal_id");
      if ($name == 'Priority') $displayName = Message::get("Priority");
      if ($name == 'Value_Name') $displayName = Message::get("Value_Name");
      if ($name == 'Value_ammount') $displayName = Message::get("Value_ammount");
      if ($name == 'Value_Goal') $displayName = Message::get("Value_Goal");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_figure_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chigoal_id') $description = Message::get("");
      if ($name == 'Priority') $description = Message::get("A priority in %");
      if ($name == 'Value_Name') $description = Message::get("The name of the value this goal intends to alter");
      if ($name == 'Value_ammount') $description = Message::get("The actual amount of the value this goal intends to alter");
      if ($name == 'Value_Goal') $description = Message::get("The amount by which the value is to be altered");
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
    function getFkFigureId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_figure_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_figure_id', DATATYPE_IGNORE);
    }
    function setFkFigureId($fk_figure_id)
    {
      return $this->setValue('fk_figure_id', $fk_figure_id, DATATYPE_IGNORE);
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
    function getFkChigoalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chigoal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
    }
    function setFkChigoalId($fk_chigoal_id)
    {
      return $this->setValue('fk_chigoal_id', $fk_chigoal_id, DATATYPE_IGNORE);
    }
    function getPriority($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Priority', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Priority', DATATYPE_ATTRIBUTE);
    }
    function setPriority($Priority)
    {
      return $this->setValue('Priority', $Priority, DATATYPE_ATTRIBUTE);
    }
    function getValueName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Value_Name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Value_Name', DATATYPE_ATTRIBUTE);
    }
    function setValueName($Value_Name)
    {
      return $this->setValue('Value_Name', $Value_Name, DATATYPE_ATTRIBUTE);
    }
    function getValueAmmount($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Value_ammount', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Value_ammount', DATATYPE_ATTRIBUTE);
    }
    function setValueAmmount($Value_ammount)
    {
      return $this->setValue('Value_ammount', $Value_ammount, DATATYPE_ATTRIBUTE);
    }
    function getValueGoal($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Value_Goal', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Value_Goal', DATATYPE_ATTRIBUTE);
    }
    function setValueGoal($Value_Goal)
    {
      return $this->setValue('Value_Goal', $Value_Goal, DATATYPE_ATTRIBUTE);
    }
    function getChiGoalOID()
    {
      $fkValue = $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiGoal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiGoal(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chigoal_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getFigureOID()
    {
      $fkValue = $this->getValue('fk_figure_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Figure', 'id' => array($fkValue)));
      else
        return null;
    }
    function setFigure(&$node)
    {
      if ($node != null)
        $this->setValue('fk_figure_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiGoalParents()
    {
      return $this->getParentsEx(null, 'ChiGoal', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getFigureParents()
    {
      return $this->getParentsEx(null, 'Figure', null, null);
    }
    /**
     * @deprecated use getChiGoalChildren() instead
     */
    function getChiGoalList()
    {
      Message::log("use of deprecated method getChiGoalList. use getChiGoalChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiGoalChildren();
    }
    function getChiGoalChildren()
    {
      return $this->getChildrenEx(null, 'ChiGoal', array('fk_chigoal_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiRequirementChildren() instead
     */
    function getChiRequirementList()
    {
      Message::log("use of deprecated method getChiRequirementList. use getChiRequirementChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiRequirementChildren();
    }
    function getChiRequirementChildren()
    {
      return $this->getChildrenEx(null, 'ChiRequirement', array('fk_chigoal_id' => $this->getDBID()), null);
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
