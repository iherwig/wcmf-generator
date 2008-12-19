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

uwm.objecttree.ObjectNode = function(config) {
	uwm.objecttree.ObjectNode.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.objecttree.ObjectNode, uwm.objecttree.Node, {
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				id: uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID,
				text: "Show in diagram",
				handler: function(item, e) {
					self.showInDiagram(item, e);
				}
			}, {
				id: uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID,
				text: "Show in grid",
				handler: function(item, e) {
					self.showInGrid(item.e);
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
	
	showContextMenu: function(self, e) {
		var showInDiagram = this.contextMenu.items.get(uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID);
		var showInGrid = this.contextMenu.items.get(uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID);
		
		var isInDiagram = this.containedInCurrentDiagram();
		showInDiagram.setDisabled(!isInDiagram);

		var isGridAvailable = this.gridAvailable();
		showInGrid.setDisabled(!isGridAvailable);
		
		uwm.objecttree.ObjectNode.superclass.showContextMenu(self, e);
	},
	
	containedInCurrentDiagram: function() {
		return uwm.diagram.DiagramContainer.getInstance().isModelObjectContainedInCurrentDiagram(this.modelNode);
	},
	
	gridAvailable: function() {
		return uwm.objectgrid.ObjectGridContainer.getInstance().isGridAvailable(this.modelNode);
	},
	
	showInDiagram: function(self, e) {
		uwm.diagram.DiagramContainer.getInstance().getCurrentDiagram().scrollToObject(this.modelNode);
	},
	
	showInGrid: function(self, e) {
		uwm.objectgrid.ObjectGridContainer.getInstance().selectRow(this.modelNode);
	},
});

uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_DIAGRAM_ID = "showInDiagram";
uwm.objecttree.ObjectNode.CONTEXTMENU_SHOW_IN_GRID_ID = "showInGrid";
