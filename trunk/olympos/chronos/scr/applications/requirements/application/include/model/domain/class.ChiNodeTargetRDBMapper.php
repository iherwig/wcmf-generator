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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Nov 02 16:53:01 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiNodeTarget.php");

/**
 * @class ChiNodeTargetRDBMapper
 * ChiNodeTargetRDBMapper maps ChiNodeTarget Nodes to the database.
 * ChiNodeTarget description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class ChiNodeTargetRDBMapper extends ChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiNodeTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiNodeTarget($oid);
  }
}
?>
