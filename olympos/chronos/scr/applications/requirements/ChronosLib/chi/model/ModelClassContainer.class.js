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
 * @class Contains all Model Classes.
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @see chi.model.ModelClass
 */
chi.model.ModelClassContainer = function() {
	/**
	 * Contains all Model Classes with their unique id as key.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.classes = new Ext.util.MixedCollection();
};

/**
 * Registers a Model Class and adds it to its parent package.
 * 
 * <p>
 * Must be called once for every concrete subclass of chi.model.ModelClass.
 * </p>
 * 
 * @param {chi.model.ModelClass}
 *            modelClass The Model Class to register.
 */
chi.model.ModelClassContainer.prototype.registerClass = function(modelClass) {
	this.classes.add(modelClass.getId(), modelClass);
	
	chi.model.ModelPackageContainer.getInstance().addToPackage(modelClass);
};

/**
 * Returns a registered Model Class.
 * 
 * @param {String}
 *            chiModelClassId The unique id of the requested Model Class.
 * @return The Model Class.
 * @type chi.model.ModelClass
 */
chi.model.ModelClassContainer.prototype.getClass = function(chiModelClassId) {
	var cls = this.classes.get(chiModelClassId);
	if (!cls) {
		throw ("No modelClass found for "+chiModelClassId);
	}
	return cls;
};

/**
 * Returns all registered Model Classes.
 * 
 * @return All registered Model Classes.
 * @type Ext.util.MixedCollection
 */
chi.model.ModelClassContainer.prototype.getAllClasses = function() {
	return this.classes;
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type chi.model.ModelClassContainer
 */
chi.model.ModelClassContainer.getInstance = function() {
	if (!chi.model.ModelClassContainer.instance) {
		chi.model.ModelClassContainer.instance = new chi.model.ModelClassContainer();
	}
	
	return chi.model.ModelClassContainer.instance;
};
