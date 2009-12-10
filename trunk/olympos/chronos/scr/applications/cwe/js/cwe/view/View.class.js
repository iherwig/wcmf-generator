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
 * @class The abstract base class for a readonly view on an object.
 * 
 * <p>
 * The object to display is loaded from the back-end.
 * </p>
 * 
 * @extends Ext.form.Panel
 * @constructor
 * 
 */
cwe.view.View = function() {
	/**
	 * The id of this view. Subclasses must define this.
	 * 
	 * @private
	 * @type String
	 */
	this.viewId = null;
	
	/**
	 * The oid displayed by this view.
	 * 
	 * @private
	 * @type String
	 */
	this.oid = null;
	
	/**
	 * The current request (stored here to maybe cancel it).
	 * 
	 * @private
	 */
	this.currentRequestId = null;

	/**
	 * The loading mask.
	 * 
	 * @private
	 */
	this.loadMask = null;
	
	/**
	 * The content panel.
	 * 
	 * @private
	 * @type {Ext.Panel}
	 */
	this.contentPanel = null;
};

/**
 * Create the content panel to display for this view. This
 * method must be called before any other method.
 *
 * @param {Object}
 *            config The panel configuration.
 * @return The panel
 * @type Ext.Panel
 */
cwe.view.View.prototype.createContentPanel = function(config) {
	this.contentPanel = this.createContentPanelImpl(config);
	return this.contentPanel;
};

/**
 * Returns the id of the view.
 * 
 * @return The id of the view.
 * @type String
 */
cwe.view.View.prototype.getId = function() {
	return this.viewId;
};

/**
 * Get the visual panel of this view.
 * 
 * @return The panel.
 * @type {Ext.Panel}
 */
cwe.view.View.prototype.getContentPanel = function() {
	if (!this.contentPanel) {
		throw "No content panel created for view: "+this.getId()+". Please call createContentPanel.";
	}
	return this.contentPanel;
};

/**
 * Loads the object to display from persistency.
 * 
 * @param {String}
 *            oid The oid of the object to load.
 */
cwe.view.View.prototype.loadFromOid = function(oid) {
	var self = this;
	
	// abort a running request
	if (this.currentRequestId) {
		if (this.loadMask) {
			this.loadMask.hide();
		}
		chi.persistency.Persistency.getInstance().cancelRequest(this.currentRequestId);
	}
	
	// show the loadin mask
	this.loadMask = new Ext.LoadMask(this.getContentPanel().getEl(), {msg: chi.Dict.translate("Please Wait")+"...", removeMask: true});
	this.loadMask.show();
	
	var actionSet = new chi.persistency.ActionSet();
	
	// delegate content loading to implementation class
	this.loadContent(oid, actionSet);
	
	this.currentRequestId = actionSet.commit(function(data) {
		self.loadFinished(data);
		self.loadMask.hide();
	});
	this.oid = oid;
};

/**
 * Template methods
 */

/**
 * Actually create the content panel to display for this view.
 *
 * Note: In order to reference data-bound fields after loading the
 * content, these fields should have explicit ids.
 * 
 * @param {Object}
 *            config The panel configuration.
 * @return The panel
 * @type Ext.Panel
 */
cwe.view.View.prototype.createContentPanelImpl = function(config) {
	throw "Method cwe.view.View.createContentPanelImpl not implemented by view class: "+this.getId();
};

/**
 * Add the required persistency calls for loading the content
 * to display. The calls are added to the given ActionSet.
 *
 * Note: For convenience the loaded data should be filled into 
 * the panel inside callbacks defined for each persistency call
 * instead of inside the loadFinished callback.
 * 
 * @private
 * @param {String}
 *            oid The oid displayed by this view.
 * @param {chi.persistency.ActionSet}
 *            actionSet The action set to add the persistency calls to.
 */
cwe.view.View.prototype.loadContent = function(oid, actionSet) {
	throw "Method cwe.view.View.loadContent not implemented by view class: "+this.getId();
};

/**
 * After load callback. Subclasses may override this method to do
 * something with the returned data.
 * 
 * @private
 * @param {Object}
 *            data The data returned by the complete load request (ActionSet).
 */
cwe.view.View.prototype.loadFinished = function(data) {};