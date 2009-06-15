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
Ext.namespace("uwm.diagram");

/**
 * @class The generated base class of a Diagram.
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 * @see uwm.diagram.Diagram
 * @param {uwm.model.ModelNodeClass} modelNodeClass The ModelNodeClass of this ModelNode.
 */
uwm.diagram.DiagramBase = function(modelNodeClass) {
	uwm.diagram.DiagramBase.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.DiagramBase, uwm.model.ModelNode);

uwm.diagram.DiagramBase.prototype.initByDisplayResult = function(node) {
	uwm.diagram.DiagramBase.superclass.initByDisplayResult.call(this, node);
	
	this.data.Width = node.values[1].Width;
	this.data.Height = node.values[1].Height;
	this.data.Name = node.values[1].Name;
	this.data.Notes = node.values[1].Notes;
	this.data.Author = node.values[1].Author;
	this.data.Status = node.values[1].Status;
	this.data.created = node.values[1].created;
	this.data.creator = node.values[1].creator;
	this.data.last_editor = node.values[1].last_editor;
	this.data.modified = node.values[1].modified;
}

uwm.diagram.DiagramBase.prototype.populatePropertyForm = function(form) {
	var realForm = form.getForm();
	
	realForm.findField("Name").loadValue(this.data.Name);
	realForm.findField("Notes").loadValue(this.data.Notes);
	realForm.findField("Width").loadValue(this.data.Width);
	realForm.findField("Height").loadValue(this.data.Height);
	realForm.findField("Author").loadValue(this.data.Author);
	realForm.findField("Status").loadValue(this.data.Status);
	realForm.findField("created").loadValue(this.data.created);
	realForm.findField("creator").loadValue(this.data.creator);
	realForm.findField("last_editor").loadValue(this.data.last_editor);
	realForm.findField("modified").loadValue(this.data.modified);
}
