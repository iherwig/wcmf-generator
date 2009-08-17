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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Aug 06 14:31:01 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.Property.php");

/**
 * @class ChiValue
 * ChiValue description: 
 *
 * @author 
 * @version 1.0
 */
class ChiValueBase extends Property
{
    function ChiValueBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Property($oid, 'ChiValue');
      else
        parent::Property($oid, $type);
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiValue");
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
      if ($name == 'fk_chisystem_id') $displayName = Message::get("fk_chisystem_id");
      if ($name == 'fk_chicontroller_id') $displayName = Message::get("fk_chicontroller_id");
      if ($name == 'fk_chinode_id') $displayName = Message::get("fk_chinode_id");
      if ($name == 'display_type') $displayName = Message::get("display_type");
      if ($name == 'restrictions_description') $displayName = Message::get("restrictions_description");
      if ($name == 'restrictions_match') $displayName = Message::get("restrictions_match");
      if ($name == 'restrictions_not_match') $displayName = Message::get("restrictions_not_match");
      if ($name == 'input_type') $displayName = Message::get("input_type");
      if ($name == 'app_data_type') $displayName = Message::get("app_data_type");
      if ($name == 'db_data_type') $displayName = Message::get("db_data_type");
      if ($name == 'is_editable') $displayName = Message::get("is_editable");
      if ($name == 'column_name') $displayName = Message::get("column_name");
      if ($name == 'default') $displayName = Message::get("default");
      if ($name == 'PropertyType') $displayName = Message::get("PropertyType");
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
      if ($name == 'fk_chisystem_id') $description = Message::get("");
      if ($name == 'fk_chicontroller_id') $description = Message::get("");
      if ($name == 'fk_chinode_id') $description = Message::get("");
      if ($name == 'display_type') $description = Message::get("The HTML display type for the attribute e.g. image<sup>11</sup>The interpretation of the display_type is done by DefaultValueRenderer or its subclasses..");
      if ($name == 'restrictions_description') $description = Message::get("A text describing the restrictions (both the negative and the positives), which will be shown in case of an error.");
      if ($name == 'restrictions_match') $description = Message::get("Regular expression, which must be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison..");
      if ($name == 'restrictions_not_match') $description = Message::get("Regular expression, which must not be matched by the attribute value<sup>11</sup>The PHP function preg_match is used for comparison..");
      if ($name == 'input_type') $description = Message::get("Definition of the attribute's input control in the HTML form<sup>11</sup>The interpretation of the input_type is done by DefaultControlRenderer or its subclasses..");
      if ($name == 'app_data_type') $description = Message::get("The attribute's application datatype. This can be used in the application to group attributes and execute special logic on them.");
      if ($name == 'db_data_type') $description = Message::get("The atribute's database type. This will be used in the table definition. e.g. INT, VARCHAR, TEXT, ...");
      if ($name == 'is_editable') $description = Message::get("Declares, if the attribute is editable in the UI. The backend can always edit atributes");
      if ($name == 'column_name') $description = Message::get("The name of the database column. If not given the attribute name will be used.");
      if ($name == 'default') $description = Message::get("his reppresent the default value that a property takes automagically.");
      if ($name == 'PropertyType') $description = Message::get("this is the type of this property (e.g. string. int, etc.). not necessary");
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
    function getFkChisystemId($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('fk_chisystem_id', DATATYPE_IGNORE);
      else
        return $this->getValue('fk_chisystem_id', DATATYPE_IGNORE);
    }
    function setFkChisystemId($fk_chisystem_id)
    {
      return $this->setValue('fk_chisystem_id', $fk_chisystem_id, DATATYPE_IGNORE);
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
    function getDisplayType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('display_type', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('display_type', DATATYPE_ATTRIBUTE);
    }
    function setDisplayType($display_type)
    {
      return $this->setValue('display_type', $display_type, DATATYPE_ATTRIBUTE);
    }
    function getRestrictionsDescription($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('restrictions_description', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('restrictions_description', DATATYPE_ATTRIBUTE);
    }
    function setRestrictionsDescription($restrictions_description)
    {
      return $this->setValue('restrictions_description', $restrictions_description, DATATYPE_ATTRIBUTE);
    }
    function getRestrictionsMatch($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('restrictions_match', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('restrictions_match', DATATYPE_ATTRIBUTE);
    }
    function setRestrictionsMatch($restrictions_match)
    {
      return $this->setValue('restrictions_match', $restrictions_match, DATATYPE_ATTRIBUTE);
    }
    function getRestrictionsNotMatch($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('restrictions_not_match', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('restrictions_not_match', DATATYPE_ATTRIBUTE);
    }
    function setRestrictionsNotMatch($restrictions_not_match)
    {
      return $this->setValue('restrictions_not_match', $restrictions_not_match, DATATYPE_ATTRIBUTE);
    }
    function getInputType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('input_type', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('input_type', DATATYPE_ATTRIBUTE);
    }
    function setInputType($input_type)
    {
      return $this->setValue('input_type', $input_type, DATATYPE_ATTRIBUTE);
    }
    function getAppDataType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('app_data_type', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('app_data_type', DATATYPE_ATTRIBUTE);
    }
    function setAppDataType($app_data_type)
    {
      return $this->setValue('app_data_type', $app_data_type, DATATYPE_ATTRIBUTE);
    }
    function getDbDataType($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('db_data_type', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('db_data_type', DATATYPE_ATTRIBUTE);
    }
    function setDbDataType($db_data_type)
    {
      return $this->setValue('db_data_type', $db_data_type, DATATYPE_ATTRIBUTE);
    }
    function getIsEditable($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('is_editable', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('is_editable', DATATYPE_ATTRIBUTE);
    }
    function setIsEditable($is_editable)
    {
      return $this->setValue('is_editable', $is_editable, DATATYPE_ATTRIBUTE);
    }
    function getColumnName($unconverted=false)
    {
      if ($unconverted)
        return $this->getUnconvertedValue('column_name', DATATYPE_ATTRIBUTE);
      else
        return $this->getValue('column_name', DATATYPE_ATTRIBUTE);
    }
    function setColumnName($column_name)
    {
      return $this->setValue('column_name', $column_name, DATATYPE_ATTRIBUTE);
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
    function getChiControllerOID()
    {
      $fkValue = $this->getValue('fk_chicontroller_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiController', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiController(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chicontroller_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiSystemOID()
    {
      $fkValue = $this->getValue('fk_chisystem_id', DATATYPE_IGNORE);
      if ($fkValue != null)
        return PersistenceFacade::composeOID(array('type' => 'ChiSystem', 'id' => array($fkValue)));
      else
        return null;
    }
    function setChiSystem(&$node)
    {
      if ($node != null)
        $this->setValue('fk_chisystem_id', $node->getDBID(), DATATYPE_IGNORE);
    }
    function getChiNodeParents()
    {
      return $this->getParentsEx(null, 'ChiNode', null, null);
    }
    function getChiControllerParents()
    {
      return $this->getParentsEx(null, 'ChiController', null, null);
    }
    function getChiSystemParents()
    {
      return $this->getParentsEx(null, 'ChiSystem', null, null);
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