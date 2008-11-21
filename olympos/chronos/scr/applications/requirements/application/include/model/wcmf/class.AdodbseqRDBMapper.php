<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 21.11.08 23:18. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/wcmf/class.Adodbseq.php");

/**
 * @class AdodbseqRDBMapper
 * AdodbseqRDBMapper maps Adodbseq Nodes to the database.
 * Adodbseq description: 
 *
 * @author <ingo@wemove.com>
 * @version 1.0
 */
class AdodbseqRDBMapper extends NodeUnifiedRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'Adodbseq';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new Adodbseq($oid);
  }
  /**
   * @see NodeUnifiedRDBMapper::getTableName()
   */
  function getTableName()
  {
    return 'adodbseq';
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
// PROTECTED REGION ID(application/include/model/wcmf/class.AdodbseqRDBMapper.php/Properties) START
// PROTECTED REGION END
    );
    $nodeDef['_datadef'] = array
    (
      /* 
	  * Value description: 
	  */
      array('name' => 'id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'id', 'db_data_type' => 'INT(11) NOT NULL', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text')
    );
    $nodeDef['_ref'] = array
    (
    );
    $nodeDef['_parents'] = array
    (
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
