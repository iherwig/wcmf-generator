/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.modelgrid");

/**
 * @class A dummy form field displaying its value uneditable in a RowEditor.
 * 
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.modelgrid.DummyField = function(config) {
};

cwe.modelgrid.DummyField = Ext.extend(Ext.form.Field, {
	initComponent : function() {
		Ext.apply(this, {
			autoCreate : {
				tag : "div",
				style: "max-height: 64px; overflow: hidden;"
			}
		});
		
		cwe.modelgrid.DummyField.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Sets the value of this form field.
 * 
 * @param {Mixed}
 *            value The new value of this form field.
 */
cwe.modelgrid.DummyField.prototype.setValue = function(value) {
	cwe.modelgrid.DummyField.superclass.setValue.call(this, value);
	if (this.rendered) {
		while (this.el.dom.firstChild) {
			this.el.dom.removeChild(this.el.dom.firstChild);
		}

		this.el.insertHtml("afterBegin", value);
	}
};
