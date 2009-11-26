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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Nov 26 12:44:59 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeRDBMapper.php");
require_once(BASE."application/include/model/domain/class.NMChiNodeChiMany2ManyChiNodeEnd.php");

/**
 * @class NMChiNodeChiMany2ManyChiNodeEndRDBMapper
 * NMChiNodeChiMany2ManyChiNodeEndRDBMapper maps NMChiNodeChiMany2ManyChiNodeEnd Nodes to the database.
 * NMChiNodeChiMany2ManyChiNodeEnd description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @author 
 * @version 1.0
 */
class NMChiNodeChiMany2ManyChiNodeEndRDBMapper extends ChiNodeRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'NMChiNodeChiMany2ManyChiNodeEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new NMChiNodeChiMany2ManyChiNodeEnd($oid);
  }
}
?>
