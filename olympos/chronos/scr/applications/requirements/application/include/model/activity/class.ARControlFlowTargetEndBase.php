<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Jan 10 18:22:56 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlow.php");

/**
 * @class ARControlFlowTargetEnd
 * ARControlFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ARControlFlowTargetEndBase extends ControlFlow
{
    function ARControlFlowTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ARControlFlowTargetEnd');
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
      return Message::get("ARControlFlowTargetEnd");
    }
}
?>
