<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:43:05 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ChiObject.php");

/**
 * @class ChiObjectObjectFlowTarget
 * ChiObjectObjectFlowTarget description: a chiObject reppresent an instance of a ChiNode or a Chivalue.
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowTargetBase extends ChiObject
{
    function ChiObjectObjectFlowTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiObjectObjectFlowTarget');
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
      return Message::get("ChiObjectObjectFlowTarget");
    }
}
?>
