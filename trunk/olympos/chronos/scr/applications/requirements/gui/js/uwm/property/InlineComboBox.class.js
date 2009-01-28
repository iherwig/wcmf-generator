/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm.property");

uwm.property.InlineComboBox = function(config) {
	var self = this;
	
	uwm.property.InlineComboBox.superclass.constructor.call(this, Ext.apply(this, {
		store: new Ext.data.JsonStore({
			url: '../application/main.php',
			baseParams: {
				sid: uwm.Session.getInstance().getSid(),
				usr_action: 'autocomplete',
				limit_end: 50,
				limit_start: 1,
				response_format: 'JSON'
			},
			totalProperty: "totalCount",
			root: 'data',
			fields: ['type', 'val'],
		}),
		displayField: 'val',
		mode: "remote",
		triggerAction: 'all',
		enableKeyEvents: true,
		typeAhead: true,
		minChars : 1 
				
	}, config));
	
	var self = this;
	
	this.on({
		"keypress": function(field, e) {
			self.handleKeyPress(field, e);
		}
	});
	
	this.doc = config.doc;
	this.htmledit = config.htmledit;
}

Ext.extend(uwm.property.InlineComboBox, Ext.form.ComboBox);

uwm.property.InlineComboBox.prototype.handleKeyPress = function(field, e) {
	var keycode = e.getKey();
	
	switch (keycode) {
		case e.ENTER:
		case e.TAB:
			this.htmledit.resolveInlineComboBox(this.getValue());
			break;
			
		case e.ESC:
			this.htmledit.revertInlineComboBox();
			break;

		default:
			break;
	}
}
