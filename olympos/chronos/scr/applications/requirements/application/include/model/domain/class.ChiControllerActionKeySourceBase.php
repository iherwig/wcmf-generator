<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 30 11:28:50 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiController.php");

/**
 * @class ChiControllerActionKeySource
 * ChiControllerActionKeySource description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerActionKeySourceBase extends ChiController
{
    function ChiControllerActionKeySourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiClass($oid, 'ChiControllerActionKeySource');
      else
        parent::ChiClass($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiController";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiControllerActionKeySource");
    }
}
?>
