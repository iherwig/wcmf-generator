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
Ext.namespace("uwm.modeltree");

uwm.modeltree.Node = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndNameAndOid(config.uwmClassName, config.text, config.oid);

	uwm.modeltree.Node.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		leaf: true,
		allowDrop: false
	}, config));
}

Ext.extend(uwm.modeltree.Node, uwm.objecttree.ObjectNode, {
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = uwm.modeltree.Node.superclass.buildContextMenu.apply(this);
		
		this.contextMenu.add({
			text: "Show in hierarchy",
			handler: function(item, e) {
				self.showInHierarchy(item, e);
			}
		});
		
		return this.contextMenu;
	},
	
	showInHierarchy: function(self, e) {
		uwm.hierarchytree.HierarchyTree.getInstance().loadNode(this.getModelNode().getOid());
	},
	
	gridAvailable: function() {
		return uwm.objectgrid.ObjectGridContainer.getInstance().isGridAvailable(this.modelNode, this.parentNode.getModelNode().getOid());
	},
	
	expand: function(deep, anim, callback) {
		if (callback instanceof Function) {
			callback(this);
		}
	}
});
