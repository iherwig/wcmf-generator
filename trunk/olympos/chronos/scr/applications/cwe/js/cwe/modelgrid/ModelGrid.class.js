/*
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwe.modelgrid");

/**
 * @class A list of all objects of one type in a selected scope.
 *
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object} config The configuration object.
 */
cwe.modelgrid.ModelGrid = function(config) {
}

cwe.modelgrid.ModelGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function() {
	
		Ext.apply(this, {
			region: "north",
			height: 250,
			split: true,
			tbar: [new Ext.Toolbar.Button({
				text: chi.Dict.translate("Create"),
				iconCls: "createButton"
			}), new Ext.Toolbar.Button({
				text: chi.Dict.translate("Edit"),
				iconCls: "editButton"
			}), new Ext.Toolbar.Button({
				text: chi.Dict.translate("Delete"),
				iconCls: "deleteButton"
			})],
			selModel: new Ext.grid.RowSelectionModel({
				singleSelect: true
			}),
			columns: [{
				header: "Name",
				width: 100,
				sortable: true
			}, {
				header: "Notes",
				width: 100,
				sortable: true
			}, {
				header: "ValueAmount",
				width: 100,
				sortable: true
			}],
			store: new Ext.data.SimpleStore({
				fields: ["Name", "Notes", "ValueAmount"],
				data: [["Name 1", "Notes 1", 99], ["Name 2", "Notes 2", 922], ["Name 3", "Notes 3", 2313], ["Name 4", "Notes 4", 23], ["Name 15", "Notes 15", 123]]
			}),
			viewConfig: {
				forceFit: true
			}
		});
		
		cwe.modelgrid.ModelGrid.superclass.initComponent.apply(this, arguments);
	}
});
