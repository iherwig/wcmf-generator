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
 * @class A trigger field that adds new fields to {cwl.form.ExtendableFieldSet}.
 * 
 * @extends Ext.form.TriggerField
 * @constructor
 * @param {Object} config Configuraton of this field.
 * @config {cwl.form.ExtendableFieldSet} fieldSet This containing field set.
 */
cwl.form.AddField = function(config) {
	this.fieldSet = config.fieldSet;

	cwl.form.AddField.superclass.constructor.call(this, Ext.apply(this, {
		triggerClass: 'trigger-create',
		allowBlank: false
	}, config));

	this.onTriggerClick = function(e) {
		if (this.validate()) {
			var newField = new cwl.form.DeleteField({
				fieldSet: this.fieldSet,
				value: this.getValue(),
				width: this.getWidth()
			});
			this.fieldSet.insert(this.fieldSet.items.indexOf(this), newField);
			this.fieldSet.doLayout();
			this.reset();
		}
	};
}

Ext.extend(cwl.form.AddField, Ext.form.TriggerField);
