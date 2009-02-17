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
 * @class An n:m Relation.
 * 
 * <p>This class should not be instantiated, but extended.</p>
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass The ModelNodeClass of this ModelNode.
 */
uwm.model.Relation = function(modelNodeClass) {
	uwm.model.Relation.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.Relation, uwm.model.ModelNode);
