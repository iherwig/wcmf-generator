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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 03 20:20:30 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.ChiNodeSource.php");

/**
 * @class ChiNodeSourceRDBMapper
 * ChiNodeSourceRDBMapper maps ChiNodeSource Nodes to the database.
 * ChiNodeSource description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class ChiNodeSourceRDBMapper extends ChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiNodeSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiNodeSource($oid);
  }
}
?>
