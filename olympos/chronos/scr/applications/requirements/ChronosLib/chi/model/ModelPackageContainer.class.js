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
 * @class Contains all Model Packages.
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @see chi.model.ModelPackage
 */
chi.model.ModelPackageContainer = function() {
	/**
	 * Contains all Model Packages with their unique id as key.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.packages = new Ext.util.MixedCollection();
};

/**
 * Registers a Model Package and adds it to its parent package.
 * 
 * <p>
 * Must be called once for every concrete subclass of chi.model.ModelPackage.
 * The application must ensure the parent package is registered prior to all
 * children, i. e. register in the order from root to leaf.
 * </p>
 * 
 * @param {chi.model.ModelPackage}
 *            modelPackage The Model Package to register.
 */
chi.model.ModelPackageContainer.prototype.registerPackage = function(modelPackage) {
	this.packages.add(modelPackage.getId(), modelPackage);
	
	this.addToPackage(modelPackage);
};

/**
 * Adds a child to its parent package.
 * 
 * <p>
 * The parent package is determined from the child's
 * <code>owningPackageid</code>.
 * </p>
 * 
 * @throws If
 *             the parent package cannot be found.
 * @param {chi.model.ModelElement}
 *            newChild The child to add.
 */
chi.model.ModelPackageContainer.prototype.addToPackage = function(newChild) {
	var parentPackageId = newChild.getOwningPackageId();
	
	if (parentPackageId) {
		this.getPackage(parentPackageId).add(newChild);
	} else {
		if (newChild.getId() != chi.model.RootPackage.ROOT_PACKAGE_ID) {
			throw ("No owning package defined for ModelElement " + newChild.getId());
		}
	}
};

/**
 * Returns a registered Model Package.
 * 
 * @param {String}
 *            chiModelElementId The unique id of the requested Model Package.
 * @return The Model Package.
 * @type chi.model.ModelPackage
 */
chi.model.ModelPackageContainer.prototype.getPackage = function(chiModelElementId) {
	return this.packages.get(chiModelElementId);
};

/**
 * Returns the root package.
 * 
 * @return The root package.
 * @type chi.model.RootPackage
 */
chi.model.ModelPackageContainer.prototype.getRootPackage = function() {
	return this.getPackage(chi.model.RootPackage.ROOT_PACKAGE_ID);
};

/**
 * Returns all registered Model Packages.
 * 
 * @return All registered Model Packages.
 * @type Ext.util.MixedCollection
 */
chi.model.ModelPackageContainer.prototype.getAllPackages = function() {
	return this.packages;
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type chi.model.ModelPackageContainer
 */
chi.model.ModelPackageContainer.getInstance = function() {
	if (!chi.model.ModelPackageContainer.instance) {
		chi.model.ModelPackageContainer.instance = new chi.model.ModelPackageContainer();
	}
	
	return chi.model.ModelPackageContainer.instance;
};
