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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Nov 30 13:42:11 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiClass.php");

/**
 * @class ChiController
 * ChiController description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerBase extends ChiClass
{
    function ChiControllerBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiController');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiController");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_chibusinessusecasecore_id') $displayName = Message::get("fk_chibusinessusecasecore_id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chibusinessusecase_id') $displayName = Message::get("fk_chibusinessusecase_id");
      if ($name == 'visibility') $displayName = Message::get("visibility");
      if ($name == 'isAbstract') $displayName = Message::get("isAbstract");
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
      return Message::get($displayName);
    }
    /**
     * @see PersistentObject::getValueDescription()
     */
    function getValueDescription($name, $type=null)
    {
      $description = $name;
      if ($name == 'id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecasecore_id') $description = Message::get("");
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chibusinessusecase_id') $description = Message::get("");
      if ($name == 'visibility') $description = Message::get("the visibility of this class (Public, Private, Protected, Package)");
      if ($name == 'isAbstract') $description = Message::get("if this type reppresent an abstract type only.");
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
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
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
    function getChiBusinessUseCaseParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCase', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    function getChiBusinessUseCaseCoreParents()
    {
      return $this->getParentsEx(null, 'ChiBusinessUseCaseCore', null, null);
    }
    /**
     * @deprecated use getSourceActionKeyEndChildren() instead
     */
    function getSourceActionKeyEndList()
    {
      Log::warn("use of deprecated method getSourceActionKeyEndList. use getSourceActionKeyEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getSourceActionKeyEndChildren();
    }
    function getSourceActionKeyEndChildren()
    {
      return $this->getChildrenEx(null, 'NMChiControllerActionKeyChiController', array('fk_chicontrolleractionkeysource_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getTargetActionKeyEndChildren() instead
     */
    function getTargetActionKeyEndList()
    {
      Log::warn("use of deprecated method getTargetActionKeyEndList. use getTargetActionKeyEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getTargetActionKeyEndChildren();
    }
    function getTargetActionKeyEndChildren()
    {
      return $this->getChildrenEx(null, 'NMChiControllerActionKeyChiController', array('fk_chicontrolleractionkeytarget_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chicontroller_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiViewChildren() instead
     */
    function getChiViewList()
    {
      Log::warn("use of deprecated method getChiViewList. use getChiViewChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiViewChildren();
    }
    function getChiViewChildren()
    {
      // the foreign key column does not exist
      return $this->getChildrenEx(null, 'ChiView', null, null, false);
    }
    /**
     * @deprecated use getTargetEndChildren() instead
     */
    function getTargetEndList()
    {
      Log::warn("use of deprecated method getTargetEndList. use getTargetEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getTargetEndChildren();
    }
    function getTargetEndChildren()
    {
      return $this->getChildrenEx(null, 'NMChiControllerChiController', array('fk_chicontrollertarget_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getSourceEndChildren() instead
     */
    function getSourceEndList()
    {
      Log::warn("use of deprecated method getSourceEndList. use getSourceEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getSourceEndChildren();
    }
    function getSourceEndChildren()
    {
      return $this->getChildrenEx(null, 'NMChiControllerChiController', array('fk_chicontrollersource_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getPropertyChildren() instead
     */
    function getPropertyList()
    {
      Log::warn("use of deprecated method getPropertyList. use getPropertyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getPropertyChildren();
    }
    function getPropertyChildren()
    {
      return $this->getChildrenEx(null, 'Property', array('fk_chicontroller_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiNodeChildren() instead
     */
    function getChiNodeList()
    {
      Log::warn("use of deprecated method getChiNodeList. use getChiNodeChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiNodeChildren();
    }
    function getChiNodeChildren()
    {
      return $this->getChildrenEx(null, 'ChiNode', array('fk_chicontroller_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getOperationChildren() instead
     */
    function getOperationList()
    {
      Log::warn("use of deprecated method getOperationList. use getOperationChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getOperationChildren();
    }
    function getOperationChildren()
    {
      return $this->getChildrenEx(null, 'Operation', array('fk_chicontroller_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'Figure', array('fk_chicontroller_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiValueChildren() instead
     */
    function getChiValueList()
    {
      Log::warn("use of deprecated method getChiValueList. use getChiValueChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueChildren();
    }
    function getChiValueChildren()
    {
      return $this->getChildrenEx(null, 'ChiValue', array('fk_chicontroller_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiNodeManyToManyChildren() instead
     */
    function getChiNodeManyToManyList()
    {
      Log::warn("use of deprecated method getChiNodeManyToManyList. use getChiNodeManyToManyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiNodeManyToManyChildren();
    }
    function getChiNodeManyToManyChildren()
    {
      return $this->getChildrenEx(null, 'ChiNodeManyToMany', array('fk_chicontroller_id' => $this->getDBID()), null, false);
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
      if ($type == 'ChiView')
      {
        // for every NMChiControllerActionKeyChiView we have to load the ChiView 
        $this->loadChildren('NMChiControllerActionKeyChiView');
        $children = parent::getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chicontroller_id' => $this->getDBID()), null, false);
        $persistenceFacade = &PersistenceFacade::getInstance();
        $grandChildren = array();
        for($i=0; $i<sizeof($children); $i++)
        {
          if (PersistenceFacade::isValidOID($children[$i]->getChiViewOID()))
          {
            $grandChild = &$persistenceFacade->load($children[$i]->getChiViewOID(), BUILDDEPTH_SINGLE);
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
      if ($type == 'ChiView' || PersistenceFacade::getOIDParameter($oid, 'type') == 'ChiView')
      {
        // for every NMChiControllerActionKeyChiView we have to get the ChiView parents 
        $children = parent::getChildrenEx(null, 'NMChiControllerActionKeyChiView', array('fk_chicontroller_id' => $this->getDBID()), null, false);
        $grandChildren = array();
        $persistenceFacade = &PersistenceFacade::getInstance();
        for($i=0; $i<sizeof($children); $i++)
        {
          // load the parents
          $grandChildrenParents = array();
          foreach ($children[$i]->getProperty('parentoids') as $parentoid)
          {
            if (PersistenceFacade::getOIDParameter($parentoid, 'type') == 'ChiView')
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
      if ($child != null && $child->getType() == 'ChiView')
      {
        // for every ChiView we have to insert a NMChiControllerActionKeyChiView
        $persistenceFacade = &PersistenceFacade::getInstance();
        // check if the relation already exists
        $relOID = $persistenceFacade->getFirstOID('NMChiControllerActionKeyChiView', array('fk_chicontroller_id' => $this->getDBID(), 'fk_chiview_id' => $child->getDBID()));
        if ($relOID == null)
        {
          // add the child only if it is not added already
          $associationNode = &$persistenceFacade->create('NMChiControllerActionKeyChiView', BUILDTYPE_SINGLE);
          $associationNode->setChiController($this);
          $associationNode->setChiView($child);
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
      if (PersistenceFacade::isValidOID($childOID) && PersistenceFacade::getOIDParameter($childOID, 'type') == 'ChiView')
      {
        // for every ChiView we have to delete the NMChiControllerActionKeyChiView
        // set childOID parameter to the NMChiControllerActionKeyChiView's object id and proceed with default behaviour
        // check if the connection child is loaded already
        $ids = PersistenceFacade::getOIDParameter($childOID, 'id');
        $associationNodeConstraint = array('fk_chicontroller_id' => $this->getDBID(), 'fk_chiview_id' => $ids[0]);
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
