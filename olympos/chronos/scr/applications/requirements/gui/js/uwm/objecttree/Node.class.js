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

/**
 * @class Abstract base class for all ObjectTree nodes.
 *
 * @extends Ext.tree.AsyncTreeNode
 * @see uwm.objecttree.ObjectTree
 * @constructor
 * @param {Object} config The configuration object.
 */
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

Ext.extend(uwm.objecttree.Node, Ext.tree.AsyncTreeNode);

uwm.objecttree.Node.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item, e);
			}
		}]
	});
	
	return this.contextMenu;
}

uwm.objecttree.Node.prototype.showContextMenu = function(self, e) {
	e.stopPropagation();
	
	self.contextMenu.showAt(e.getXY());
}

uwm.objecttree.Node.prototype.deleteFromModel = function(self, e) {
	uwm.model.ModelContainer.getInstance().deleteByModelNode(this.getModelNode());
}

uwm.objecttree.Node.prototype.getModelNode = function() {
	return this.modelNode;
}

uwm.objecttree.Node.prototype.showProperties = function(self, e) {
	uwm.property.PropertyContainer.getInstance().showProperty(this.getModelNode());
}
