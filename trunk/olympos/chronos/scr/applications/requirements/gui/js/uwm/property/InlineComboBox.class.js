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
		store: new Ext.data.SimpleStore({
			fields: [{
				name: "key",
				mapping: "key"
			}, {
				name: "val",
				mapping: "val"
			}],
			data: [{
				key: "1",
				val: "werden"
			}, {
				key: "2",
				val: "wer denn"
			}, {
				key: "3",
				val: "asdf asdf asdf"
			}, {
				key: "4",
				val: "asdfjklö"
			}, {
				key: "5",
				val: "hallo"
			}, {
				key: "6",
				val: "WER denn?"
			}, {
				key: "7",
				val: "AsDf so geht es weiter"
			}, {
				key: "8",
				val: "Ganz was neues"
			}]
		}),
		displayField: 'val',
		valueField: 'val',
		mode: "local",
		triggerAction: 'all',
		enableKeyEvents: true,
		typeAhead: true
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
		//do nothing
	}
}
