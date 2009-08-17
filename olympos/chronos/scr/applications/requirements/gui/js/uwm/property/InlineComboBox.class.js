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

/**
 * @class The autocomplete ComboBox for use in HtmlEditor.
 *
 * @extends Ext.form.ComboBox
 * @see uwm.property.HtmlEditor
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.InlineComboBox = function(config) {
	var self = this;
	
	uwm.property.InlineComboBox.superclass.constructor.call(this, Ext.apply(this, {
		store: new Ext.data.Store({
			proxy: new uwm.property.InlineComboBoxProxy({
				comboBox: this,
				value: this.getValue(),
				listeners: {
					"beforeload": function(proxy, params) {
						// set the language for the load request
						params.language = self.language;
					}
				}
			})
		}),
		displayField: 'val',
		valueField: 'val',
		mode: "remote",
		triggerAction: 'all',
		enableKeyEvents: true,
		typeAhead: true,
		minChars: 1
	
	}, config));
	
	var self = this;
	
	this.on({
		"keypress": function(field, e) {
			self.handleKeyPress(field, e);
		}
	});
	
	this.doc = config.doc;
	this.htmledit = config.htmledit;
	this.language = null;
}

Ext.extend(uwm.property.InlineComboBox, uwm.property.ComboBoxBase);

/**
 * Set the language if items should be localized.
 * @param language The language code
 */
uwm.property.InlineComboBox.prototype.setLanguage = function(language) {
	this.language = language;
}

uwm.property.InlineComboBox.prototype.handleKeyPress = function(field, e) {
	var keycode = e.getKey();
	
	switch (keycode) {
	
		case e.ENTER:
		case e.TAB:
			var record = this.findRecord(this.valueField, this.getValue());
			if (this.store && record) {
				this.htmledit.resolveInlineComboBox(record.data.val, record.data.type);
			} else {
				this.htmledit.revertInlineComboBox();
			}
			break;
			
		case e.ESC:
			this.htmledit.revertInlineComboBox();
			break;
			
		default:
			break;
	}
}
