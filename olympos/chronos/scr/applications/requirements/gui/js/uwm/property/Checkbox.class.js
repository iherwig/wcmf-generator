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
 * @class A checkbox for use in Property View.
 * 
 * @extends Ext.form.Checkbox
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.Checkbox = function(config) {
	var self = this;

	uwm.property.Checkbox.superclass.constructor.call(this, Ext.apply(this, {
		listeners : {
			"check" : function(field, checked) {
				self.fieldChecked(field, checked);
			},
			"beforedestroy" : function(field) {
				self.handleDestroy(field);
			}
		}
	}, config));

	this.toolTipText = config.toolTip;

	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.Checkbox, Ext.form.Checkbox);

uwm.property.Checkbox.prototype.render = function(container, position) {
	uwm.property.Checkbox.superclass.render.apply(this, arguments);

	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip( {
			target :container,
			html :this.toolTipText
		});
	}
}

uwm.property.Checkbox.prototype.fieldChecked = function(field, checked) {
	if (field.originalValue != checked) {
		this.persistValue(checked);
	}
}

uwm.property.Checkbox.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.Checkbox.prototype.persistValue = function(checked) {
	this.originalValue = checked;	
	var tmp = new Object();	
	tmp[this.getName()] = checked ? "true" : "false";
	this.modelNode.changeProperties(tmp);
}