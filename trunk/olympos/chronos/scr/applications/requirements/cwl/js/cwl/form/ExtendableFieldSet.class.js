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
 * 
 * @extends Ext.form.FieldSet
 * @constructor
 * @param {Object} config Configuraton of this field set.
 */
cwl.form.ExtendableFieldSet = function(config) {
	var self = this;

	cwl.form.ExtendableFieldSet.superclass.constructor.call(this, Ext.apply(this, {
		checkboxToggle: false,
		collapsible: false,
		autoHeight: true,
		defaults: {width: 500},
		defaultType: 'textfield',
		collapsed: false,
		items: [{
			name: 'field1',
			allowBlank: false
		}],
		buttons: [new cwl.form.AddButton({
			fieldSet: this,
			text: 'Add'
		})]
	}, config));
}

Ext.extend(cwl.form.ExtendableFieldSet, Ext.form.FieldSet);
