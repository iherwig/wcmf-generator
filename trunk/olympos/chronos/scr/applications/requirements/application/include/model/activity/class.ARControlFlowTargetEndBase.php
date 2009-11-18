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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Wed Nov 18 16:43:54 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ControlFlow.php");

/**
 * @class ARControlFlowTargetEnd
 * ARControlFlowTargetEnd description: 
 *
 * @author 
 * @version 1.0
 */
class ARControlFlowTargetEndBase extends ControlFlow
{
    function ARControlFlowTargetEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::EntityBaseExtended($oid, 'ARControlFlowTargetEnd');
      else
        parent::EntityBaseExtended($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ControlFlow";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ARControlFlowTargetEnd");
    }
}
?>
