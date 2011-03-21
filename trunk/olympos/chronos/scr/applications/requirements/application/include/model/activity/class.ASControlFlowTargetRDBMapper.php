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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Mar 21 15:07:48 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ActivitySendRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ASControlFlowTarget.php");

/**
 * @class ASControlFlowTargetRDBMapper
 * ASControlFlowTargetRDBMapper maps ASControlFlowTarget Nodes to the database.
 * ASControlFlowTarget description: This eslement indicates the sending of a message.
 *
 * @author 
 * @version 1.0
 */
class ASControlFlowTargetRDBMapper extends ActivitySendRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ASControlFlowTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ASControlFlowTarget($oid);
  }
}
?>
