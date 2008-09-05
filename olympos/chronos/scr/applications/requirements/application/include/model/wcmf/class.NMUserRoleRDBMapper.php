<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 10:46. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/wcmf/class.NMUserRole.php");

/**
 * @class NMUserRoleRDBMapper
 * NMUserRoleRDBMapper maps NMUserRole Nodes to the database.
 * NMUserRole description: 
 *
 * @author <ingo@wemove.com>
 * @version 1.0
 */
class NMUserRoleRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMUserRole';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMUserRole($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'nm_user_role';
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
    if ($parentType == 'RoleRDB') return 'fk_role_id';
    if ($parentType == 'UserRDB') return 'fk_user_id';
    if ($this->getType() == 'NMUserRole' && $parentType == 'RoleRDB') return 'fk_role_id';
    if ($this->getType() == 'NMUserRole' && $parentType == 'UserRDB') return 'fk_user_id';
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
      array('name' => 'manyToMany', 'value' => array('RoleRDB', 'UserRDB')),
      array('name' => 'is_searchable', 'value' => true),
// PROTECTED REGION ID(application/include/model/wcmf/class.NMUserRoleRDBMapper.php/Properties) START
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
      array('name' => 'fk_role_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_role_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'RoleRDB', 'is_navigable' => true, 'table_name' => 'RoleRDB', 'pk_columns' => array('id'), 'fk_columns' => 'fk_role_id'),
      array('type' => 'UserRDB', 'is_navigable' => true, 'table_name' => 'user', 'pk_columns' => array('id'), 'fk_columns' => 'fk_user_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
