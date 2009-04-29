
/*
 * This file was generated by wCMFGenerator 3 from src/model/wcmf_default.uml on Mon Apr 27 11:00:31 CEST 2009. 
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

cwm.ChiObject = function(modelNodeClass) {
	cwm.ChiObject.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiObject, uwm.model.ModelObject);

cwm.ChiObject.prototype.initByDisplayResult = function(node) {
	cwm.ChiObject.superclass.initByDisplayResult.call(this, node);
      this.data.object_status = node.values[1].object_status;
      this.data.Alias = node.values[1].Alias;
      this.data.Version = node.values[1].Version;
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.ChiObject.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("object_status").loadValue(this.data.object_status);
      realForm.findField("Alias").loadValue(this.data.Alias);
      realForm.findField("Version").loadValue(this.data.Version);
      realForm.findField("Name").loadValue(this.data.Name);
      realForm.findField("Notes").loadValue(this.data.Notes);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.ChiObject.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		label: this.getLabel()
	}
}

cwm.ChiObject.prototype.getStatus = function() {
	return this.getProperty("object_status");
}
