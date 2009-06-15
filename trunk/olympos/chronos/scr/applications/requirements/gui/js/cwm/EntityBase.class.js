
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

cwm.EntityBase = function(modelNodeClass) {
	cwm.EntityBase.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.EntityBase, uwm.model.ModelObject);

cwm.EntityBase.prototype.initByDisplayResult = function(node) {
	cwm.EntityBase.superclass.initByDisplayResult.call(this, node);
	this.data.Status = node.values[1].Status;
	this.data.Author = node.values[1].Author;
      this.data.created = node.values[1].created;
      this.data.creator = node.values[1].creator;
      this.data.last_editor = node.values[1].last_editor;
      this.data.modified = node.values[1].modified;
}

cwm.EntityBase.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	realForm.findField("Status").loadValue(this.data.Status);
	realForm.findField("Author").loadValue(this.data.Author);
      realForm.findField("created").loadValue(this.data.created);
      realForm.findField("creator").loadValue(this.data.creator);
      realForm.findField("last_editor").loadValue(this.data.last_editor);
      realForm.findField("modified").loadValue(this.data.modified);
}

cwm.EntityBase.prototype.getGridData = function() {
	return {
		oid: this.getOid(),
		Label: this.getLabel()
	}
}
	