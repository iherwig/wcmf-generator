<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:17:44 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ObjectFlow.php");

/**
 * @class ChiObjectObjectFlowSourceEnd
 * ChiObjectObjectFlowSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowSourceEndBase extends ObjectFlow
{
    function ChiObjectObjectFlowSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiObjectObjectFlowSourceEnd');
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
      return Message::get("ChiObjectObjectFlowSourceEnd");
    }
}
?>
