<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 02 09:52:44 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.TargetEnd.php");

/**
 * @class TargetEndRDBMapper
 * TargetEndRDBMapper maps TargetEnd Nodes to the database.
 * TargetEnd description: this class handle all the relationships between ChiControllers.
 *
 * @author 
 * @version 1.0
 */
class TargetEndRDBMapper extends NMChiControllerChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'TargetEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new TargetEnd($oid);
  }
}
?>
