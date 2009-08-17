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
 * @class Base class for uwm ComboBoxes
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.ComboBoxBase = function(config) {
	uwm.property.ComboBoxBase.superclass.constructor.call(this, Ext.apply(this, {
	}, config));
}

Ext.extend(uwm.property.ComboBoxBase, Ext.form.ComboBox);

/**
 * Override findRecord method from Ext.form.ComboBox, to avoid NPEs.
 * Sometimes the store is null, when you try to open a uwm.property.ComboBox 
 * by clicking the pulldown button and a (different) uwm.property.ComboBox instance 
 * was opened before.
 * In this case the call stack is the following (all in ext-all-debug.js):
 * mimicBlur() -> triggerBlur() -> onBlur() -> beforeBlur() -> findRecord()
 */
uwm.property.ComboBoxBase.prototype.findRecord = function(prop, value) {
	// return immediatly if store is null (doesn't change visible functionality)
	if (this.store == null)
		return null;
		
	var record;
	if(this.store.getCount() > 0) {
		this.store.each(function(r) {
			if(r.data[prop] == value) {
				record = r;
				return false;
			}
		});
	}
	return record;
}
