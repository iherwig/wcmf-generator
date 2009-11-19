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
 * @class A button that adds new fields to {cwl.form.ExtendableFieldSet}.
 * 
 * @extends Ext.Button
 * @constructor
 * @param {Object} config Configuraton of this field.
 * @config {cwl.form.ExtendableFieldSet} fieldSet This containing field set.
 */
cwl.form.AddButton = function(config) {
	this.fieldSet = config.fieldSet;

	cwl.form.AddButton.superclass.constructor.call(this, Ext.apply(this, {
		iconCls: 'trigger-create',
		width: 50,
		handler: function(btn, e) {
			var newField = new cwl.form.DeleteField({
				fieldSet: btn.fieldSet
			});
			btn.fieldSet.add(newField);
			btn.fieldSet.doLayout();
		}
	}, config));
}

Ext.extend(cwl.form.AddButton, Ext.Button);
