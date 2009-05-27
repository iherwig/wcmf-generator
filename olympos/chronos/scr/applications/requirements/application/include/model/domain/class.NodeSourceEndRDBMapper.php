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
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-27 11:47. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiNodeChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NodeSourceEnd.php");

/**
 * @class NodeSourceEndRDBMapper
 * NodeSourceEndRDBMapper maps NodeSourceEnd Nodes to the database.
 * NodeSourceEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeSourceEndRDBMapper extends NMChiNodeChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NodeSourceEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NodeSourceEnd($oid);
  }
}
?>
