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

uwm.property.HtmlEditor = function(config) {
	var self = this;
	
	uwm.property.HtmlEditor.superclass.constructor.call(this, Ext.apply(this, {
		enableAlignments: false,
		enableColors: false,
		enableFont: false,
		enableFontSize: false,
		enableLinks: false,
		enableSourceEdit: false,
		listeners: {
			"initialize": function() {
				self.handleInitialize();
			},
			"beforedestroy": function(field) {
				self.fieldChanged(field);
			}
		}
	}, config));
	
	this.toolTipText = config.toolTip
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.HtmlEditor, Ext.form.HtmlEditor);

uwm.property.HtmlEditor.prototype.handleInitialize = function() {
	Ext.EventManager.on(this.doc, 'keypress', function(e) {
		if (e.shiftKey && e.getKey() == e.SPACE) {
			this.insertAtCursor("<span id='" + uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID + "' />");
			
			this.span = this.doc.getElementById(uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID);
			var fullPreText = this.span.previousSibling.nodeValue;
			this.preText = "";
			
			if (fullPreText) {
				var matchArray = fullPreText.match(/[^\t\n ]+$/);
				if (matchArray) {
					this.preText = matchArray[0];
					this.span.previousSibling.nodeValue = fullPreText.substr(0, fullPreText.length - this.preText.length);
				}
			}
			
			//this.wrap = Ext.DomHelper.append(Ext.getBody(), "<div />", true);
			this.wrap = new Ext.Layer();
			
			this.comboBox = new uwm.property.InlineComboBox({
				htmledit: this,
				doc: this.doc,
				renderTo: this.wrap.dom,
				value: this.preText.trim()
			});
			
			var htmlpos = this.getPosition(true);
			var htmlbox = this.getBox();
			var combobox = this.comboBox.getBox();
			var spanbox = this.span.getBoundingClientRect();
			
			// the fixed offsets are determined by trial & error, no deeper meaning (just looks better this way)
			this.wrap.setBounds(htmlbox.x - htmlpos[0] + spanbox.left, htmlbox.y - htmlpos[1] + spanbox.top + combobox.height * 1.1, combobox.width + 20, combobox.height);
			this.wrap.show();
			
			this.comboBox.focus(undefined, true);
		}
	}, this);
}

uwm.property.HtmlEditor.prototype.resolveInlineComboBox = function(newValue) {
	this.comboBox.destroy();
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	this.insertAtCursor(" <b>" + newValue + "</b>&ensp;");
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.revertInlineComboBox = function() {
	this.comboBox.destroy();
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	this.insertAtCursor(this.preText);
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.render = function(container, position) {
	uwm.property.HtmlEditor.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip({
			target: container,
			html: this.toolTipText
		});
	}
}

uwm.property.HtmlEditor.prototype.fieldChanged = function(field) {
	if (this.isDirty()) {
		var tmp = new Object();
		tmp[this.getName()] = this.getValue();
		
		this.modelNode.changeProperties(tmp);
	}
}

uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID = "inlineComboBoxSpanId";
