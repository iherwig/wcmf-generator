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
Ext.namespace("uwm.i18n");

/**
 * Panel for translating ModelNodes.
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.i18n.TranslationPanel = Ext.extend(Ext.Panel, {

	initComponent: function() {
		var self = this;

		// select the first language that is not the user language per default
		var loc = uwm.i18n.Localization.getInstance();
		this.language = loc.getUserLanguage();
		var languages = loc.getAllLanguages();
		for (var i=0; i<languages.length; i++) {
			if (languages[i][0] != this.language) {
				this.language = languages[i][0];
				break;
			}
		}
		
		this.currentOid = null;
		this.isLocked = null;
		this.form = null;
		
		this.languageListBox = new uwm.i18n.LanguageListBox({
			includeUserLanguage: false,
			hideLabel: true,
			width: 200,
			listeners: {
				"select": function(field, record, index) {
					self.setLanguage(self.languageListBox.getLanguageFromRecord(record));
				}
			}
		});
		this.languageListBox.setValue(this.language);
		
		Ext.apply(this, {
			title: self.getTitleText(),
			tools:[{
				id: 'right',
				qtip: uwm.Dict.translate('Close'),
				handler: function(event, toolEl, panel) {
					uwm.property.PropertyContainer.getInstance().closeTranslationPanel();
				}
			}],
			plugins: [new Ext.ux.GhostBar({
				threshold: 5,
				position: 'top',
				style: {
					overflow: 'visible'
				},
				items: this.languageListBox
			})]
		})
		
		uwm.i18n.TranslationPanel.superclass.initComponent.apply(this, arguments);

		// add listener for property changes of the original object, whose
		// translation is displayed
		uwm.event.EventBroker.getInstance().addListener({
			"changeProperty": function(modelObject, values) {
				self.handleChangePropertyEvent.call(self, modelObject, values);
			}
		});
	}
})

/**
 * Load the translation of a uwm.model.ModelNode and show it's uwm.property.PropertyForm.
 * Call the callback function after completion.
 * @param {String} oid The object id of the ModelNode
 * @param {String} language The translation language
 * @param {Boolean} isLocked Indicates wether the form should be editable or not
 * @param {Function} callback The function to call after completion [optional]
 */
uwm.i18n.TranslationPanel.prototype.showTranslation = function(oid, language, isLocked, callback) {

	this.currentOid = oid;
	this.isLocked = isLocked;
	
	// load translation data
	var uwmClassName = uwm.Util.getUwmClassNameFromOid(oid);
	var translatedNode = uwm.model.ModelContainer.getInstance().createNodeInstance(uwmClassName);
	translatedNode.oid = oid;
	translatedNode.language = language;
	translatedNode.reload(this.displayForm.createDelegate(this, [translatedNode, isLocked, callback]));
}

/**
 * Display a localized uwm.model.ModelNode in it's uwm.property.PropertyForm.
 * Call the callback function after completion.
 * @param {uwm.model.ModelNode} modelNode The node to display
 * @param {Boolean} isLocked Indicates wether the form should be editable or not
 * @param {Function} callback The function to call after completion [optional]
 */
uwm.i18n.TranslationPanel.prototype.displayForm = function(modelNode, isLocked, callback) {
	this.form = modelNode.getModelNodeClass().getPropertyForm(modelNode, isLocked);
	this.form.localizeControls(this.getLanguage());
	this.add(this.form);
	this.lockUntranslatableControls();

	this.doLayout();
	
	modelNode.populatePropertyForm(this.form);
  
	if (callback instanceof Function) {
		callback();
	}
}

uwm.i18n.TranslationPanel.prototype.getTitleText = function() {
	var languageName = uwm.i18n.Localization.getInstance().getLanguageName(this.language);
	return uwm.Dict.translate('Translation')+" ["+languageName+"]";
}

/**
 * Make all controls that have a non-translatable input type read-only.
 * Set listeners for property changes on these controls to make sure that
 * they always display the correct values.
 */
uwm.i18n.TranslationPanel.prototype.lockUntranslatableControls = function() {
	if (this.form != null) {
		for (var i=0; i<this.form.items.getCount(); i++) {
			var curItem = this.form.items.get(i);
			if (curItem instanceof uwm.property.ComboBox ||
				curItem instanceof uwm.property.NumberField || 
				curItem instanceof uwm.property.StaticComboBox ||
				curItem instanceof uwm.property.Radio ||
				curItem instanceof uwm.property.PasswordField ||
				curItem instanceof uwm.property.DateField ||
				curItem.getName() == 'Alias') {
				curItem.setDisabled(true);
			}
		}
	}
}

/**
 * Handle a property change of the original object whose translation is shown
 */
uwm.i18n.TranslationPanel.prototype.handleChangePropertyEvent = function(modelObject, oldValues) {
	if (this.form != null) {
		for (var curProp in oldValues) {
			var newValue = modelObject.getProperty(curProp);
			// find the control for the current curPropibute
			for (var i=0; i<this.form.items.getCount(); i++) {
				var curItem = this.form.items.get(i);
				if (curItem.getName() == curProp && curItem.disabled && curItem.getValue() != newValue) {
					if (curItem instanceof uwm.property.ComboBox && curItem.getStore().getCount() == 0) {
						// load the data, in order to allow proper synchronization
						curItem.getStore().load({
							callback: function(r, options, success) {
								if (success && curItem.findRecord(curItem.valueField, newValue)) {
									curItem.setValue(newValue);
								}
							}
						});
					}
					else {
						curItem.setValue(newValue);
					}
					break;
				}
			}
		}
	}
}

/**
 * Store the selected language.
 */
uwm.i18n.TranslationPanel.prototype.setLanguage = function(language) {
	if (language != this.language) {
		this.language = language;
		this.setTitle(this.getTitleText());
		
		var container = uwm.property.PropertyContainer.getInstance();
		container.hideForm(this);
		container.showLoadMask();
		this.showTranslation(this.currentOid, this.language, this.isLocked, 
			container.hideMask.createDelegate(container));
	}
}

/**
 * Get the selected translation language.
 * @return {String} The language code
 */
uwm.i18n.TranslationPanel.prototype.getLanguage = function() {
	return this.language;
}

