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
 * @class A dynamic ComboboxMult (loading its contents via JSON on request) for use in Property View.
 * 
 * @extends Ext.ux.Multiselect
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.ComboboxMult = function(config){
    var self = this;
	
    uwm.property.ComboboxMult.superclass.constructor.call(this, Ext.apply(this, {
        store: new Ext.data.Store({
			proxy: new uwm.property.ComboBoxProxyMult({
				listType: config.listType
			})
		}),	

		fieldLabel		  : config.fieldLabel,
		listType		  : config.listType,
        valueField		  : 'key',
        displayField	  : 'val',		
		dataFields        :  ['key', 'val'], 
		data              :  [['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five']],
		width			  :  520 ,
		height            :  150,

		listeners: {
            "change": function(field, newValue, oldValue){
                self.fieldChanged(field, newValue, oldValue);
            },
            "beforedestroy": function(field) {
            	self.handleDestroy(field);
            }
        },	
    }, config));
	
    this.toolTipText = config.toolTip;
    
    this.modelNode = config.modelNode;
}
Ext.extend(uwm.property.ComboboxMult, Ext.ux.Multiselect );

uwm.property.ComboboxMult.prototype.render = function(container, position){
    uwm.property.ComboboxMult.superclass.render.apply(this, arguments);
    
    if (this.toolTipText) {
        this.toolTip = new Ext.ToolTip({
            target: container,
            html: this.toolTipText
        });
    }
}

uwm.property.ComboboxMult.prototype.fieldChanged = function(field, newValue, oldValue){
	this.persistValue(newValue);
}

uwm.property.ComboboxMult.prototype.handleDestroy = function(field) {
	if (this.isDirty()) {
		this.persistValue(this.getValue());
	}
}

uwm.property.ComboboxMult.prototype.persistValue = function(newValue) {
	this.originalValue = newValue;
	
    var tmp = new Object();
    tmp[this.getName()] = newValue;
    
    this.modelNode.changeProperties(tmp);
}