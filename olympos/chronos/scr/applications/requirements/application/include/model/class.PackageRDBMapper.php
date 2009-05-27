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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-27 11:47. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/class.Package.php");

/**
 * @class PackageRDBMapper
 * PackageRDBMapper maps Package Nodes to the database.
 * Package description: a package is a class that contains other classes including packages sef
 *
 * @author 
 * @version 1.0
 */
class PackageRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'Package';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new Package($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'Package';
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
    if ($this->getType() == 'Package' && $parentType == 'Model') return 'fk_model_id';
    if ($this->getType() == 'Package' && $parentType == 'Package') return 'fk_package_id';
    if ($parentType == 'Model') return 'fk_model_id';
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
      array('name' => 'display_value', 'value' => 'Name'),
// PROTECTED REGION ID(application/include/model/class.PackageRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_model_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_model_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('type' => 'Model', 'is_navigable' => true, 'table_name' => 'Model', 'pk_columns' => array('id'), 'fk_columns' => 'fk_model_id'),
      array('type' => 'Package', 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id')
    );
    $nodeDef['_children'] = array
    (

      array('type' => 'Package', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'Diagram', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Diagram', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'Relation', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'Relation', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'NMChiNodeChiNode', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'NMChiNodeChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'NMChiControllerChiController', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'NMChiControllerChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ChiView', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiView', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiController', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiNode', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ChiIssue', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiIssue', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiFeature', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiFeature', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiRequirement', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiRequirement', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('priority')),
      array('type' => 'ChiGoal', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiGoal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessUseCase', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCase', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessUseCaseCore', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCaseCore', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessProcess', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessProcess', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'Actor', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'Actor', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessPartner', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessPartner', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessPartnerPassive', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerPassive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiBusinessPartnerActive', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerActive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiWorker', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiWorker', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiWorkerInternal', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiWorkerInternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiWorkerExternal', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiWorkerExternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiSystem', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiSystem', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ActivityFinal', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityFinal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ActivityInitial', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityInitial', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ActivitySend', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivitySend', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ActivityReceive', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityReceive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ActivityDecision', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'Activity', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array()),
      array('type' => 'ChiObject', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiObject', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
