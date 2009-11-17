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
 * This file was generated by wCMFGenerator 3.0.0017 from requirements.uml on Tue Nov 17 13:19:59 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 */
require_once(BASE."application/include/model/domain/class.ChiNodeManyToMany.php");

/**
 * @class NodeManyToManyTarget
 * NodeManyToManyTarget description: A many to many node used in Chronos. It is used to realize a many to many relation between two ChiNodes.
 *
 * @author 
 * @version 1.0
 */
class NodeManyToManyTargetBase extends ChiNodeManyToMany
{
    function NodeManyToManyTargetBase($oid=null, $type=null)
    {
      if ($type == null)
        parent::ChiNode($oid, 'NodeManyToManyTarget');
      else
        parent::ChiNode($oid, $type);
    }
    /**
     * @see PersistentObject::getBaseType()
     */
    function getBaseType()
    {
      return "ChiNodeManyToMany";
    }
    /**
     * @see PersistentObject::getObjectDisplayName()
     */
    function getObjectDisplayName()
    {
      return Message::get("NodeManyToManyTarget");
    }
}
?>
