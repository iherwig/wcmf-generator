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
Ext.namespace("uwm.ui");

uwm.ui.TextField = function(config) {
	var self = this;
	
	var cls = config.readOnly ? "uwm-field-readOnly" : null;
	
	uwm.ui.TextField.superclass.constructor.call(this, Ext.apply(this, {
		listeners: {
			"change": function(field, newValue, oldValue) {
				self.fieldChanged(field, newValue, oldValue);
			}
		},
		cls: cls		
	}, config));
	
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.ui.TextField, Ext.form.TextField);

uwm.ui.TextField.prototype.fieldChanged = function(field, newValue, oldValue) {
	var tmp = new Object();
	tmp[this.getName()] = newValue;
	
	this.modelNode.changeProperties(tmp);
}
