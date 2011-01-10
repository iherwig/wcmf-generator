<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:29 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiGoal
 * ChiGoal description: a Measurable scope that the enterprise wants to achieve. 
 *
 * @author 
 * @version 1.0
 */
class ChiGoalBase extends ChiBase
{
    function ChiGoalBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiGoal');
      else
        parent::__construct($oid, $type);
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
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chigoal_id') $displayName = Message::get("fk_chigoal_id");
      if ($name == 'GoalType') $displayName = Message::get("GoalType");
      if ($name == 'Priority') $displayName = Message::get("Priority");
      if ($name == 'Value_ammount') $displayName = Message::get("Value_ammount");
      if ($name == 'Value_Goal') $displayName = Message::get("Value_Goal");
      if ($name == 'Value_Name') $displayName = Message::get("Value_Name");
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
      if ($name == 'fk_chigoal_id') $description = Message::get("");
      if ($name == 'GoalType') $description = Message::get("");
      if ($name == 'Priority') $description = Message::get("A priority in %");
      if ($name == 'Value_ammount') $description = Message::get("The actual amount of the value this goal intends to alter.");
      if ($name == 'Value_Goal') $description = Message::get("The amount by which the value is to be altered.");
      if ($name == 'Value_Name') $description = Message::get("The name of the value this goal intends to alter.");
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
    function getGoalType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('GoalType', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('GoalType', DATATYPE_ATTRIBUTE);
    }
    function setGoalType($GoalType)
    {
      return $this->setValue('GoalType', $GoalType, DATATYPE_ATTRIBUTE);
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
      // foreign key: ChiGoal
      if ($name == 'getChiGoalOID')
    {
      $fkValue = $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
        if ($fkValue != null) {
        return PersistenceFacade::composeOID(array('type' => 'ChiGoal', 'id' => array($fkValue)));
        }
        else {
        return null;
    }
      }
      if ($name == 'setChiGoal')
    {
        $node = &$arguments[0];
      if ($node != null)
        {
          if (!is_a($node, 'node') && !is_a($node, 'Node')) {
            call_user_func_array(array(parent, 'setChiGoal'), $arguments);
          }
          else {
        $this->setValue('fk_chigoal_id', $node->getDBID(), DATATYPE_IGNORE);
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
      // parent: ChiGoal
      if ($name == 'getChiGoalParents') {
      return $this->getParentsEx(null, 'ChiGoal', null, null);
    }
      // parent: Package
      if ($name == 'getPackageParents') {
      return $this->getParentsEx(null, 'Package', null, null);
    }
      // child: ChiGoal
      if ($name == 'getChiGoalList')
    {
      Log::warn("use of deprecated method getChiGoalList. use getChiGoalChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiGoalChildren();
    }
      if ($name == 'getChiGoalChildren') {
        return $this->getChildrenEx(null, 'ChiGoal', array('fk_chigoal_id' => $this->getDBID()), null, false);
    }
      // child: ChiRequirement
      if ($name == 'getChiRequirementList')
    {
      Log::warn("use of deprecated method getChiRequirementList. use getChiRequirementChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiRequirementChildren();
    }
      if ($name == 'getChiRequirementChildren') {
        return $this->getChildrenEx(null, 'ChiRequirement', array('fk_chigoal_id' => $this->getDBID()), null, false);
    }
      // child: Figure
      if ($name == 'getFigureList')
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
      if ($name == 'getFigureChildren') {
        return $this->getChildrenEx(null, 'Figure', array('fk_chigoal_id' => $this->getDBID()), null, false);
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
