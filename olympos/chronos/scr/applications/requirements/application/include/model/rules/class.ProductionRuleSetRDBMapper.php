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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Nov 30 13:40:40 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/rules/class.ProductionRuleSet.php");

/**
 * @class ProductionRuleSetRDBMapper
 * ProductionRuleSetRDBMapper maps ProductionRuleSet Nodes to the database.
 * ProductionRuleSet description: 
 *
 * @author 
 * @version 1.0
 */
class ProductionRuleSetRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ProductionRuleSet';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ProductionRuleSet($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ProductionRuleSet';
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
    if ($this->getType() == 'ProductionRuleSet' && $parentType == 'ActivitySet') return 'fk_activityset_id';
    if ($this->getType() == 'ProductionRuleSet' && $parentType == 'Package') return 'fk_package_id';
    if ($parentType == 'ActivitySet') return 'fk_activityset_id';
    if ($parentType == 'Package') return 'fk_package_id';
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
// PROTECTED REGION ID(application/include/model/rules/class.ProductionRuleSetRDBMapper.php/Properties) ENABLED START
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
      * Value description: 
      */
      array('name' => 'fk_activityset_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityset_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'Status', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'status', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiBaseStatus', 'display_type' => 'text'),
     /* 
      * Value description: the Project Id of this object.
      */
      array('name' => 'Alias', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'alias', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'Author', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'author', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiAuthors', 'display_type' => 'text'),
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
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ActivitySet', 'is_navigable' => true, 'table_name' => 'ActivitySet', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityset_id'),
      array('type' => 'Package', 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id')
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'ChiObject', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiObject', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'Activity', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivityDecision', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivityReceive', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityReceive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivitySend', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivitySend', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivityInitial', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityInitial', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivityFinal', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityFinal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array('sortkey')),
      array('type' => 'ProductionRule', 'minOccurs' => 1, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ProductionRule', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array()),
      array('type' => 'RuleSetVariable', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'RuleSetVariable', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array()),
      array('type' => 'Figure', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Figure', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
