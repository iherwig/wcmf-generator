<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Wed Mar 23 15:36:13 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiController.php");

/**
 * @class TargetActionKeyEnd
 * TargetActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class TargetActionKeyEndBase extends NMChiControllerActionKeyChiController
{
    function TargetActionKeyEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'TargetActionKeyEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "NMChiControllerActionKeyChiController";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("TargetActionKeyEnd");
    }
}
?>
