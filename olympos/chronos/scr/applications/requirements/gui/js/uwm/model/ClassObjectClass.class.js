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
 * Defines common characteristics of a class of Class Objects.
 * 
 * <p>
 * This class should not be instantiated, but extended.
 * </p>
 * 
 * <p>
 * Every child of this class is a <i>Singleton</i>.
 * </p>
 * 
 * @see uwm.model.ModelObject
 * @constructor
 */
uwm.model.ClassObjectClass = function() {
	uwm.model.ClassObjectClass.superclass.constructor.call(this);
}

Ext.extend(uwm.model.ClassObjectClass, uwm.model.ModelClass);

uwm.model.ClassObjectClass.prototype.isAttributeEnabled = function() {
	return true;
}

uwm.model.ClassObjectClass.prototype.isOperationEnabled = function() {
	return true;
}
