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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Nov 26 12:45:13 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ControlFlow.php");

/**
 * @class ControlFlowRDBMapper
 * ControlFlowRDBMapper maps ControlFlow Nodes to the database.
 * ControlFlow description: 
 *
 * @author 
 * @version 1.0
 */
class ControlFlowRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ControlFlow';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ControlFlow($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ControlFlow';
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
    if ($this->getType() == 'AControlFlowTargetEnd' && $parentType == 'Activity') return 'fk_acontrolflowtarget_id';
    if ($this->getType() == 'AControlFlowSourceEnd' && $parentType == 'Activity') return 'fk_acontrolflowsource_id';
    if ($this->getType() == 'ADControlFlowTargetEnd' && $parentType == 'ActivityDecision') return 'fk_adcontrolflowtarget_id';
    if ($this->getType() == 'ADControlFlowSourceEnd' && $parentType == 'ActivityDecision') return 'fk_adcontrolflowsource_id';
    if ($this->getType() == 'ARControlFlowSourceEnd' && $parentType == 'ActivityReceive') return 'fk_arcontrolflowsource_id';
    if ($this->getType() == 'ARControlFlowTargetEnd' && $parentType == 'ActivityReceive') return 'fk_arcontrolflowtarget_id';
    if ($this->getType() == 'ASControlFlowTargetEnd' && $parentType == 'ActivitySend') return 'fk_ascontrolflowtarget_id';
    if ($this->getType() == 'ASControlFlowSourceEnd' && $parentType == 'ActivitySend') return 'fk_ascontrolflowsource_id';
    if ($this->getType() == 'ControlFlow' && $parentType == 'ActivityInitial') return 'fk_activityinitial_id';
    if ($this->getType() == 'ControlFlow' && $parentType == 'ActivityFinal') return 'fk_activityfinal_id';
    if ($parentType == 'AControlFlowTarget') return 'fk_acontrolflowtarget_id';
    if ($parentType == 'AControlFlowSource') return 'fk_acontrolflowsource_id';
    if ($parentType == 'ADControlFlowTarget') return 'fk_adcontrolflowtarget_id';
    if ($parentType == 'ADControlFlowSource') return 'fk_adcontrolflowsource_id';
    if ($parentType == 'ARControlFlowSource') return 'fk_arcontrolflowsource_id';
    if ($parentType == 'ARControlFlowTarget') return 'fk_arcontrolflowtarget_id';
    if ($parentType == 'ASControlFlowTarget') return 'fk_ascontrolflowtarget_id';
    if ($parentType == 'ASControlFlowSource') return 'fk_ascontrolflowsource_id';
    if ($parentType == 'ActivityInitial') return 'fk_activityinitial_id';
    if ($parentType == 'ActivityFinal') return 'fk_activityfinal_id';
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
      array('name' => 'manyToMany', 'value' => array('AControlFlowTarget', 'AControlFlowSource', 'ADControlFlowTarget', 'ADControlFlowSource', 'ARControlFlowSource', 'ARControlFlowTarget', 'ASControlFlowTarget', 'ASControlFlowSource', 'ActivityInitial', 'ActivityFinal')),
      array('name' => 'is_searchable', 'value' => true),
// PROTECTED REGION ID(application/include/model/activity/class.ControlFlowRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_activityfinal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityfinal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activityinitial_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityinitial_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_ascontrolflowsource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_ascontrolflowsource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_ascontrolflowtarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_ascontrolflowtarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_arcontrolflowtarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_arcontrolflowtarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_arcontrolflowsource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_arcontrolflowsource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_adcontrolflowsource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_adcontrolflowsource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_adcontrolflowtarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_adcontrolflowtarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_acontrolflowsource_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_acontrolflowsource_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_acontrolflowtarget_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_acontrolflowtarget_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'guard', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'guard', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('type' => 'AControlFlowTarget', 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_acontrolflowtarget_id'),
      array('type' => 'AControlFlowSource', 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_acontrolflowsource_id'),
      array('type' => 'ADControlFlowTarget', 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_adcontrolflowtarget_id'),
      array('type' => 'ADControlFlowSource', 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_adcontrolflowsource_id'),
      array('type' => 'ARControlFlowSource', 'is_navigable' => true, 'table_name' => 'ActivityReceive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_arcontrolflowsource_id'),
      array('type' => 'ARControlFlowTarget', 'is_navigable' => true, 'table_name' => 'ActivityReceive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_arcontrolflowtarget_id'),
      array('type' => 'ASControlFlowTarget', 'is_navigable' => true, 'table_name' => 'ActivitySend', 'pk_columns' => array('id'), 'fk_columns' => 'fk_ascontrolflowtarget_id'),
      array('type' => 'ASControlFlowSource', 'is_navigable' => true, 'table_name' => 'ActivitySend', 'pk_columns' => array('id'), 'fk_columns' => 'fk_ascontrolflowsource_id'),
      array('type' => 'ActivityInitial', 'is_navigable' => true, 'table_name' => 'ActivityInitial', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityinitial_id'),
      array('type' => 'ActivityFinal', 'is_navigable' => true, 'table_name' => 'ActivityFinal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityfinal_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
