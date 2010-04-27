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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:43:08 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ActivityDecisionRDBMapper.php");
require_once(BASE."application/include/model/activity/class.ADControlFlowSource.php");

/**
 * @class ADControlFlowSourceRDBMapper
 * ADControlFlowSourceRDBMapper maps ADControlFlowSource Nodes to the database.
 * ADControlFlowSource description: A Decision is used to represent a choice amongst several possibilities.  Each transition usually is labeled with a text describing the response to the question posed by the Decision point.
 *
 * @author 
 * @version 1.0
 */
class ADControlFlowSourceRDBMapper extends ActivityDecisionRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ADControlFlowSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ADControlFlowSource($oid);
  }
}
?>
