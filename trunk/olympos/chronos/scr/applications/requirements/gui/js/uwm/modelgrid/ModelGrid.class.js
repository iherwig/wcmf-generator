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
Ext.namespace("uwm.modelgrid");

// UNFINISHED WORK IN PROGRESS!!!

uwm.modelgrid.ModelGrid = Ext.extend(Ext.grid.gridPanel, {
	initComponent: function(config) {
	
		Ext.apply(this, {
			layout: "fit",
			enableDragDrop: true,
			selModel: new Ext.grid.RowSelectionModel({
				singleSelect: true
			})
		});
		
		this.uwmClassName = config.uwmClassName;
		
		this.buildContextMenu();
		
		uwm.modelgrid.ModelGrid.superclass.initComponent.apply(this, arguments);
		
		var self = this;
		
		this.on("cellclick", function(grid, rowIndex, columnIndex, e) {
			self.showProperties(grid, rowIndex, columnIndex, e);
		});
		
		this.on("rowcontextmenu", function(grid, rowIndex, e) {
			self.showContextMenu(grid, rowIndex, e);
		});
		
		
	},
	
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = new Ext.menu.Menu({
			items: [new Ext.menu.Item({
				id: uwm.modelgrid.ModelGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID,
				text: "Show in diagram",
				handler: function(item, e) {
					self.showInDiagram(item, e);
				},
			}), new Ext.menu.Item({
				text: "Show in model tree",
				handler: function(item, e) {
					self.showInModelTree(item, e);
				}
			}), new Ext.menu.Item({
				text: "Show in hierarchy",
				handler: function(item, e) {
					self.showInHierarchy(item, e);
				}
			}), "-", {
				text: "Delete from model",
				handler: function(item, e) {
					self.deleteFromModel(item, e);
				}
			}]
		});
	},
	
	showContextMenu: function(grid, rowIndex, e) {
		var showInDiagram = this.contextMenu.items.get(uwm.modelgrid.ModelGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID);
		
		showInDiagram.disabled = !this.containedInCurrentDiagram(rowIndex);
		
		this.contextMenu.rowIndex = rowIndex;
		
		this.contextMenu.showAt([e.getXY()[0] + 2, e.getXY()[1] + 2]);
		
		e.preventDefault();
	},
	
	containedInCurrentDiagram: function(rowIndex) {
		return false;
	},
	
	showInDiagram: function(item, e) {
		alert("TODO: Show in Diagram");
	},
	
	showInModelTree: function(item, e) {
		alert("TODO: Show in model tree");
	},
	
	showInHierarchy: function(item, e) {
		uwm.hierarchytree.HierarchyTree.getInstance().loadNode(this.getModelNode(item).getOid());
	},
	
	deleteFromDiagram: function(item, e) {
		alert("TODO: Delete from Diagram");
	},
	
	getModelNode: function(item) {
		return null;
	}
})

uwm.modelgrid.ModelGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID = "showInDiagram";
