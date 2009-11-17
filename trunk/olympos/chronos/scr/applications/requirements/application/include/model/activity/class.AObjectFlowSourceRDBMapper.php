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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 17 13:18:17 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ActivityRDBMapper.php");
require_once(BASE."application/include/model/activity/class.AObjectFlowSource.php");

/**
 * @class AObjectFlowSourceRDBMapper
 * AObjectFlowSourceRDBMapper maps AObjectFlowSource Nodes to the database.
 * AObjectFlowSource description: An activity is the specification of a parameterized sequence of behaviour. An activity is shown as a round-cornered rectangle enclosing all the actions, control flows and other elements that make up the activity.
 *
 * @author 
 * @version 1.0
 */
class AObjectFlowSourceRDBMapper extends ActivityRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'AObjectFlowSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new AObjectFlowSource($oid);
  }
}
?>
