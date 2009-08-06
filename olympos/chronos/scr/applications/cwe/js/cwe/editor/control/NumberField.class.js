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
 * @class A NumberField with help tooltip
 * 
 * @extends Ext.form.NumberField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.NumberField = function(config) {
	var self = this;
	
	var cls = config.readOnly ? "uwm-field-readOnly" : config.cls;
	
	cwe.editor.control.NumberField.superclass.constructor.call(this, Ext.apply(this, {
		cls : cls
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(cwe.editor.control.NumberField, Ext.form.NumberField);

cwe.editor.control.NumberField.prototype.render = function(container, position) {
	cwe.editor.control.NumberField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
