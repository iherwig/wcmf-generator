<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:15 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiController.php");

/**
 * @class SourceActionKeyEnd
 * SourceActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class SourceActionKeyEndBase extends NMChiControllerActionKeyChiController
{
    function SourceActionKeyEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'SourceActionKeyEnd');
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
      return Message::get("SourceActionKeyEnd");
    }
}
?>
