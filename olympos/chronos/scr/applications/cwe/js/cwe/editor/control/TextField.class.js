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
Ext.namespace("cwe.editor.control");

/**
 * @class A TextField with help tooltip
 * 
 * @extends Ext.form.TextField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.TextField = function(config) {
	var self = this;

	config = config || {};
	
	var cls = config.readOnly ? "cwe-field-readOnly" : config.cls;
	
	cwe.editor.control.TextField.superclass.constructor.call(this, Ext.apply(this, {
		cls : cls
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(cwe.editor.control.TextField, Ext.form.TextField);

cwe.editor.control.TextField.prototype.render = function(container, position) {
	cwe.editor.control.TextField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
