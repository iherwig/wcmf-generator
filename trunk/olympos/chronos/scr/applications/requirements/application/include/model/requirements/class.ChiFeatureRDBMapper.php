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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Nov 30 13:41:54 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/requirements/class.ChiFeature.php");

/**
 * @class ChiFeatureRDBMapper
 * ChiFeatureRDBMapper maps ChiFeature Nodes to the database.
 * ChiFeature description: 
 *
 * @author 
 * @version 1.0
 */
class ChiFeatureRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiFeature';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiFeature($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiFeature';
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
    if ($this->getType() == 'ChiFeature' && $parentType == 'Package') return 'fk_package_id';
    if ($parentType == 'Package') return 'fk_package_id';
    return '';
  }
  /**
   * @see NodeUnifiedRDBMapper::getOrderBy()
   */
  function getOrderBy()
  {
    return array('sortkey');
  }
  /**
   * @see NodeUnifiedRDBMapper::getObjectDefinitionImpl()
   */
  function getObjectDefinitionImpl()
  {
    $nodeDef = array();
    $nodeDef['_properties'] = array
    (
      array('name' => 'is_searchable', 'value' => true),
      array('name' => 'display_value', 'value' => 'Name'),
// PROTECTED REGION ID(application/include/model/requirements/class.ChiFeatureRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_package_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_package_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: This feature's author's name and role in the project
      */
      array('name' => 'Author', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'author', 'db_data_type' => 'VARCHAR(255)', 'default' => 'myName, Analyst', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiAuthors', 'display_type' => 'text'),
     /* 
      * Value description: This feature's revisor's name and role in the project
      */
      array('name' => 'Proofreader', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'proofreader', 'db_data_type' => 'VARCHAR(255)', 'default' => 'aName, Client', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiAuthors', 'display_type' => 'text'),
     /* 
      * Value description: This feature's status
      */
      array('name' => 'Status', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'status', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiFeatureStatus', 'display_type' => 'text'),
     /* 
      * Value description: the Project Id of this object.
      */
      array('name' => 'Alias', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'alias', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the model version of this object
      */
      array('name' => 'Version', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'version', 'db_data_type' => 'VARCHAR(255)', 'default' => '1.0', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
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
      // Value description: Sort key for ordering
      array('name' => 'sortkey', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'sortkey', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '[0-9]*', 'is_editable' => true, 'input_type' => 'text[class="tiny"]')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'Package', 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id')
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'ChiBusinessUseCase', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCase', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id', 'order_by' => array('sortkey')),
      array('type' => 'NMFeatureRequirements', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMFeatureRequirements', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id', 'order_by' => array()),
      array('type' => 'Figure', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Figure', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id', 'order_by' => array()),
      array('type' => 'ChiBusinessUseCaseCore', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCaseCore', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id', 'order_by' => array('sortkey'))
    );
    return $nodeDef;
  }
}
?>
