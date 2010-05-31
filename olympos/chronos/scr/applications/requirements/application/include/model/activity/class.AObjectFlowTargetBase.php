<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:13:43 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.Activity.php");

/**
 * @class AObjectFlowTarget
 * AObjectFlowTarget description: An activity is the specification of a parameterized sequence of behaviour. An activity is shown as a round-cornered rectangle enclosing all the actions, control flows and other elements that make up the activity.
 *
 * @author 
 * @version 1.0
 */
class AObjectFlowTargetBase extends Activity
{
    function AObjectFlowTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'AObjectFlowTarget');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "Activity";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("AObjectFlowTarget");
    }
}
?>
