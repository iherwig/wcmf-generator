<?php
/**
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:11:43 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseCore.php");

/**
 * @class ChiUseCaseCoreTarget
 * ChiUseCaseCoreTarget description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreTargetBase extends ChiBusinessUseCaseCore
{
    function ChiUseCaseCoreTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiUseCaseCoreTarget');
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
      return Message::get("ChiUseCaseCoreTarget");
    }
}
?>
