/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.newobjects");

/**
 * @class Shows a list of new Model Objects to be dragged on a Diagram.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.newobjects.NewObjectsGrid = function() {
}

uwm.newobjects.NewObjectsGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function() {
		var self = this;
		
		this.cellActions = new Ext.ux.grid.CellActions({
			listeners: {
				action: function(grid, record, action, value) {
					self.helpClick(grid, record, action, value);
				}
			},
			align: "left"
		});
		
		Ext.apply(this, {
			region: "north",
			collapsible: true,
			split: true,
			autoScroll: true,
			height: 250,
			title: uwm.Dict.translate("New") + " " + this.semanticGroup,
			layout: "fit",
			enableDragDrop: true,
			ddGroup: uwm.Constants.DD_GROUP,
			selModel: new Ext.grid.RowSelectionModel({
				singleSelect: true
			}),
			store: this.getStore(),
			plugins: [this.cellActions],
			columns: [{
				header: "",
				width: 24,
				dataIndex: "iconClass",
				sortable: false,
				fixed: true,
				hideable: false,
				menuDisabled: true,
				resizable: false,
				renderer: this.showImage
			}, {
				header: uwm.Dict.translate('Title'),
				width: 174,
				dataIndex: "title",
				sortable: true
			}, {
				header: "",
				dataIndex: "none",
				width: 24,
				fixed: true,
				hideable: false,
				menuDisabled: true,
				resizable: false,
				cellActions: {
					iconCls: "uwm-help-icon",
					qtipIndex: "description"
				}
			}, {
				header: "modelClass",
				dataIndex: "modelClass",
				hidden: true,
				hideable: false
			}]
		});
		
		uwm.newobjects.NewObjectsGrid.superclass.initComponent.apply(this, arguments);
	}
})

uwm.newobjects.NewObjectsGrid.prototype.getStore = function() {
	var data = new Array();
	
	var classes = uwm.model.ModelNodeClassContainer.getInstance().getAllClasses();
	
	for (var i = 0; i < classes.getCount(); i++) {
		var currClass = classes.itemAt(i);
		
		if (currClass instanceof uwm.model.ModelClass) {
			var semanticGroup = currClass.semanticGroup;
			if (semanticGroup) {
				if (!Ext.isArray(semanticGroup)) {
					data = this.addSemanticGroup(data, currClass, semanticGroup);
				} else {
					for (var j = 0; j < semanticGroup.length; j++) {
						data = this.addSemanticGroup(data, currClass, semanticGroup[j]);
					}
				}
			}
		}
	}
	
	return new Ext.data.SimpleStore({
		data: data,
		fields: [{
			name: "iconClass",
			mapping: "iconClass",
		}, {
			name: "title",
			mapping: "title"
		}, {
			name: "description",
			mapping: "description"
		}, {
			name: "modelClass",
			mapping: "modelClass"
		}, {
			name: "helpUrl",
			mapping: "helpUrl"
		}]
	});
}

uwm.newobjects.NewObjectsGrid.prototype.addSemanticGroup = function(data, currClass, semanticGroup) {
	if (semanticGroup == this.semanticGroup) {
		data.push({
			iconClass: currClass.getTreeIcon(),
			title: currClass.getUwmClassName(),
			description: currClass.getDescription(),
			helpUrl: currClass.getHelpUrl(),
			modelClass: currClass
		});
	}
	
	return data;
}

uwm.newobjects.NewObjectsGrid.prototype.render = function(container, position) {
	uwm.newobjects.NewObjectsGrid.superclass.render.call(this, container, position);
	
	this.initDragZone();
}

uwm.newobjects.NewObjectsGrid.prototype.initDragZone = function() {
	new uwm.newobjects.DragZone(this, {});
}

uwm.newobjects.NewObjectsGrid.prototype.showImage = function(value) {
	return "<div class='uwm-grid-icon " + value + "'>&nbsp;</div>";
}

uwm.newobjects.NewObjectsGrid.prototype.helpClick = function(grid, record, action, value) {
	uwm.ui.HelpViewer.getInstance().loadUrl(record.get("helpUrl"));
}
