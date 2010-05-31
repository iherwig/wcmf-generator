<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:15:42 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociation.php");

/**
 * @class NodeTargetEnd
 * NodeTargetEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeTargetEndBase extends ChiAssociation
{
    function NodeTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'NodeTargetEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiAssociation";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NodeTargetEnd");
    }
}
?>
