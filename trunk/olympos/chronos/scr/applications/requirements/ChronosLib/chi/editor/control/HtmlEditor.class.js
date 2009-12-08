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
 * @class An HTML Editor with help tooltip.
 * 
 * @extends Ext.form.HtmlEditor
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
chi.editor.control.HtmlEditor = function(config) {
	var self = this;
	
	config = config || {};
	
	chi.editor.control.HtmlEditor.superclass.constructor.call(this, Ext.apply(this, {
	    enableAlignments : false,
	    enableColors : false,
	    enableFont : false,
	    enableFontSize : false,
	    enableLinks : false,
	    enableSourceEdit : false
	}, config));
	
	this.toolTipText = config.toolTip;
	
	if (config.readOnly) {
		this.autoMonitorDesignMode = false;
	}
};

Ext.extend(chi.editor.control.HtmlEditor, Ext.form.HtmlEditor);

chi.editor.control.HtmlEditor.prototype.render = function(container, position) {
	chi.editor.control.HtmlEditor.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};

chi.editor.control.HtmlEditor.prototype.getValue = function() {
	var result = chi.editor.control.HtmlEditor.superclass.getValue.call(this);
	
	if ((this.value === undefined || this.value === null) && (result === "" || (result.length && result.length == 1 && result.charCodeAt(0) == 8203))) {
		result = this.value;
	} else if (result == "<br>") {
		result = undefined;
	}
	
	return result;
};
