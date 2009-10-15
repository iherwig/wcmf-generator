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
Ext.namespace("uwm.objectgrid");

/**
 * @class A list of all objects of one type in a selected scope.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.objectgrid.ObjectGrid = function(config) {
	var modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(config.uwmClassName);
	
	uwm.objectgrid.ObjectGrid.superclass.constructor.call(this, Ext.apply(this, {
		layout: "fit",
		enableDragDrop: true,
		selModel: new Ext.grid.RowSelectionModel({
			singleSelect: true
		}),
		iconCls: modelClass.getGridTabIconClass(),
		tabTip: modelClass.getGridTabTip(),
		columns: modelClass.getGridColumns(),
		store: new Ext.data.SimpleStore({
			id: "oid",
			fields: modelClass.getGridFields()
		}),
		viewConfig:{
			forceFit: true
		}
	}, config));
	
	this.uwmClassName = config.uwmClassName;
	
	this.buildContextMenu();
	
	// make sure that records are sorted by the label instead of
	// the sortkey
	if (this.getStore().fields.containsKey("label")) {
		this.getStore().setDefaultSort("label");
	}
	
	var self = this;
	
	this.on("cellclick", function(grid, rowIndex, columnIndex, e) {
		self.showProperties(grid, rowIndex, columnIndex, e);
	});
	
	this.on("rowcontextmenu", function(grid, rowIndex, e) {
		self.showContextMenu(grid, rowIndex, e);
	});
	
	this.on("afterlayout", this.showInfoMask);
	
	this.on('show', function() {
		uwm.ui.ExistingContentContainer.getInstance().showPanel(self);
	});
	
	this.wasActive = false;
	
	uwm.objectgrid.ObjectGridContainer.getInstance().registerGrid(this);
}

Ext.extend(uwm.objectgrid.ObjectGrid, Ext.grid.GridPanel);

uwm.objectgrid.ObjectGrid.prototype.showInfoMask = function() {
	if (!this.wasActive) {
		this.infoMask = new uwm.ui.InfoMask(this.body, {
			msg: uwm.Dict.translate('Shows all objects within selected scope. To select a scope, select the <i>Model Tree</i>, right-click on a Model or Package and select &quot;Select as grid scope&quot;.')
		});
		this.infoMask.show();
	}
	this.un("afterlayout", this.showInfoMask);
}

uwm.objectgrid.ObjectGrid.prototype.hideInfoMask = function() {
	if (this.infoMask) {
		this.infoMask.hide();
	}
	
	this.wasActive = true;
}

uwm.objectgrid.ObjectGrid.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [new Ext.menu.Item({
			// use itemId instead of id, because this has to be only locally unique
			itemId: uwm.objectgrid.ObjectGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID,
			text: uwm.Dict.translate('Show in diagram'),
			handler: function(item, e) {
				self.showInDiagram(item, e);
			},
		}), new Ext.menu.Item({
			text: uwm.Dict.translate('Show in model tree'),
			handler: function(item, e) {
				self.showInModelTree(item, e);
			}
		}), new Ext.menu.Item({
			text: uwm.Dict.translate('Show in hierarchy'),
			handler: function(item, e) {
				self.showInHierarchy(item, e);
			}
		}), "-", {
			text: uwm.Dict.translate('Delete from model'),
			handler: function(item, e) {
				self.deleteFromModel(item, e);
			}
		}]
	});
}

uwm.objectgrid.ObjectGrid.prototype.showContextMenu = function(grid, rowIndex, e) {
	var showInDiagram = this.contextMenu.items.get(uwm.objectgrid.ObjectGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID);
	
	this.contextMenu.rowIndex = rowIndex;
	
	showInDiagram.setDisabled(!this.containedInCurrentDiagram());
	
	this.contextMenu.showAt([e.getXY()[0] + 2, e.getXY()[1] + 2]);
	
	e.preventDefault();
}

uwm.objectgrid.ObjectGrid.prototype.getUwmClassName = function() {
	return this.uwmClassName;
}

uwm.objectgrid.ObjectGrid.prototype.getSelectedModelObject = function() {
	var oid = this.getStore().getAt(this.contextMenu.rowIndex).get("oid");
	
	return uwm.model.ModelContainer.getInstance().getByOid(oid);
}

uwm.objectgrid.ObjectGrid.prototype.showProperties = function(grid, rowIndex, columnIndex, e) {
	var oid = this.getStore().getAt(rowIndex).get("oid");
	var modelObject = uwm.model.ModelContainer.getInstance().getByOid(oid);
	
	uwm.property.PropertyContainer.getInstance().showProperty(modelObject);
}

uwm.objectgrid.ObjectGrid.prototype.containedInCurrentDiagram = function() {
	return uwm.diagram.DiagramContainer.getInstance().isModelObjectContainedInCurrentDiagram(this.getSelectedModelObject());
}

uwm.objectgrid.ObjectGrid.prototype.showInDiagram = function(item, e) {
	uwm.diagram.DiagramContainer.getInstance().getCurrentDiagram().scrollToObject(this.getSelectedModelObject());
}

uwm.objectgrid.ObjectGrid.prototype.showInModelTree = function(item, e) {
	uwm.modeltree.ModelTree.getInstance().markNodeByOid(this.getSelectedModelObject().getOid());
}

uwm.objectgrid.ObjectGrid.prototype.showInHierarchy = function(item, e) {
	uwm.hierarchytree.HierarchyTree.getInstance().loadNode(this.getSelectedModelObject().getOid());
}

uwm.objectgrid.ObjectGrid.prototype.deleteFromModel = function(item, e) {
	uwm.model.ModelContainer.getInstance().deleteByModelNode(this.getSelectedModelObject());
}
uwm.objectgrid.ObjectGrid.prototype.getTreeIcon = function() {
	return ('Figure'+this.getUwmClassName());
}
uwm.objectgrid.ObjectGrid.prototype.getName = function() {
	return this.uwmClassName;
}

uwm.objectgrid.ObjectGrid.CONTEXTMENU_SHOW_IN_DIAGRAM_ID = "showInDiagram";
