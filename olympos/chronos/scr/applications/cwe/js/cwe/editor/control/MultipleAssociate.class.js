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
Ext.namespace("cwe.editor.control");

/**
 * @class A list of all objects of one type in a selected scope.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.MultipleAssociate = function(config) {
}

cwe.editor.control.MultipleAssociate = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		this.isFormField = true;
		
		this.modelClass = cwe.model.ModelClassContainer.getInstance().getClass(this.targetCweModelElementId);
		
		this.fieldConfig = [ {
			name : "oid",
			mapping : "oid"
		}, {
			name : "label",
			mapping : "label"
		} ];
		
		this.recordTemplate = Ext.data.Record.create(this.fieldConfig);
		
		this.store = new Ext.data.SimpleStore( {
			fields : this.fieldConfig
		});
		
		this.associateButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Associate"),
			iconCls : "associateButton",
			handler : function() {
				self.associate();
			}
		});
		
		this.disassociateButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Disassociate"),
			iconCls : "disassociateButton",
			handler : function() {
				self.disassociate();
			}
		});
		
		Ext.apply(this, {
			height : 200,
			width : 200,
			tbar : [ this.associateButton, this.disassociateButton ],
			selModel : new Ext.grid.RowSelectionModel( {
				singleSelect : false
			}),
			columns : [ {
				header : chi.Dict.translate("Label"),
				dataIndex : "label",
				width : 100,
				sortable : true
			}, ],
			store : this.store,
			viewConfig : {
				forceFit : true
			}
		});
		
		cwe.editor.control.MultipleAssociate.superclass.initComponent.apply(this, arguments);
	}
});

cwe.editor.control.MultipleAssociate.prototype.getName = function() {
	return this.name;
}

cwe.editor.control.MultipleAssociate.prototype.setValue = function(value) {
	var self = this;
	var store = this.getStore();
	var rawRecords = this.editor.getRawRecords();
	
	if (value) {
		this.origValue = value;
		
		store.removeAll();
		
		value.each(function(elem) {
			var record = new self.recordTemplate( {
				oid : elem.getOid(),
				label : rawRecords[elem.getOid()].getLabel()
			});
			
			store.add(record);
		});
	} else {
		this.origValue = new cwe.model.ModelReferenceList(this.modelClass);
		
		store.removeAll();
	}
}

cwe.editor.control.MultipleAssociate.prototype.getValue = function() {
	return this.origValue;
}

cwe.editor.control.MultipleAssociate.prototype.associate = function() {
	var grid = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelClass).getGrid();
	
	var self = this;
	
	var button = new cwe.modelgrid.AssociateButton( {
		modelClass : this.editor.getModelClass(),
		sourceLabel : this.editor.getLabel(),
		roleName : this.getName(),
		role : this.dataIndex,
		isParent : this.isParent,
		singleSelect : false,
		sourceOid : this.editor.getOid(),
		sourceHandler : function(records) {
			var referenceList = new cwe.model.ModelReferenceList(this.modelClass);
			
			self.getValue().each(function(item) {
				referenceList.add(item.getOid(), item);
			});
			
			for ( var currOid in records) {
				var currRecord = records[currOid];
				
				if (!(currRecord instanceof Function)) {
					if (!referenceList.containsKey(currRecord.getOid())) {
						var reference = new cwe.model.ModelReference(currRecord.getOid());
						referenceList.add(currRecord.getOid(), reference);
						self.editor.addRawRecord(currRecord);
					}
				}
			}
			
			self.setValue(referenceList);
			
			grid.removeAssociateButton(button);
			self.editor.removeAssociateButton(button);
			self.editor.show();
		}
	});
	
	grid.addAssociateButton(button);
	
	this.editor.addAssociateButton(grid, button);
}

cwe.editor.control.MultipleAssociate.prototype.disassociate = function() {
	var store = this.getStore();
	var records = this.getSelectionModel().getSelections();
	
	if (records && records.length > 0) {
		var referenceList = new cwe.model.ModelReferenceList(this.modelClass);
		
		store.each(function(item) {
			var found = false;
			for ( var i = 0; i < records.length; i++) {
				var currRecord = records[i];
				
				if (item.get("oid") == currRecord.get("oid")) {
					found = true;
					break;
				}
			}
			
			if (!found) {
				var reference = new cwe.model.ModelReference(item.get("oid"));
				referenceList.add(reference.getOid(), reference);
			}
		});
		
		this.setValue(referenceList);
	}
}
