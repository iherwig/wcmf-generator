<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 03 13:49:07 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.SourceActionKeyEnd.php");

/**
 * @class SourceActionKeyEndRDBMapper
 * SourceActionKeyEndRDBMapper maps SourceActionKeyEnd Nodes to the database.
 * SourceActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class SourceActionKeyEndRDBMapper extends NMChiControllerActionKeyChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'SourceActionKeyEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new SourceActionKeyEnd($oid);
  }
}
?>
