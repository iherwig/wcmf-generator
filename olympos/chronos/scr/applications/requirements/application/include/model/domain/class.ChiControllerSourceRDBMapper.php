<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 30 11:28:50 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiControllerSource.php");

/**
 * @class ChiControllerSourceRDBMapper
 * ChiControllerSourceRDBMapper maps ChiControllerSource Nodes to the database.
 * ChiControllerSource description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerSourceRDBMapper extends ChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiControllerSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiControllerSource($oid);
  }
}
?>
