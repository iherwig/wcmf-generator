<?php
/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/**
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Oct 19 17:03:08 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/class.EntityBaseBase.php");
// PROTECTED REGION ID(application/include/model/class.EntityBase.php/Import) ENABLED START
// PROTECTED REGION END

/**
 * @class EntityBase
 * EntityBase description: 
 *
 * @author 
 * @version 1.0
 */
class EntityBase extends EntityBaseBase
{
// PROTECTED REGION ID(application/include/model/class.EntityBase.php/Body) ENABLED START
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
  /**
   * Set the sortkey initially if existing.
   */
  function afterInsert()
  {
    parent::afterInsert();

    // set the sortkey to the id value
    if (in_array('sortkey', $this->getValueNames(DATATYPE_IGNORE)))
    {
      $this->setSortkey($this->getDBID());
      $this->save();
    }
  }
// PROTECTED REGION END
}
?>
