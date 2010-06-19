<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:16:01 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ActivitySend.php");

/**
 * @class ASControlFlowSource
 * ASControlFlowSource description: This eslement indicates the sending of a message.
 *
 * @author 
 * @version 1.0
 */
class ASControlFlowSourceBase extends ActivitySend
{
    function ASControlFlowSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ASControlFlowSource');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ActivitySend";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ASControlFlowSource");
    }
}
?>
