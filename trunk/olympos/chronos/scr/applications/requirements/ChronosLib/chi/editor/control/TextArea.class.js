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
 * @class A simple TextArea with help tooltip.
 * 
 * @extends Ext.form.TextArea
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.editor.control.TextArea = function(config) {
	var self = this;
	
	config = config || {};
	
	var cls = config.readOnly ? "uwm-field-readOnly" : config.cls;
	
	chi.editor.control.TextArea.superclass.constructor.call(this, Ext.apply(this, {
		cls : cls
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(chi.editor.control.TextArea, Ext.form.TextArea);

chi.editor.control.TextArea.prototype.render = function(container, position) {
	chi.editor.control.TextArea.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
