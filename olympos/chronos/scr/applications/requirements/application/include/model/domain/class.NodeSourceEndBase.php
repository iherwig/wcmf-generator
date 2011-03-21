<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:09:13 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociation.php");

/**
 * @class NodeSourceEnd
 * NodeSourceEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeSourceEndBase extends ChiAssociation
{
    function NodeSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'NodeSourceEnd');
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
      return Message::get("NodeSourceEnd");
    }
}
?>
