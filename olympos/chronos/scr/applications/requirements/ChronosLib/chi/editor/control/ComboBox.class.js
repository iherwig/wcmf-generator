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
Ext.namespace("chi.editor.control");

/**
 * @class A dynamic ComboBox (loading its contents via JSON on request) with
 *        help tooltip.
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.editor.control.ComboBox = function(config) {
	var self = this;
	
	config = config || {};
	
	chi.editor.control.ComboBox.superclass.constructor.call(this, Ext.apply(this, {
	    store : new Ext.data.Store( {
		    proxy : new chi.editor.control.ComboBoxProxy( {
			    modelDescription : chi.model.ModelDescriptionContainer.getInstance().getDescription(config.targetChiModelElementId)
		    })
	    }),
	    displayField : 'val',
	    valueField : 'key',
	    mode : "remote",
	    triggerAction : 'all',
	    editable : false
	}, config));
	
	this.toolTipText = config.toolTip;
	
	this.modelNode = config.modelNode;
};

Ext.extend(chi.editor.control.ComboBox, Ext.form.ComboBox);

chi.editor.control.ComboBox.prototype.render = function(container, position) {
	chi.editor.control.ComboBox.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};

/**
 * Override findRecord method from Ext.form.ComboBox, to avoid NPEs. Sometimes
 * the store is null, when you try to open a chi.editor.control.ComboBox by
 * clicking the pulldown button and a (different) chi.editor.control.ComboBox
 * instance was opened before. In this case the call stack is the following (all
 * in ext-all-debug.js): mimicBlur() -> triggerBlur() -> onBlur() ->
 * beforeBlur() -> findRecord()
 */
chi.editor.control.ComboBox.prototype.findRecord = function(prop, value) {
	// return immediatly if store is null (doesn't change visible functionality)
	if (this.store == null)
		return null;
	
	var record;
	if (this.store.getCount() > 0) {
		this.store.each(function(r) {
			if (r.data[prop] == value) {
				record = r;
				return false;
			}
		});
	}
	return record;
};

chi.editor.control.ComboBox.prototype.getValue = function() {
	var result = chi.editor.control.ComboBox.superclass.getValue.call(this);
	
	if ((this.value === undefined || this.value === null) && result === "") {
		result = this.value;
	}
	
	return result;
}
