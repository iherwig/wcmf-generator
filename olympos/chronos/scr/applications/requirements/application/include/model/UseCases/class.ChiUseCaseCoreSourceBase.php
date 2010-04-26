<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Apr 26 17:26:39 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseCore.php");

/**
 * @class ChiUseCaseCoreSource
 * ChiUseCaseCoreSource description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreSourceBase extends ChiBusinessUseCaseCore
{
    function ChiUseCaseCoreSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiUseCaseCoreSource');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiBusinessUseCaseCore";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiUseCaseCoreSource");
    }
}
?>
