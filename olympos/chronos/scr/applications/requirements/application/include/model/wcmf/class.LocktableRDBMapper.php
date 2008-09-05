<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 11:35. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/wcmf/class.Locktable.php");

/**
 * @class LocktableRDBMapper
 * LocktableRDBMapper maps Locktable Nodes to the database.
 * Locktable description: 
 *
 * @author <ingo@wemove.com>
 * @version 1.0
 */
class LocktableRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'Locktable';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new Locktable($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'Locktable';
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
    if ($parentType == 'UserRDB') return 'fk_user_id';
    if ($this->getType() == 'Locktable' && $parentType == 'UserRDB') return 'fk_user_id';
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
      array('name' => 'is_searchable', 'value' => false),
// PROTECTED REGION ID(application/include/model/wcmf/class.LocktableRDBMapper.php/Properties) START
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
      array('name' => 'fk_user_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_user_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'objectid', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'oid', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'sessionid', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'sid', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
      /* 
	  * Value description: 
	  */
      array('name' => 'since', 'app_data_type' => DATATYPE_ATTRIBUTE, 'column_name' => 'since', 'db_data_type' => 'VARCHAR(255)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'UserRDB', 'is_navigable' => true, 'table_name' => 'user', 'pk_columns' => array('id'), 'fk_columns' => 'fk_user_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
