<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:45:07 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociation.php");

/**
 * @class NodeManyToManySourceEnd
 * NodeManyToManySourceEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeManyToManySourceEndBase extends ChiAssociation
{
    function NodeManyToManySourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'NodeManyToManySourceEnd');
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
      return Message::get("NodeManyToManySourceEnd");
    }
}
?>
