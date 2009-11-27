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
 * @class A configurable static content element of the application.
 * 
 * <p>
 * Model Elements are shown in the {@link chi.modeltree.ModelTree}. They
 * contain all configurable information on the concrete application.
 * </p>
 * 
 * <p>
 * This class is not intended to be instantiated, but to be extended.
 * </p>
 * 
 * @constructor
 */
chi.model.ModelElement = function() {
	/**
	 * The unique identifier of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.chiModelElementId = null;
	
	/**
	 * The display name (label) of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.name = null;
	
	/**
	 * The description of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.description = null;

	/**
	 * The help url of this Model Element.
	 * 
	 * @private
	 * @type String
	 */
	this.helpUrl = null;

	/**
	 * The semantic group of the element, used to group elements.
	 * 
	 * @private
	 * @type String
	 */
	this.semanticGroup = null;

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
chi.model.ModelElement.prototype.getId = function() {
	return this.chiModelElementId;
};

/**
 * Returns the display name (label) of this Model Element.
 * 
 * @return The display name (label) of this Model Element.
 * @type String
 */
chi.model.ModelElement.prototype.getName = function() {
	return this.name;
};

/**
 * Returns the description of this Model Element.
 * 
 * @return The description of this Model Element.
 * @type String
 */
chi.model.ModelElement.prototype.getDescription = function() {
	return this.description;
};

/**
 * Returns the help url of this Model Element.
 * 
 * @return The help url of this Model Element.
 * @type String
 */
chi.model.ModelElement.prototype.getHelpUrl = function() {
	return this.helpUrl;
};

/**
 * Returns the semantic group of the element, used to group elements.
 * 
 * @return The semantic group of this Model Element.
 * @type String
 */
chi.model.ModelElement.prototype.getSemanticGroup = function() {
	return this.semanticGroup;
};

/**
 * Returns the CSS class defining this modelElement's tree icon (16x16 px).
 * 
 * @return The CSS class defining this modelElement's tree icon (16x16 px).
 * @type String
 */
chi.model.ModelElement.prototype.getTreeIconClass = function() {
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
chi.model.ModelElement.prototype.getOwningPackageId = function() {
	return this.owningPackageId;
};

/**
 * Returns the Model Package containing this Model Element.
 * 
 * @return The Model Package containing this Model Element.
 * @type chi.model.ModelPackage
 */
chi.model.ModelElement.prototype.getOwningPackage = function() {
	return chi.model.ModelPackageContainer.getInstance().getPackage(this.getOwningPackageId());
};
