/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwm");

cwm.ChiIssue = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

cwm.ChiIssue.prototype = new uwm.model.ModelObject;

cwm.ChiIssue.prototype.initByDisplayResult = function(node) {
	uwm.model.ModelNode.prototype.initByDisplayResult.call(this, node);
	
	this.data.Author = node.values[1].Author;
	this.data.Responsible = node.values[1].Responsible;
	this.data.Alias = node.values[1].Alias;
	this.data.Version = node.values[1].Version;
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

cwm.ChiIssue.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("Author").setValue(this.data.Author);
	realForm.findField("Responsible").setValue(this.data.Responsible);
	realForm.findField("Alias").setValue(this.data.Alias);
	realForm.findField("Version").setValue(this.data.Version);
	realForm.findField("Name").setValue(this.data.Name);
	realForm.findField("Notes").setValue(this.data.Notes);
	realForm.findField("created").setValue(this.data.created);
	realForm.findField("creator").setValue(this.data.creator);
	realForm.findField("last_editor").setValue(this.data.last_editor);
	realForm.findField("modified").setValue(this.data.modified);
}
