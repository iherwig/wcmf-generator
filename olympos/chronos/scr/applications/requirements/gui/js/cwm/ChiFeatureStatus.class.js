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

cwm.ChiFeatureStatus = function(modelNodeClass) {
	cwm.ChiFeatureStatus.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.ChiFeatureStatus, uwm.model.TechnicalObject);

cwm.ChiFeatureStatus.prototype.initByDisplayResult = function(node) {
	cwm.ChiFeatureStatus.superclass.initByDisplayResult.call(this, node);
	
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

cwm.ChiFeatureStatus.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("Name").setValue(this.data.Name);
	realForm.findField("Notes").setValue(this.data.Notes);
	realForm.findField("created").setValue(this.data.created);
	realForm.findField("creator").setValue(this.data.creator);
	realForm.findField("last_editor").setValue(this.data.last_editor);
	realForm.findField("modified").setValue(this.data.modified);
}
