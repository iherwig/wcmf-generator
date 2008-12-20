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
Ext.namespace("uwm.objecttree");

uwm.objecttree.Node = function(config) {
	uwm.objecttree.Node.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	this.buildContextMenu();
	
	var self = this;
	
	this.on("contextmenu", function(node, e) {
		self.showContextMenu(node, e);
	});
	
	this.on("click", function(node, e) {
		self.showProperties(node, e);
	});
}

Ext.extend(uwm.objecttree.Node, Ext.tree.AsyncTreeNode, {
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				text: "Delete from model",
				handler: function(item, e) {
					self.deleteFromModel(item, e);
				}
			}]
		});
		
		return this.contextMenu;
	},
	
	showContextMenu: function(self, e) {
		e.stopPropagation();
		
		self.contextMenu.showAt(e.getXY());
	},
	
	deleteFromModel: function(self, e) {
		uwm.model.ModelContainer.getInstance().deleteByModelNode(this.getModelNode());
	},
	
	getModelNode: function() {
		return this.modelNode;
	},
	
	showProperties: function(self, e) {
		uwm.property.PropertyContainer.getInstance().showProperty(this.getModelNode());
	}
});
