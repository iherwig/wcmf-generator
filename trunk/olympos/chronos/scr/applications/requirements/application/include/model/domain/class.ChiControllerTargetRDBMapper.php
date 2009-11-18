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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 16:43:49 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiControllerTarget.php");

/**
 * @class ChiControllerTargetRDBMapper
 * ChiControllerTargetRDBMapper maps ChiControllerTarget Nodes to the database.
 * ChiControllerTarget description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerTargetRDBMapper extends ChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiControllerTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiControllerTarget($oid);
  }
}
?>
