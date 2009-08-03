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
Ext.namespace("uwm.ui");

/**
 * @class The language selection listbox.
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.ui.LanguageListBox = Ext.extend(Ext.form.ComboBox, {
    initComponent:function() {
	
		var data = uwm.Config.languages;
 
		Ext.apply(this, {
			fieldLabel: uwm.Dict.translate('Language'),
			forceSelection: 'true',
			editable: 'false',
			name: 'Language',
			store: new Ext.data.ArrayStore({
				id: 0,
				fields: [
					'key',
					'val'
				],
				data: data
			}),
			valueField: 'key',
			displayField: 'val',
			mode: 'local',
			editable: false,
			triggerAction: 'all'
		});
	
        uwm.ui.LanguageListBox.superclass.initComponent.call(this);
 
		this.setValue(data[0][0]);
    }
});