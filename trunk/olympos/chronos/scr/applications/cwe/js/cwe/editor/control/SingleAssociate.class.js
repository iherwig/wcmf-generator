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
 * @class A form field for associating a single target.
 * 
 * <p>
 * Displays a non-editable text box. The text box contains the label of the
 * target object, if any. Provides buttons for associating and disassociating
 * objects. If the associate button is clicked, the model grid of the target
 * Model Class is opened, including a button to set the selected element as the
 * content of this form field. If the disassociate button is clicked, this form
 * field is cleared.
 * </p>
 * 
 * <p>
 * it is expected that initially set target objects are contained in this form
 * field's editor's rawRecord attribute.
 * </p>
 * 
 * @extends Ext.form.TwinTriggerField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config targetChiModelElementId The CweModelElementId of the target Model
 *         Class,
 */
cwe.editor.control.SingleAssociate = function(config) {
};

cwe.editor.control.SingleAssociate = Ext.extend(Ext.form.TwinTriggerField, {
	initComponent : function() {
		var self = this;
		
		this.buttonList = [];
		
		if (this.aggregationKind == cwe.Constants.AggregationKind.COMPOSITE || this.aggregationKind == cwe.Constants.AggregationKind.SHARED) {
			this.buttonList.push( {
			    className : "createButton",
			    title : chi.Dict.translate("Create child"),
			    handler : function() {
				    self.createChild();
			    }
			});
		}
		
		if (this.aggregationKind == cwe.Constants.AggregationKind.NONE || this.aggregationKind == cwe.Constants.AggregationKind.SHARED) {
			this.buttonList.push( {
			    className : "associateButton",
			    title : chi.Dict.translate("Associate"),
			    handler : function() {
				    self.associate();
			    }
			});
			
			this.buttonList.push( {
			    className : "disassociateButton",
			    title : chi.Dict.translate("Disassociate"),
			    handler : function() {
				    self.disassociate();
			    }
			});
		}
		
		this.buttonList.push( {
		    className : "editButton",
		    title : chi.Dict.translate("Edit"),
		    handler : function() {
			    self.edit();
		    }
		});
		
		/**
		 * The model class of the target objects.
		 * 
		 * @private
		 * @type chi.model.ModelDescription
		 */
		this.modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription(this.targetChiModelElementId);
		
		Ext.apply(this, {
		    readOnly : true,
		    width : 805
		});
		
		cwe.editor.control.SingleAssociate.superclass.initComponent.apply(this, arguments);
		
		var triggerConfigCn = [];
		
		for ( var i = 0; i < this.buttonList.length; i++) {
			var currButton = this.buttonList[i];
			triggerConfigCn.push( {
			    tag : "img",
			    src : Ext.BLANK_IMAGE_URL,
			    cls : "x-form-trigger " + currButton.className,
			    title : currButton.title
			});
		}
		
		this.triggerConfig = {
		    tag : 'span',
		    cls : 'x-form-twin-triggers',
		    cn : triggerConfigCn
		};
		
	}
});

/**
 * Sets the value of this form field.
 * 
 * @param {chi.model.ModelReferenceList}
 *            value The new value of this form field.
 */
cwe.editor.control.SingleAssociate.prototype.setValue = function(value) {
	if (value) {
		this.origValue = value;
		
		this.associatedOid = value.getOid();
		
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, this.getValueLabel());
	} else {
		this.origValue = null;
		this.associatedOid = null;
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, "");
	}
};

/**
 * Returns the value of this form field.
 * 
 * @return The value of this form field.
 * @type chi.model.ModelReferenceList
 */
cwe.editor.control.SingleAssociate.prototype.getValue = function() {
	return this.origValue;
};

/**
 * Returns the label of the associated object.
 * 
 * @return The label of the associated object.
 * @type String
 */
cwe.editor.control.SingleAssociate.prototype.getValueLabel = function() {
	var result = null;
	
	if (this.origValue) {
		result = this.origValue.getLabel();
	}
	
	return result;
};

/**
 * Shows the target Model Class model grid and adds an associate button to it.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.associate = function() {
	var self = this;
	
	var associateWindow = new cwe.editor.control.AssociateWindow( {
	    modelDescription : this.modelDescription,
	    singleSelect : true,
	    sourceHandler : function(records) {
		    var record = records[0];
		    
		    self.setValue(record);
	    },
	    roleName : this.getName(),
	    editor : this.editor
	});
	
	associateWindow.show();
};

/**
 * Clears this form field.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.disassociate = function() {
	if (this.origValue) {
		this.setValue(null);
	}
};

/**
 * Opens the associated element in its editor.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.edit = function() {
	if (this.origValue) {
		var editors = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelDescription).getEditors();
		editors.loadOrShow(this.associatedOid, this.getValueLabel());
	}
};

cwe.editor.control.SingleAssociate.prototype.createChild = function() {
	var self = this;
	
	cwe.Util.createChild(this.editor.getRecord(), this.getName(), this.modelDescription, function(data) {
		self.setValue(data.record);
	});
};

cwe.editor.control.SingleAssociate.prototype.onTrigger1Click = function() {
	this.buttonList[0].handler();
};
cwe.editor.control.SingleAssociate.prototype.onTrigger2Click = function() {
	this.buttonList[1].handler();
};
cwe.editor.control.SingleAssociate.prototype.onTrigger3Click = function() {
	this.buttonList[2].handler();
};
cwe.editor.control.SingleAssociate.prototype.onTrigger4Click = function() {
	this.buttonList[3].handler();
};
