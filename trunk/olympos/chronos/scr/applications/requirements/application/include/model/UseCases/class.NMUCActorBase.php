<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Nov 19 17:29:14 CET 2009. 
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
      if ($name == 'fk_chiworkerexternal_id') $displayName = Message::get("fk_chiworkerexternal_id");
      if ($name == 'fk_chiworkerinternal_id') $displayName = Message::get("fk_chiworkerinternal_id");
      if ($name == 'fk_chiworker_id') $displayName = Message::get("fk_chiworker_id");
      if ($name == 'fk_chibusinesspartneractive_id') $displayName = Message::get("fk_chibusinesspartneractive_id");
      if ($name == 'fk_chibusinesspartnerpassive_id') $displayName = Message::get("fk_chibusinesspartnerpassive_id");
      if ($name == 'fk_chibusinesspartner_id') $displayName = Message::get("fk_chibusinesspartner_id");
      if ($name == 'fk_chibusinessusecasecore_id') $displayName = Message::get("fk_chibusinessusecasecore_id");
      if ($name == 'fk_chibusinessusecase_id') $displayName = Message::get("fk_chibusinessusecase_id");
      if ($name == 'fk_actor_id') $displayName = Message::get("fk_actor_id");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chiworkerexternal_id') $description = Message::get("");
      if ($name == 'fk_chiworkerinternal_id') $description = Message::get("");
      if ($name == 'fk_chiworker_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartneractive_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartnerpassive_id') $description = Message::get("");
      if ($name == 'fk_chibusinesspartner_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecasecore_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecase_id') $description = Message::get("");
      if ($name == 'fk_actor_id') $description = Message::get("");
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
    function getFkChiworkerexternalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerexternalId($fk_chiworkerexternal_id)
    {
      return $this->setValue('fk_chiworkerexternal_id', $fk_chiworkerexternal_id, DATATYPE_IGNORE);
    }
    function getFkChiworkerinternalId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
    }
    function setFkChiworkerinternalId($fk_chiworkerinternal_id)
    {
      return $this->setValue('fk_chiworkerinternal_id', $fk_chiworkerinternal_id, DATATYPE_IGNORE);
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
    function getFkChibusinesspartneractiveId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartneractiveId($fk_chibusinesspartneractive_id)
    {
      return $this->setValue('fk_chibusinesspartneractive_id', $fk_chibusinesspartneractive_id, DATATYPE_IGNORE);
    }
    function getFkChibusinesspartnerpassiveId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
    }
    function setFkChibusinesspartnerpassiveId($fk_chibusinesspartnerpassive_id)
    {
      return $this->setValue('fk_chibusinesspartnerpassive_id', $fk_chibusinesspartnerpassive_id, DATATYPE_IGNORE);
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
    function getActorOID()
    {
      $fkValue = $this->getValue('fk_actor_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Actor', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActor($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setActor'), $args);
        }
        else {
          $this->setValue('fk_actor_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiBusinessUseCaseOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecase_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCase($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiBusinessUseCase'), $args);
        }
        else {
          $this->setValue('fk_chibusinessusecase_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiBusinessUseCaseCoreOID()
    {
      $fkValue = $this->getValue('fk_chibusinessusecasecore_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCaseCore', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessUseCaseCore($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiBusinessUseCaseCore'), $args);
        }
        else {
          $this->setValue('fk_chibusinessusecasecore_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiBusinessPartnerOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartner_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartner', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartner($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiBusinessPartner'), $args);
        }
        else {
          $this->setValue('fk_chibusinesspartner_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiBusinessPartnerPassiveOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartnerpassive_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartnerPassive', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartnerPassive($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiBusinessPartnerPassive'), $args);
        }
        else {
          $this->setValue('fk_chibusinesspartnerpassive_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiBusinessPartnerActiveOID()
    {
      $fkValue = $this->getValue('fk_chibusinesspartneractive_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessPartnerActive', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiBusinessPartnerActive($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiBusinessPartnerActive'), $args);
        }
        else {
          $this->setValue('fk_chibusinesspartneractive_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiWorkerOID()
    {
      $fkValue = $this->getValue('fk_chiworker_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorker', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorker($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiWorker'), $args);
        }
        else {
          $this->setValue('fk_chiworker_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiWorkerInternalOID()
    {
      $fkValue = $this->getValue('fk_chiworkerinternal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorkerInternal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorkerInternal($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiWorkerInternal'), $args);
        }
        else {
          $this->setValue('fk_chiworkerinternal_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiWorkerExternalOID()
    {
      $fkValue = $this->getValue('fk_chiworkerexternal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiWorkerExternal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiWorkerExternal($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiWorkerExternal'), $args);
        }
        else {
          $this->setValue('fk_chiworkerexternal_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getActorParents()
    {
      return $this->getParentsEx(null, 'Actor', null, null);
    }
    function getChiBusinessUseCaseParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getChiBusinessUseCaseCoreParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
    }
    function getChiBusinessPartnerParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartner', null, null);
    }
    function getChiBusinessPartnerPassiveParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartnerPassive', null, null);
    }
    function getChiBusinessPartnerActiveParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessPartnerActive', null, null);
    }
    function getChiWorkerParents()
    {
      return $this->getParentsEx(null, 'ChiWorker', null, null);
    }
    function getChiWorkerInternalParents()
    {
      return $this->getParentsEx(null, 'ChiWorkerInternal', null, null);
    }
    function getChiWorkerExternalParents()
    {
      return $this->getParentsEx(null, 'ChiWorkerExternal', null, null);
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
