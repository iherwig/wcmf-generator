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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:57 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiAssociation.php");

/**
 * @class ChiAssociationRDBMapper
 * ChiAssociationRDBMapper maps ChiAssociation Nodes to the database.
 * ChiAssociation description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class ChiAssociationRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiAssociation';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiAssociation($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiAssociation';
  }
  /**
   * @see PersistenceMapper::getPkNames()
   */
  function getPkNames()
  {
    return array('id' => DATATYPE_IGNORE);
  }
  /**
   * @see NodeUnifiedRDBMapper::getMyFKColumnNameImpl()
   */
  function getMyFKColumnNameImpl($parentType)
  {
  	// start from the most specific
    if ($this->getType() == 'NodeManyToManySourceEnd' && $parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomanysource_id';
    if ($this->getType() == 'NodeManyToManyTargetEnd' && $parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomanytarget_id';
    if ($this->getType() == 'NodeSourceEnd' && $parentType == 'ChiNode') return 'fk_chinodesource_id';
    if ($this->getType() == 'NodeTargetEnd' && $parentType == 'ChiNode') return 'fk_chinodetarget_id';
    if ($parentType == 'NodeManyToManySource') return 'fk_chinodemanytomanysource_id';
    if ($parentType == 'NodeManyToManyTarget') return 'fk_chinodemanytomanytarget_id';
    if ($parentType == 'ChiNodeSource') return 'fk_chinodesource_id';
    if ($parentType == 'ChiNodeTarget') return 'fk_chinodetarget_id';
    return '';
  }
  /**
   * @see NodeUnifiedRDBMapper::getOrderBy()
   */
  function getOrderBy()
  {
    return array();
  }
  /**
   * @see NodeUnifiedRDBMapper::getObjectDefinitionImpl()
   */
  function getObjectDefinitionImpl()
  {
    $nodeDef = array();
    $nodeDef['_properties'] = array
    (
      array('name' => 'manyToMany', 'value' => array('NodeManyToManySource', 'NodeManyToManyTarget', 'ChiNodeSource', 'ChiNodeTarget')),
      array('name' => 'is_searchable', 'value' => true),
      array('name' => 'display_value', 'value' => 'Name'),
// PROTECTED REGION ID(application/include/model/domain/class.ChiAssociationRDBMapper.php/Properties) ENABLED START
// PROTECTED REGION END
    );
    $nodeDef['_datadef'] = array
    (
     /* 
      * Value description: 
      */
      array('name' => 'id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'id', 'db_data_type' => 'INT(11) NOT NULL', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodetarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodetarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodesource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodesource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodemanytomanytarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodemanytomanytarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodemanytomanysource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodemanytomanysource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_name', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'fk_name', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'sourceName', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'sourcename', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'sourceMultiplicity', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'sourcemultiplicity', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:RelationMultiplicity', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'sourceNavigability', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'sourcenavigability', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fix:Navigable|Non-Navigable', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'targetName', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'targetname', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'targetMultiplicity', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'targetmultiplicity', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:RelationMultiplicity', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'targetNavigability', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'targetnavigability', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fix:Navigable|Non-Navigable', 'display_type' => 'text'),
     /* 
      * Value description: the type of relation
      */
      array('name' => 'relationType', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'relationtype', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the name of this object.
      */
      array('name' => 'Name', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'name', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the actual description of the object.
      */
      array('name' => 'Notes', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'notes', 'db_data_type' => 'TEXT', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'fckeditor', 'display_type' => 'text'),
     /* 
      * Value description: the creation date of this object
      */
      array('name' => 'created', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'created', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the user that created this object
      */
      array('name' => 'creator', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'creator', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the last user that edited this object
      */
      array('name' => 'last_editor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'last_editor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the date when this object was modified
      */
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the model version of this object
      */
      array('name' => 'umi', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'umi', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'NodeManyToManySource', 'is_navigable' => true, 'table_name' => 'ChiNodeManyToMany', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodemanytomanysource_id'),
      array('type' => 'NodeManyToManyTarget', 'is_navigable' => true, 'table_name' => 'ChiNodeManyToMany', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodemanytomanytarget_id'),
      array('type' => 'ChiNodeSource', 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodesource_id'),
      array('type' => 'ChiNodeTarget', 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodetarget_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
