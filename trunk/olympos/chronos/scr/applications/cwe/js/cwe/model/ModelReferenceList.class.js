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

cwe.model.ModelReferenceList = function(modelClass) {
	cwe.model.ModelReferenceList.superclass.constructor.call(this, false, function(modelReference) {
		return modelReference.getOid();
	});
	
	this.modelClass = modelClass;
}

Ext.extend(cwe.model.ModelReferenceList, Ext.util.MixedCollection);

cwe.model.ModelReferenceList.prototype.getModelClass = function() {
	return this.modelClass;
}
