/*
 * This file was generated by wCMFGenerator 3.0.0002 from ./model/cwm.uml on Thu Feb 05 13:16:12 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 *
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 *  
 */
Ext.namespace("cwm");

cwm.ChiGoal = function(modelNodeClass) {
	cwm.ChiGoal.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiGoal, uwm.model.ModelObject);

cwm.ChiGoal.prototype.initByDisplayResult = function(node) {
	cwm.ChiGoal.superclass.initByDisplayResult.call(this, node);
	this.data.Priority = node.values[1].Priority;
	this.data.Value_ammount = node.values[1].Value_ammount;
	this.data.Value_Goal = node.values[1].Value_Goal;
	this.data.Value_Name = node.values[1].Value_Name;
	this.data.GoalType = node.values[1].GoalType;
	this.data.Alias = node.values[1].Alias;
	this.data.Version = node.values[1].Version;
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

cwm.ChiGoal.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	realForm.findField("Priority").loadValue(this.data.Priority);
	realForm.findField("Value_ammount").loadValue(this.data.Value_ammount);
	realForm.findField("Value_Goal").loadValue(this.data.Value_Goal);
	realForm.findField("Value_Name").loadValue(this.data.Value_Name);
	realForm.findField("GoalType").loadValue(this.data.GoalType);
	realForm.findField("Alias").loadValue(this.data.Alias);
	realForm.findField("Version").loadValue(this.data.Version);
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}

cwm.ChiGoal.prototype.getGridData = function() {
	return {
		oid :this.getOid(),
		label :this.getLabel()
	}
}
