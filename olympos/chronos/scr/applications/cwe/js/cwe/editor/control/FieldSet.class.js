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
Ext.namespace("cwe.editor.control");

/**
 * @class A FieldSet customized for this application.
 * 
 * @extends Ext.form.FieldSet
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.FieldSet = function(config) {
};

cwe.editor.control.FieldSet = Ext.extend(Ext.form.FieldSet, {
	initComponent : function() {
		var self = this;
		
		Ext.apply(this, {
		    autoHeight : true,
		    width : 830
		});
		
		cwe.editor.control.FieldSet.superclass.initComponent.apply(this, arguments);
	}
});
