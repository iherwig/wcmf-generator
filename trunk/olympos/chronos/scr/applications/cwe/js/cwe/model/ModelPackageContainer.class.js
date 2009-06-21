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

cwe.model.ModelPackageContainer = function() {
	this.packages = new Ext.util.MixedCollection();
}

cwe.model.ModelPackageContainer.prototype.registerPackage = function(modelPackage) {
	this.packages.add(modelPackage.getId(), modelPackage);
	
	this.addToPackage(modelPackage);
}

cwe.model.ModelPackageContainer.prototype.addToPackage = function(newChild) {
	var parentPackageId = newChild.getOwningPackageId();
	
	if (parentPackageId) {
		this.getPackage(parentPackageId).add(newChild);
	} else {
		if (newChild.getId() != cwe.model.RootPackage.ROOT_PACKAGE_ID) {
			throw ("No owning package defined for ModelElement " + newChild.getId());
		}
	}
}

cwe.model.ModelPackageContainer.prototype.getPackage = function(cweModelElementId) {
	return this.packages.get(cweModelElementId);
}

cwe.model.ModelPackageContainer.prototype.getRootPackage = function() {
	return this.getPackage(cwe.model.RootPackage.ROOT_PACKAGE_ID);
}

cwe.model.ModelPackageContainer.prototype.getAllPackages = function() {
	return this.packages;
}

cwe.model.ModelPackageContainer.getInstance = function() {
	if (!cwe.model.ModelPackageContainer.instance) {
		cwe.model.ModelPackageContainer.instance = new cwe.model.ModelPackageContainer();
	}
	
	return cwe.model.ModelPackageContainer.instance;
}
