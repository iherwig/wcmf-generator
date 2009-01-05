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
Ext.namespace("uwm.treeadmin");

uwm.treeadmin.NewModelObjectNode = function(config) {
	this.modelClass = config.modelClass;
	
	uwm.treeadmin.NewModelObjectNode.superclass.constructor.call(this, Ext.apply(this, {
		text: "add new " + this.modelClass.getUwmClassName(),
		leaf: true
	}, config));
}

Ext.extend(uwm.treeadmin.NewModelObjectNode, Ext.tree.TreeNode);
