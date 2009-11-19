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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Thu Nov 19 17:29:13 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/activity/class.ObjectFlow.php");

/**
 * @class AObjectFlowSourceEnd
 * AObjectFlowSourceEnd description: 
 *
 * @author 
 * @version 1.0
 */
class AObjectFlowSourceEndBase extends ObjectFlow
{
    function AObjectFlowSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Node('AObjectFlowSourceEnd', $oid);
      else
        parent::Node($type, $oid);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ObjectFlow";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("AObjectFlowSourceEnd");
    }
}
?>
