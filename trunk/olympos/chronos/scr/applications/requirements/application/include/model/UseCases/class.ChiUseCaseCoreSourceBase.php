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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Nov 02 11:11:36 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCaseCore.php");

/**
 * @class ChiUseCaseCoreSource
 * ChiUseCaseCoreSource description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseCoreSourceBase extends ChiBusinessUseCaseCore
{
    function ChiUseCaseCoreSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiBusinessUseCase($oid, 'ChiUseCaseCoreSource');
      else
        parent::ChiBusinessUseCase($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiBusinessUseCaseCore";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiUseCaseCoreSource");
    }
}
?>
