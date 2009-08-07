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
 * @class Contains all Model Packages.
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @see cwe.model.ModelPackage
 */
cwe.model.ModelPackageContainer = function() {
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
 * Must be called once for every concrete subclass of cwe.model.ModelPackage.
 * The application must ensure the parent package is registered prior to all
 * children, i. e. register in the order from root to leaf.
 * </p>
 * 
 * @param {cwe.model.ModelPackage}
 *            modelPackage The Model Package to register.
 */
cwe.model.ModelPackageContainer.prototype.registerPackage = function(modelPackage) {
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
 * @param {cwe.model.ModelElement}
 *            newChild The child to add.
 */
cwe.model.ModelPackageContainer.prototype.addToPackage = function(newChild) {
	var parentPackageId = newChild.getOwningPackageId();
	
	if (parentPackageId) {
		this.getPackage(parentPackageId).add(newChild);
	} else {
		if (newChild.getId() != cwe.model.RootPackage.ROOT_PACKAGE_ID) {
			throw ("No owning package defined for ModelElement " + newChild.getId());
		}
	}
};

/**
 * Returns a registered Model Package.
 * 
 * @param {String}
 *            cweModelElementId The unique id of the requested Model Package.
 * @return The Model Package.
 * @type cwe.model.ModelPackage
 */
cwe.model.ModelPackageContainer.prototype.getPackage = function(cweModelElementId) {
	return this.packages.get(cweModelElementId);
};

/**
 * Returns the root package.
 * 
 * @return The root package.
 * @type cwe.model.RootPackage
 */
cwe.model.ModelPackageContainer.prototype.getRootPackage = function() {
	return this.getPackage(cwe.model.RootPackage.ROOT_PACKAGE_ID);
};

/**
 * Returns all registered Model Packages.
 * 
 * @return All registered Model Packages.
 * @type Ext.util.MixedCollection
 */
cwe.model.ModelPackageContainer.prototype.getAllPackages = function() {
	return this.packages;
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type cwe.model.ModelPackageContainer
 */
cwe.model.ModelPackageContainer.getInstance = function() {
	if (!cwe.model.ModelPackageContainer.instance) {
		cwe.model.ModelPackageContainer.instance = new cwe.model.ModelPackageContainer();
	}
	
	return cwe.model.ModelPackageContainer.instance;
};
