<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:13:43 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ChiObject.php");

/**
 * @class ChiObjectObjectFlowSource
 * ChiObjectObjectFlowSource description: a chiObject reppresent an instance of a ChiNode or a Chivalue.
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowSourceBase extends ChiObject
{
    function ChiObjectObjectFlowSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiObjectObjectFlowSource');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiObject";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiObjectObjectFlowSource");
    }
}
?>
