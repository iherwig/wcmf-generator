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
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.ComboBox = function(config){
	var self = this;
	
	uwm.property.ComboBox.superclass.constructor.call(this, Ext.apply(this, {
		listeners: {
				"change": function(field, newValue, oldValue){
						self.fieldChanged(field, newValue, oldValue);
				},
				"beforedestroy": function(field) {
					self.handleDestroy(field);
				}
		},
		store: new Ext.data.Store({
			proxy: new uwm.property.ComboBoxProxy({
				listType: config.listType,
				listeners: {
					"beforeload": function(proxy, params) {
						// set the language for the load request
						params.language = self.language;
					}
				}
			})
		}),
		displayField: 'val',
		valueField: 'key',
		mode: "remote",
		triggerAction: 'all',
		editable: false,
	}, config));
	
	this.toolTipText = config.toolTip;
	
	this.modelNode = config.modelNode;
	this.language = null;
}

Ext.extend(uwm.property.ComboBox, uwm.property.ComboBoxBase);

/**
 * Set the language if items should be localized.
 * @param language The language code
 */
uwm.property.ComboBox.prototype.setLanguage = function(language) {
	this.language = language;
}

uwm.property.ComboBox.prototype.render = function(container, position){
	uwm.property.ComboBox.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip({
			target: container,
			html: this.toolTipText
		});
	}
}

uwm.property.ComboBox.prototype.fieldChanged = function(field, newValue, oldValue){
	this.persistValue(newValue);
}

uwm.property.ComboBox.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.ComboBox.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
	var tmp = new Object();
	tmp[this.getName()] = newValue;
	
	this.modelNode.changeProperties(tmp);
}