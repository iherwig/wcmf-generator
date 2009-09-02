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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 02 14:11:59 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiClass.php");

/**
 * @class ChiView
 * ChiView description: A ChiView is a logical class used to display a ChiNode
 *
 * @author 
 * @version 1.0
 */
class ChiViewBase extends ChiClass
{
    function ChiViewBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiClass($oid, 'ChiView');
      else
        parent::ChiClass($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiView");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A ChiView is a logical class used to display a ChiNode");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chinodemanytomany_id') $displayName = Message::get("fk_chinodemanytomany_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
      if ($name == 'Alias') $displayName = Message::get("Alias");
      if ($name == 'Status') $displayName = Message::get("Status");
      if ($name == 'Author') $displayName = Message::get("Author");
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
      if ($name == 'fk_chinodemanytomany_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chinode_id') $description = Message::get("");
      if ($name == 'Alias') $description = Message::get("the Project Id of this object.");
      if ($name == 'Status') $description = Message::get("");
      if ($name == 'Author') $description = Message::get("");
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
    function getFkChinodemanytomanyId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
    }
    function setFkChinodemanytomanyId($fk_chinodemanytomany_id)
    {
      return $this->setValue('fk_chinodemanytomany_id', $fk_chinodemanytomany_id, DATATYPE_IGNORE);
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
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    function getChiNodeOID()
    {
      $fkValue = $this->getValue('fk_chinode_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNode', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNode($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiNode'), $args);
        }
        else {
          $this->setValue('fk_chinode_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getChiNodeManyToManyOID()
    {
      $fkValue = $this->getValue('fk_chinodemanytomany_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiNodeManyToMany', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiNodeManyToMany($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiNodeManyToMany'), $args);
        }
        else {
          $this->setValue('fk_chinodemanytomany_id', $node->getDBID(), DATATYPE_IGNORE);
        }
      }
    }
    function getChiNodeParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getChiNodeManyToManyParents()
    {
      return $this->getParentsEx(null, 'ChiNodeManyToMany', null, null);
    }
    /**
     * @deprecated use getNMChiControllerActionKeyChiViewChildren() instead
     */
    function getNMChiControllerActionKeyChiViewList()
    {
      Log::warn("use of deprecated method getNMChiControllerActionKeyChiViewList. use getNMChiControllerActionKeyChiViewChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMChiControllerActionKeyChiViewChildren();
    }
    function getNMChiControllerActionKeyChiViewChildren()
    {
      return $this->getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chiview_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiControllerChildren() instead
     */
    function getChiControllerList()
    {
      Log::warn("use of deprecated method getChiControllerList. use getChiControllerChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiControllerChildren();
    }
    function getChiControllerChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiController', null, null, false);
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
      return $this->getChildrenEx(null, 'Figure', array('fk_chiview_id' => $this->getDBID()), null, false);
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
      // handle NMChiControllerActionKeyChiView as many-to-many type
      if ($type == 'ChiController')
      {
        // for every NMChiControllerActionKeyChiView we have to load the ChiController 
        $this->loadChildren('NMChiControllerActionKeyChiView');
        $children = parent::getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chiview_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiControllerOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiControllerOID(), BUILDDEPTH_SINGLE);
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
      // handle NMChiControllerActionKeyChiView as many-to-many type
      if ($type == 'ChiController' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiController')
      {
        // for every NMChiControllerActionKeyChiView we have to get the ChiController parents 
        $children = parent::getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chiview_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiController')
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
      if ($child != null && $child->getType() == 'ChiController')
      {
        // for every ChiController we have to insert a NMChiControllerActionKeyChiView
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMChiControllerActionKeyChiView', array('fk_chiview_id' => $this->getDBID(), 'fk_chicontroller_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMChiControllerActionKeyChiView', BUILDTYPE_SINGLE);
          $associationNode->setChiView($this);
          $associationNode->setChiController($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiController')
      {
        // for every ChiController we have to delete the NMChiControllerActionKeyChiView
        // set childOID parameter to the NMChiControllerActionKeyChiView's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_chiview_id' => $this->getDBID(), 'fk_chicontroller_id' => $ids[0]);
        $associationNode = &$this->getFirstChild('NMChiControllerActionKeyChiView', $associationNodeConstraint, null, false);
        if ($associationNode != null)
          $childOID = $associationNode->getOID();
        else
        {
          // try to get it from the database
          $persistenceFacade = &PersistenceFacade::getInstance();
          $relOID = $persistenceFacade->getFirstOID('NMChiControllerActionKeyChiView', $associationNodeConstraint);
          if ($relOID != null)
            $childOID = $relOID;
        }
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
