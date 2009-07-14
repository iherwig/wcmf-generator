/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwl.model");

cwl.model.ModelElement = function() {
	this.cwlModelElementId = null;
	this.name = null;
  this.type = null;
	this.treeIconClass = null;
  this.semanticGroup = null;
  this.description = null;
  this.helpUrl = null;
  this.attributes = [];
  this.operations = [];
}

cwl.model.ModelElement.prototype.getId = function() {
	return this.cwlModelElementId;
}

cwl.model.ModelElement.prototype.getName = function() {
	return this.name;
}

cwl.model.ModelElement.prototype.getType = function() {
	return this.type;
}

cwl.model.ModelElement.prototype.getDescription = function() {
	return this.description;
}

cwl.model.ModelElement.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

cwl.model.ModelElement.prototype.getTreeIconClass = function() {
	return this.treeIconClass;
}

cwl.model.ModelElement.prototype.getStartExpanded = function() {
	return false;
}

cwl.model.ModelElement.prototype.getOwningPackage = function() {
	return cwl.model.ModelPackageContainer.getInstance().getPackage(this.getOwningPackageId());
}

cwl.model.ModelElement.prototype.getSemanticGroup = function() {
	return this.semanticGroup;
}

cwl.model.ModelElement.prototype.getAttributes = function() {
	return this.attributes;
}

cwl.model.ModelElement.prototype.getOperations = function() {
	return this.operations;
}