<?php
/*
 * Copyright (c) 2011 The Olympos Development Team.
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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:08:55 CET 2011. 
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
