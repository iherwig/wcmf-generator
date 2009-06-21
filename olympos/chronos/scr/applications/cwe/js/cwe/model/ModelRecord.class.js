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

cwe.model.ModelRecord = function(modelClass, data) {
	var template = Ext.data.Record.create(modelClass.getRecordDefinition());
	
	var result = new template(data);
	result.modelClass = modelClass;
	
	for(var currElem in this) {
		result[currElem] = this[currElem];
	}
	
	return result;
}

Ext.extend(cwe.model.ModelRecord, Ext.data.Record);

cwe.model.ModelRecord.prototype.getModelClass = function() {
	return this.modelClass;
}

cwe.model.ModelRecord.prototype.getOid = function() {
	return this.get("oid");
}

cwe.model.ModelRecord.prototype.getLabel = function() {
	return this.get("Name");
}
