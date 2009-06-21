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

cwe.model.ModelClassContainer = function() {
	this.classes = new Ext.util.MixedCollection();
}

cwe.model.ModelClassContainer.prototype.registerClass = function(modelClass) {
	this.classes.add(modelClass.getId(), modelClass);
	
	cwe.model.ModelPackageContainer.getInstance().addToPackage(modelClass);
}

cwe.model.ModelClassContainer.prototype.getClass = function(cweModelClassId) {
	return this.classes.get(cweModelClassId);
}

cwe.model.ModelClassContainer.prototype.getAllClasses = function() {
	return this.classes;
}

cwe.model.ModelClassContainer.getInstance = function() {
	if (!cwe.model.ModelClassContainer.instance) {
		cwe.model.ModelClassContainer.instance = new cwe.model.ModelClassContainer();
	}
	
	return cwe.model.ModelClassContainer.instance;
}
