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
 * @class Represants a Model Object in Model Tree or Hierarchy Tree.
 *
 * @extends uwm.objecttree.Node
 * @see uwm.objecttree.ObjectTree
 * @see uwm.model.ModelObject
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.objecttree.ObjectNode = function(config) {
	uwm.objecttree.ObjectNode.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.objecttree.ObjectNode, uwm.objecttree.Node);

uwm.objecttree.ObjectNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			id: uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID,
			text: uwm.Dict.translate('Show in diagram'),
			handler: function(item, e) {
				self.showInDiagram(item, e);
			}
		}, {
			id: uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID,
			text: uwm.Dict.translate('Show in grid'),
			handler: function(item, e) {
				self.showInGrid(item.e);
			}
		}, {
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item, e);
			}
		}, {
			text: 'Show object history',
			//iconCls: "uwm-help-icon",
			handler: function(item, e) {
				self.showObjectHistory(item, e);
			}
			
		}, {
			text: uwm.Dict.translate('Help'),
			//iconCls: "uwm-help-icon",
			handler: function(item, e) {
				self.showHelp(item, e);
			}
		}]
	});
	
	return this.contextMenu;
}

uwm.objecttree.ObjectNode.prototype.showContextMenu = function(self, e) {
	var showInDiagram = this.contextMenu.items.get(uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID);
	var showInGrid = this.contextMenu.items.get(uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID);
	
	var isInDiagram = this.containedInCurrentDiagram();
	showInDiagram.setDisabled(!isInDiagram);
	
	var isGridAvailable = this.gridAvailable();
	showInGrid.setDisabled(!isGridAvailable);
	
	uwm.objecttree.ObjectNode.superclass.showContextMenu(self, e);
}

uwm.objecttree.ObjectNode.prototype.containedInCurrentDiagram = function() {
	return uwm.diagram.DiagramContainer.getInstance().isModelObjectContainedInCurrentDiagram(this.modelNode);
}

uwm.objecttree.ObjectNode.prototype.gridAvailable = function() {
	return uwm.objectgrid.ObjectGridContainer.getInstance().isGridAvailable(this.modelNode);
}

uwm.objecttree.ObjectNode.prototype.showInDiagram = function(self, e) {
	uwm.diagram.DiagramContainer.getInstance().getCurrentDiagram().scrollToObject(this.modelNode);
}

uwm.objecttree.ObjectNode.prototype.showInGrid = function(self, e) {
	uwm.objectgrid.ObjectGridContainer.getInstance().selectRow(this.modelNode);
}

uwm.objecttree.ObjectNode.prototype.showHelp = function(self, e) {
	uwm.ui.HelpViewer.getInstance().loadUrl(this.modelNode.getModelNodeClass().getHelpUrl());
}

uwm.objecttree.ObjectNode.prototype.showObjectHistory = function(self, e) {
	new uwm.ui.History(this.modelNode);
}


uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID = "showInDiagram";
uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID = "showInGrid";
