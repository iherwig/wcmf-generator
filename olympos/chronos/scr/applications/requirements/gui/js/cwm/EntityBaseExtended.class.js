
/*
 * This file was generated by wCMFGenerator 3.0.0 from src/requirements.uml on Mon Jan 12 18:10:08 CET 2009. 
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

cwm.EntityBaseExtended = function(modelNodeClass) {
	cwm.EntityBaseExtended.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.EntityBaseExtended, uwm.model.ModelObject);

cwm.EntityBaseExtended.prototype.initByDisplayResult = function(node) {
	cwm.EntityBaseExtended.superclass.initByDisplayResult.call(this, node);
      this.data.Name = node.values[1].Name;
      this.data.Notes = node.values[1].Notes;
	  this.data.Author = node.values[1].Author;
	  this.data.Status = node.values[1].Status;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.EntityBaseExtended.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
      realForm.findField("Name").loadValue(this.data.Name);
      realForm.findField("Notes").loadValue(this.data.Notes);
	  realForm.findField("Author").loadValue(this.data.Author);
	  realForm.findField("Status").loadValue(this.data.Status);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.EntityBaseExtended.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		Label: this.getLabel()
	}
}
	