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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:10:38 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ChiObjectRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ChiObjectObjectFlowTarget.php");

/**
 * @class ChiObjectObjectFlowTargetRDBMapper
 * ChiObjectObjectFlowTargetRDBMapper maps ChiObjectObjectFlowTarget Nodes to the database.
 * ChiObjectObjectFlowTarget description: a chiObject reppresent an instance of a ChiNode or a Chivalue.
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowTargetRDBMapper extends ChiObjectRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiObjectObjectFlowTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiObjectObjectFlowTarget($oid);
  }
}
?>
