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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Nov 26 12:45:14 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NMChiNodeChiMany2Many.php");

/**
 * @class NMChiNodeChiMany2ManyRDBMapper
 * NMChiNodeChiMany2ManyRDBMapper maps NMChiNodeChiMany2Many Nodes to the database.
 * NMChiNodeChiMany2Many description: 
 *
 * @author 
 * @version 1.0
 */
class NMChiNodeChiMany2ManyRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMChiNodeChiMany2Many';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMChiNodeChiMany2Many($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'NMChiNodeChiMany2Many';
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
    if ($this->getType() == 'NMChiNodeChiMany2Many' && $parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomany_id';
    if ($this->getType() == 'NMChiNodeChiMany2Many' && $parentType == 'ChiNode') return 'fk_chinode_id';
    if ($parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomany_id';
    if ($parentType == 'NMChiNodeChiMany2ManyChiNodeEnd') return 'fk_chinode_id';
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
      array('name' => 'manyToMany', 'value' => array('ChiNodeManyToMany', 'NMChiNodeChiMany2ManyChiNodeEnd')),
      array('name' => 'is_searchable', 'value' => false),
// PROTECTED REGION ID(application/include/model/domain/class.NMChiNodeChiMany2ManyRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_chinode_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinode_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodemanytomany_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodemanytomany_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('name' => 'targetMultiplicity', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'targetmultiplicity', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:RelationMultiplicity', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'targetNavigability', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'targetnavigability', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fix:Navigable|Non-Navigable', 'display_type' => 'text'),
     /* 
      * Value description: the type of relation
      */
      array('name' => 'relationType', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'relationtype', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fix:generalization|association|aggregation|composition', 'display_type' => 'text'),
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
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ChiNodeManyToMany', 'is_navigable' => true, 'table_name' => 'ChiNodeManyToMany', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodemanytomany_id'),
      array('type' => 'NMChiNodeChiMany2ManyChiNodeEnd', 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinode_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
