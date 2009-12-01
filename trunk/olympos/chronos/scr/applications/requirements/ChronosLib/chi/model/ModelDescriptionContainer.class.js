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
 * @see chi.model.ModelDescription
 */
chi.model.ModelDescriptionContainer = function() {
	/**
	 * Contains all Model Descriptions with their unique id as key.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.descriptions = new Ext.util.MixedCollection();
};

/**
 * Registers a Model Description and adds it to its parent package.
 * 
 * <p>
 * Must be called once for every concrete subclass of chi.model.ModelDescription.
 * </p>
 * 
 * @param {chi.model.ModelDescription}
 *            modelDescription The Model Description to register.
 */
chi.model.ModelDescriptionContainer.prototype.registerDescription = function(modelDescription) {
	this.descriptions.add(modelDescription.getId(), modelDescription);
	
	chi.model.ModelPackageContainer.getInstance().addToPackage(modelDescription);
};

/**
 * Returns a registered Model Description.
 * 
 * @param {String}
 *            chiModelClassId The unique id of the requested Model Description.
 * @return The Model Description.
 * @type chi.model.ModelDescription
 */
chi.model.ModelDescriptionContainer.prototype.getDescription = function(chiModelClassId) {
	var cls = this.descriptions.get(chiModelClassId);
	if (!cls) {
		throw ("No modelDescription found for "+chiModelClassId);
	}
	return cls;
};

/**
 * Returns all registered Model Descriptions.
 * 
 * @return All registered Model Descriptions.
 * @type Ext.util.MixedCollection
 */
chi.model.ModelDescriptionContainer.prototype.getAllDescriptions = function() {
	return this.descriptions;
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type chi.model.ModelDescriptionContainer
 */
chi.model.ModelDescriptionContainer.getInstance = function() {
	if (!chi.model.ModelDescriptionContainer.instance) {
		chi.model.ModelDescriptionContainer.instance = new chi.model.ModelDescriptionContainer();
	}
	
	return chi.model.ModelDescriptionContainer.instance;
};
