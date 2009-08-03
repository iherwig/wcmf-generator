<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Jul 30 11:28:53 CEST 2009. 
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
        parent::Relation($oid, 'NodeSourceEnd');
      else
        parent::Relation($oid, $type);
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