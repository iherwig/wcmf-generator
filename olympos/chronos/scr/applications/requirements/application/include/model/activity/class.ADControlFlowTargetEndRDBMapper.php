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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Wed Mar 23 15:35:57 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlowRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ADControlFlowTargetEnd.php");

/**
 * @class ADControlFlowTargetEndRDBMapper
 * ADControlFlowTargetEndRDBMapper maps ADControlFlowTargetEnd Nodes to the database.
 * ADControlFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ADControlFlowTargetEndRDBMapper extends ControlFlowRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ADControlFlowTargetEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ADControlFlowTargetEnd($oid);
  }
}
?>
