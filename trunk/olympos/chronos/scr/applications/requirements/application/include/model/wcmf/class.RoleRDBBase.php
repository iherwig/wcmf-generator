<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Apr 26 17:26:16 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/security/class.Role.php");

/**
 * @class RoleRDB
 * RoleRDB description: 
 *
 * @author 
 * @version 1.0
 */
class RoleRDBBase extends Role
{
    function RoleRDBBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'RoleRDB');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("RoleRDB");
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
      if ($name == 'name') $displayName = Message::get("name");
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'name') $description = Message::get("");
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
    /**
     * Getter/Setter for related objects
     */
    function __call($name, $arguments)
    {
      // child: NMUserRole
      if ($name == 'getNMUserRoleList')
    {
      Log::warn("use of deprecated method getNMUserRoleList. use getNMUserRoleChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMUserRoleChildren();
    }
      if ($name == 'getNMUserRoleChildren') {
        return $this->getChildrenEx(null, 'NMUserRole', array('fk_role_id' => $this->getDBID()), null, false);
    }
      if ($name == 'getUserRDBList')
    {
      Log::warn("use of deprecated method getUserRDBList. use getUserRDBChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getUserRDBChildren();
    }
      if ($name == 'getUserRDBChildren')
    {
      // the foreign key column does not exist
        return $this->getChildrenEx(null, 'UserRDB', null, null, false);
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
      // handle NMUserRole as many-to-many type
      if ($type == 'UserRDB')
      {
        // for every NMUserRole we have to load the UserRDB 
        $this->loadChildren('NMUserRole');
        $children = parent::getChildrenEx(null, 'NMUserRole', array('fk_role_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getUserRDBOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getUserRDBOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'UserRDB' || PersistenceFacade::getOIDParameter($oid, 'type') == 'UserRDB')
      {
        // for every NMUserRole we have to get the UserRDB parents 
        $children = parent::getChildrenEx(null, 'NMUserRole', array('fk_role_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'UserRDB')
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
      if ($child != null && $child->getType() == 'UserRDB')
      {
        // for every UserRDB we have to insert a NMUserRole
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMUserRole', array('fk_role_id' => $this->getDBID(), 'fk_user_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMUserRole', BUILDTYPE_SINGLE);
          $associationNode->setRoleRDB($this);
          $associationNode->setUserRDB($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'UserRDB')
      {
        // for every UserRDB we have to delete the NMUserRole
        // set childOID parameter to the NMUserRole's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_role_id' => $this->getDBID(), 'fk_user_id' => $ids[0]);
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
