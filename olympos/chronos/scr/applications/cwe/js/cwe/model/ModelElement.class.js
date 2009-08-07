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
 * @class A configurable static content element of the application.
 * 
 * <p>
 * Model Elements are shown in the {@link cwe.modeltree.ModelTree}. They
 * contain all configurable information on the concrete application.
 * </p>
 * 
 * <p>
 * This class is not intended to be instantiated, but to be extended.
 * </p>
 * 
 * @constructor
 */
cwe.model.ModelElement = function() {
	/**
	 * The unique identifier of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.cweModelElementId = null;
	
	/**
	 * The display name (label) of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.name = null;
	
	/**
	 * The CSS class defining this modelElement's tree icon (16x16 px).
	 * 
	 * @private
	 * @type String
	 */
	this.treeIconClass = null;
	
	/**
	 * The unique identifier of the Model Package containing this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.owningPackageId = null;
};

/**
 * Returns the unique identifier of this Model Element.
 * 
 * @return The unique identifier of this Model Element.
 * @type String
 */
cwe.model.ModelElement.prototype.getId = function() {
	return this.cweModelElementId;
};

/**
 * Returns the display name (label) of this Model Element.
 * 
 * @return The display name (label) of this Model Element.
 * @type String
 */
cwe.model.ModelElement.prototype.getName = function() {
	return this.name;
};

/**
 * Returns the CSS class defining this modelElement's tree icon (16x16 px).
 * 
 * @return The CSS class defining this modelElement's tree icon (16x16 px).
 * @type String
 */
cwe.model.ModelElement.prototype.getTreeIconClass = function() {
	return this.treeIconClass;
};

/**
 * Returns the unique identifier of the Model Package containing this Model
 * Element.
 * 
 * @return The unique identifier of the Model Package containing this Model
 *         Element.
 * @type String
 */
cwe.model.ModelElement.prototype.getOwningPackageId = function() {
	return this.owningPackageId;
};

/**
 * Returns the Model Package containing this Model Element.
 * 
 * @return The Model Package containing this Model Element.
 * @type cwe.model.ModelPackage
 */
cwe.model.ModelElement.prototype.getOwningPackage = function() {
	return cwe.model.ModelPackageContainer.getInstance().getPackage(this.getOwningPackageId());
};
