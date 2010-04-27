<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:43:10 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ActivityReceive.php");

/**
 * @class ARControlFlowTarget
 * ARControlFlowTarget description: this element indicates that a previous sended messages has been received.
 *
 * @author 
 * @version 1.0
 */
class ARControlFlowTargetBase extends ActivityReceive
{
    function ARControlFlowTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ARControlFlowTarget');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ActivityReceive";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ARControlFlowTarget");
    }
}
?>
