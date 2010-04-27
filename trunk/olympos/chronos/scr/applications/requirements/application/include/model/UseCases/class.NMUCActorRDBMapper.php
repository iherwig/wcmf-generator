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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:45:07 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.NMUCActor.php");

/**
 * @class NMUCActorRDBMapper
 * NMUCActorRDBMapper maps NMUCActor Nodes to the database.
 * NMUCActor description: 
 *
 * @author 
 * @version 1.0
 */
class NMUCActorRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMUCActor';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMUCActor($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'NMUCActor';
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
    if ($this->getType() == 'NMUCActor' && $parentType == 'Actor') return 'fk_actor_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiBusinessPartner') return 'fk_chibusinesspartner_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiBusinessPartnerPassive') return 'fk_chibusinesspartnerpassive_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiBusinessPartnerActive') return 'fk_chibusinesspartneractive_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiWorker') return 'fk_chiworker_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiWorkerInternal') return 'fk_chiworkerinternal_id';
    if ($this->getType() == 'NMUCActor' && $parentType == 'ChiWorkerExternal') return 'fk_chiworkerexternal_id';
    if ($parentType == 'Actor') return 'fk_actor_id';
    if ($parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
    if ($parentType == 'ChiBusinessPartner') return 'fk_chibusinesspartner_id';
    if ($parentType == 'ChiBusinessPartnerPassive') return 'fk_chibusinesspartnerpassive_id';
    if ($parentType == 'ChiBusinessPartnerActive') return 'fk_chibusinesspartneractive_id';
    if ($parentType == 'ChiWorker') return 'fk_chiworker_id';
    if ($parentType == 'ChiWorkerInternal') return 'fk_chiworkerinternal_id';
    if ($parentType == 'ChiWorkerExternal') return 'fk_chiworkerexternal_id';
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
      array('name' => 'manyToMany', 'value' => array('Actor', 'ChiBusinessUseCase', 'ChiBusinessUseCaseCore', 'ChiBusinessPartner', 'ChiBusinessPartnerPassive', 'ChiBusinessPartnerActive', 'ChiWorker', 'ChiWorkerInternal', 'ChiWorkerExternal')),
      array('name' => 'is_searchable', 'value' => true),
// PROTECTED REGION ID(application/include/model/UseCases/class.NMUCActorRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_chiworkerexternal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiworkerexternal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiworkerinternal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiworkerinternal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiworker_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiworker_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinesspartneractive_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinesspartneractive_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinesspartnerpassive_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinesspartnerpassive_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinesspartner_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinesspartner_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinessusecasecore_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessusecasecore_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinessusecase_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessusecase_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_actor_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_actor_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'Actor', 'is_navigable' => true, 'table_name' => 'Actor', 'pk_columns' => array('id'), 'fk_columns' => 'fk_actor_id'),
      array('type' => 'ChiBusinessUseCase', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCase', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecase_id'),
      array('type' => 'ChiBusinessUseCaseCore', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCaseCore', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id'),
      array('type' => 'ChiBusinessPartner', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartner', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartner_id'),
      array('type' => 'ChiBusinessPartnerPassive', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerPassive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartnerpassive_id'),
      array('type' => 'ChiBusinessPartnerActive', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerActive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartneractive_id'),
      array('type' => 'ChiWorker', 'is_navigable' => true, 'table_name' => 'ChiWorker', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworker_id'),
      array('type' => 'ChiWorkerInternal', 'is_navigable' => true, 'table_name' => 'ChiWorkerInternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworkerinternal_id'),
      array('type' => 'ChiWorkerExternal', 'is_navigable' => true, 'table_name' => 'ChiWorkerExternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworkerexternal_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
