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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 02 14:11:25 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/security/class.User.php");

/**
 * @class UserRDB
 * UserRDB description: 
 *
 * @author 
 * @version 1.0
 */
class UserRDBBase extends User
{
    function UserRDBBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::User($oid, 'UserRDB');
      else
        parent::User($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("UserRDB");
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
      if ($name == 'login') $displayName = Message::get("login");
      if ($name == 'password') $displayName = Message::get("password");
      if ($name == 'name') $displayName = Message::get("name");
      if ($name == 'firstname') $displayName = Message::get("firstname");
      if ($name == 'config') $displayName = Message::get("config");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'login') $description = Message::get("");
      if ($name == 'password') $description = Message::get("");
      if ($name == 'name') $description = Message::get("");
      if ($name == 'firstname') $description = Message::get("");
      if ($name == 'config') $description = Message::get("");
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
    function getLogin($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('login', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('login', DATATYPE_ATTRIBUTE);
    }
    function setLogin($login)
    {
      return $this->setValue('login', $login, DATATYPE_ATTRIBUTE);
    }
    function getPassword($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('password', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('password', DATATYPE_ATTRIBUTE);
    }
    function setPassword($password)
    {
      return $this->setValue('password', $password, DATATYPE_ATTRIBUTE);
    }
    function getName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('name', DATATYPE_ATTRIBUTE);
    }
    function setName($name)
    {
      return $this->setValue('name', $name, DATATYPE_ATTRIBUTE);
    }
    function getFirstname($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('firstname', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('firstname', DATATYPE_ATTRIBUTE);
    }
    function setFirstname($firstname)
    {
      return $this->setValue('firstname', $firstname, DATATYPE_ATTRIBUTE);
    }
    function getConfig($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('config', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('config', DATATYPE_ATTRIBUTE);
    }
    function setConfig($config)
    {
      return $this->setValue('config', $config, DATATYPE_ATTRIBUTE);
    }
    /**
     * @deprecated use getLocktableChildren() instead
     */
    function getLocktableList()
    {
      Log::warn("use of deprecated method getLocktableList. use getLocktableChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getLocktableChildren();
    }
    function getLocktableChildren()
    {
      return $this->getChildrenEx(null, 'Locktable', array('fk_user_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getNMUserRoleChildren() instead
     */
    function getNMUserRoleList()
    {
      Log::warn("use of deprecated method getNMUserRoleList. use getNMUserRoleChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMUserRoleChildren();
    }
    function getNMUserRoleChildren()
    {
      return $this->getChildrenEx(null, 'NMUserRole', array('fk_user_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getRoleRDBChildren() instead
     */
    function getRoleRDBList()
    {
      Log::warn("use of deprecated method getRoleRDBList. use getRoleRDBChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getRoleRDBChildren();
    }
    function getRoleRDBChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'RoleRDB', null, null, false);
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
      // handle NMUserRole as many-to-many type
      if ($type == 'RoleRDB')
      {
        // for every NMUserRole we have to load the RoleRDB 
        $this->loadChildren('NMUserRole');
        $children = parent::getChildrenEx(null, 'NMUserRole', array('fk_user_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getRoleRDBOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getRoleRDBOID(), BUILDDEPTH_SINGLE);
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
      // handle NMUserRole as many-to-many type
      if ($type == 'RoleRDB' || PersistenceFacade::getOIDParameter($oid, 'type') == 'RoleRDB')
      {
        // for every NMUserRole we have to get the RoleRDB parents 
        $children = parent::getChildrenEx(null, 'NMUserRole', array('fk_user_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'RoleRDB')
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
      if ($child != null && $child->getType() == 'RoleRDB')
      {
        // for every RoleRDB we have to insert a NMUserRole
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUserRole', array('fk_user_id' => $this->getDBID(), 'fk_role_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUserRole', BUILDTYPE_SINGLE);
          $associationNode->setUserRDB($this);
          $associationNode->setRoleRDB($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'RoleRDB')
      {
        // for every RoleRDB we have to delete the NMUserRole
        // set childOID parameter to the NMUserRole's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_user_id' => $this->getDBID(), 'fk_role_id' => $ids[0]);
        $associationNode = &$this->getFirstChild('NMUserRole', $associationNodeConstraint, null, false);
        if ($associationNode != null)
          $childOID = $associationNode->getOID();
        else
        {
          // try to get it from the database
          $persistenceFacade = &PersistenceFacade::getInstance();
          $relOID = $persistenceFacade->getFirstOID('NMUserRole', $associationNodeConstraint);
          if ($relOID != null)
            $childOID = $relOID;
        }
      }
      // do default
      parent::deleteChild($childOID, $reallyDelete);
    }
}
?>
