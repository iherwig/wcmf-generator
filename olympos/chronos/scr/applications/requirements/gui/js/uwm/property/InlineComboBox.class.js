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
		triggerAction: 'all',
		enableKeyEvents: true
	}, config));
	
	var self = this;
	
	this.on({
		"keypress": function(field, e) {
			self.handleKeyPress(field, e);
		}
	});
	
	this.htmledit = config.htmledit;
	this.doc = config.doc;
	this.layerElem = this.doc.createElement("div");
	this.doc.getElementsByTagName("body")[0].appendChild(this.layerElem);
}

Ext.extend(uwm.property.InlineComboBox, Ext.form.ComboBox);

uwm.property.InlineComboBox.prototype.onRender = function(ct, position) {
	uwm.property.InlineComboBox.superclass.onRender.call(this, ct, position);
	
	this.wrap = Ext.DomHelper.append(Ext.getBody(), "<div />", true);
	this.wrap.setStyle("visibility", "hidden");
	
	var htmlpos = this.htmledit.getPosition(true);
	var htmlbox = this.htmledit.getBox();
	var combobox = this.getBox();
	
	this.wrap.setBounds(htmlbox.x + combobox.x - htmlpos[0], htmlbox.y + combobox.y - htmlpos[1] + combobox.height * 1.5, combobox.width, combobox.height);
}

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
	}
}
