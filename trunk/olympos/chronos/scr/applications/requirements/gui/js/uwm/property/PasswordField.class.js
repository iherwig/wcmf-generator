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

uwm.property.PasswordField = function(config) {
	var self = this;
	
	uwm.property.PasswordField.superclass.constructor.call(this, Ext.apply(this, {
		listeners: {
			"change": function(field, newValue, oldValue) {
				self.fieldChanged(field, newValue, oldValue);
			}
		},
		inputType: "password"
	}, config));
	
	this.toolTipText = config.toolTip;
	
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.PasswordField, Ext.form.TextField);

uwm.property.PasswordField.prototype.render = function(container, position) {
	uwm.property.PasswordField.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip({
			target: container,
			html: this.toolTipText
		});
	}
}

uwm.property.PasswordField.prototype.fieldChanged = function(field, newValue, oldValue) {
	var tmp = new Object();
	tmp[this.getName()] = newValue;
	
	this.modelNode.changeProperties(tmp);
}
