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
 * @class A static (pre-defined values) ComboBox with help tooltip.
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.StaticComboBox = function(config) {
	var self = this;
	
	cwe.editor.control.StaticComboBox.superclass.constructor.call(this, Ext.apply(this, {
	    store : new Ext.data.SimpleStore( {
	        fields : [ {
	            name : "key",
	            mapping : "key"
	        }, {
	            name : "val",
	            mapping : "val"
	        } ],
	        data : config.data
	    }),
	    displayField : 'val',
	    valueField : 'key',
	    mode : "local",
	    triggerAction : 'all',
	    editable : false
	}, config));
	
	this.toolTipText = config.toolTip;
};

Ext.extend(cwe.editor.control.StaticComboBox, Ext.form.ComboBox);

cwe.editor.control.StaticComboBox.prototype.render = function(container, position) {
	cwe.editor.control.StaticComboBox.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
		    target : container,
		    html : this.toolTipText
		});
	}
};
