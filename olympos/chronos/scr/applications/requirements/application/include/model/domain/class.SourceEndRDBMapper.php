<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 02 09:52:44 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.SourceEnd.php");

/**
 * @class SourceEndRDBMapper
 * SourceEndRDBMapper maps SourceEnd Nodes to the database.
 * SourceEnd description: this class handle all the relationships between ChiControllers.
 *
 * @author 
 * @version 1.0
 */
class SourceEndRDBMapper extends NMChiControllerChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'SourceEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new SourceEnd($oid);
  }
}
?>
