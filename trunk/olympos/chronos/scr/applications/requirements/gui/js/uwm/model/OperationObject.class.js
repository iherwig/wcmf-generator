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
 * @class Parent class of all Operation Objects representing UML Class
 *        operations.
 * 
 * <p>
 * This class should not be instantiated, but extended.
 * </p>
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 */
uwm.model.OperationObject = function(modelNodeClass) {
	uwm.model.OperationObject.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.OperationObject, uwm.model.ModelNode);
