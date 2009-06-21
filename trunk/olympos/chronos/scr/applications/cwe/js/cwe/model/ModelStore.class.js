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

cwe.model.ModelStore = function(config) {
	this.modelClass = config.modelClass;
	
	config.proxy = new cwe.model.ModelProxy({
		modelClass: this.modelClass
	});
	
	cwe.model.ModelStore.superclass.constructor.call(this, arguments);
}

Ext.extend(cwe.model.ModelStore, Ext.data.Store);

cwe.model.ModelStore.prototype.getModelClass = function() {
	return this.modelClass;
}