/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.property");

/**
 * @class Abstract base class for all Property forms.
 * 
 * @extends Ext.form.FormPanel
 * @see uwm.property.PropertyContainer
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.property.PropertyForm = function() {
}

uwm.property.PropertyForm = Ext.extend(Ext.form.FormPanel, {
	initComponent : function() {
		Ext.apply(this, {
			labelWidth: 90,
			bodyStyle: "padding:5px;",
			bodyCssClass: "x-panel-mc",
			labelAlign: "top",
			autoScroll: false,
			autoHeight: true,
			border: false,
			defaults: {
				width: "auto"
			},
			msgTarget: "side",
			plugins: [ new Ext.ux.form.FieldAutoExpand( {
				labelOffsetFix : 90
			}) ]
		})

		uwm.property.PropertyForm.superclass.initComponent.apply(this, arguments);
		
		this.localizeControls(uwm.i18n.Localization.getInstance().getUserLanguage());
	}
})

/**
 * Localize any controls that are included in this form.
 * Controls are tested for implementation of a setLanguage method.
 * @param language The language code for localization
 */
uwm.property.PropertyForm.prototype.localizeControls = function(language) {
	for (var i=0; i<this.items.getCount(); i++) {
		var curItem = this.items.get(i);
		if (curItem.setLanguage instanceof Function) {
			curItem.setLanguage(language);
		}
	}
}