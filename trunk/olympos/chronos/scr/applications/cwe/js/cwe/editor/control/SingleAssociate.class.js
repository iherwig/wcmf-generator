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
 * @config targetCweModelElementId The CweModelElementId of the target Model
 *         Class,
 */
cwe.editor.control.SingleAssociate = function(config) {
};

cwe.editor.control.SingleAssociate = Ext.extend(Ext.form.TwinTriggerField, {
	initComponent : function() {
		
		/**
		 * The model class of the target objects.
		 * 
		 * @private
		 * @type cwe.model.ModelClass
		 */
		this.modelClass = cwe.model.ModelClassContainer.getInstance().getClass(this.targetCweModelElementId);
		
		Ext.apply(this, {
		    trigger1Class : "associateButton",
		    trigger2Class : "disassociateButton",
		    trigger3Class : "editButton",
		    readOnly : true,
		    width : 805
		});
		
		cwe.editor.control.SingleAssociate.superclass.initComponent.apply(this, arguments);
		
		this.triggerConfig = {
		    tag : 'span',
		    cls : 'x-form-twin-triggers',
		    cn : [ {
		        tag : "img",
		        src : Ext.BLANK_IMAGE_URL,
		        cls : "x-form-trigger " + this.trigger1Class
		    }, {
		        tag : "img",
		        src : Ext.BLANK_IMAGE_URL,
		        cls : "x-form-trigger " + this.trigger2Class
		    }, {
		        tag : "img",
		        src : Ext.BLANK_IMAGE_URL,
		        cls : "x-form-trigger " + this.trigger3Class
		    } ]
		};
		
	}
});

/**
 * Sets the value of this form field.
 * 
 * @param {cwe.model.ModelReferenceList}
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
 * @type cwe.model.ModelReferenceList
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
cwe.editor.control.SingleAssociate.prototype.onTrigger1Click = function() {
	var self = this;
	
	var associateWindow = new cwe.editor.control.AssociateWindow( {
	    modelClass : this.modelClass,
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
cwe.editor.control.SingleAssociate.prototype.onTrigger2Click = function() {
	if (this.origValue) {
		this.setValue(null);
	}
};

/**
 * Opens the associated element in its editor.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.onTrigger3Click = function() {
	if (this.origValue) {
		var editors = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelClass).getEditors();
		editors.loadOrShow(this.associatedOid, this.getValueLabel());
	}
};
