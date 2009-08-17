/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.property");

/**
 * @class An HTML Editor for use in Property View.
 * 
 * <p>
 * Additional feature: On pressing Shift-Space, an inline autocomplete helper is
 * invoked.
 * </p>
 * 
 * @extends Ext.form.HtmlEditor
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.property.HtmlEditor = function(config) {
	var self = this;
	
	uwm.property.HtmlEditor.superclass.constructor.call(this, Ext.apply(this, {
			enableAlignments : false,
			enableColors : false,
			enableFont : false,
			enableFontSize : false,
			enableLinks : false,
			enableSourceEdit : false,
			listeners : {
					"initialize" : function() {
						self.handleInitialize();
					},
					"beforedestroy" : function(field) {
						self.handleDestroy(field);
					}
			}
	}, config));
	
	this.toolTipText = config.toolTip
	this.modelNode = config.modelNode;
	
	if (config.readOnly) {
		
		this.autoMonitorDesignMode = false;
	}
}

Ext.extend(uwm.property.HtmlEditor, Ext.form.HtmlEditor);

uwm.property.HtmlEditor.prototype.handleInitialize = function() {
	
	var link = this.doc.createElement("link");
	link.setAttribute("rel", "stylesheet");
	link.setAttribute("type", "text/css");
	link.setAttribute("href", "css/htmledit.css");
	var head = this.doc.getElementsByTagName("head")[0];
	head.appendChild(link);
	
	if (this.readOnly) {
		
		this.doc.body.setAttribute("class", 'readOnly');
		try {
			Ext.EventManager.removeAll(this.doc);
		} catch (e) {
		}
		
		this.doc.designMode = "off";
	} else {
		this.doc.body.setAttribute("class", 'editable');
		
		Ext.EventManager.on(this.doc, 'keypress', function(e) {
			if (e.shiftKey && e.getKey() == e.SPACE) {
				this.insertAtCursor("<span id='" + uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID + "' />");
				
				this.span = this.doc.getElementById(uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID);
				var fullPreText = "";
				if (this.span.previousSibling) {
					fullPreText = this.span.previousSibling.textContent;
				}
				else {
					fullPreText = this.span.textContent;
				}
				this.preText = "";
				
				if (fullPreText) {
					var matchArray = fullPreText.match(/[^\t\n ]+$/);
					if (matchArray) {
						this.preText = matchArray[0];
						this.span.previousSibling.textContent = fullPreText.substr(0, fullPreText.length - this.preText.length);
					}
				}
				
				this.wrap = new Ext.Layer();
				
				this.comboBox = new uwm.property.InlineComboBox( {
						htmledit : this,
						doc : this.doc,
						renderTo : this.wrap.dom,
						value : this.preText.trim()
				});
				
				var localpos = this.getPosition(true);
				var abspos = this.el.getXY();
				var combobox = this.comboBox.getBox();
				var spanbox = this.span.getBoundingClientRect();
				
				// the fixed offsets are determined by trial & error, no deeper
				// meaning (just looks better this way)
				this.wrap.setBounds(abspos[0] - localpos[0] + spanbox.left, abspos[1] - localpos[1] + spanbox.top + combobox.height, combobox.width + 20, combobox.height);
				this.wrap.show();
				
				this.comboBox.focus(undefined, true);
			}
		}, this);

		var value = this.originalValue;
		if (value == "&nbsp;" || value.trim() == uwm.property.HtmlEditor.EMPTY_VALUE || value.trim() == "") {
			this.execCmd('delete');
			if (Ext.isIE) {
				e.updateToolbar();
			}
		}
	}
}

uwm.property.HtmlEditor.prototype.resolveInlineComboBox = function(newValue, newValueType) {
	this.comboBox.destroy();
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	if (newValue && newValueType) {
		this.insertAtCursor(" <span class='autocomplete-" + newValueType + "'>" + newValue + "</span> ");
	}
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.revertInlineComboBox = function() {
	this.comboBox.destroy();
	this.wrap.remove();
	this.span.parentNode.removeChild(this.span);
	if (this.preText) {
		this.insertAtCursor(this.preText);
	}
	this.focus(undefined, 100);
}

uwm.property.HtmlEditor.prototype.render = function(container, position) {
	uwm.property.HtmlEditor.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
				target : container,
				html : this.toolTipText
		});
	}
}

uwm.property.HtmlEditor.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		var tmp = new Object();
		tmp[this.getName()] = this.getValue();
		
		this.modelNode.changeProperties(tmp);
	}
}

uwm.property.HtmlEditor.INLINE_COMBO_BOX_SPAN_ID = "inlineComboBoxSpanId";