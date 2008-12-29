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
				this.doc.getElementsByTagName("head")[0].innerHTML += '<link rel="stylesheet" type="text/css" href="lib/ext/resources/css/ext-all.css" />';
				
				Ext.EventManager.on(this.doc, 'keypress', function(e) {
					if (e.shiftKey && e.getKey() == e.SPACE) {
						this.insertAtCursor("<span id='ASDFASDFASDF' />");
						
						this.span = this.doc.getElementById("ASDFASDFASDF");
						var fullPreText = this.span.previousSibling.nodeValue;
						this.preText = "";
						
						if (fullPreText) {
							this.preText = fullPreText.match(/[^\t\n ]+$/)[0];
							this.span.previousSibling.nodeValue = fullPreText.substr(0, fullPreText.length - this.preText.length);
						}
						
						this.comboBox = new uwm.property.InlineComboBox({
							htmledit: this,
							doc: this.doc,
							renderTo: this.span,
							mode: "local",
							value: this.preText
						});
						this.suspendEvents();
						Ext.TaskMgr.stop(this.monitorTask);
						this.doc.designMode = "off";
						this.comboBox.focus();
					}
				}, this);
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

uwm.property.HtmlEditor.prototype.resolveInlineComboBox = function(newValue) {
	this.comboBox.destroy();
	this.span.previousSibling.nodeValue += newValue;
	this.span.parentNode.removeChild(this.span);
	this.doc.designMode = "on",
	Ext.TaskMgr.start(this.monitorTask);
	this.resumeEvents();
	this.focus();
}

uwm.property.HtmlEditor.prototype.revertInlineComboBox = function() {
	this.comboBox.destroy();
	this.span.previousSibling.nodeValue += this.preText;
	this.span.parentNode.removeChild(this.span);
	this.doc.designMode = "on",
	Ext.TaskMgr.start(this.monitorTask);
	this.resumeEvents();
	this.focus();
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
