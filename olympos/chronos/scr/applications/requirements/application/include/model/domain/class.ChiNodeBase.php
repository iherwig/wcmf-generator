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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 17 13:20:07 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiClass.php");

/**
 * @class ChiNode
 * ChiNode description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class ChiNodeBase extends ChiClass
{
    function ChiNodeBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiClass($oid, 'ChiNode');
      else
        parent::ChiClass($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiNode");
    }
    /**
     * @see PersistentObject::getObjectDescription()
     */
    function getObjectDescription()
    {
      return Message::get("A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.");
    }
    /**
     * @see PersistentObject::getValueDisplayName()
     */
    function getValueDisplayName($name, $type=null)
    {
      $displayName = $name;
      if ($name == 'id') $displayName = Message::get("id");
      if ($name == 'fk_package_id') $displayName = Message::get("fk_package_id");
      if ($name == 'fk_chicontroller_id') $displayName = Message::get("fk_chicontroller_id");
      if ($name == 'display_value') $displayName = Message::get("display_value");
      if ($name == 'parent_order') $displayName = Message::get("parent_order");
      if ($name == 'child_order') $displayName = Message::get("child_order");
      if ($name == 'pk_name') $displayName = Message::get("pk_name");
      if ($name == 'is_searchable') $displayName = Message::get("is_searchable");
      if ($name == 'orderby') $displayName = Message::get("orderby");
      if ($name == 'is_soap') $displayName = Message::get("is_soap");
      if ($name == 'initparams') $displayName = Message::get("initparams");
      if ($name == 'table_name') $displayName = Message::get("table_name");
      if ($name == 'is_ordered') $displayName = Message::get("is_ordered");
      if ($name == 'visibility') $displayName = Message::get("visibility");
      if ($name == 'isAbstract') $displayName = Message::get("isAbstract");
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
      if ($name == 'fk_package_id') $description = Message::get("");
      if ($name == 'fk_chicontroller_id') $description = Message::get("");
      if ($name == 'display_value') $description = Message::get("The value that is displayed in a list view. a single value or '|' -separated list of values");
      if ($name == 'parent_order') $description = Message::get("The order of the associated parents. a single value or '|' -separated list of values");
      if ($name == 'child_order') $description = Message::get("The order of the associated children. a single value or '|' -separated list of values");
      if ($name == 'pk_name') $description = Message::get("The name of the primary key column on the database (optional). The generator will add this automatically if there is no appropriate attribute.");
      if ($name == 'is_searchable') $description = Message::get("Indicates wether this type should be included in the default search.");
      if ($name == 'orderby') $description = Message::get("Definition of default sorting. Possible values: 'none' (no order), 'sortkey' (generates a 'sortkey' column, that is used for explicit sorting) or any the name of any WCMFValue defined in the node optionally.");
      if ($name == 'is_soap') $description = Message::get("Define if the type should be exposed to the SOAP interface.");
      if ($name == 'initparams') $description = Message::get("Name of the configuration file's (config.ini) section, in which the initial parameters for the corresponding mapper are defined");
      if ($name == 'table_name') $description = Message::get("");
      if ($name == 'is_ordered') $description = Message::get("");
      if ($name == 'visibility') $description = Message::get("the visibility of this class (Public, Private, Protected, Package)");
      if ($name == 'isAbstract') $description = Message::get("if this type reppresent an abstract type only.");
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
    function getFkChicontrollerId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chicontroller_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
    }
    function setFkChicontrollerId($fk_chicontroller_id)
    {
      return $this->setValue('fk_chicontroller_id', $fk_chicontroller_id, DATATYPE_IGNORE);
    }
    function getDisplayValue($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('display_value', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('display_value', DATATYPE_ATTRIBUTE);
    }
    function setDisplayValue($display_value)
    {
      return $this->setValue('display_value', $display_value, DATATYPE_ATTRIBUTE);
    }
    function getParentOrder($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('parent_order', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('parent_order', DATATYPE_ATTRIBUTE);
    }
    function setParentOrder($parent_order)
    {
      return $this->setValue('parent_order', $parent_order, DATATYPE_ATTRIBUTE);
    }
    function getChildOrder($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('child_order', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('child_order', DATATYPE_ATTRIBUTE);
    }
    function setChildOrder($child_order)
    {
      return $this->setValue('child_order', $child_order, DATATYPE_ATTRIBUTE);
    }
    function getPkName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('pk_name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('pk_name', DATATYPE_ATTRIBUTE);
    }
    function setPkName($pk_name)
    {
      return $this->setValue('pk_name', $pk_name, DATATYPE_ATTRIBUTE);
    }
    function getIsSearchable($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('is_searchable', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('is_searchable', DATATYPE_ATTRIBUTE);
    }
    function setIsSearchable($is_searchable)
    {
      return $this->setValue('is_searchable', $is_searchable, DATATYPE_ATTRIBUTE);
    }
    function getOrderby($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('orderby', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('orderby', DATATYPE_ATTRIBUTE);
    }
    function setOrderby($orderby)
    {
      return $this->setValue('orderby', $orderby, DATATYPE_ATTRIBUTE);
    }
    function getIsSoap($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('is_soap', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('is_soap', DATATYPE_ATTRIBUTE);
    }
    function setIsSoap($is_soap)
    {
      return $this->setValue('is_soap', $is_soap, DATATYPE_ATTRIBUTE);
    }
    function getInitparams($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('initparams', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('initparams', DATATYPE_ATTRIBUTE);
    }
    function setInitparams($initparams)
    {
      return $this->setValue('initparams', $initparams, DATATYPE_ATTRIBUTE);
    }
    function getTableName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('table_name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('table_name', DATATYPE_ATTRIBUTE);
    }
    function setTableName($table_name)
    {
      return $this->setValue('table_name', $table_name, DATATYPE_ATTRIBUTE);
    }
    function getIsOrdered($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('is_ordered', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('is_ordered', DATATYPE_ATTRIBUTE);
    }
    function setIsOrdered($is_ordered)
    {
      return $this->setValue('is_ordered', $is_ordered, DATATYPE_ATTRIBUTE);
    }
    function getSortkey()
    {
      return $this->getValue('sortkey', DATATYPE_IGNORE);
    }
    function setSortkey($sortkey)
    {
      return $this->setValue('sortkey', $sortkey, DATATYPE_IGNORE);
    }
    function getChiControllerOID()
    {
      $fkValue = $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiController($node)
    {
      if ($node != null) {
        if (!is_a($node, 'node') && !is_a($node, 'Node')) {
          $args = func_get_args();
          call_user_func_array(array(parent, 'setChiController'), $args);
        }
        else {
          $this->setValue('fk_chicontroller_id', $node->getDBID(), DATATYPE_IGNORE);
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
    function getChiControllerParents()
    {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
    function getPackageParents()
    {
      return $this->getParentsEx(null, 'Package', null, null);
    }
    /**
     * @deprecated use getChiObjectChildren() instead
     */
    function getChiObjectList()
    {
      Log::warn("use of deprecated method getChiObjectList. use getChiObjectChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiObjectChildren();
    }
    function getChiObjectChildren()
    {
      return $this->getChildrenEx(null, 'ChiObject', array('fk_chinode_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getNMChiNodeChiMany2ManyChildren() instead
     */
    function getNMChiNodeChiMany2ManyList()
    {
      Log::warn("use of deprecated method getNMChiNodeChiMany2ManyList. use getNMChiNodeChiMany2ManyChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNMChiNodeChiMany2ManyChildren();
    }
    function getNMChiNodeChiMany2ManyChildren()
    {
      return $this->getChildrenEx(null, 'NMChiNodeChiMany2Many', array('fk_chinode_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getChiValueRefChildren() instead
     */
    function getChiValueRefList()
    {
      Log::warn("use of deprecated method getChiValueRefList. use getChiValueRefChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getChiValueRefChildren();
    }
    function getChiValueRefChildren()
    {
      return $this->getChildrenEx(null, 'ChiValueRef', array('fk_chinode_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'ChiView', array('fk_chinode_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'ChiValue', array('fk_chinode_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getNodeTargetEndChildren() instead
     */
    function getNodeTargetEndList()
    {
      Log::warn("use of deprecated method getNodeTargetEndList. use getNodeTargetEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNodeTargetEndChildren();
    }
    function getNodeTargetEndChildren()
    {
      return $this->getChildrenEx(null, 'ChiAssociation', array('fk_chinodetarget_id' => $this->getDBID()), null, false);
    }
    /**
     * @deprecated use getNodeSourceEndChildren() instead
     */
    function getNodeSourceEndList()
    {
      Log::warn("use of deprecated method getNodeSourceEndList. use getNodeSourceEndChildren() instead.\n".WCMFException::getStackTrace(), __CLASS__);
      return $this->getNodeSourceEndChildren();
    }
    function getNodeSourceEndChildren()
    {
      return $this->getChildrenEx(null, 'ChiAssociation', array('fk_chinodesource_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'Operation', array('fk_chinode_id' => $this->getDBID()), null, false);
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
      return $this->getChildrenEx(null, 'Figure', array('fk_chinode_id' => $this->getDBID()), null, false);
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
