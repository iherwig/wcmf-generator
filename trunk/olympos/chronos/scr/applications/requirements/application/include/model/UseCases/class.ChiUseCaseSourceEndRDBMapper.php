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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Mon Apr 26 17:27:50 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.NMChiUseCaseChiUseCaseRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiUseCaseSourceEnd.php");

/**
 * @class ChiUseCaseSourceEndRDBMapper
 * ChiUseCaseSourceEndRDBMapper maps ChiUseCaseSourceEnd Nodes to the database.
 * ChiUseCaseSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseSourceEndRDBMapper extends NMChiUseCaseChiUseCaseRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiUseCaseSourceEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiUseCaseSourceEnd($oid);
  }
}
?>
