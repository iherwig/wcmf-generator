<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Jul 01 16:44:47 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/activity/class.NMActivityChiObject.php");

/**
 * @class NMActivityChiObjectRDBMapper
 * NMActivityChiObjectRDBMapper maps NMActivityChiObject Nodes to the database.
 * NMActivityChiObject description: 
 *
 * @author 
 * @version 1.0
 */
class NMActivityChiObjectRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMActivityChiObject';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMActivityChiObject($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'NMActivityChiObject';
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
    if ($this->getType() == 'NMActivityChiObject' && $parentType == 'ChiObject') return 'fk_chiobject_id';
    if ($this->getType() == 'NMActivityChiObject' && $parentType == 'Activity') return 'fk_activity_id';
    if ($parentType == 'ChiObject') return 'fk_chiobject_id';
    if ($parentType == 'Activity') return 'fk_activity_id';
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
      array('name' => 'manyToMany', 'value' => array('ChiObject', 'Activity')),
      array('name' => 'is_searchable', 'value' => true),
// PROTECTED REGION ID(application/include/model/activity/class.NMActivityChiObjectRDBMapper.php/Properties) ENABLED START
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
      array('name' => 'fk_activity_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_activity_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
     /* 
      * Value description: 
      */
      array('name' => 'fk_chiobject_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_chiobject_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
      array('type' => 'ChiObject', 'is_navigable' => true, 'table_name' => 'ChiObject', 'pk_columns' => array('id'), 'fk_columns' => 'fk_chiobject_id'),
      array('type' => 'Activity', 'is_navigable' => true, 'table_name' => 'Activity', 'pk_columns' => array('id'), 'fk_columns' => 'fk_activity_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
