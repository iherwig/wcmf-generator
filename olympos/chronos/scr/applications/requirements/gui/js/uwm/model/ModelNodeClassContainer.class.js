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

uwm.model.ModelNodeClassContainer = function() {
	this.items = new Ext.util.MixedCollection();
	this.semanticGroups = new Object();
}

uwm.model.ModelNodeClassContainer.prototype.registerClass = function(
		modelNodeClass) {
	this.items.add(modelNodeClass.getUwmClassName(), modelNodeClass);

	if (modelNodeClass instanceof uwm.model.ModelClass) {
		var semanticGroup = modelNodeClass.getSemanticGroup();
console.log(semanticGroup);
		var entries = this.semanticGroups[semanticGroup];
		if (!entries) {
			this.semanticGroups[semanticGroup] = new Array();
			entries = this.semanticGroups[semanticGroup];
		}
		entries.push(modelNodeClass);
	}
}

uwm.model.ModelNodeClassContainer.prototype.getClass = function(uwmClassName) {
	return this.items.get(uwmClassName);
}

uwm.model.ModelNodeClassContainer.prototype.getAllClasses = function() {
	return this.items;
}

uwm.model.ModelNodeClassContainer.prototype.getSemanticGroups = function() {
	return this.semanticGroups;
}

uwm.model.ModelNodeClassContainer.getInstance = function() {
	if (!uwm.model.ModelNodeClassContainer.instance) {
		uwm.model.ModelNodeClassContainer.instance = new uwm.model.ModelNodeClassContainer();
	}

	return uwm.model.ModelNodeClassContainer.instance;
}
