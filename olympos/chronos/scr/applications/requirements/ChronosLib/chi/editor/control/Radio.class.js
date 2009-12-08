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
 * @class A radio button with help tooltip.
 * 
 * @extends Ext.form.Radio
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.editor.control.Radio = function(config) {
	var self = this;
	
	config = config || {};
	
	chi.editor.control.Radio.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	this.toolTipText = config.toolTip;
	this.value = config.value;
};

Ext.extend(chi.editor.control.Radio, Ext.form.Radio);

chi.editor.control.Radio.prototype.render = function(container, position) {
	chi.editor.control.Radio.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
