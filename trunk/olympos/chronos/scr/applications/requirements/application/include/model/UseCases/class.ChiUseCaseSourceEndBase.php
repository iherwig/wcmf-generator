<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:15 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.NMChiUseCaseChiUseCase.php");

/**
 * @class ChiUseCaseSourceEnd
 * ChiUseCaseSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseSourceEndBase extends NMChiUseCaseChiUseCase
{
    function ChiUseCaseSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiUseCaseSourceEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "NMChiUseCaseChiUseCase";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiUseCaseSourceEnd");
    }
}
?>
