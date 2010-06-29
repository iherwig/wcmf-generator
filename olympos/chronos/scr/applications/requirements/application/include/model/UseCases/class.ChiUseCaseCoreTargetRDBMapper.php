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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jun 29 10:43:07 CEST 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseCoreRDBMapper.php");
require_once(BASE."application/include/model/UseCases/class.ChiUseCaseCoreTarget.php");

/**
 * @class ChiUseCaseCoreTargetRDBMapper
 * ChiUseCaseCoreTargetRDBMapper maps ChiUseCaseCoreTarget Nodes to the database.
 * ChiUseCaseCoreTarget description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreTargetRDBMapper extends ChiBusinessUseCaseCoreRDBMapper
{
  /**
   * @see RDBMapper::getType()
   */
  function getType()
  {
    return 'ChiUseCaseCoreTarget';
  }
  /**
   * @see NodeRDBMapper::createObject()
   */
  function &createObject($oid=null)
  {
    return new ChiUseCaseCoreTarget($oid);
  }
}
?>
