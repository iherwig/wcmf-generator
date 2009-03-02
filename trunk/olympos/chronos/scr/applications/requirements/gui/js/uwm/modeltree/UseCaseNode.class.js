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
 * @class A UseCase in Model Tree.
 *
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.UseCaseNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndNameAndOid("ChiBusinessUseCase", config.text, config.oid);
	
	uwm.modeltree.UseCaseNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
	}, config));
}

Ext.extend(uwm.modeltree.UseCaseNode, uwm.objecttree.Node);

/**
 * @member uwm.modeltree.PackageNode
 */
uwm.modeltree.UseCaseNode.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			id: uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID,
			text: uwm.Dict.translate('Show in diagram'),
			handler: function(item, e) {
				self.showInDiagram(item, e);
			}
		}, {
			id: uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_GRID_ID,
			text: uwm.Dict.translate('Show in grid'),
			handler: function(item, e) {
				self.showInGrid(item.e);
			}
		}, {
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
		}, {
			text: uwm.Dict.translate('Show object history'),
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

uwm.modeltree.UseCaseNode.prototype.showContextMenu = function(self, e) {
	var showInDiagram = this.contextMenu.items.get(uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID);
	var showInGrid = this.contextMenu.items.get(uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_GRID_ID);
	
	var isInDiagram = this.containedInCurrentDiagram();
	showInDiagram.setDisabled(!isInDiagram);
	
	var isGridAvailable = this.gridAvailable();
	showInGrid.setDisabled(!isGridAvailable);
	
	uwm.modeltree.UseCaseNode.superclass.showContextMenu(self, e);
}

uwm.modeltree.UseCaseNode.prototype.containedInCurrentDiagram = function() {
	return uwm.diagram.DiagramContainer.getInstance().isModelObjectContainedInCurrentDiagram(this.modelNode);
}

uwm.modeltree.UseCaseNode.prototype.gridAvailable = function() {
	return uwm.objectgrid.ObjectGridContainer.getInstance().isGridAvailable(this.modelNode, this.parentNode.getModelNode().getOid());
}

uwm.modeltree.UseCaseNode.prototype.addActivitySet = function(self, e) {
	uwm.model.ModelContainer.getInstance().createActivitySet(this.getModelNode());
}

uwm.modeltree.UseCaseNode.prototype.showInDiagram = function(self, e) {
	uwm.diagram.DiagramContainer.getInstance().getCurrentDiagram().scrollToObject(this.modelNode);
}

uwm.modeltree.UseCaseNode.prototype.showInGrid = function(self, e) {
	uwm.objectgrid.ObjectGridContainer.getInstance().selectRow(this.modelNode);
}

uwm.modeltree.UseCaseNode.prototype.showHelp = function(self, e) {
	uwm.ui.HelpViewer.getInstance().loadUrl(this.modelNode.getModelNodeClass().getHelpUrl());
}

uwm.modeltree.UseCaseNode.prototype.showObjectHistory = function(self, e) {
	new uwm.ui.History(this.modelNode);
}

uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID = "showInDiagram";
uwm.modeltree.UseCaseNode.CONTEXTMENU_SHOW_IN_GRID_ID = "showInGrid";