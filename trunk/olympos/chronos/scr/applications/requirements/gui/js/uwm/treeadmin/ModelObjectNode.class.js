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

uwm.treeadmin.ModelObjectNode = function(config) {
	this.modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(config.record.uwmClassName);
	this.record = config.record;
	
	uwm.treeadmin.ModelObjectNode.superclass.constructor.call(this, Ext.apply(this, {
		text: config.record.Name,
		iconCls: this.modelClass.getTreeIcon(),
		leaf: true
	}, config));
	
	var self = this;
	
	this.on("click", function(node, e) {
		self.openObjectPanel(node, e);
	});
}

Ext.extend(uwm.treeadmin.ModelObjectNode, Ext.tree.TreeNode);

uwm.treeadmin.ModelObjectNode.prototype.openObjectPanel = function(node, e) {
	uwm.treeadmin.ModelObjectContainer.getInstance().activate(uwm.treeadmin.ModelObjectContainer.getInstance().add(new uwm.treeadmin.ModelObjectPanel({
		modelObject: uwm.model.ModelContainer.getInstance().createByClassAndOid(this.record.uwmClassName, this.record.oid)
	})));
}
