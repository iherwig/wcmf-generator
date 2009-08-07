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

/**
 * @class A reference to an object.
 * 
 * <p>
 * A reference saves no other data than the oid of the target object.
 * </p>
 * 
 * @constructor
 * @param {String}
 *            oid The oid of the target object
 */
cwe.model.ModelReference = function(oid) {
	/**
	 * The oid of the target object.
	 * 
	 * @private
	 * @type String
	 */
	this.oid = oid;
};

/**
 * Returns the Model Class of the target object.
 * 
 * @return The Model Class of the target object.
 * @type cwe.model.ModelClass
 */
cwe.model.ModelReference.prototype.getModelClass = function() {
	return chi.Util.getCweModelElementIdFromOid(this.oid);
};

/**
 * Returns the oid of the target object.
 * 
 * @return The oid of the target object.
 * @type String
 */
cwe.model.ModelReference.prototype.getOid = function() {
	return this.oid;
};
