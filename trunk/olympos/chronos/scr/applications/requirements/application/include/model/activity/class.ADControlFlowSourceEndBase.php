<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:45:06 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlow.php");

/**
 * @class ADControlFlowSourceEnd
 * ADControlFlowSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ADControlFlowSourceEndBase extends ControlFlow
{
    function ADControlFlowSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ADControlFlowSourceEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ControlFlow";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ADControlFlowSourceEnd");
    }
}
?>
