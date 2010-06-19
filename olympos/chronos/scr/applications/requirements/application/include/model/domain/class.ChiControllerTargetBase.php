<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:17:38 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiController.php");

/**
 * @class ChiControllerTarget
 * ChiControllerTarget description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerTargetBase extends ChiController
{
    function ChiControllerTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiControllerTarget');
      else
        parent::__construct($oid, $type);
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
      return Message::get("ChiControllerTarget");
    }
}
?>
