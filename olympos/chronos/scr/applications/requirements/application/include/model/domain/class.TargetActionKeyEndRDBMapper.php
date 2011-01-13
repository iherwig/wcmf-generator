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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Jan 13 15:13:15 CET 2011. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiControllerRDBMapper.php");
require_once(BASE."application/include/model/domain/class.TargetActionKeyEnd.php");

/**
 * @class TargetActionKeyEndRDBMapper
 * TargetActionKeyEndRDBMapper maps TargetActionKeyEnd Nodes to the database.
 * TargetActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class TargetActionKeyEndRDBMapper extends NMChiControllerActionKeyChiControllerRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'TargetActionKeyEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new TargetActionKeyEnd($oid);
  }
}
?>
