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
		
		this.createButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Create"),
			iconCls : "createButton",
			handler : function() {
				self.createNew();
			}
		});
		
		this.editButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Edit"),
			iconCls : "editButton",
			handler : function() {
				var records = self.getSelectionModel().getSelections();
				
				for ( var i = 0; i < records.length; i++) {
					self.editors.loadOrShow(records[i].getOid(), records[i].getLabel());
				}
			}
		});
		
		this.deleteButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Delete"),
			iconCls : "deleteButton",
			handler : function() {
				self.deleteSelected();
			}
		});
		
		Ext.apply(this, {
			region : "north",
			height : 250,
			split : true,
			tbar : [ this.createButton, this.editButton, this.deleteButton ],
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

cwe.modelgrid.ModelGrid.prototype.createNew = function() {
	var self = this;
	
	self.editors.loadOrShow(null, "<i>" + chi.Dict.translate("New ") + self.modelClass.getName() + "</i>", true);
}

cwe.modelgrid.ModelGrid.prototype.deleteSelected = function() {
	var records = this.getSelectionModel().getSelections();
	
	var self = this;
	
	if (records.length > 0) {
		
		var msgText = "<p>" + chi.Dict.translate("Are you sure you want to delete the following instances of ") + this.modelClass.getName() + ":</p><ul class='deleteMsgBox'>";
		for ( var i = 0; i < records.length; i++) {
			msgText += "<li>" + records[i].getLabel() + "</li>";
		}
		msgText += "</ul>";
		
		Ext.MessageBox.show( {
			title : chi.Dict.translate("Delete Objects"),
			msg : msgText,
			buttons : Ext.MessageBox.YESNO,
			fn : function(buttonId) {
				if (buttonId == "yes") {
					var actionSet = new chi.persistency.ActionSet();
					
					for ( var i = 0; i < records.length; i++) {
						actionSet.addDestroy(records[i].getOid());
					}
					
					actionSet.commit(function(data) {
						var store = self.getStore();
						
						for ( var i = 0; i < records.length; i++) {
							store.remove(records[i]);
							
							self.editors.removeEditor(records[i].getOid());
						}
					});
				}
			}
		});
	}
}

cwe.modelgrid.ModelGrid.prototype.openEditor = function(grid, rowIndex, e) {
	var store = this.getStore();
	var record = store.getAt(rowIndex);
	
	this.editors.loadOrShow(record.getOid(), record.getLabel());
}
