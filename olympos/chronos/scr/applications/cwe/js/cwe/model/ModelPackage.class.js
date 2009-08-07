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
 * @class A Package for structuring Model Classes.
 * 
 * <p>
 * This class is not intended to be instantiated, but to be extended.
 * </p>
 * 
 * <p>
 * Only one instance of each concrete subclass must exist. They are registered
 * to {@link cwe.model.ModelPackageContainer} and can be retrieved from there by
 * their unique id.
 * </p>
 * 
 * @extends cwe.model.ModelElement
 * @constructor
 */
cwe.model.ModelPackage = function() {
	cwe.model.ModelPackage.superclass.constructor.call(this, arguments);
	
	this.treeIconClass = "folder";
	
	/**
	 * Whether this package should initially be shown as expanded.
	 * 
	 * @private
	 * @type boolean
	 */
	this.startExpanded = true;
	
	/**
	 * The children contained in this package.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.children = new Ext.util.MixedCollection();
};

Ext.extend(cwe.model.ModelPackage, cwe.model.ModelElement);

/**
 * Returns whether this package should initially be shown as expanded.
 * 
 * @return Whether this package should initially be shown as expanded.
 * @type boolean
 */
cwe.model.ModelPackage.prototype.getStartExpanded = function() {
	return this.startExpanded;
};

/**
 * Adds a new ModelElement to this package.
 * 
 * @param {cwe.model.ModelElement}
 *            newChild The child to add.
 */
cwe.model.ModelPackage.prototype.add = function(newChild) {
	this.children.add(newChild.getId(), newChild);
};

/**
 * Returns the list of children of this package.
 * 
 * @return The list of children of this package.
 * @type Ext.util.MixedCollection
 */
cwe.model.ModelPackage.prototype.getChildren = function() {
	return this.children;
};
