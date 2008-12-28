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

uwm.property.Radio = function(config) {
	var self = this;
	
	uwm.property.Radio.superclass.constructor.call(this, Ext.apply(this, {
		listeners: {
			"check": function(field, checked) {
				self.fieldChecked(field, checked);
			}
		}
	}, config));
	
	this.toolTipText = config.toolTip;
	this.value = config.value;
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.property.Radio, Ext.form.Radio);

uwm.property.Radio.prototype.render = function(container, position) {
	uwm.property.Radio.superclass.render.apply(this, arguments);
	
	if (this.toolTipText) {
		this.toolTip = new Ext.ToolTip({
			target: container,
			html: this.toolTipText
		});
	}
}

uwm.property.Radio.prototype.fieldChecked = function(field, checked) {
	if (checked) {
		var tmp = new Object();
		tmp[this.getName()] = this.value;
		
		this.modelNode.changeProperties(tmp);
	}
}
