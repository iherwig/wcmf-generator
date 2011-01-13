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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:05 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiController.php");

/**
 * @class ChiControllerRDBMapper
 * ChiControllerRDBMapper maps ChiController Nodes to the database.
 * ChiController description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiController';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiController($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiController';
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
    if ($this->getType() == 'ChiController' && $parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($this->getType() == 'ChiController' && $parentType == 'Package') return 'fk_package_id';
    if ($this->getType() == 'ChiController' && $parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
    if ($parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($parentType == 'Package') return 'fk_package_id';
    if ($parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
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
// PROTECTED REGION ID(application/include/model/domain/class.ChiControllerRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_chibusinessusecasecore_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessusecasecore_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_package_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_package_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinessusecase_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessusecase_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the visibility of this class (Public, Private, Protected, Package)
      */
      array('name' => 'visibility', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'visibility', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:Visibility', 'display_type' => 'text'),
     /* 
      * Value description: if this type reppresent an abstract type only.
      */
      array('name' => 'isAbstract', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'isabstract', 'db_data_type' => 'VARCHAR(255)', 'default' => 'false', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#fix:true[true]|false[false]', 'display_type' => 'text'),
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
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the model version of this object
      */
      array('name' => 'umi', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'umi', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      // Value description: Sort key for ordering
      array('name' => 'sortkey', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'sortkey', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '[0-9]*', 'is_editable' => true, 'input_type' => 'text[class="tiny"]')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ChiBusinessUseCase', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCase', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecase_id'),
      array('type' => 'Package', 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id'),
      array('type' => 'ChiBusinessUseCaseCore', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCaseCore', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id')
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'TargetActionKeyEnd', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMChiControllerActionKeyChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontrolleractionkeytarget_id', 'order_by' => array()),
      array('type' => 'SourceActionKeyEnd', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMChiControllerActionKeyChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontrolleractionkeysource_id', 'order_by' => array()),
      array('type' => 'NMChiControllerActionKeyChiView', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMChiControllerActionKeyChiView', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array()),
      array('type' => 'TargetEnd', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMChiControllerChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontrollertarget_id', 'order_by' => array()),
      array('type' => 'SourceEnd', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMChiControllerChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontrollersource_id', 'order_by' => array()),
      array('type' => 'Property', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Property', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiNode', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array('name')),
      array('type' => 'Operation', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Operation', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array('sortkey')),
      array('type' => 'Figure', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Figure', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array()),
      array('type' => 'ChiValue', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ChiValue', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array('sortkey')),
      array('type' => 'ChiNodeManyToMany', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => false, 'is_navigable' => true, 'table_name' => 'ChiNodeManyToMany', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
