<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:09:10 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlow.php");

/**
 * @class ASControlFlowTargetEnd
 * ASControlFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ASControlFlowTargetEndBase extends ControlFlow
{
    function ASControlFlowTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ASControlFlowTargetEnd');
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
      return Message::get("ASControlFlowTargetEnd");
    }
}
?>
