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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-28 11:58. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseCore.php");

/**
 * @class ChiBusinessUseCaseCoreRDBMapper
 * ChiBusinessUseCaseCoreRDBMapper maps ChiBusinessUseCaseCore Nodes to the database.
 * ChiBusinessUseCaseCore description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @author 
 * @version 1.0
 */
class ChiBusinessUseCaseCoreRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiBusinessUseCaseCore';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiBusinessUseCaseCore($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiBusinessUseCaseCore';
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
    if ($this->getType() == 'ChiBusinessUseCaseCore' && $parentType == 'Package') return 'fk_package_id';
    if ($this->getType() == 'ChiBusinessUseCaseCore' && $parentType == 'ChiFeature') return 'fk_chifeature_id';
    if ($this->getType() == 'ChiBusinessUseCaseCore' && $parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
    if ($parentType == 'Package') return 'fk_package_id';
    if ($parentType == 'ChiFeature') return 'fk_chifeature_id';
    if ($parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
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
// PROTECTED REGION ID(application/include/model/UseCases/class.ChiBusinessUseCaseCoreRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_chibusinessprocess_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessprocess_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chifeature_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chifeature_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_package_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_package_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the main actor of this use case
      */
      array('name' => 'PrimaryActor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'primaryactor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiWorkerExternal', 'display_type' => 'text'),
     /* 
      * Value description: The list of actors associated with the use case. Although this information is contained in the use case itself, it helps to increase the understandability of the use case when the diagram is unavailable.
      */
      array('name' => 'OtherActors', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'otheractors', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiWorkerExternal', 'display_type' => 'text'),
     /* 
      * Value description: The goal should implicitly express the actor's intent or purpose of the use case, such as *Enrol Student in Seminar.*
      */
      array('name' => 'GoalInContext', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'goalincontext', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: Boundaries in which the use case is operated when invoked (E.g. CMS)
      */
      array('name' => 'Scope', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'scope', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: Authorizations for operations/actions to be performed against the Chi business objects in scope. Against every object/process 4 CRUD basic operations are possible: Create (Write) Read (Open) Update (Change) Delete  (Destroy)
      */
      array('name' => 'Level', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'level', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: List of actors that have a special interest (i.e. to be informed every time) in completion of the use case
      */
      array('name' => 'Stakeholders', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'stakeholders', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: A list of the conditions, if any, that must be met before a use case may be invoked. Can be a previous Use case or self the presence of the system in Scope.
      */
      array('name' => 'Precondition', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'precondition', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: Event that is responsible for invocation of the use case.
      */
      array('name' => 'Trigger', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'trigger', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: The main path of logic an actor follows through a use case. Often referred to as the *happy path* or the *main path* because it describes how the use case works when everything works as it normally should.
      */
      array('name' => 'MainSuccessScenario', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'mainsuccessscenario', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'Extensions', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'extensions', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the Project Id of this object.
      */
      array('name' => 'Alias', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'alias', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the model version of this object
      */
      array('name' => 'Version', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'version', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('type' => 'Package', 'is_navigable' => true, 'table_name' => 'Package', 'pk_columns' => array('id'), 'fk_columns' => 'fk_package_id'),
      array('type' => 'ChiFeature', 'is_navigable' => true, 'table_name' => 'ChiFeature', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id'),
      array('type' => 'ChiBusinessProcess', 'is_navigable' => true, 'table_name' => 'ChiBusinessProcess', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessprocess_id')
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'Figure', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'Figure', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id', 'order_by' => array()),
      array('type' => 'ChiController', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id', 'order_by' => array('sortkey')),
      array('type' => 'ActivitySet', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ActivitySet', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id', 'order_by' => array()),
      array('type' => 'NMUCActor', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => false, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMUCActor', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
