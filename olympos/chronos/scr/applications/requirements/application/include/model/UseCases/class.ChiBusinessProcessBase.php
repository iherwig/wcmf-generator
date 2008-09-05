<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 10:46. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.Package.php");

/**
 * @class ChiBusinessProcess
 * ChiBusinessProcess description: A Business Process is a sum of actions that produces a business advantage to the enterprise. It is composed by one or many ChiBusinessUseCases.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiBusinessProcessBase extends Package
{
    function ChiBusinessProcessBase($oid=null, $type=null)
    {
    if ($type == null)
      parent::Package($oid, 'ChiBusinessProcess');
    else
      parent::Package($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiBusinessProcess");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Business Process is a sum of actions that produces a business advantage to the enterprise. It is composed by one or many ChiBusinessUseCases.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_model_id') $displayName = Message::get("fk_model_id");
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
      if ($name == 'fk_model_id') $description = Message::get("");
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
    function getFkModelId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_model_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_model_id', DATATYPE_IGNORE);
    }
    function setFkModelId($fk_model_id)
    {
      return $this->setValue('fk_model_id', $fk_model_id, DATATYPE_IGNORE);
    }
    function getModelOID()
    {
      $fkValue = $this->getValue('fk_model_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Model', 'id' => array($fkValue)));
      else
        return null;
    }
    function setModel(&$node)
    {
      if ($node != null)
        $this->setValue('fk_model_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getModelParents()
    {
      return $this->getParentsEx(null, 'Model', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getChiBusinessUseCaseChildren() instead
     */
    function getChiBusinessUseCaseList()
    {
      Message::log("use of deprecated method getChiBusinessUseCaseList. use getChiBusinessUseCaseChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiBusinessUseCaseChildren();
    }
    function getChiBusinessUseCaseChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessUseCase', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiBusinessUseCaseCoreChildren() instead
     */
    function getChiBusinessUseCaseCoreList()
    {
      Message::log("use of deprecated method getChiBusinessUseCaseCoreList. use getChiBusinessUseCaseCoreChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiBusinessUseCaseCoreChildren();
    }
    function getChiBusinessUseCaseCoreChildren()
    {
      return $this->getChildrenEx(null, 'ChiBusinessUseCaseCore', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getActorChildren() instead
     */
    function getActorList()
    {
      Message::log("use of deprecated method getActorList. use getActorChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getActorChildren();
    }
    function getActorChildren()
    {
      return $this->getChildrenEx(null, 'Actor', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
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
      return $this->getChildrenEx(null, 'ChiGoal', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
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
      return $this->getChildrenEx(null, 'Package', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiIssueChildren() instead
     */
    function getChiIssueList()
    {
      Message::log("use of deprecated method getChiIssueList. use getChiIssueChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiIssueChildren();
    }
    function getChiIssueChildren()
    {
      return $this->getChildrenEx(null, 'ChiIssue', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getChiFeatureChildren() instead
     */
    function getChiFeatureList()
    {
      Message::log("use of deprecated method getChiFeatureList. use getChiFeatureChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getChiFeatureChildren();
    }
    function getChiFeatureChildren()
    {
      return $this->getChildrenEx(null, 'ChiFeature', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
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
      return $this->getChildrenEx(null, 'ChiRequirement', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
    }
    /**
     * @deprecated use getDiagramChildren() instead
     */
    function getDiagramList()
    {
      Message::log("use of deprecated method getDiagramList. use getDiagramChildren() instead.\n".Message::getStackTrace(), __FILE__, __LINE__);
      return $this->getDiagramChildren();
    }
    function getDiagramChildren()
    {
      return $this->getChildrenEx(null, 'Diagram', array('fk_chibusinessprocess_id' => $this->getDBID()), null);
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
