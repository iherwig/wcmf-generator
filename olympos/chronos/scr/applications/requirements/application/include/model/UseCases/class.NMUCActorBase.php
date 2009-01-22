<?php
/**
 * This file was generated by wCMFGenerator 3.0.0001 from ./model/cwm.uml on Wed Jan 21 16:26:12 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/class.Node.php");

/**
 * @class NMUCActor
 * NMUCActor description: 
 *
 * @author 
 * @version 1.0
 */
class NMUCActorBase extends Node
{
    function NMUCActorBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Node('NMUCActor', $oid);
      else
        parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMUCActor");
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
      if ($name == 'fk_chibusinesspartner_id') $displayName = Message::get("fk_chibusinesspartner_id");
      if ($name == 'fk_chiworker_id') $displayName = Message::get("fk_chiworker_id");
      if ($name == 'fk_chibusinessusecasecore_id') $displayName = Message::get("fk_chibusinessusecasecore_id");
      if ($name == 'fk_actor_id') $displayName = Message::get("fk_actor_id");
      if ($name == 'fk_chibusinessusecase_id') $displayName = Message::get("fk_chibusinessusecase_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartner_id') $description = Message::get("");
      if ($name == 'fk_chiworker_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecasecore_id') $description = Message::get("");
      if ($name == 'fk_actor_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecase_id') $description = Message::get("");
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
    function getFkChibusinesspartnerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartnerId($fk_chibusinesspartner_id)
    {
      return $this->setValue('fk_chibusinesspartner_id', $fk_chibusinesspartner_id, DATATYPE_IGNORE);
    }
    function getFkChiworkerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworker_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworker_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerId($fk_chiworker_id)
    {
      return $this->setValue('fk_chiworker_id', $fk_chiworker_id, DATATYPE_IGNORE);
    }
    function getFkChibusinessusecasecoreId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessusecasecoreId($fk_chibusinessusecasecore_id)
    {
      return $this->setValue('fk_chibusinessusecasecore_id', $fk_chibusinessusecasecore_id, DATATYPE_IGNORE);
    }
    function getFkActorId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_actor_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_actor_id', DATATYPE_IGNORE);
    }
    function setFkActorId($fk_actor_id)
    {
      return $this->setValue('fk_actor_id', $fk_actor_id, DATATYPE_IGNORE);
    }
    function getFkChibusinessusecaseId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
    }
    function setFkChibusinessusecaseId($fk_chibusinessusecase_id)
    {
      return $this->setValue('fk_chibusinessusecase_id', $fk_chibusinessusecase_id, DATATYPE_IGNORE);
    }
    function getChiBusinessUseCaseOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCase(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessusecase_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getActorOID()
    {
      $fkValue = $this->getValue('fk_actor_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Actor', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActor(&$node)
    {
      if ($node != null)
        $this->setValue('fk_actor_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessUseCaseCoreOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCaseCore', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCaseCore(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinessusecasecore_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiWorkerOID()
    {
      $fkValue = $this->getValue('fk_chiworker_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorker', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorker(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chiworker_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessPartnerOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartner', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartner(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chibusinesspartner_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiBusinessUseCaseParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getActorParents()
    {
      return $this->getParentsEx(null, 'Actor', null, null);
    }
    function getChiBusinessUseCaseCoreParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
    }
    function getChiWorkerParents()
    {
      return $this->getParentsEx(null, 'ChiWorker', null, null);
    }
    function getChiBusinessPartnerParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartner', null, null);
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
