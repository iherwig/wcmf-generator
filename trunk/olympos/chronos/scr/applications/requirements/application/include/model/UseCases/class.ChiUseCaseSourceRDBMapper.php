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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Apr 27 15:43:45 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiUseCaseSource.php");

/**
 * @class ChiUseCaseSourceRDBMapper
 * ChiUseCaseSourceRDBMapper maps ChiUseCaseSource Nodes to the database.
 * ChiUseCaseSource description: A Business Use Case is part of a business process that produces an advantage to the enterprise.
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseSourceRDBMapper extends ChiBusinessUseCaseRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiUseCaseSource';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiUseCaseSource($oid);
  }
}
?>
