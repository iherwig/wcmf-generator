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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Aug 19 14:27:20 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/wcmf/class.UserRDB.php");

/**
 * @class UserRDBRDBMapper
 * UserRDBRDBMapper maps UserRDB Nodes to the database.
 * UserRDB description: 
 *
 * @author 
 * @version 1.0
 */
class UserRDBRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'UserRDB';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new UserRDB($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'user';
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
      array('name' => 'is_searchable', 'value' => true),
      array('name' => 'display_value', 'value' => 'login'),
// PROTECTED REGION ID(application/include/model/wcmf/class.UserRDBRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'login', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'login', 'db_data_type' => 'VARCHAR(50)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'password', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'password', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'password', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'name', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'name', 'db_data_type' => 'VARCHAR(50)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'firstname', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'firstname', 'db_data_type' => 'VARCHAR(50)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'config', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'config', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fkt:g_getConfigFiles', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'Locktable', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'locktable', 'pk_columns' => array('id'), 'fk_columns' => 'fk_user_id', 'order_by' => array()),
      array('type' => 'NMUserRole', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'nm_user_role', 'pk_columns' => array('fk_user_id', 'fk_role_id'), 'fk_columns' => 'fk_user_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
