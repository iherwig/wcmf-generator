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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-28 11:58. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBase.php");

/**
 * @class ChiObject
 * ChiObject description: a chiObject reppresent an instance of a ChiNode or a Chivalue.
 *
 * @author 
 * @version 1.0
 */
class ChiObjectBase extends ChiBase
{
    function ChiObjectBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiBase($oid, 'ChiObject');
      else
        parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiObject");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("a chiObject reppresent an instance of a ChiNode or a Chivalue.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
      if ($name == 'fk_activityset_id') $displayName = Message::get("fk_activityset_id");
      if ($name == 'object_status') $displayName = Message::get("object_status");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Version') $displayName = Message::get("Version");
      if ($name == 'Name') $displayName = Message::get("Name");
      if ($name == 'Notes') $displayName = Message::get("Notes");
if ($name == 'Status') $description = Message::get("the state of this object");
	  if ($name == 'Author') $description = Message::get("the author of this object");
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
      if ($name == 'fk_chinode_id') $description = Message::get("");
      if ($name == 'fk_activityset_id') $description = Message::get("");
      if ($name == 'object_status') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Version') $description = Message::get("the model version of this object");
      if ($name == 'Name') $description = Message::get("the name of this object.");
      if ($name == 'Notes') $description = Message::get("the actual description of the object.");
if ($name == 'Status') $displayName = Message::get("Status");
		  if ($name == 'Author') $displayName = Message::get("Author");
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
    function getFkActivitysetId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_activityset_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_activityset_id', DATATYPE_IGNORE);
    }
    function setFkActivitysetId($fk_activityset_id)
    {
      return $this->setValue('fk_activityset_id', $fk_activityset_id, DATATYPE_IGNORE);
    }
    function getObjectStatus($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('object_status', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('object_status', DATATYPE_ATTRIBUTE);
    }
    function setObjectStatus($object_status)
    {
      return $this->setValue('object_status', $object_status, DATATYPE_ATTRIBUTE);
    }
    function getChiNodeName()
    {
      return $this->getValue('ChiNodeName', DATATYPE_ATTRIBUTE);
    }
    function getActivitySetOID()
    {
      $fkValue = $this->getValue('fk_activityset_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ActivitySet', 'id' => array($fkValue)));
      else
        return null;
    }
    function setActivitySet(&$node)
    {
      if ($node != null)
        $this->setValue('fk_activityset_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiNodeOID()
    {
      $fkValue = $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNode(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chinode_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getActivitySetParents()
    {
      return $this->getParentsEx(null, 'ActivitySet', null, null);
    }
    function getChiNodeParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getNMActivityChiObjectChildren() instead
     */
    function getNMActivityChiObjectList()
    {
      Log::warn("use of deprecated method getNMActivityChiObjectList. use getNMActivityChiObjectChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMActivityChiObjectChildren();
    }
    function getNMActivityChiObjectChildren()
    {
      return $this->getChildrenEx(null, 'NMActivityChiObject', array('fk_chiobject_id' => $this->getDBID()), null);
    }


    /**
     * @deprecated use getActivityChildren() instead
     */
    function getActivityList()
    {
      Log::warn("use of deprecated method getActivityList. use getActivityChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getActivityChildren();
    }
    function getActivityChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'Activity', null, null);
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
      return $this->getChildrenEx(null, 'Figure', array('fk_chiobject_id' => $this->getDBID()), null);
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
      // handle NMActivityChiObject as many-to-many type
      if ($type == 'Activity')
      {
        // for every NMActivityChiObject we have to load the Activity 
        $this->loadChildren('NMActivityChiObject');
        $children = parent::getChildrenEx(null, 'NMActivityChiObject', array('fk_chiobject_id' => $this->getDBID()), null);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getActivityOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getActivityOID(), BUILDDEPTH_SINGLE);
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
    function getChildrenEx($oid, $type, $values, $properties)
    {
      // handle NMActivityChiObject as many-to-many type
      if ($type == 'Activity' || PersistenceFacade::getOIDParameter($oid, 'type') == 'Activity')
      {
        // for every NMActivityChiObject we have to get the Activity parents 
        $children = parent::getChildrenEx(null, 'NMActivityChiObject', array('fk_chiobject_id' => $this->getDBID()), null);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'Activity')
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
        return Node::filter($grandChildren, $oid, $type, $values, $properties);
      }
      // do default
      return parent::getChildrenEx($oid, $type, $values, $properties);
    }
    /**
     * @see Node::addChild()
     * Override this to insert association objects if necessary
     */
    function addChild(&$child, $addtype=ADDCHILD_BACK)
    {
      if ($child != null && $child->getType() == 'Activity')
      {
        // for every Activity we have to insert a NMActivityChiObject
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMActivityChiObject', array('fk_chiobject_id' => $this->getDBID(), 'fk_activity_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMActivityChiObject', BUILDTYPE_SINGLE);
          $associationNode->setChiObject($this);
          $associationNode->setActivity($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'Activity')
      {
        // for every Activity we have to delete the NMActivityChiObject
        // set childOID parameter to the NMActivityChiObject's object id and prodeed with default behaviour
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        array_unshift($ids, $this->getDBID());
        $childOID = PersistenceFacade::composeOID(array('type' => 'NMActivityChiObject', 'id' => $ids));
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
