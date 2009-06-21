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
Ext.namespace("cwe.model");

cwe.model.ModelElement = function() {
	this.cweModelElementId = null;
	this.name = null;
	this.treeIconClass = null;
	this.owningPackageId = null;
}

cwe.model.ModelElement.prototype.getId = function() {
	return this.cweModelElementId;
}

cwe.model.ModelElement.prototype.getName = function() {
	return this.name;
}

cwe.model.ModelElement.prototype.getTreeIconClass = function() {
	return this.treeIconClass;
}

cwe.model.ModelElement.prototype.getOwningPackageId = function() {
	return this.owningPackageId;
}

cwe.model.ModelElement.prototype.getStartExpanded = function() {
	return false;
}

cwe.model.ModelElement.prototype.getOwningPackage = function() {
	return cwe.model.ModelPackageContainer.getInstance().getPackage(this.getOwningPackageId());
}
