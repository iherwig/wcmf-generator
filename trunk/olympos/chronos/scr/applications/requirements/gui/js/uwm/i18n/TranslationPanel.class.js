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

		this.language = uwm.i18n.Localization.getInstance().getUserLanguage();
		this.currentOid = null;
		this.isLocked = null;
		
		Ext.apply(this, {
			title: self.getTitleText(),
			tools:[{
				id: 'right',
				qtip: uwm.Dict.translate('Close'),
				handler: function(event, toolEl, panel) {
					uwm.property.PropertyContainer.getInstance().closeTranslationPanel();
				}
			}]
		})
		
		uwm.i18n.TranslationPanel.superclass.initComponent.apply(this, arguments);
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
	var form = modelNode.getModelNodeClass().getPropertyForm(modelNode, isLocked);
	this.add(form);
	
	// add the translation tools
	var self = this;
	this.languageListBox = new uwm.i18n.LanguageListBox({
		hideLabel: true,
		width: 200,
		listeners: {
			"select": function(field, record, index) {
				self.setLanguage(self.languageListBox.getLanguageFromRecord(record));
			}
		}
	});
	this.languageListBox.setValue(this.language);
		
	form.add({
		xtype: 'fieldset',
		title: uwm.Dict.translate('Language'),
		autoHeight: true,
		autoWidth: true,
		items: this.languageListBox
	});
	
	this.doLayout();
	
	modelNode.populatePropertyForm(form);
  
	if (callback instanceof Function) {
		callback();
	}
}

uwm.i18n.TranslationPanel.prototype.getTitleText = function() {
	var languageName = uwm.i18n.Localization.getInstance().getLanguageName(this.language);
	return uwm.Dict.translate('Translation')+" ["+languageName+"]";
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
uwm.i18n.TranslationPanel.prototype.getSelectedLanguage = function() {
	return this.language;
}

