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
 * @class A date field with help tooltip.
 * 
 * @extends Ext.form.DateField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.DateField = function(config) {
	var self = this;
	
	config = config || {};
	
	cwe.editor.control.DateField.superclass.constructor.call(this, Ext.apply(this, {
		altFormats: "Y-m-d H:i:s",
		format: "Y-m-d"
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(cwe.editor.control.DateField, Ext.form.DateField);

cwe.editor.control.DateField.prototype.render = function(container, position) {
	cwe.editor.control.DateField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
