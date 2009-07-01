<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Jul 01 16:44:48 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiNodeChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NodeTargetEnd.php");

/**
 * @class NodeTargetEndRDBMapper
 * NodeTargetEndRDBMapper maps NodeTargetEnd Nodes to the database.
 * NodeTargetEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeTargetEndRDBMapper extends NMChiNodeChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NodeTargetEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NodeTargetEnd($oid);
  }
}
?>
