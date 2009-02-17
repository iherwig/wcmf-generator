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
 * @class A date field for use in Property View.
 * 
 * @extends Ext.form.DateField
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.DateField = function(config) {
	var self = this;

	uwm.property.DateField.superclass.constructor.call(this, Ext.apply(this, {
		listeners : {
			"change" : function(field, newValue, oldValue) {
				self.fieldChanged(field, newValue, oldValue);
			},
			"beforedestroy" : function(field) {
				self.handleDestroy(field);
			}
		},
		format :"d.m.Y"
	}, config));

	this.toolTipText = config.toolTip;
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.DateField, Ext.form.DateField);

uwm.property.DateField.prototype.render = function(container, position) {
	uwm.property.DateField.superclass.render.apply(this, arguments);

	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
			target :container,
			html :this.toolTipText
		});
	}
}

uwm.property.DateField.prototype.fieldChanged = function(field, newValue,
		oldValue) {
	this.persistValue(newValue);
}

uwm.property.DateField.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.DateField.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
	var tmp = new Object();
	tmp[this.getName()] = newValue.format("Y-m-d");

	this.modelNode.changeProperties(tmp);
}