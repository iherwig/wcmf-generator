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

cwm.relations.ChiAssociation = function(modelNodeClass) {
	cwm.relations.ChiAssociation.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(cwm.relations.ChiAssociation, uwm.model.EditableRelation);

cwm.relations.ChiAssociation.prototype.initByDisplayResult = function(node) {
	cwm.relations.ChiAssociation.superclass.initByDisplayResult.call(this, node);
	this.data.fk_name = node.values[1].fk_name;
}

cwm.relations.ChiAssociation.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	realForm.findField("sourceName").loadValue(this.data.sourceName);
	realForm.findField("sourceMultiplicity").loadValue(this.data.sourceMultiplicity);
	realForm.findField("sourceNavigability").loadValue(this.data.sourceNavigability);
	realForm.findField("targetName").loadValue(this.data.targetName);
	realForm.findField("targetMultiplicity").loadValue(this.data.targetMultiplicity);
	realForm.findField("targetNavigability").loadValue(this.data.targetNavigability);
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("fk_name").loadValue(this.data.fk_name);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}
