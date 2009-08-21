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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Fri Aug 21 14:36:36 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/wcmf/class.NMUserRole.php");

/**
 * @class NMUserRoleRDBMapper
 * NMUserRoleRDBMapper maps NMUserRole Nodes to the database.
 * NMUserRole description: 
 *
 * @author 
 * @version 1.0
 */
class NMUserRoleRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMUserRole';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMUserRole($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'nm_user_role';
  }
  /**
   * @see PersistenceMapper::getPkNames()
   */
  function getPkNames()
  {
    return array('fk_user_id' => DATATYPE_IGNORE, 'fk_role_id' => DATATYPE_IGNORE);
  }
  /**
   * @see NodeUnifiedRDBMapper::getMyFKColumnNameImpl()
   */
  function getMyFKColumnNameImpl($parentType)
  {
  	// start from the most specific
    if ($this->getType() == 'NMUserRole' && $parentType == 'RoleRDB') return 'fk_role_id';
    if ($this->getType() == 'NMUserRole' && $parentType == 'UserRDB') return 'fk_user_id';
    if ($parentType == 'RoleRDB') return 'fk_role_id';
    if ($parentType == 'UserRDB') return 'fk_user_id';
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
      array('name' => 'manyToMany', 'value' => array('RoleRDB', 'UserRDB')),
      array('name' => 'is_searchable', 'value' => false),
// PROTECTED REGION ID(application/include/model/wcmf/class.NMUserRoleRDBMapper.php/Properties) ENABLED START
// PROTECTED REGION END
    );
    $nodeDef['_datadef'] = array
    (
     /* 
      * Value description: 
      */
      array('name' => 'fk_user_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_user_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_role_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_role_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'RoleRDB', 'is_navigable' => true, 'table_name' => 'role', 'pk_columns' => array('id'), 'fk_columns' => 'fk_role_id'),
      array('type' => 'UserRDB', 'is_navigable' => true, 'table_name' => 'user', 'pk_columns' => array('id'), 'fk_columns' => 'fk_user_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
