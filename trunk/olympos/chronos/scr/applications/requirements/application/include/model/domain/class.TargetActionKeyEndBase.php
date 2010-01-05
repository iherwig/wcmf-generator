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
 * This file was generated by wCMFGenerator 3.0.0018 from requirements.uml on Tue Jan 05 15:38:17 CET 2010. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.NMChiControllerActionKeyChiController.php");

/**
 * @class TargetActionKeyEnd
 * TargetActionKeyEnd description: this class defines a control flow.
 *
 * @author 
 * @version 1.0
 */
class TargetActionKeyEndBase extends NMChiControllerActionKeyChiController
{
    function TargetActionKeyEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::__construct($oid, 'TargetActionKeyEnd');
      else
        parent::__construct($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "NMChiControllerActionKeyChiController";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("TargetActionKeyEnd");
    }
}
?>
