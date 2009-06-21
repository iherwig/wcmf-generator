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

cwe.model.ModelClass = function() {
	cwe.model.ModelClass.superclass.constructor.call(this, arguments);
	
	this.recordDefinition = null;
}

Ext.extend(cwe.model.ModelClass, cwe.model.ModelElement);

cwe.model.ModelClass.prototype.getRecordDefinition = function() {
	if (!this.recordDefinition) {
		throw "cwe.model.ModelClass.recordDefinition not set in subclass";
	}
	
	return this.recordDefinition;
}

cwe.model.ModelClass.prototype.getEditorItems = function() {
	throw "cwe.model.ModelClass.getEditorItems not overwritten";
}
