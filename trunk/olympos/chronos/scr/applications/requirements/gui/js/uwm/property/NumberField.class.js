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
 * @class A NumberField for use in Property View
 * 
 * @extends Ext.form.NumberField
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.NumberField = function(config) {
	var self = this;

	var cls = config.readOnly ? "uwm-field-readOnly" : null;

	uwm.property.NumberField.superclass.constructor.call(this, Ext.apply(this, {
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

Ext.extend(uwm.property.NumberField, Ext.form.NumberField);

uwm.property.NumberField.prototype.render = function(container, position) {
	uwm.property.NumberField.superclass.render.apply(this, arguments);

	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
			target :container,
			html :this.toolTipText
		});
	}
}

uwm.property.NumberField.prototype.fieldChanged = function(field, newValue,
		oldValue) {
	this.persistValue(newValue);
}

uwm.property.NumberField.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.NumberField.prototype.persistValue = function(newValue) {
	// persist only valid values
	if (this.validateValue(newValue)) {
		this.originalValue = newValue;
		
		var tmp = new Object();
		tmp[this.getName()] = newValue;

		this.modelNode.changeProperties(tmp);
	}
}
