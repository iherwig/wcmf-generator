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
 */
cwe.editor.control.MultipleAssociate = function(config) {
};

cwe.editor.control.MultipleAssociate = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		// Required to be recognized as form field
		this.isFormField = true;
		this.markInvalid = function() {
		};
		this.clearInvalid = function() {
		};
		
		this.dirty = false;
		
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
		}, {
		    name : "record",
		    mapping : "record"
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
		
		var buttonList = [];
		
		if (this.aggregationKind == cwe.Constants.AggregationKind.COMPOSITE || this.aggregationKind == cwe.Constants.AggregationKind.SHARED) {
			this.createChildButton = new Ext.Toolbar.Button( {
			    text : chi.Dict.translate("Create child"),
			    iconCls : "createButton",
			    handler : function() {
				    self.createChild();
			    }
			});
			buttonList.push(this.createChildButton);
		}
		
		if (this.aggregationKind == cwe.Constants.AggregationKind.NONE || this.aggregationKind == cwe.Constants.AggregationKind.SHARED) {
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
			buttonList.push(this.associateButton);
			
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
			buttonList.push(this.disassociateButton);
		}
		
		/**
		 * The button for editing the target object in its editor.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.editButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Edit"),
		    iconCls : "editButton",
		    handler : function() {
			    self.edit();
		    }
		});
		buttonList.push(this.editButton);
		
		Ext.apply(this, {
		    height : 200,
		    width : 805,
		    tbar : buttonList,
		    selModel : new Ext.grid.RowSelectionModel( {
			    singleSelect : false
		    }),
		    columns : [ {
		        header : chi.Dict.translate("Label"),
		        dataIndex : "label",
		        width : 100,
		        sortable : true
		    } ],
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
};

cwe.editor.control.MultipleAssociate.prototype.isDirty = function() {
	return this.dirty;
};

/**
 * Sets the value of this form field.
 * 
 * @param {cwe.model.ModelReferenceList}
 *            value The new value of this form field.
 */
cwe.editor.control.MultipleAssociate.prototype.setValue = function(value) {
	var self = this;
	var store = this.getStore();
	
	this.dirty = true;
	
	if (value) {
		this.origValue = value;
		
		store.removeAll();
		
		for ( var i = 0; i < value.length; i++) {
			var currRecord = value[i];
			
			if (currRecord.isModelRecord) {
				store.add(new this.recordTemplate( {
				    oid : currRecord.getOid(),
				    label : currRecord.getLabel(),
				    record : currRecord
				}));
			}
		}
	} else {
		this.origValue = [];
		
		store.removeAll();
	}
};

/**
 * Returns the value of this form field.
 * 
 * @return The value of this form field.
 * @type cwe.model.ModelReferenceList
 */
cwe.editor.control.MultipleAssociate.prototype.getValue = function() {
	return this.origValue;
};

/**
 * Shows the target Model Class model grid and adds an associate button to it.
 * 
 * @private
 */
cwe.editor.control.MultipleAssociate.prototype.associate = function() {
	var self = this;
	
	var associateWindow = new cwe.editor.control.AssociateWindow( {
	    modelClass : this.modelClass,
	    singleSelect : false,
	    sourceHandler : function(records) {
		    self.mergeRecords(records);
	    },
	    roleName : this.getName(),
	    editor : this.editor
	});
	
	associateWindow.show();
};

cwe.editor.control.MultipleAssociate.prototype.mergeRecords = function(records) {
	var oldValue = this.getValue();
	
	var newValue = [];
	if (oldValue != undefined) {
		for ( var i = 0; i < oldValue.length; i++) {
			newValue.push(oldValue[i]);
		}
	}
	
	for ( var i = 0; i < records.length; i++) {
		var currRecord = records[i];
		
		if (currRecord.isModelRecord) {
			var alreadyInList = false;
			if (oldValue != undefined) {
				for ( var j = 0; j < oldValue.length; j++) {
					var currOldRecord = oldValue[j];
					if (currOldRecord.isModelRecord && currRecord.getOid() == currOldRecord.getOid()) {
						alreadyInList = true;
						break;
					}
				}
			}
			
			if (!alreadyInList) {
				newValue.push(currRecord);
			}
		}
	}
	
	this.setValue(newValue);
};

/**
 * Removes the selected entries from this form field.
 * 
 * @private
 */
cwe.editor.control.MultipleAssociate.prototype.disassociate = function() {
	var store = this.getStore();
	var records = this.getSelectionModel().getSelections();
	
	if (records && records.length > 0) {
		var newValue = [];
		
		var oldValue = this.getValue();
		
		for ( var i = 0; i < oldValue.length; i++) {
			var currOldRecord = oldValue[i];
			
			if (currOldRecord.isModelRecord) {
				var found = false;
				for ( var j = 0; j < records.length; j++) {
					var currRecord = records[j];
					
					if (currOldRecord.getOid() == currRecord.get("oid")) {
						found = true;
						break;
					}
				}
				
				if (!found) {
					newValue.push(currOldRecord);
				}
			}
		}
		
		this.setValue(newValue);
	}
};

/**
 * Opens the associated element in its editor.
 * 
 * @private
 */
cwe.editor.control.MultipleAssociate.prototype.edit = function() {
	var store = this.getStore();
	var records = this.getSelectionModel().getSelections();
	
	if (records && records.length > 0) {
		var editors = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelClass).getEditors();
		
		for ( var i = 0; i < records.length; i++) {
			var currRecord = records[i];
			
			editors.loadOrShow(currRecord.get("oid"), currRecord.get("label"));
		}
	}
};

cwe.editor.control.MultipleAssociate.prototype.createChild = function() {
	var self = this;
	
	cwe.Util.createChild(this.editor.getRecord(), this.getName(), this.modelClass, function(record) {
		self.mergeRecords( [ record ]);
	});
};
