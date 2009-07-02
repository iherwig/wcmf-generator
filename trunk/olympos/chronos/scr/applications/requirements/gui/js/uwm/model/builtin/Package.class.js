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
Ext.namespace("uwm.model.builtin");

/**
 * @class A package in the Model Tree.
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass The ModelNodeClass of this ModelNode.
 */
uwm.model.builtin.Package = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

uwm.model.builtin.Package.prototype = new uwm.model.ModelNode;

uwm.model.builtin.Package.prototype.initByDisplayResult = function(node) {
	uwm.model.ModelNode.prototype.initByDisplayResult.call(this, node);
	
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

uwm.model.builtin.Package.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}
