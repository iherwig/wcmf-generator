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

uwm.modeltree.ModelTree = Ext.extend(uwm.objecttree.ObjectTree, {
	initComponent: function() {
	
		Ext.apply(this, {
			id: uwm.modeltree.ModelTree.COMPONENT_ID,
			root: new Ext.tree.AsyncTreeNode({
				text: "root",
				draggable: false,
				id: 'root'
			}),
			loader: new uwm.modeltree.Loader(),
			iconCls: "TreeTab",
			rootVisible: false
		});
		
		this.buildContextMenu();
		
		uwm.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
	},
	
	render: function() {
		uwm.modeltree.ModelTree.superclass.render.apply(this, arguments);
		
		var self = this;
		
		this.el.on("contextmenu", function(e, el) {
			self.showContextMenu(self, e, el);
		});
	},
	
	buildContextMenu: function() {
		var self = this;

		this.contextMenu = new Ext.menu.Menu({
			items: [{
				text: "Add model",
				handler: function(item, e) {
					self.addModel();
					
				}
			}]
		});
	},
	
	showContextMenu: function(self, e, el) {
		e.preventDefault();
		
		self.contextMenu.showAt(e.getXY());
	},
	
	addModel: function() {
		alert("TODO: add Model");
	},
	
	getByOid: function() {
		return uwm.Session.getInstance().modelContainer.getByOid(oid).getModelTreeNode();
	}
});

uwm.modeltree.ModelTree.COMPONENT_ID = "uwm.modeltree.ModelTree.ID";
	
