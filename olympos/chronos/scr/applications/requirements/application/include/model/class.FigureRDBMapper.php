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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jan 05 15:38:15 CET 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/class.Figure.php");

/**
 * @class FigureRDBMapper
 * FigureRDBMapper maps Figure Nodes to the database.
 * Figure description: A figure is the graphical reppresentation of a node can be linked with manies diagrams.
 *
 * @author 
 * @version 1.0
 */
class FigureRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'Figure';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new Figure($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'Figure';
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
    if ($this->getType() == 'Figure' && $parentType == 'ActivitySet') return 'fk_activityset_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBase') return 'fk_chibase_id';
    if ($this->getType() == 'Figure' && $parentType == 'Diagram') return 'fk_diagram_id';
    if ($this->getType() == 'Figure' && $parentType == 'Glossary') return 'fk_glossary_id';
    if ($this->getType() == 'Figure' && $parentType == 'Property') return 'fk_property_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiValue') return 'fk_chivalue_id';
    if ($this->getType() == 'Figure' && $parentType == 'Feature') return 'fk_feature_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiClass') return 'fk_chiclass_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiView') return 'fk_chiview_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiController') return 'fk_chicontroller_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiNode') return 'fk_chinode_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomany_id';
    if ($this->getType() == 'Figure' && $parentType == 'Operation') return 'fk_operation_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiIssue') return 'fk_chiissue_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiFeature') return 'fk_chifeature_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiRequirement') return 'fk_chirequirement_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiGoal') return 'fk_chigoal_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
    if ($this->getType() == 'Figure' && $parentType == 'Actor') return 'fk_actor_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessPartner') return 'fk_chibusinesspartner_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessPartnerPassive') return 'fk_chibusinesspartnerpassive_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiBusinessPartnerActive') return 'fk_chibusinesspartneractive_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiWorker') return 'fk_chiworker_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiWorkerInternal') return 'fk_chiworkerinternal_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiWorkerExternal') return 'fk_chiworkerexternal_id';
    if ($this->getType() == 'Figure' && $parentType == 'RuleVariable') return 'fk_rulevariable_id';
    if ($this->getType() == 'Figure' && $parentType == 'RuleSetVariable') return 'fk_rulesetvariable_id';
    if ($this->getType() == 'Figure' && $parentType == 'RuleCondition') return 'fk_rulecondition_id';
    if ($this->getType() == 'Figure' && $parentType == 'RuleAction') return 'fk_ruleaction_id';
    if ($this->getType() == 'Figure' && $parentType == 'ProductionRuleSet') return 'fk_productionruleset_id';
    if ($this->getType() == 'Figure' && $parentType == 'ProductionRule') return 'fk_productionrule_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiSystem') return 'fk_chisystem_id';
    if ($this->getType() == 'Figure' && $parentType == 'ActivityFinal') return 'fk_activityfinal_id';
    if ($this->getType() == 'Figure' && $parentType == 'ActivityInitial') return 'fk_activityinitial_id';
    if ($this->getType() == 'Figure' && $parentType == 'ActivitySend') return 'fk_activitysend_id';
    if ($this->getType() == 'Figure' && $parentType == 'ActivityReceive') return 'fk_activityreceive_id';
    if ($this->getType() == 'Figure' && $parentType == 'ActivityDecision') return 'fk_activitydecision_id';
    if ($this->getType() == 'Figure' && $parentType == 'Activity') return 'fk_activity_id';
    if ($this->getType() == 'Figure' && $parentType == 'ChiObject') return 'fk_chiobject_id';
    if ($parentType == 'ActivitySet') return 'fk_activityset_id';
    if ($parentType == 'ChiBase') return 'fk_chibase_id';
    if ($parentType == 'Diagram') return 'fk_diagram_id';
    if ($parentType == 'Glossary') return 'fk_glossary_id';
    if ($parentType == 'Property') return 'fk_property_id';
    if ($parentType == 'ChiValue') return 'fk_chivalue_id';
    if ($parentType == 'Feature') return 'fk_feature_id';
    if ($parentType == 'ChiClass') return 'fk_chiclass_id';
    if ($parentType == 'ChiView') return 'fk_chiview_id';
    if ($parentType == 'ChiController') return 'fk_chicontroller_id';
    if ($parentType == 'ChiNode') return 'fk_chinode_id';
    if ($parentType == 'ChiNodeManyToMany') return 'fk_chinodemanytomany_id';
    if ($parentType == 'Operation') return 'fk_operation_id';
    if ($parentType == 'ChiIssue') return 'fk_chiissue_id';
    if ($parentType == 'ChiFeature') return 'fk_chifeature_id';
    if ($parentType == 'ChiRequirement') return 'fk_chirequirement_id';
    if ($parentType == 'ChiGoal') return 'fk_chigoal_id';
    if ($parentType == 'ChiBusinessUseCase') return 'fk_chibusinessusecase_id';
    if ($parentType == 'ChiBusinessUseCaseCore') return 'fk_chibusinessusecasecore_id';
    if ($parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
    if ($parentType == 'Actor') return 'fk_actor_id';
    if ($parentType == 'ChiBusinessPartner') return 'fk_chibusinesspartner_id';
    if ($parentType == 'ChiBusinessPartnerPassive') return 'fk_chibusinesspartnerpassive_id';
    if ($parentType == 'ChiBusinessPartnerActive') return 'fk_chibusinesspartneractive_id';
    if ($parentType == 'ChiWorker') return 'fk_chiworker_id';
    if ($parentType == 'ChiWorkerInternal') return 'fk_chiworkerinternal_id';
    if ($parentType == 'ChiWorkerExternal') return 'fk_chiworkerexternal_id';
    if ($parentType == 'RuleVariable') return 'fk_rulevariable_id';
    if ($parentType == 'RuleSetVariable') return 'fk_rulesetvariable_id';
    if ($parentType == 'RuleCondition') return 'fk_rulecondition_id';
    if ($parentType == 'RuleAction') return 'fk_ruleaction_id';
    if ($parentType == 'ProductionRuleSet') return 'fk_productionruleset_id';
    if ($parentType == 'ProductionRule') return 'fk_productionrule_id';
    if ($parentType == 'ChiSystem') return 'fk_chisystem_id';
    if ($parentType == 'ActivityFinal') return 'fk_activityfinal_id';
    if ($parentType == 'ActivityInitial') return 'fk_activityinitial_id';
    if ($parentType == 'ActivitySend') return 'fk_activitysend_id';
    if ($parentType == 'ActivityReceive') return 'fk_activityreceive_id';
    if ($parentType == 'ActivityDecision') return 'fk_activitydecision_id';
    if ($parentType == 'Activity') return 'fk_activity_id';
    if ($parentType == 'ChiObject') return 'fk_chiobject_id';
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
// PROTECTED REGION ID(application/include/model/class.FigureRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_chiobject_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiobject_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activity_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activity_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activitydecision_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activitydecision_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activityreceive_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityreceive_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activitysend_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activitysend_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activityinitial_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityinitial_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activityfinal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityfinal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chisystem_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chisystem_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_productionrule_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_productionrule_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_productionruleset_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_productionruleset_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_ruleaction_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_ruleaction_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_rulecondition_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_rulecondition_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_rulesetvariable_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_rulesetvariable_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_rulevariable_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_rulevariable_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('name' => 'fk_actor_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_actor_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibusinessprocess_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibusinessprocess_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('name' => 'fk_chigoal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chigoal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chirequirement_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chirequirement_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chifeature_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chifeature_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiissue_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiissue_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_operation_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_operation_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinodemanytomany_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinodemanytomany_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chinode_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chinode_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chicontroller_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chicontroller_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiview_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiview_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiclass_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiclass_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_feature_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_feature_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chivalue_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chivalue_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_property_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_property_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_glossary_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_glossary_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_diagram_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_diagram_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chibase_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chibase_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_activityset_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activityset_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the background color in RBG
      */
      array('name' => 'BackgroundColor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'backgroundcolor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the foreground color in RBG
      */
      array('name' => 'ForegroundColor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'foregroundcolor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'GID', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'gid', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'Height', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'height', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the orizontal position of this object
      */
      array('name' => 'PositionY', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'positiony', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: the vertical position of this object
      */
      array('name' => 'PositionX', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'positionx', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'Width', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'width', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
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

      array('type' => 'Diagram', 'is_navigable' => true, 'table_name' => 'Diagram', 'pk_columns' => array('id'), 'fk_columns' => 'fk_diagram_id'),
      array('type' => 'Glossary', 'is_navigable' => true, 'table_name' => 'Glossary', 'pk_columns' => array('id'), 'fk_columns' => 'fk_glossary_id'),
      array('type' => 'Property', 'is_navigable' => true, 'table_name' => 'Property', 'pk_columns' => array('id'), 'fk_columns' => 'fk_property_id'),
      array('type' => 'ChiValue', 'is_navigable' => true, 'table_name' => 'ChiValue', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chivalue_id'),

      array('type' => 'ChiClass', 'is_navigable' => true, 'table_name' => 'ChiClass', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiclass_id'),
      array('type' => 'ChiView', 'is_navigable' => true, 'table_name' => 'ChiView', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiview_id'),
      array('type' => 'ChiController', 'is_navigable' => true, 'table_name' => 'ChiController', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chicontroller_id'),
      array('type' => 'ChiNode', 'is_navigable' => true, 'table_name' => 'ChiNode', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinode_id'),
      array('type' => 'ChiNodeManyToMany', 'is_navigable' => true, 'table_name' => 'ChiNodeManyToMany', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chinodemanytomany_id'),
      array('type' => 'Operation', 'is_navigable' => true, 'table_name' => 'Operation', 'pk_columns' => array('id'), 'fk_columns' => 'fk_operation_id'),
      array('type' => 'ChiIssue', 'is_navigable' => true, 'table_name' => 'ChiIssue', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiissue_id'),
      array('type' => 'ChiFeature', 'is_navigable' => true, 'table_name' => 'ChiFeature', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chifeature_id'),
      array('type' => 'ChiRequirement', 'is_navigable' => true, 'table_name' => 'ChiRequirement', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chirequirement_id'),
      array('type' => 'ChiGoal', 'is_navigable' => true, 'table_name' => 'ChiGoal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chigoal_id'),
      array('type' => 'ChiBusinessUseCase', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCase', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecase_id'),
      array('type' => 'ChiBusinessUseCaseCore', 'is_navigable' => true, 'table_name' => 'ChiBusinessUseCaseCore', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessusecasecore_id'),
      array('type' => 'ChiBusinessProcess', 'is_navigable' => true, 'table_name' => 'ChiBusinessProcess', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessprocess_id'),
      array('type' => 'Actor', 'is_navigable' => true, 'table_name' => 'Actor', 'pk_columns' => array('id'), 'fk_columns' => 'fk_actor_id'),
      array('type' => 'ChiBusinessPartner', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartner', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartner_id'),
      array('type' => 'ChiBusinessPartnerPassive', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerPassive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartnerpassive_id'),
      array('type' => 'ChiBusinessPartnerActive', 'is_navigable' => true, 'table_name' => 'ChiBusinessPartnerActive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinesspartneractive_id'),
      array('type' => 'ChiWorker', 'is_navigable' => true, 'table_name' => 'ChiWorker', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworker_id'),
      array('type' => 'ChiWorkerInternal', 'is_navigable' => true, 'table_name' => 'ChiWorkerInternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworkerinternal_id'),
      array('type' => 'ChiWorkerExternal', 'is_navigable' => true, 'table_name' => 'ChiWorkerExternal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiworkerexternal_id'),
      array('type' => 'RuleVariable', 'is_navigable' => true, 'table_name' => 'RuleVariable', 'pk_columns' => array('id'), 'fk_columns' => 'fk_rulevariable_id'),
      array('type' => 'RuleSetVariable', 'is_navigable' => true, 'table_name' => 'RuleSetVariable', 'pk_columns' => array('id'), 'fk_columns' => 'fk_rulesetvariable_id'),
      array('type' => 'RuleCondition', 'is_navigable' => true, 'table_name' => 'RuleCondition', 'pk_columns' => array('id'), 'fk_columns' => 'fk_rulecondition_id'),
      array('type' => 'RuleAction', 'is_navigable' => true, 'table_name' => 'RuleAction', 'pk_columns' => array('id'), 'fk_columns' => 'fk_ruleaction_id'),
      array('type' => 'ProductionRuleSet', 'is_navigable' => true, 'table_name' => 'ProductionRuleSet', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionruleset_id'),
      array('type' => 'ProductionRule', 'is_navigable' => true, 'table_name' => 'ProductionRule', 'pk_columns' => array('id'), 'fk_columns' => 'fk_productionrule_id'),
      array('type' => 'ChiSystem', 'is_navigable' => true, 'table_name' => 'ChiSystem', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chisystem_id'),
      array('type' => 'ActivityFinal', 'is_navigable' => true, 'table_name' => 'ActivityFinal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityfinal_id'),
      array('type' => 'ActivityInitial', 'is_navigable' => true, 'table_name' => 'ActivityInitial', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityinitial_id'),
      array('type' => 'ActivitySend', 'is_navigable' => true, 'table_name' => 'ActivitySend', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activitysend_id'),
      array('type' => 'ActivityReceive', 'is_navigable' => true, 'table_name' => 'ActivityReceive', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activityreceive_id'),
      array('type' => 'ActivityDecision', 'is_navigable' => true, 'table_name' => 'ActivityDecision', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activitydecision_id'),
      array('type' => 'Activity', 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activity_id'),
      array('type' => 'ChiObject', 'is_navigable' => true, 'table_name' => 'ChiObject', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiobject_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
