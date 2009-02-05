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

uwm.property.TextField = function(config) {
	var self = this;

	var cls = config.readOnly ? "uwm-field-readOnly" : null;

	uwm.property.TextField.superclass.constructor.call(this, Ext.apply(this, {
		listeners : {
			"change" : function(field, newValue, oldValue) {
				self.fieldChanged(field, newValue, oldValue);
			},
			"beforedestroy" : function(field) {
				self.handleDestroy(field);
			}
		},
		cls :cls
	}, config));

	this.toolTipText = config.toolTip;

	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.TextField, Ext.form.TextField);

uwm.property.TextField.prototype.render = function(container, position) {
	uwm.property.TextField.superclass.render.apply(this, arguments);

	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
			target :container,
			html :this.toolTipText
		});
	}
}

uwm.property.TextField.prototype.fieldChanged = function(field, newValue,
		oldValue) {
	this.persistValue(newValue);
}

uwm.property.TextField.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.TextField.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
	var tmp = new Object();
	tmp[this.getName()] = newValue;

	this.modelNode.changeProperties(tmp);
}
