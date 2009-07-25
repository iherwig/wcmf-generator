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
 * @config isParent Whether the target should be associated as parent.
 */
cwe.editor.control.SingleAssociate = function(config) {
}

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
			trigger1Class : 'associateButton',
			trigger2Class : 'disassociateButton',
			readOnly : true,
			width : 805
		});
		
		cwe.editor.control.SingleAssociate.superclass.initComponent.apply(this, arguments);
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
		
		this.associatedOid = value.first().getOid();
		
		var associateRecord = this.editor.getRawRecords()[this.associatedOid];
		
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, associateRecord.getLabel());
	} else {
		this.origValue = new cwe.model.ModelReferenceList(this.modelClass);
		this.associatedOid = null;
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, "");
	}
}

/**
 * Returns the value of this form field.
 * 
 * @return The value of this form field.
 * @type cwe.model.ModelReferenceList
 */
cwe.editor.control.SingleAssociate.prototype.getValue = function() {
	return this.origValue;
}

/**
 * Shows the target Model Class model grid and adds an associate button to it.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.onTrigger1Click = function() {
	var grid = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelClass).getGrid();
	
	var self = this;
	
	var button = new cwe.modelgrid.AssociateButton( {
		modelClass : this.editor.getModelClass(),
		sourceLabel : this.editor.getLabel(),
		roleName : this.getName(),
		role : this.dataIndex,
		isParent : this.isParent,
		singleSelect : true,
		sourceOid : this.editor.getOid(),
		sourceHandler : function(records) {
			var record = records[0];
			
			var referenceList = new cwe.model.ModelReferenceList(this.modelClass);
			var reference = new cwe.model.ModelReference(record.getOid());
			
			referenceList.add(record.getOid(), reference);
			self.editor.addRawRecord(record);
			
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
 * Clears this form field.
 * 
 * @private
 */
cwe.editor.control.SingleAssociate.prototype.onTrigger2Click = function() {
	if (this.associatedOid) {
		this.setValue(null);
	}
}
