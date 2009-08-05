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
 * @class Contains all Model Classes.
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @see cwe.model.ModelClass
 */
cwe.model.ModelClassContainer = function() {
	/**
	 * Contains all Model Classes with their unique id as key.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.classes = new Ext.util.MixedCollection();
}

/**
 * Registers a Model Class and adds it to its parent package.
 * 
 * <p>
 * Must be called once for every concrete subclass of cwe.model.ModelClass.
 * </p>
 * 
 * @param {cwe.model.ModelClass}
 *            modelClass The Model Class to register.
 */
cwe.model.ModelClassContainer.prototype.registerClass = function(modelClass) {
	this.classes.add(modelClass.getId(), modelClass);
	
	cwe.model.ModelPackageContainer.getInstance().addToPackage(modelClass);
}

/**
 * Returns a registered Model Class.
 * 
 * @param {String}
 *            cweModelClassId The unique id of the requested Model Class.
 * @return The Model Class.
 * @type cwe.model.ModelClass
 */
cwe.model.ModelClassContainer.prototype.getClass = function(cweModelClassId) {
	return this.classes.get(cweModelClassId);
}

/**
 * Returns all registered Model Classes.
 * 
 * @return All registered Model Classes.
 * @type Ext.util.MixedCollection
 */
cwe.model.ModelClassContainer.prototype.getAllClasses = function() {
	return this.classes;
}

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type cwe.model.ModelClassContainer
 */
cwe.model.ModelClassContainer.getInstance = function() {
	if (!cwe.model.ModelClassContainer.instance) {
		cwe.model.ModelClassContainer.instance = new cwe.model.ModelClassContainer();
	}
	
	return cwe.model.ModelClassContainer.instance;
}