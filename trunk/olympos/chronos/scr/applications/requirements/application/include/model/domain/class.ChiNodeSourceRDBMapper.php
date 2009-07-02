<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 02 09:52:43 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiNodeSource.php");

/**
 * @class ChiNodeSourceRDBMapper
 * ChiNodeSourceRDBMapper maps ChiNodeSource Nodes to the database.
 * ChiNodeSource description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class ChiNodeSourceRDBMapper extends ChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiNodeSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiNodeSource($oid);
  }
}
?>
