<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:43:59 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ObjectFlow.php");

/**
 * @class AObjectFlowTargetEnd
 * AObjectFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class AObjectFlowTargetEndBase extends ObjectFlow
{
    function AObjectFlowTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'AObjectFlowTargetEnd');
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
      return Message::get("AObjectFlowTargetEnd");
    }
}
?>
