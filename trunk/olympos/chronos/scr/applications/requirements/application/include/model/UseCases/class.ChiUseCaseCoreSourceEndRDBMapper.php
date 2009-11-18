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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 12:45:41 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.NMChiUseCaseChiUseCaseRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiUseCaseCoreSourceEnd.php");

/**
 * @class ChiUseCaseCoreSourceEndRDBMapper
 * ChiUseCaseCoreSourceEndRDBMapper maps ChiUseCaseCoreSourceEnd Nodes to the database.
 * ChiUseCaseCoreSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreSourceEndRDBMapper extends NMChiUseCaseChiUseCaseRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiUseCaseCoreSourceEnd';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiUseCaseCoreSourceEnd($oid);
  }
}
?>
