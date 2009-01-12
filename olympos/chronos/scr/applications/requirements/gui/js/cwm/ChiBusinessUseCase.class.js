
/*
 * This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:09:59 CET 2009. 
 * Manual modifications should be placed inside the protected regions.
 *
 * Copyright (c) 2008 The Olympos Development Team.
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

cwm.ChiBusinessUseCase = function(modelNodeClass) {
	cwm.ChiBusinessUseCase.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiBusinessUseCase, uwm.model.ModelObject);

cwm.ChiBusinessUseCase.prototype.initByDisplayResult = function(node) {
	cwm.ChiBusinessUseCase.superclass.initByDisplayResult.call(this, node);
      this.data.PrimaryActor = node.values[1].PrimaryActor;
      this.data.OtherActors = node.values[1].OtherActors;
      this.data.GoalInContext = node.values[1].GoalInContext;
      this.data.Scope = node.values[1].Scope;
      this.data.Level = node.values[1].Level;
      this.data.Stakeholders = node.values[1].Stakeholders;
      this.data.Precondition = node.values[1].Precondition;
      this.data.Trigger = node.values[1].Trigger;
      this.data.MainSuccessScenario = node.values[1].MainSuccessScenario;
      this.data.Extensions = node.values[1].Extensions;
      this.data.Alias = node.values[1].Alias;
      this.data.Version = node.values[1].Version;
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.ChiBusinessUseCase.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("PrimaryActor").setValue(this.data.PrimaryActor);
      realForm.findField("OtherActors").setValue(this.data.OtherActors);
      realForm.findField("GoalInContext").setValue(this.data.GoalInContext);
      realForm.findField("Scope").setValue(this.data.Scope);
      realForm.findField("Level").setValue(this.data.Level);
      realForm.findField("Stakeholders").setValue(this.data.Stakeholders);
      realForm.findField("Precondition").setValue(this.data.Precondition);
      realForm.findField("Trigger").setValue(this.data.Trigger);
      realForm.findField("MainSuccessScenario").setValue(this.data.MainSuccessScenario);
      realForm.findField("Extensions").setValue(this.data.Extensions);
      realForm.findField("Alias").setValue(this.data.Alias);
      realForm.findField("Version").setValue(this.data.Version);
      realForm.findField("Name").setValue(this.data.Name);
      realForm.findField("Notes").setValue(this.data.Notes);
      realForm.findField("created").setValue(this.data.created);
      realForm.findField("creator").setValue(this.data.creator);
      realForm.findField("last_editor").setValue(this.data.last_editor);
      realForm.findField("modified").setValue(this.data.modified);
}

cwm.ChiBusinessUseCase.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		Label: this.getLabel()
	}
}
	