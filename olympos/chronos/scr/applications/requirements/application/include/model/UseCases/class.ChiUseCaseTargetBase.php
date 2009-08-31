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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Aug 31 09:15:23 CEST 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/UseCases/class.ChiBusinessUseCase.php");

/**
 * @class ChiUseCaseTarget
 * ChiUseCaseTarget description: A Business Use Case is part of a business process that produces an advantage to the enterprise.
 *
 * @author 
 * @version 1.0
 */
class ChiUseCaseTargetBase extends ChiBusinessUseCase
{
    function ChiUseCaseTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiBase($oid, 'ChiUseCaseTarget');
      else
        parent::ChiBase($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiBusinessUseCase";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiUseCaseTarget");
    }
}
?>
