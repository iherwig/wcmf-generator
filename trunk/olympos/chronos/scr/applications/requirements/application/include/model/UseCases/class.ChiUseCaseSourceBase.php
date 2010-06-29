<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:43:01 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCase.php");

/**
 * @class ChiUseCaseSource
 * ChiUseCaseSource description: A Business Use Case is part of a business process that produces an advantage to the enterprise.
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseSourceBase extends ChiBusinessUseCase
{
    function ChiUseCaseSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiUseCaseSource');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiBusinessUseCase";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiUseCaseSource");
    }
}
?>
