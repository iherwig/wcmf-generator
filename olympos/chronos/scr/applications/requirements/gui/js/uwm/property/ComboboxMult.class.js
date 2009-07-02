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
 * @class A dynamic ComboboxMult (loading its contents via JSON on request) for use in Property View.
 *
 * @extends Ext.form.MultiSelectField
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.ComboboxMult = function(config) {
	var self = this;
	
	sts = new Ext.data.SimpleStore({
		fields: ['key', 'val'],
		data : [[0,""], ["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"],
		 ["6", "Six"], ["7", "Seven"], ["8", "Eight"], ["9", "oChiBusinessPartner"]]
	});

	uwm.property.ComboboxMult.superclass.constructor.call(this, Ext.apply(this, {
		listeners: {
			"change": function(field, newValue, oldValue) {
				self.fieldChanged(field, newValue, oldValue);
			},
			"beforedestroy": function(field) {
				self.handleDestroy(field);
			}
		},
		
		fieldLabel: config.fieldLabel,
		listType: config.listType,
		store: sts,
		valueField: 'key',
		displayField: 'val',
	}, config));
	
	this.toolTipText = config.toolTip;
	
	this.modelNode = config.modelNode;
}
Ext.extend(uwm.property.ComboboxMult, Ext.form.MultiSelectField);

uwm.property.ComboboxMult.prototype.render = function(container, position) {
	uwm.property.ComboboxMult.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip({
			target: container,
			html: this.toolTipText
		});
	}
}

uwm.property.ComboboxMult.prototype.fieldChanged = function(field, newValue, oldValue) {
	this.persistValue(newValue);
}

uwm.property.ComboboxMult.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.ComboboxMult.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
	var tmp = new Object();
	tmp[this.getName()] = newValue;
	
	this.modelNode.changeProperties(tmp);
}
