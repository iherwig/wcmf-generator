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
Ext.namespace("uwm.i18n");

/**
 * @class The language selection listbox.
 * 
 * @extends Ext.form.ComboBox
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.i18n.LanguageListBox = Ext.extend(Ext.form.ComboBox, {
		/**
		 * @cfg {Array} languages
		 * 
		 * An array of arrays where the first item is the language
		 * code and the second item is the language name
		 */
		languages: [],

		/**
		 * @cfg {Boolean} includeDefault
		 * 
		 * Indicates if the user language should be included or not.
		 * Defaults to true.
		 */
		includeUserLanguage: true,

		initComponent: function() {
		
			// copy languages into listbox data
			var languages = this.languages;
			var data = new Array();
			for (var i=0; i<languages.length; i++) {
				data[i] = new Array();
				data[i][0] = languages[i][0];
				data[i][1] = languages[i][1];
				if (data[i][0] == uwm.i18n.Localization.getInstance().getDefaultModelLanguage()) {
					data[i][1] += ' [Default]';
				}
			}

			// remove the user language if requested
			var loc = uwm.i18n.Localization.getInstance();
			if (!this.includeUserLanguage) {
				for (var i=0; i<data.length; i++) {
					if (data[i][0] == loc.getModelLanguage()) {
						data.splice(i, 1);
					}
				}
			}
			
			Ext.apply(this, {
				fieldLabel: uwm.Dict.translate('Language'),
				// removed because it caused an exception, when calling 
				// an undefined listener function in extjs: p.fireFn is undefined
				/*forceSelection: 'true',*/
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
		
			uwm.i18n.LanguageListBox.superclass.initComponent.call(this);
			if (data[0]) {
				this.setValue(data[0][0]);
			}
		}
	}
);

uwm.i18n.LanguageListBox.prototype.getLanguageFromRecord = function(record) {
	return record.get('key');
}