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
 * @class An HTML Editor with help tooltip.
 * 
 * @extends Ext.form.HtmlEditor
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.HtmlEditor = function(config) {
	var self = this;
	
	cwe.editor.control.HtmlEditor.superclass.constructor.call(this, Ext.apply(this, {
	    enableAlignments : false,
	    enableColors : false,
	    enableFont : false,
	    enableFontSize : false,
	    enableLinks : false,
	    enableSourceEdit : false,
	    listeners : {
		    "initialize" : function() {
			    self.handleInitialize();
		    }
	    }
	}, config));
	
	this.toolTipText = config.toolTip;
	
	if (config.readOnly) {
		this.autoMonitorDesignMode = false;
	}
};

Ext.extend(cwe.editor.control.HtmlEditor, Ext.form.HtmlEditor);

cwe.editor.control.HtmlEditor.prototype.handleInitialize = function() {
	if (this.readOnly) {
		
		this.doc.body.setAttribute("class", 'readOnly');
		try {
			Ext.EventManager.removeAll(this.doc);
		} catch (e) {
		}
		
		this.doc.designMode = "off";
	} else {
		this.doc.body.setAttribute("class", 'editable');
		
		var value = this.originalValue;
		if (value == "&nbsp;" || value.trim() == cwe.editor.control.HtmlEditor.EMPTY_VALUE || value.trim() == "") {
			this.execCmd('delete');
			if (Ext.isIE) {
				e.updateToolbar();
			}
		}
	}
};

cwe.editor.control.HtmlEditor.prototype.render = function(container, position) {
	cwe.editor.control.HtmlEditor.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
