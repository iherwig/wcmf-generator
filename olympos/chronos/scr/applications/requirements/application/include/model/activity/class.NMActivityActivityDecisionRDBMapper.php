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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 02 14:12:01 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/activity/class.NMActivityActivityDecision.php");

/**
 * @class NMActivityActivityDecisionRDBMapper
 * NMActivityActivityDecisionRDBMapper maps NMActivityActivityDecision Nodes to the database.
 * NMActivityActivityDecision description: 
 *
 * @author 
 * @version 1.0
 */
class NMActivityActivityDecisionRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMActivityActivityDecision';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMActivityActivityDecision($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'NMActivityActivityDecision';
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
    if ($this->getType() == 'NMActivityActivityDecision' && $parentType == 'Activity') return 'fk_activity_id';
    if ($this->getType() == 'NMActivityActivityDecision' && $parentType == 'ActivityDecision') return 'fk_activitydecision_id';
    if ($parentType == 'Activity') return 'fk_activity_id';
    if ($parentType == 'ActivityDecision') return 'fk_activitydecision_id';
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
      array('name' => 'manyToMany', 'value' => array('Activity', 'ActivityDecision')),
      array('name' => 'is_searchable', 'value' => true),
// PROTECTED REGION ID(application/include/model/activity/class.NMActivityActivityDecisionRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_activitydecision_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activitydecision_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activity_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activity_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'Activity', 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activity_id'),
      array('type' => 'ActivityDecision', 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activitydecision_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
