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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Fri Jun 18 14:17:24 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeManyToManyRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NodeManyToManyTarget.php");

/**
 * @class NodeManyToManyTargetRDBMapper
 * NodeManyToManyTargetRDBMapper maps NodeManyToManyTarget Nodes to the database.
 * NodeManyToManyTarget description: A many to many node used in Chronos. It is used to realize a many to many relation between two ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeManyToManyTargetRDBMapper extends ChiNodeManyToManyRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NodeManyToManyTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NodeManyToManyTarget($oid);
  }
}
?>
