<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 02 15:19:11 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerChiController.php");

/**
 * @class TargetEnd
 * TargetEnd description: this class handle all the relationships between ChiControllers.
 *
 * @author 
 * @version 1.0
 */
class TargetEndBase extends NMChiControllerChiController
{
    function TargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Relation($oid, 'TargetEnd');
      else
        parent::Relation($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "NMChiControllerChiController";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("TargetEnd");
    }
}
?>
