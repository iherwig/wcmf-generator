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

Ext.namespace("cwe.view");

/**
 * @class Contains all View Classes.
 * 
 * <p>
 * This class is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @see cwe.view.View
 */
cwe.view.ViewContainer = function() {
	/**
	 * Contains all Views with their unique id as key.
	 * 
	 * @private
	 * @type Ext.util.MixedCollection
	 */
	this.views = new Ext.util.MixedCollection();
};

/**
 * Registers a View.
 * 
 * <p>
 * Must be called once for every concrete subclass of cwe.view.View.
 * </p>
 * 
 * @param {cwe.view.View}
 *            view An instance of the View class to register.
 */
cwe.view.ViewContainer.prototype.registerView = function(view) {
	this.views.add(view.getId(), view);
};

/**
 * Returns an instance of a registered View.
 * 
 * @param {String}
 *            viewId The unique id of the requested View.
 * @param {Object}
 *            config The initial configuration for the View instance.
 * @return The View instance or null, if no view is defined for the given id.
 * @type cwe.view.View
 */
cwe.view.ViewContainer.prototype.createView = function(viewId, config) {
	var cls = this.views.get(viewId);
	if (cls) {
		return new cls.constructor(config);
	}
	return null;
};

/**
 * Returns all registered Views.
 * 
 * @return All registered Views.
 * @type Ext.util.MixedCollection
 */
cwe.view.ViewContainer.prototype.getAllViews = function() {
	return this.views;
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class
 * @type cwe.view.ViewContainer
 */
cwe.view.ViewContainer.getInstance = function() {
	if (!cwe.view.ViewContainer.instance) {
		cwe.view.ViewContainer.instance = new cwe.view.ViewContainer();
	}
	
	return cwe.view.ViewContainer.instance;
};
