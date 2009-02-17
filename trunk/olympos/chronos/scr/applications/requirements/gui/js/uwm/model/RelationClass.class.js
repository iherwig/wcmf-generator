/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

Ext.namespace("uwm.model");

/**
 * @class Common characteristics of an n:m Relation Class.
 * 
 * <p>This class should not be instantiated, but extended.</p>
 * 
 * @extends uwm.model.ModelNodeClass
 * @constructor
 */
uwm.model.RelationClass = function() {
	uwm.model.RelationClass.superclass.constructor.call(this);
}

Ext.extend(uwm.model.RelationClass, uwm.model.ModelNodeClass);
