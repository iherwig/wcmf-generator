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
Ext.namespace("uwm.newobjects");

uwm.newobjects.NewObjectsGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function(config) {
	
		Ext.apply(this, {
			region: "north",
			collapsible: true,
			split: true,
			autoScroll: true,
			height: 250,
			title: "New Objects",
			layout: "fit",
			enableDragDrop: true,
			ddGroup: uwm.Constants.DD_GROUP,
			selModel: new Ext.grid.RowSelectionModel({
				singleSelect: true
			}),
			store: this.getStore(),
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
				header: "Title",
				dataIndex: "title",
				sortable: true
			}, {
				header: "Description",
				dataIndex: "description",
				renderer: this.fullText,
				sortable: true
			}, {
				header: "modelClass",
				dataIndex: "modelClass",
				hidden: true,
				hideable: false
			}]
		});
		
		uwm.newobjects.NewObjectsGrid.superclass.initComponent.apply(this, arguments);
	},
	
	getStore: function() {
		var data = new Array();
		
		var classes = uwm.Session.getInstance().getModelNodeClassContainer().getAllClasses();
		
		for (var i = 0; i < classes.getCount(); i++) {
			var currClass = classes.itemAt(i);
			
			if (currClass instanceof uwm.model.ModelClass) {
				data.push({
					iconClass: currClass.getTreeIcon(),
					title: currClass.getUwmClassName(),
					description: currClass.getDescription(),
					modelClass: currClass
				});
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
			}]
		});
	},
	
	render: function(container, position) {
		uwm.newobjects.NewObjectsGrid.superclass.render.call(this, container, position);
		
		this.initDragZone();
	},
	
	initDragZone: function() {
		new uwm.newobjects.DragZone(this, {});
	},
	
	showImage: function(value) {
		return "<div class='uwm-grid-icon " + value + "'>&nbsp;</div>";
	},
	
	fullText: function(value) {
		return "<div class='uwm-grid-fullText'>" + value + "</div>";
	}
})
