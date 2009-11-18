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
 * @class A trigger field that is able to remove itself from {cwl.form.ExtendableFieldSet}.
 * 
 * @extends Ext.form.TriggerField
 * @constructor
 * @param {Object} config Configuraton of this field.
 * @config {cwl.form.ExtendableFieldSet} fieldSet This containing field set.
 */
cwl.form.DeleteField = function(config) {
	this.fieldSet = config.fieldSet;

	cwl.form.DeleteField.superclass.constructor.call(this, Ext.apply(this, {
		triggerClass: 'trigger-delete',
		allowBlank: false
	}, config));

	this.onTriggerClick = function(e) {
		this.fieldSet.remove(this);
		this.fieldSet.doLayout();
	};
}

Ext.extend(cwl.form.DeleteField, Ext.form.TriggerField);
