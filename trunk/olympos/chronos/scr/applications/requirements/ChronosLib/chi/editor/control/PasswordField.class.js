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
 * @class A password field with help tooltip.
 * 
 * @extends Ext.form.TextField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.editor.control.PasswordField = function(config) {
	var self = this;
	
	config = config || {};
	
	chi.editor.control.PasswordField.superclass.constructor.call(this, Ext.apply(this, {
		inputType : "password"
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(chi.editor.control.PasswordField, Ext.form.TextField);

chi.editor.control.PasswordField.prototype.render = function(container, position) {
	chi.editor.control.PasswordField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};