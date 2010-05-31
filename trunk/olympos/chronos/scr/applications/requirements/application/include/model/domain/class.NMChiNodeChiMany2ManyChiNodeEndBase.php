<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:15:27 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNode.php");

/**
 * @class NMChiNodeChiMany2ManyChiNodeEnd
 * NMChiNodeChiMany2ManyChiNodeEnd description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class NMChiNodeChiMany2ManyChiNodeEndBase extends ChiNode
{
    function NMChiNodeChiMany2ManyChiNodeEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'NMChiNodeChiMany2ManyChiNodeEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiNode";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NMChiNodeChiMany2ManyChiNodeEnd");
    }
}
?>
