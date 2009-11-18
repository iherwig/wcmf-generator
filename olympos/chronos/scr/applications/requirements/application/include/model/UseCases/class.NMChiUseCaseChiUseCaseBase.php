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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 12:45:41 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Relation.php");

/**
 * @class NMChiUseCaseChiUseCase
 * NMChiUseCaseChiUseCase description: 
 *
 * @author 
 * @version 1.0
 */
class NMChiUseCaseChiUseCaseBase extends Relation
{
    function NMChiUseCaseChiUseCaseBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Relation($oid, 'NMChiUseCaseChiUseCase');
      else
        parent::Relation($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMChiUseCaseChiUseCase");
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
      if ($name == 'fk_chiusecasecoretarget_id') $displayName = Message::get("fk_chiusecasecoretarget_id");
      if ($name == 'fk_chiusecasecoresource_id') $displayName = Message::get("fk_chiusecasecoresource_id");
      if ($name == 'fk_chiusecasesource_id') $displayName = Message::get("fk_chiusecasesource_id");
      if ($name == 'fk_chiusecasetarget_id') $displayName = Message::get("fk_chiusecasetarget_id");
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
      if ($name == 'fk_chiusecasecoretarget_id') $description = Message::get("");
      if ($name == 'fk_chiusecasecoresource_id') $description = Message::get("");
      if ($name == 'fk_chiusecasesource_id') $description = Message::get("");
      if ($name == 'fk_chiusecasetarget_id') $description = Message::get("");
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
    function getFkChiusecasecoretargetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiusecasecoretarget_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiusecasecoretarget_id', DATATYPE_IGNORE);
    }
    function setFkChiusecasecoretargetId($fk_chiusecasecoretarget_id)
    {
      return $this->setValue('fk_chiusecasecoretarget_id', $fk_chiusecasecoretarget_id, DATATYPE_IGNORE);
    }
    function getFkChiusecasecoresourceId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiusecasecoresource_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiusecasecoresource_id', DATATYPE_IGNORE);
    }
    function setFkChiusecasecoresourceId($fk_chiusecasecoresource_id)
    {
      return $this->setValue('fk_chiusecasecoresource_id', $fk_chiusecasecoresource_id, DATATYPE_IGNORE);
    }
    function getFkChiusecasesourceId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiusecasesource_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiusecasesource_id', DATATYPE_IGNORE);
    }
    function setFkChiusecasesourceId($fk_chiusecasesource_id)
    {
      return $this->setValue('fk_chiusecasesource_id', $fk_chiusecasesource_id, DATATYPE_IGNORE);
    }
    function getFkChiusecasetargetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chiusecasetarget_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chiusecasetarget_id', DATATYPE_IGNORE);
    }
    function setFkChiusecasetargetId($fk_chiusecasetarget_id)
    {
      return $this->setValue('fk_chiusecasetarget_id', $fk_chiusecasetarget_id, DATATYPE_IGNORE);
    }
    function getChiUseCaseTargetOID()
    {
      $fkValue = $this->getValue('fk_chiusecasetarget_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiUseCaseTarget($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiUseCaseTarget'), $args);
        }
        else {
          $this->setValue('fk_chiusecasetarget_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiUseCaseSourceOID()
    {
      $fkValue = $this->getValue('fk_chiusecasesource_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCase', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiUseCaseSource($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiUseCaseSource'), $args);
        }
        else {
          $this->setValue('fk_chiusecasesource_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiUseCaseCoreSourceOID()
    {
      $fkValue = $this->getValue('fk_chiusecasecoresource_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCaseCore', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiUseCaseCoreSource($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiUseCaseCoreSource'), $args);
        }
        else {
          $this->setValue('fk_chiusecasecoresource_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiUseCaseCoreTargetOID()
    {
      $fkValue = $this->getValue('fk_chiusecasecoretarget_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiBusinessUseCaseCore', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiUseCaseCoreTarget($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiUseCaseCoreTarget'), $args);
        }
        else {
          $this->setValue('fk_chiusecasecoretarget_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiUseCaseTargetParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getChiUseCaseSourceParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getChiUseCaseCoreSourceParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
    }
    function getChiUseCaseCoreTargetParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
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
