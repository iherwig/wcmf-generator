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
Ext.namespace("cwm.relations");

cwm.relations.NMChiControllerActionKeyChiView = function(modelNodeClass) {
	cwm.relations.NMChiControllerActionKeyChiView.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.relations.NMChiControllerActionKeyChiView, uwm.model.EditableRelation);

cwm.relations.NMChiControllerActionKeyChiView.prototype.initByDisplayResult = function(node) {
	cwm.relations.NMChiControllerActionKeyChiView.superclass.initByDisplayResult.call(this, node);
	this.data.action = node.values[1].action;
	this.data.config = node.values[1].config;
	this.data.context = node.values[1].context;
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

cwm.relations.NMChiControllerActionKeyChiView.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	realForm.findField("action").loadValue(this.data.action);
	realForm.findField("config").loadValue(this.data.config);
	realForm.findField("context").loadValue(this.data.context);
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}
