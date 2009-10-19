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
 * @class A DisplayField with help tooltip
 * 
 * @extends Ext.form.DisplayField
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.DisplayField = function(config) {
	var self = this;
	
	cwe.editor.control.DisplayField.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(cwe.editor.control.DisplayField, Ext.form.DisplayField);

cwe.editor.control.DisplayField.prototype.render = function(container, position) {
	cwe.editor.control.DisplayField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};

cwe.editor.control.DisplayField.prototype.getValue = function(returnValue) {
	var result = undefined;
	
	if (returnValue) {
		result = cwe.editor.control.DisplayField.superclass.getValue.call(this);
	}
	
	return result;
};
