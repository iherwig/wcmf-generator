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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jan 05 15:38:10 CET 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiControllerSource.php");

/**
 * @class ChiControllerSourceRDBMapper
 * ChiControllerSourceRDBMapper maps ChiControllerSource Nodes to the database.
 * ChiControllerSource description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @author 
 * @version 1.0
 */
class ChiControllerSourceRDBMapper extends ChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiControllerSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiControllerSource($oid);
  }
}
?>
