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
Ext.namespace("uwm.hierarchytree");

/**
 * @class Represents a connection within the Hierarchy Tree.
 * 
 * @extends Ext.tree.TreeNode
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.hierarchytree.ConnectionNode = function(config) {
	uwm.hierarchytree.ConnectionNode.superclass.constructor.call(this, Ext.apply(this, {
		leaf: false,
		allowDrag: false,
		allowDrop: false
	}, config));
}

Ext.extend(uwm.hierarchytree.ConnectionNode, Ext.tree.TreeNode);
