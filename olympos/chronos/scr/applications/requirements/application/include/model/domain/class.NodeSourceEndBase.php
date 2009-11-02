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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Mon Nov 02 11:12:50 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiAssociation.php");

/**
 * @class NodeSourceEnd
 * NodeSourceEnd description: this class handle all the relationships between ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeSourceEndBase extends ChiAssociation
{
    function NodeSourceEndBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::Relation($oid, 'NodeSourceEnd');
      else
        parent::Relation($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiAssociation";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NodeSourceEnd");
    }
}
?>
