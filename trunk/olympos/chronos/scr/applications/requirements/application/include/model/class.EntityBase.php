<?php
/**
 * This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 10:46. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseBase.php");
// PROTECTED REGION ID(application/include/model/class.EntityBase.php/Import) START
// PROTECTED REGION END

/**
 * @class EntityBase
 * EntityBase description: 
 *
 * @author Giuseppe Platania
 * @version 1.0
 */
class EntityBase extends EntityBaseBase
{
// PROTECTED REGION ID(application/include/model/class.EntityBase.php/Body) START
  /**
   * Set creator and created attribute on the node.
   */
  function beforeInsert() 
  {
    parent::beforeInsert();
    
    // set creation date on nodes with appropriate attribute
    if (in_array('created', $this->getValueNames(DATATYPE_ATTRIBUTE)))
      $this->setValue('created', date("Y-m-d H:i:s"), DATATYPE_ATTRIBUTE);

    // set creator on nodes with appropriate attribute
    if (in_array('creator', $this->getValueNames(DATATYPE_ATTRIBUTE)))
    {
      $rightsManager = RightsManager::getInstance();
      $authUser = &$rightsManager->getAuthUser();
      $this->setValue('creator', $authUser->getLogin(), DATATYPE_ATTRIBUTE);
    }
    $this->beforeUpdate();
  }
  /**
   * Set last_editor and modified attribute on the node.
   */
  function beforeUpdate()
  {
    parent::beforeUpdate();
    
    // set modified date on nodes with appropriate attribute
    if (in_array('modified', $this->getValueNames(DATATYPE_ATTRIBUTE)))
      $this->setValue('modified', date("Y-m-d H:i:s"), DATATYPE_ATTRIBUTE);

    // set last_editor on nodes with appropriate attribute
    if (in_array('last_editor', $this->getValueNames(DATATYPE_ATTRIBUTE)))
    {
      $rightsManager = RightsManager::getInstance();
      $authUser = &$rightsManager->getAuthUser();
      $this->setValue('last_editor', $authUser->getLogin(), DATATYPE_ATTRIBUTE);
    }
  }
// PROTECTED REGION END
}
?>
