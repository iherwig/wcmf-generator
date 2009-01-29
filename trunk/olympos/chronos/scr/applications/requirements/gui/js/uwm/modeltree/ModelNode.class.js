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
uwm.modeltree.ModelNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndOid("Model", config.oid);
	
	uwm.modeltree.ModelNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		allowDrag: false
	}, config));
}

Ext.extend(uwm.modeltree.ModelNode, uwm.objecttree.Node, {

	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				text: uwm.Dict.translate('Add package'),
				handler: function(item, e) {
					self.addPackage(item, e);
				}
			}, {
				text: uwm.Dict.translate('Delete from model'),
				handler: function(item, e) {
					self.deleteFromModel(item, e);
				}
			}, {
				text: uwm.Dict.translate('Select as grid scope'),
				handler: function(item, e) {
					self.selectAsScope(item, e);
				}
			}, {
				text: uwm.Dict.translate('Export as UML'),
				handler: function(item, e) {
					new uwm.ui.Download({
						downloadURL: "../application/main.php?response_format=JSON&usr_action=exportUWM&startModel=" + self.getModelNode().getOid()
					}).show();
				}
			}]
		});
		
		return this.contextMenu;
	},
	
	addPackage: function(self, e) {
		uwm.model.ModelContainer.getInstance().createPackage(this.getModelNode());
	},
	
	selectAsScope: function(self, e) {
		uwm.objectgrid.ObjectGridContainer.getInstance().loadScope(this.modelNode);
	}
});
