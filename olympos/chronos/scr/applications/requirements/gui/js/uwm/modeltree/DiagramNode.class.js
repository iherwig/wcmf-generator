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

uwm.modeltree.DiagramNode = function(config) {
	this.modelNode = uwm.Session.getInstance().getModelContainer().createByClassAndOid("Diagram", config.oid);

	uwm.modeltree.DiagramNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		allowDrop: false,
		leaf: true
	}, config));
	
	var self = this;
	
	this.on("dblclick", function(item, e) {
		self.open(item, e);
	});

}

Ext.extend(uwm.modeltree.DiagramNode, uwm.objecttree.Node, {

	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				text: "Open",
				handler: function(item, e) {
					self.open(item, e);
				}
			}, {
				text: "Delete from model",
				handler: function(item, e) {
					self.deleteFromModel(item.e);
				}
			}]
		});
		
		return this.contextMenu;
	},
	
	open: function(self, e) {
		alert("TODO: Open Diagram");
	}
});
