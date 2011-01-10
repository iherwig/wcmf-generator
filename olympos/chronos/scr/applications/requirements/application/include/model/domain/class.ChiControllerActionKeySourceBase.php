<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:49 CET 2011. 
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
        parent::__construct($oid, 'ChiControllerActionKeySource');
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
      return Message::get("ChiControllerActionKeySource");
    }
}
?>
