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
 * @class A dynamic ComboBox (loading its contents via JSON on request) for use in Property View.
 * This class extends uwm.property.ComboBox so that not only values from the list may be chosen,
 * but also new values may be entered. As a result this ComboBox does not store the id of the
 * selected value, but the displayed value itself.
 * 
 * @extends uwm.property.ComboBox
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.EditableComboBox = function(config){
	var self = this;
	
	uwm.property.EditableComboBox.superclass.constructor.call(this, Ext.apply(this, {
		editable: true,
		forceSelection: false,
		typeAhead: false
	}, config));
}

Ext.extend(uwm.property.EditableComboBox, uwm.property.ComboBox);

uwm.property.EditableComboBox.prototype.persistValue = function(newValue) {
	// get the value for the key
	var records = this.getStore().query('key', newValue);
	if (records.getCount() > 0) {
		newValue = records.first().data['val'];
	}
	
	uwm.property.EditableComboBox.superclass.persistValue.call(this, newValue);
}