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
Ext.namespace("chi.model");

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
chi.model.ModelReference = function(oid) {
	/**
	 * The oid of the target object.
	 * 
	 * @private
	 * @type String
	 */
	this.oid = oid;
};

/**
 * Returns the Model Description of the target object.
 * 
 * @return The Model Description of the target object.
 * @type chi.model.ModelDescription
 */
chi.model.ModelReference.prototype.getModelDescription = function() {
	return chi.Util.getChiModelElementIdFromOid(this.oid);
};

/**
 * Returns the oid of the target object.
 * 
 * @return The oid of the target object.
 * @type String
 */
chi.model.ModelReference.prototype.getOid = function() {
	return this.oid;
};
