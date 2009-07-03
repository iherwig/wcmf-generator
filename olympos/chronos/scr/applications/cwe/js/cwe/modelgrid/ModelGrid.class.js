/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.modelgrid");

/**
 * @class A list of all objects of one type in a selected scope.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.modelgrid.ModelGrid = function(config) {
}

cwe.modelgrid.ModelGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		
		/*
		 * this.store = new Ext.data.SimpleStore( { fields : [ "Name", "Notes",
		 * "ValueAmount" ] });
		 * 
		 * this.store.add( [ new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:1", Name : "Name1", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:2", Name : "Name2", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:3", Name : "Name3", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:4", Name : "Name4", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:5", Name : "Name5", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:6", Name : "Name6", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:7", Name : "Name7", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }), new cwe.model.ModelRecord(this.modelClass, { oid:
		 * "Record:8", Name : "Name8", Notes : "Notes1", ValueAmount :
		 * "ValueAmount1" }) ]);
		 */

		this.store = new cwe.model.ModelStore( {
			modelClass : this.modelClass
		});
		
		this.pagingBar = new Ext.PagingToolbar( {
			pageSize : 25,
			store : this.store,
			displayInfo : true,
			displayMsg : chi.Dict.translate("Displaying objects {0} &ndash; {1} of {2}"),
			emptyMsg : chi.Dict.translate("No objects to display")
		});
		
		Ext.apply(this, {
			region : "north",
			height : 250,
			split : true,
			tbar : [ new Ext.Toolbar.Button( {
				text : chi.Dict.translate("Create"),
				iconCls : "createButton"
			}), new Ext.Toolbar.Button( {
				text : chi.Dict.translate("Edit"),
				iconCls : "editButton"
			}), new Ext.Toolbar.Button( {
				text : chi.Dict.translate("Delete"),
				iconCls : "deleteButton"
			}) ],
			loadMask : true,
			selModel : new Ext.grid.RowSelectionModel( {
				singleSelect : true
			}),
			columns : [ {
				header : "Name",
				dataIndex : "Name",
				width : 100,
				sortable : true
			}, {
				header : "Notes",
				dataIndex : "Notes",
				width : 100,
				sortable : true
			}, {
				header : "ValueAmount",
				dataIndex : "value_ammount",
				width : 100,
				sortable : true
			} ],
			store : this.store,
			viewConfig : {
				forceFit : true
			},
			bbar : this.pagingBar
		});
		
		cwe.modelgrid.ModelGrid.superclass.initComponent.apply(this, arguments);
		
		var self = this;
		
		this.on("rowclick", function(grid, rowIndex, e) {
			self.openEditor(grid, rowIndex, e);
		});
		
		this.store.load( {
			params : {
				start : 0,
				limit : 25
			}
		});
	}
});

cwe.modelgrid.ModelGrid.prototype.openEditor = function(grid, rowIndex, e) {
	var store = this.getStore();
	var record = store.getAt(rowIndex);
	
	this.editors.loadOrShow(record.getOid(), record.getLabel());
}
