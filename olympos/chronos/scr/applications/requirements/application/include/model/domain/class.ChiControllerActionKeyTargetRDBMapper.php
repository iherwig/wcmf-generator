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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:08:50 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiControllerActionKeyTarget.php");

/**
 * @class ChiControllerActionKeyTargetRDBMapper
 * ChiControllerActionKeyTargetRDBMapper maps ChiControllerActionKeyTarget Nodes to the database.
 * ChiControllerActionKeyTarget description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerActionKeyTargetRDBMapper extends ChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiControllerActionKeyTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiControllerActionKeyTarget($oid);
  }
}
?>
