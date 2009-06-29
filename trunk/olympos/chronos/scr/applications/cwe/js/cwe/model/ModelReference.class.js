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

cwe.model.ModelReference = function(oid) {
	this.oid = oid;
}

cwe.model.ModelReference.prototype.getModelClass = function() {
	return chi.Util.getCweModelElementIdFromOid(this.oid);
}

cwe.model.ModelReference.prototype.getOid = function() {
	return this.oid;
}

/*
 * cwe.model.ModelReference.prototype.getLabel = function() { return
 * this.get("Name"); }
 */
