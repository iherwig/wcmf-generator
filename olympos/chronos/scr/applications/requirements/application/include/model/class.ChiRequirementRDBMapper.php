<?php
/**
 * This file was generated by wCMFGenerator 2.6.0001 from model/requirements.xmi on 29.03.08 18:02. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/class.ChiRequirement.php");

/**
 * @class ChiRequirementRDBMapper
 * ChiRequirementRDBMapper maps ChiRequirement Nodes to the database.
 * ChiRequirement description: A Business guide line about the Enterprise or the project.
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiRequirementRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiRequirement';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiRequirement($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'ChiRequirement';
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
    if ($parentType == 'ChiGoal') return 'fk_chigoal_id';
    if ($this->getType() == 'ChiRequirement' && $parentType == 'ChiGoal') return 'fk_chigoal_id';
    return '';
  }
  /**
   * @see NodeUnifiedRDBMapper::getOrderBy()
   */
  function getOrderBy()
  {
    return array('priority');
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
      array('name' => 'display_value', 'value' => 'Name|Priority'),
// PROTECTED REGION ID(application/include/model/class.ChiRequirementRDBMapper.php/Properties) START
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
      array('name' => 'fk_chigoal_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chigoal_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'reqType', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'reqtype', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: A priority in %. Requirements are ordered by priority.
	  */
      array('name' => 'Priority', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'priority', 'db_data_type' => 'VARCHAR(255)', 'default' => '50', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: This requirement's author's name and role in the project
	  */
      array('name' => 'Author', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'author', 'db_data_type' => 'VARCHAR(255)', 'default' => 'myName, Analyst', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiAuthors', 'display_type' => 'text'),
      /* 
	  * Value description: Each requirement needs to be confirmed.
This requirement's proofreader's name and role in the project
	  */
      array('name' => 'Proofreader', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'proofreader', 'db_data_type' => 'VARCHAR(255)', 'default' => 'aName, Client', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiAuthors', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'Status', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'status', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'select#async:ChiRequirementStatus', 'display_type' => 'text'),
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
      array('name' => 'created', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'created', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'creator', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'creator', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'last_editor', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'last_editor', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'modified', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'modified', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => true, 'input_type' => 'text', 'display_type' => 'text'),
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ChiGoal', 'is_navigable' => true, 'table_name' => 'ChiGoal', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chigoal_id')
    );
    $nodeDef['_children'] = array
    (
      array('type' => 'ChiIssue', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => true, 'is_navigable' => true, 'table_name' => 'ChiIssue', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chirequirement_id', 'order_by' => array()),
      array('type' => 'NMFeatureRequirements', 'minOccurs' => 0, 'maxOccurs' => 'unbounded', 'aggregation' => true, 'composition' => true, 'is_navigable' => true, 'table_name' => 'NMFeatureRequirements', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chirequirement_id', 'order_by' => array())
    );
    return $nodeDef;
  }
}
?>
