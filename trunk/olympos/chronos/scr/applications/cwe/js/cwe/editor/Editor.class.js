/*
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwe.editor");

/**
 * @class Abstract base class for all Property forms.
 *
 * @extends Ext.form.FormPanel
 * @see cwe.editor.PropertyContainer
 * @constructor
 * @param {Object} config The configuration object.
 */
cwe.editor.Editor = function() {
}

cwe.editor.Editor = Ext.extend(Ext.form.FormPanel, {
	initComponent: function() {
		Ext.apply(this, {
			iconCls: this.modelNodeClass + "Icon16x16",
			title: "Name 123123",
			frame: true,
			autoScroll: true,
			labelAlign: "left",
			labelWidth: 90,
			tbar: [new Ext.Toolbar.Button({
				text: chi.Dict.translate("Save"),
				iconCls: "saveButton"
			}), new Ext.Toolbar.Button({
				text: chi.Dict.translate("Cancel"),
				iconCls: "cancelButton"
			})],
			defaults: {
				width: 220
			},
			defaultType: 'textfield',
			items: [{
				fieldLabel: "Name"
			}, {
				fieldLabel: "Notes"
			}, {
				fieldLabel: "ValueAmount"
			}],
			msgTarget: "side"
		})
		
		cwe.editor.Editor.superclass.initComponent.apply(this, arguments);
	}
})
