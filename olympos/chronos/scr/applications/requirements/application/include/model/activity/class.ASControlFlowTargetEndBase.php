<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:15:40 CEST 2010. 
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
