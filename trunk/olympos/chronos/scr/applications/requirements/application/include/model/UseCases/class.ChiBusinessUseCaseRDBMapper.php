<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0010 from model/requirements.xmi on 10.08.08 11:37. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCase.php");

/**
 * @class ChiBusinessUseCaseRDBMapper
 * ChiBusinessUseCaseRDBMapper maps ChiBusinessUseCase Nodes to the database.
 * ChiBusinessUseCase description: A Business Use Case is part of a business process that produces an advantage to the enterprise.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiBusinessUseCaseRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiBusinessUseCase';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiBusinessUseCase($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiBusinessUseCase';
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
    if ($parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
    if ($this->getType() == 'ChiBusinessUseCase' && $parentType == 'ChiBusinessProcess') return 'fk_chibusinessprocess_id';
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
// PROTECTED REGION ID(application/include/model/UseCases/class.ChiBusinessUseCaseRDBMapper.php/Properties) START
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
	  * Value description: the main actor of this use case
	  */
      array('name' => 'PrimaryActor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'primaryactor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: The list of actors associated with the use case. Although this information is contained in the use case itself, it helps to increase the understandability of the use case when the diagram is unavailable.
	  */
      array('name' => 'OtherActors', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'otheractors', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: The goal should implicitly express the actor's intent or purpose of the use case, such as "Enrol Student in Seminar."
	  */
      array('name' => 'GoalInContext', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'goalincontext', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: Boundaries in which the use case is operated when invoked (E.g. CMS)
	  */
      array('name' => 'Scope', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'scope', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: Authorizations for operations/actions to be performed against the Chi business objects in scope. Against every object/process 4 CRUD basic operations are possible:
Create (Write)
Read (Open)
Update (Change)
Delete  (Destroy)
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
	  * Value description: The main path of logic an actor follows through a use case. Often referred to as the "happy path" or the "main path" because it describes how the use case works when everything works as it normally should.
	  */
      array('name' => 'MainSuccessScenario', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'mainsuccessscenario', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Extensions', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'extensions', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Alias', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'alias', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Version', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'version', 'db_data_type' => 'VARCHAR(255)', 'default' => '1.0', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Name', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'name', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Notes', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'notes', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'fckeditor', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'created', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'created', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'creator', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'creator', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'last_editor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'last_editor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ChiBusinessProcess', 'is_navigable' => true, 'table_name' => 'ChiBusinessProcess', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chibusinessprocess_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
