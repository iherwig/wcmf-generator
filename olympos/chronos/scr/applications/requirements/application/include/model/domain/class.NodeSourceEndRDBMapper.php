<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 13:49:08 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociationRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NodeSourceEnd.php");

/**
 * @class NodeSourceEndRDBMapper
 * NodeSourceEndRDBMapper maps NodeSourceEnd Nodes to the database.
 * NodeSourceEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeSourceEndRDBMapper extends ChiAssociationRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NodeSourceEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NodeSourceEnd($oid);
  }
}
?>
