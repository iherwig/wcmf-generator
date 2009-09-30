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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Sep 30 17:48:25 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociationRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NodeSourceEndChiAssociation.php");

/**
 * @class NodeSourceEndChiAssociationRDBMapper
 * NodeSourceEndChiAssociationRDBMapper maps NodeSourceEndChiAssociation Nodes to the database.
 * NodeSourceEndChiAssociation description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeSourceEndChiAssociationRDBMapper extends ChiAssociationRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NodeSourceEndChiAssociation';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NodeSourceEndChiAssociation($oid);
  }
}
?>
