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
Ext.namespace("uwm.model");

/**
 * @class An n:m EditableRelation.
 * 
 * <p>This class should not be instantiated, but extended.</p>
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass The ModelNodeClass of this ModelNode.
 */
uwm.model.EditableRelation = function(modelNodeClass) {
	uwm.model.EditableRelation.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.EditableRelation, uwm.model.Relation);

uwm.model.EditableRelation.prototype.initByDisplayResult = function(node) {
	uwm.model.EditableRelation.superclass.initByDisplayResult.call(this, node);
	this.data.sourceMultiplicity = node.values[1].sourceMultiplicity;
	this.data.sourceNavigability = node.values[1].sourceNavigability;
	this.data.targetMultiplicity = node.values[1].targetMultiplicity;
	this.data.targetNavigability = node.values[1].targetNavigability;
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

uwm.model.EditableRelation.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	realForm.findField("sourceMultiplicity").loadValue(this.data.sourceMultiplicity);
	realForm.findField("sourceNavigability").loadValue(this.data.sourceNavigability);
	realForm.findField("targetMultiplicity").loadValue(this.data.targetMultiplicity);
	realForm.findField("targetNavigability").loadValue(this.data.targetNavigability);
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}
