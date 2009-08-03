<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 30 11:28:52 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.TargetActionKeyEnd.php");

/**
 * @class TargetActionKeyEndRDBMapper
 * TargetActionKeyEndRDBMapper maps TargetActionKeyEnd Nodes to the database.
 * TargetActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class TargetActionKeyEndRDBMapper extends NMChiControllerActionKeyChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'TargetActionKeyEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new TargetActionKeyEnd($oid);
  }
}
?>