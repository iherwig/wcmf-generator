<?php
/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Jul 01 16:44:46 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseExtendedBase.php");
// PROTECTED REGION ID(application/include/model/class.EntityBaseExtended.php/Import) ENABLED START
require_once(BASE."application/include/controller/class.HtmlSanitizer.php");
// PROTECTED REGION END

/**
 * @class EntityBaseExtended
 * EntityBaseExtended description: 
 *
 * @author 
 * @version 1.0
 */
class EntityBaseExtended extends EntityBaseExtendedBase
{
// PROTECTED REGION ID(application/include/model/class.EntityBaseExtended.php/Body) ENABLED START
  /**
   * Sanitize Notes Value
   */
  function beforeInsert() 
  {
    parent::beforeInsert();
    
    if (in_array('Notes', $this->getValueNames(DATATYPE_ATTRIBUTE))){
      $this->setValue('Notes', HtmlSanitizer::sanitize($this->getValue('Notes')), DATATYPE_ATTRIBUTE);
	}
  }
   
  /**
   * Set last_editor and modified attribute on the node.
   */
  function beforeUpdate()
  {
    parent::beforeUpdate();
    
    // set modified date on nodes with appropriate attribute
    if (in_array('Notes', $this->getValueNames(DATATYPE_ATTRIBUTE)))
      $this->setValue('Notes', HtmlSanitizer::sanitize($this->getValue('Notes')), DATATYPE_ATTRIBUTE);

  }
// PROTECTED REGION END
}
?>
