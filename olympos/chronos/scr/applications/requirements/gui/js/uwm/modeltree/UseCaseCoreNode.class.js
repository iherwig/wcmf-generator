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
 * @class UseCaseCore in Model Tree.
 *
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.UseCaseCoreNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndOid("ChiBusinessUseCaseCore", config.oid);
	
	uwm.modeltree.UseCaseCoreNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
	}, config));
}

Ext.extend(uwm.modeltree.UseCaseCoreNode, uwm.objecttree.Node);

/**
 * @member uwm.modeltree.PackageNode
 */
uwm.modeltree.UseCaseCoreNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			text: uwm.Dict.translate('Add activity set'),
			handler: function(item, e) {
				self.addActivitySet(item, e);
			}
		}, {
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item, e);
			}
		}, {
			text: uwm.Dict.translate("Reload"),
			handler: function(item, e) {
				self.reload();
			}
		}]
	});
	
	return this.contextMenu;
}

uwm.modeltree.UseCaseCoreNode.prototype.addActivitySet = function(self, e) {
	uwm.model.ModelContainer.getInstance().createActivitySet(this.getModelNode());
}
