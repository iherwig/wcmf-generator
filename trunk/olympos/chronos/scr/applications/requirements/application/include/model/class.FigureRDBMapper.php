<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0026 from model/requirements.xmi on 17.11.08 18:35. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."wcmf/lib/model/mapper/class.NodeUnifiedRDBMapper.php");
require_once(BASE."application/include/model/class.Figure.php");

/**
 * @class FigureRDBMapper
 * FigureRDBMapper maps Figure Nodes to the database.
 * Figure description: A figure is the graphical reppresentation of a node can be linked with manies diagrams.
 *
 * @author Giuseppe Platania
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
    if ($parentType == 'Diagram') return 'fk_diagram_id';
    if ($this->getType() == 'Figure' && $parentType == 'Diagram') return 'fk_diagram_id';
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
// PROTECTED REGION ID(application/include/model/class.FigureRDBMapper.php/Properties) START
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
      array('name' => 'fk_diagram_id', 'app_data_type' => DATATYPE_IGNORE, 'column_name' => 'fk_diagram_id', 'db_data_type' => 'INT(11)', 'default' => '', 'restrictions_match' => '', 'restrictions_not_match' => '', 'restrictions_description' => '', 'is_editable' => false, 'input_type' => 'text', 'display_type' => 'text'),
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
      array('type' => 'Diagram', 'is_navigable' => true, 'table_name' => 'Diagram', 'pk_columns' => array('id'), 'fk_columns' => 'fk_diagram_id')
    );
    $nodeDef['_children'] = array
    (
    );
    return $nodeDef;
  }
}
?>
