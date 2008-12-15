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

/**
 * @constructor
 * @param {Object} config
 */
uwm.modeltree.PackageNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndOid("Package", config.oid);

	uwm.modeltree.PackageNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
	}, config));
}

Ext.extend(uwm.modeltree.PackageNode, uwm.objecttree.Node, {
	/**
	 * @member uwm.modeltree.PackageNode
	 */
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				text: "Add package",
				handler: function(item, e) {
					self.addPackage(item, e);
				}
			}, {
				text: "Add diagram",
				handler: function(item, e) {
					self.addDiagram(item, e);
				}
			}, {
				text: "Delete from model",
				handler: function(item, e) {
					self.deleteFromModel(item, e);
				}
			}]
		});
		
		return this.contextMenu;
	},
	
	addPackage: function(self, e) {
		uwm.model.ModelContainer.getInstance().createPackage(this.getModelNode());
	},
	
	addDiagram: function(self, e) {
		uwm.model.ModelContainer.getInstance().createDiagram(this.getModelNode());
	}
});
