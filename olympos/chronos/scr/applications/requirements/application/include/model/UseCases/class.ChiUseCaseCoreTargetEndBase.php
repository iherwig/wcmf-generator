<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:43:59 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.NMChiUseCaseChiUseCase.php");

/**
 * @class ChiUseCaseCoreTargetEnd
 * ChiUseCaseCoreTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreTargetEndBase extends NMChiUseCaseChiUseCase
{
    function ChiUseCaseCoreTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiUseCaseCoreTargetEnd');
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
      return Message::get("ChiUseCaseCoreTargetEnd");
    }
}
?>
