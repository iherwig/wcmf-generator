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
cwe.editor.control.SingleAssociate = function(config) {
}

cwe.editor.control.SingleAssociate = Ext.extend(Ext.form.TwinTriggerField, {
	initComponent : function() {
		
		Ext.apply(this, {
			trigger1Class : 'associateButton',
			trigger2Class : 'disassociateButton',
			readOnly : true
		});
		
		cwe.editor.control.SingleAssociate.superclass.initComponent.apply(this, arguments);
	}
});

cwe.editor.control.SingleAssociate.prototype.setValue = function(value) {
	if (value) {
		this.associatedOid = value.first().getOid();
		
		var associateRecord = this.editor.getRawRecords()[this.associatedOid];
		
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, associateRecord.getLabel());
	} else {
		this.associatedOid = null;
		cwe.editor.control.SingleAssociate.superclass.setValue.call(this, "");
	}
}

cwe.editor.control.SingleAssociate.prototype.onTrigger1Click = function() {
	var grid = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(cwe.model.ModelClassContainer.getInstance().getClass(this.targetCweModelElementId)).getGrid();
	
	var self = this;
	
	var button = new cwe.modelgrid.AssociateButton( {
		modelClass : this.editor.getModelClass(),
		sourceLabel : this.editor.getLabel(),
		roleName: this.getName(),
		role: this.dataIndex,
		isParent : this.isParent,
		sourceOid : this.editor.getOid(),
		sourceHandler : function(records) {
			var record = records[0];
			
			var referenceList = new cwe.model.ModelReferenceList(self.editor.getModelClass());
			var reference = new cwe.model.ModelReference(record.getOid());
			
			referenceList.add(record.getOid(), reference);
			self.editor.addRawRecord(record);
			
			self.setValue(referenceList);
			
			grid.removeAssociateButton(button);
			this.editor.removeAssociateButton(button);
			self.editor.show();
		}
	});
	
	grid.addAssociateButton(button);
	
	this.editor.addAssociateButton(grid, button);
}

cwe.editor.control.SingleAssociate.prototype.onTrigger2Click = function() {
	if (this.associatedOid) {
		if (this.isParent) {
			var self = this;
			
			chi.persistency.Persistency.getInstance().disassociate(this.associatedOid, this.editor.getOid(), undefined, function() {
				self.setValue(null);
			});
		}
	}
}
