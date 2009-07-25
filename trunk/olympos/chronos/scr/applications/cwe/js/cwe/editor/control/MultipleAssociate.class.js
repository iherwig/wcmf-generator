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
 * @class A form field for associating multiple targets.
 * 
 * <p>
 * Displays a grid as form field. The grid contains the label of each associated
 * object. Provides buttons for associating and disassociating objects. If the
 * associate button is clicked, the model grid of the target Model Class is
 * opened, including a button to add selected elements to this form field. If
 * the disassociate button is clicked, all selected elements of this form field
 * are removed.
 * </p>
 * 
 * <p>
 * it is expected that initially set target objects are contained in this form
 * field's editor's rawRecord attribute.
 * </p>
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config fieldLabel The label of this form field.
 * @config name The name of this form field.
 * @config dataIndex The name of the record field containing this form field's
 *         value. Must be of type {@link cwe.model.ModelReferenceList}.
 * @config targetCweModelElementId The CweModelElementId of the target Model
 *         Class,
 * @config isParent Whether the target should be associated as parent.
 */
cwe.editor.control.MultipleAssociate = function(config) {
}

cwe.editor.control.MultipleAssociate = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		// Required to be recognized as form field
		this.isFormField = true;
		this.markInvalid = function() {
		};
		this.clearInvalid = function() {
		};
		
		/**
		 * The model class of the target objects.
		 * 
		 * @private
		 * @type cwe.model.ModelClass
		 */
		this.modelClass = cwe.model.ModelClassContainer.getInstance().getClass(this.targetCweModelElementId);
		
		/**
		 * The configuration for the fields to show in the control.
		 * 
		 * @private
		 * @type Array
		 */
		this.fieldConfig = [ {
			name : "oid",
			mapping : "oid"
		}, {
			name : "label",
			mapping : "label"
		} ];
		
		/**
		 * The Record object specific to the control display.
		 * 
		 * @private
		 * @type Ext.dta.Record
		 */
		this.recordTemplate = Ext.data.Record.create(this.fieldConfig);
		
		/**
		 * The store providing the control contents.
		 */
		this.store = new Ext.data.SimpleStore( {
			fields : this.fieldConfig
		});
		
		/**
		 * The button for associating target objects.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.associateButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Associate"),
			iconCls : "associateButton",
			handler : function() {
				self.associate();
			}
		});
		
		/**
		 * The button for disassociating target objects.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.disassociateButton = new Ext.Toolbar.Button( {
			text : chi.Dict.translate("Disassociate"),
			iconCls : "disassociateButton",
			handler : function() {
				self.disassociate();
			}
		});
		
		Ext.apply(this, {
			height : 200,
			width : 805,
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

/**
 * Returns the name of this form field.
 * 
 * @return The name of this form field.
 * @type String
 */
cwe.editor.control.MultipleAssociate.prototype.getName = function() {
	return this.name;
}

/**
 * Sets the value of this form field.
 * 
 * @param {cwe.model.ModelReferenceList}
 *            value The new value of this form field.
 */
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

/**
 * Returns the value of this form field.
 * 
 * @return The value of this form field.
 * @type cwe.model.ModelReferenceList
 */
cwe.editor.control.MultipleAssociate.prototype.getValue = function() {
	return this.origValue;
}

/**
 * Shows the target Model Class model grid and adds an associate button to it.
 * 
 * @private
 */
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

/**
 * Removes the selected entries from this form field.
 * 
 * @private
 */
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
