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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Thu Nov 26 12:43:15 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ChiObject.php");

/**
 * @class ChiObjectObjectFlowSource
 * ChiObjectObjectFlowSource description: a chiObject reppresent an instance of a ChiNode or a Chivalue.
 *
 * @author 
 * @version 1.0
 */
class ChiObjectObjectFlowSourceBase extends ChiObject
{
    function ChiObjectObjectFlowSourceBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'ChiObjectObjectFlowSource');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiObject";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("ChiObjectObjectFlowSource");
    }
}
?>
