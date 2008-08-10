<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0008 from model/requirements.xmi on 07.08.08 16:48. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.ChiBaseBase.php");
// PROTECTED REGION ID(application/include/model/class.ChiBase.php/Import) START
// PROTECTED REGION END

/**
 * @class ChiBase
 * ChiBase description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class ChiBase extends ChiBaseBase
{
// PROTECTED REGION ID(application/include/model/class.ChiBase.php/Body) START

  function beforeInsert() 
  {
    parent::beforeInsert();
    
    // set creation date on nodes with appropriate attribute
    if (in_array('Alias', $this->getValueNames(DATATYPE_ATTRIBUTE)))
	{
      $aliascounter = $this->getValueProperty('ChiRequirement','id');
	  $this->setValue('Alias', $this->getType(). $aliascounter , DATATYPE_ATTRIBUTE);
	   $this->setValue('Version', 0, DATATYPE_ATTRIBUTE);
	}
    $this->beforeUpdate();
  }
  /**
   * Set last_editor and modified attribute on the node.
   */
  function beforeUpdate()
  {
    parent::beforeUpdate();
	$version= $this->getVersion()+1;
	  $this->setValue('Version', $version, DATATYPE_ATTRIBUTE);   
  
  }

// PROTECTED REGION END
}
?>
