<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:45:07 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ObjectFlow.php");

/**
 * @class ChiObjectObjectFlowTargetEnd
 * ChiObjectObjectFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowTargetEndBase extends ObjectFlow
{
    function ChiObjectObjectFlowTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiObjectObjectFlowTargetEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ObjectFlow";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiObjectObjectFlowTargetEnd");
    }
}
?>
