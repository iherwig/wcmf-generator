/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

/*
 * This file was generated by wCMFGenerator 3 from example-data/wcmf/requirements.uml on 2009-05-18 13:15. 
 * Manual modifications should be placed inside the protected regions.
 */

Ext.namespace("cwm");

cwm.ChiSystem = function(modelNodeClass) {
	cwm.ChiSystem.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiSystem, uwm.model.ClassObject);

cwm.ChiSystem.prototype.addAttribute = function() {
	uwm.model.ModelContainer.getInstance().createModelObject("ChiValue", this);
}

cwm.ChiSystem.prototype.addOperation = function() {
	uwm.model.ModelContainer.getInstance().createModelObject("Operation", this);
}

cwm.ChiSystem.prototype.initByDisplayResult = function(node) {
	cwm.ChiSystem.superclass.initByDisplayResult.call(this, node);
      this.data.config = node.values[1].config;
      this.data.plattform = node.values[1].plattform;
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
	  this.data.Author = node.values[1].Author;
	  this.data.Status = node.values[1].Status;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.ChiSystem.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("config").loadValue(this.data.config);
      realForm.findField("plattform").loadValue(this.data.plattform);
      realForm.findField("Name").loadValue(this.data.Name);
      realForm.findField("Notes").loadValue(this.data.Notes);
	  realForm.findField("Author").loadValue(this.data.Author);
	  realForm.findField("Status").loadValue(this.data.Status);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.ChiSystem.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}
	