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
Ext.namespace("cwl.form");

/**
 * @class A field set with the possibility to dynamically add/remove fields.
 * The field set initially contains one text field and an {cwl.form.AddButton}. 
 * All added fields are instances of {cwl.form.DeleteField}, which means the 
 * can be removed by the user.
 * 
 * @extends Ext.form.FieldSet
 * @constructor
 * @param {Object} config Configuraton of this field set.
 */
cwl.form.ExtendableFieldSet = function(config) {

	var self = this;
	this.fields = new Ext.util.MixedCollection();
	this.fields.add(new Ext.form.TextField({
		allowBlank: false,
		listeners: {
			'change': self.fieldChanged.createDelegate(self)
		}
	}));

	cwl.form.ExtendableFieldSet.superclass.constructor.call(this, Ext.apply(this, {
		checkboxToggle: false,
		collapsible: false,
		autoHeight: true,
		defaults: {width: 500},
		defaultType: 'textfield',
		collapsed: false,
		items: [
			this.fields.first()
		],
		buttons: [new cwl.form.AddButton({
			fieldSet: this,
			text: 'Add'
		})]
	}, config));
	
	this.addEvents({
		'fieldAdded':true,
		'fieldChanged':true,
		'fieldRemoved':true
	});
	
	this.on('add', function(container, component, index) {
		if (component instanceof Ext.form.TextField) {
			component.on('change', self.fieldChanged.createDelegate(self));
			self.fields.add(component);
			self.fireEvent('fieldAdded', component);
		}
	});
	this.on('remove', function(container, component) {
		if (component instanceof Ext.form.TextField) {
			self.fields.remove(component);
			self.fireEvent('fieldRemoved', component);
		}
	});
}

Ext.extend(cwl.form.ExtendableFieldSet, Ext.form.FieldSet);

/**
 * Called, when a field value changes
 */
cwl.form.ExtendableFieldSet.prototype.fieldChanged = function(field, newValue, oldValue) {
	if (field.validate() && newValue != oldValue) {
		this.fireEvent('fieldChanged', field, newValue, oldValue);
	}
}

/**
 * Get the number of fields in this field set.
 * @return The number of fields
 */
cwl.form.ExtendableFieldSet.prototype.getNumberOfFields = function() {
	return this.fields.length;
}

/**
 * Get the id of a field by its index (zero based).
 * @param index The index of the field (0 <= index < number of fields-1)
 * @return The id of the field
 */
cwl.form.ExtendableFieldSet.prototype.getFieldId = function(index) {
	var field = this.fields.get(index);
	if (field) {
		return field.getId();
	}
}

/**
 * Add a {cwl.form.DeleteField} instance to the field set.
 * @return The id of the field
 */
cwl.form.ExtendableFieldSet.prototype.addField = function() {
	var newField = new cwl.form.DeleteField({
		fieldSet: this
	});
	this.add(newField);
	this.doLayout();
	newField.focus();
	return newField.getId();
}

/**
 * Set the value of a field.
 * @param value The value for the field [maybe null, for an empty field]
 */
cwl.form.ExtendableFieldSet.prototype.setFieldValue = function(id, value) {
	var field = this.findById(id);
	if (field) {
		field.setValue(value);
	}
}

