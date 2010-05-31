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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon May 31 15:15:40 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlowRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ASControlFlowTargetEnd.php");

/**
 * @class ASControlFlowTargetEndRDBMapper
 * ASControlFlowTargetEndRDBMapper maps ASControlFlowTargetEnd Nodes to the database.
 * ASControlFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ASControlFlowTargetEndRDBMapper extends ControlFlowRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ASControlFlowTargetEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ASControlFlowTargetEnd($oid);
  }
}
?>
