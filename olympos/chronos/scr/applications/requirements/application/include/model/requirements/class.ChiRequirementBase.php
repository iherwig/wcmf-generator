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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 30 17:48:15 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiRequirement
 * ChiRequirement description: A Business guide line about the Enterprise or the project.
 *
 * @author 
 * @version 1.0
 */
class ChiRequirementBase extends ChiBase
{
    function ChiRequirementBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiBase($oid, 'ChiRequirement');
      else
        parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiRequirement");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Business guide line about the Enterprise or the project.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chirequirement_id') $displayName = Message::get("fk_chirequirement_id");
      if ($name == 'fk_chigoal_id') $displayName = Message::get("fk_chigoal_id");
      if ($name == 'reqType') $displayName = Message::get("reqType");
      if ($name == 'Priority') $displayName = Message::get("Priority");
      if ($name == 'Author') $displayName = Message::get("Author");
      if ($name == 'Proofreader') $displayName = Message::get("Proofreader");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Version') $displayName = Message::get("Version");
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
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chirequirement_id') $description = Message::get("");
      if ($name == 'fk_chigoal_id') $description = Message::get("");
      if ($name == 'reqType') $description = Message::get("");
      if ($name == 'Priority') $description = Message::get("A priority in %. Requirements are ordered by priority.");
      if ($name == 'Author') $description = Message::get("This requirement's author's name and role in the project");
      if ($name == 'Proofreader') $description = Message::get("Each requirement needs to be confirmed. This requirement's proofreader's name and role in the project");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Version') $description = Message::get("the model version of this object");
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
    function getReqType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('reqType', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('reqType', DATATYPE_ATTRIBUTE);
    }
    function setReqType($reqType)
    {
      return $this->setValue('reqType', $reqType, DATATYPE_ATTRIBUTE);
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
    function getAuthor($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Author', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Author', DATATYPE_ATTRIBUTE);
    }
    function setAuthor($Author)
    {
      return $this->setValue('Author', $Author, DATATYPE_ATTRIBUTE);
    }
    function getProofreader($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Proofreader', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Proofreader', DATATYPE_ATTRIBUTE);
    }
    function setProofreader($Proofreader)
    {
      return $this->setValue('Proofreader', $Proofreader, DATATYPE_ATTRIBUTE);
    }
    function getStatus($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('Status', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('Status', DATATYPE_ATTRIBUTE);
    }
    function setStatus($Status)
    {
      return $this->setValue('Status', $Status, DATATYPE_ATTRIBUTE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    function getChiGoalOID()
    {
      $fkValue = $this->getValue('fk_chigoal_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiGoal', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiGoal($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiGoal'), $args);
        }
        else {
          $this->setValue('fk_chigoal_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiRequirementOID()
    {
      $fkValue = $this->getValue('fk_chirequirement_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiRequirement', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiRequirement($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiRequirement'), $args);
        }
        else {
          $this->setValue('fk_chirequirement_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getPackageOID()
    {
      $fkValue = $this->getValue('fk_package_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'Package', 'id' => array($fkValue)));
      else
        return null;
    }
    function setPackage($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setPackage'), $args);
        }
        else {
          $this->setValue('fk_package_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiGoalParents()
    {
      return $this->getParentsEx(null, 'ChiGoal', null, null);
    }
    function getChiRequirementParents()
    {
      return $this->getParentsEx(null, 'ChiRequirement', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getChiRequirementChildren() instead
     */
    function getChiRequirementList()
    {
      Log::warn("use of deprecated method getChiRequirementList. use getChiRequirementChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiRequirementChildren();
    }
    function getChiRequirementChildren()
    {
      return $this->getChildrenEx(null, 'ChiRequirement', array('fk_chirequirement_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiIssueChildren() instead
     */
    function getChiIssueList()
    {
      Log::warn("use of deprecated method getChiIssueList. use getChiIssueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiIssueChildren();
    }
    function getChiIssueChildren()
    {
      return $this->getChildrenEx(null, 'ChiIssue', array('fk_chirequirement_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getNMFeatureRequirementsChildren() instead
     */
    function getNMFeatureRequirementsList()
    {
      Log::warn("use of deprecated method getNMFeatureRequirementsList. use getNMFeatureRequirementsChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMFeatureRequirementsChildren();
    }
    function getNMFeatureRequirementsChildren()
    {
      return $this->getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiFeatureChildren() instead
     */
    function getChiFeatureList()
    {
      Log::warn("use of deprecated method getChiFeatureList. use getChiFeatureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiFeatureChildren();
    }
    function getChiFeatureChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiFeature', null, null, false);
    }
    /**
     * @deprecated use getFigureChildren() instead
     */
    function getFigureList()
    {
      Log::warn("use of deprecated method getFigureList. use getFigureChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getFigureChildren();
    }
    function getFigureChildren()
    {
      return $this->getChildrenEx(null, 'Figure', array('fk_chirequirement_id' => $this->getDBID()), null, false);
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
      // handle NMFeatureRequirements as many-to-many type
      if ($type == 'ChiFeature')
      {
        // for every NMFeatureRequirements we have to load the ChiFeature 
        $this->loadChildren('NMFeatureRequirements');
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiFeatureOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiFeatureOID(), BUILDDEPTH_SINGLE);
            if ($grandChild != null)
            {
              // establish connetcion
              $grandChild->addChild($children[$i]);
              $grandChild->setState(STATE_CLEAN);
              $children[$i]->setState(STATE_CLEAN);
            }
          }
        }
        return;
      }
      // do default
      parent::loadChildren($type, $buildDepth, $forceUpdate);
    }
    /**
     * @see Node::getChildrenEx()
     * Override this to also get the children of many-to-many relations
     */
    function getChildrenEx($oid, $type, $values, $properties, $useRegExp=true)
    {
      // handle NMFeatureRequirements as many-to-many type
      if ($type == 'ChiFeature' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiFeature')
      {
        // for every NMFeatureRequirements we have to get the ChiFeature parents 
        $children = parent::getChildrenEx(null, 'NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiFeature')
            {
              $tmpParents = $children[$i]->getParentsEx($parentoid, null, null, null);
              if (sizeof($tmpParents) > 0)
                $curChildParent = &$tmpParents[0];
              else
                $curChildParent = &$persistenceFacade->load($parentoid, BUILDDEPTH_SINGLE);
              if ($curChildParent != null)
                $grandChildrenParents[sizeof($grandChildrenParents)] = &$curChildParent;
            }
          }
          for($j=0; $j<sizeof($grandChildrenParents); $j++)
            $grandChildren[sizeof($grandChildren)] = &$grandChildrenParents[$j];
        }
        return Node::filter($grandChildren, $oid, $type, $values, $properties, $useRegExp);
      }
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties, $useRegExp);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      if ($child != null && $child->getType() == 'ChiFeature')
      {
        // for every ChiFeature we have to insert a NMFeatureRequirements
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMFeatureRequirements', array('fk_chirequirement_id' => $this->getDBID(), 'fk_chifeature_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMFeatureRequirements', BUILDTYPE_SINGLE);
          $associationNode->setChiRequirement($this);
          $associationNode->setChiFeature($child);
          // physically add the child to allow tree iteration for CommitVisior
          $this->addChild($associationNode);
          $child->addChild($associationNode);
        }
        else
          $associationNode = &$persistenceFacade->load($relOID, BUILDTYPE_SINGLE);
        // set child parameter to associationNode and prodeed with default behaviour
        $child = &$associationNode;
      }
      // do default
      parent::addChild($child, $addtype);
    }
    /**
     * @see Node::deleteChild()
     * Override this to delete association objects if necessary
     */
    function deleteChild($childOID, $reallyDelete=false)
    {
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiFeature')
      {
        // for every ChiFeature we have to delete the NMFeatureRequirements
        // set childOID parameter to the NMFeatureRequirements's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_chirequirement_id' => $this->getDBID(), 'fk_chifeature_id' => $ids[0]);
        $associationNode = &$this->getFirstChild('NMFeatureRequirements', $associationNodeConstraint, null, false);
        if ($associationNode != null)
          $childOID = $associationNode->getOID();
        else
        {
          // try to get it from the database
          $persistenceFacade = &PersistenceFacade::getInstance();
          $relOID = $persistenceFacade->getFirstOID('NMFeatureRequirements', $associationNodeConstraint);
          if ($relOID != null)
            $childOID = $relOID;
        }
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
