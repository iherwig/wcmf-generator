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
 * Localization class.
 */
uwm.i18n.Localization = function() {
	/**
	 * @private {Array} modelLanguages
	 * 
	 * An array of arrays where the first item is the language
	 * code and the second item is the language name
	 */
	this.modelLanguages = new Array();
	
	/**
	 * @private {String} curTranslationLanguage
	 * 
	 * The code of the currently selected language for translations
	 */
	this.curTranslationLanguage = null;
	
	/**
	 * @private {String} curModelLanguage
	 * 
	 * The code of the currently selected language for viewing the model
	 */
	this.curModelLanguage = null;
}

/**
 * Get the model language. This is the default language of
 * all model data.
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getDefaultModelLanguage = function() {
	return uwm.Config.defaultLanguage;
}

/**
 * Get the language that the user selected on login. All model data that 
 * is not explicitly translated should be localized in this language. 
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getUserLanguage = function() {
	if (this.curModelLanguage == null) {
		this.curModelLanguage = this.getDefaultModelLanguage();
	}
	return this.curModelLanguage;
}

/**
 * Get all languages that are available for translating the model
 * @return {Array} An array of arrays where the first item is the language
 * code and the second item is the language name
 */
uwm.i18n.Localization.prototype.getAllModelLanguages = function() {
	return this.modelLanguages;
}

/**
 * Get the language that the user selected on login. The application
 * should be localized in this language. 
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getUserInterfaceLanguage = function() {
	return uwm.Session.getInstance().getLang();
}

/**
 * Get all languages that the user interface supports.
 * @return {Array} An array of arrays where the first item is the language
 * code and the second item is the language name
 */
uwm.i18n.Localization.prototype.getAllUserInterfaceLanguages = function() {
	return uwm.Config.languages;
}

/**
 * Get the language that the user is currently using for translating model elements.
 * @param {String} The language code
 */
uwm.i18n.Localization.prototype.setTranslationLanguage = function(language) {
	if (language != this.curTranslationLanguage) {
		this.curTranslationLanguage = language;
		uwm.event.EventBroker.getInstance().fireEvent("changeTranslationLanguage", language);
	}
}

/**
 * Get the language that the user is currently using for translating model elements.
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getTranslationLanguage = function() {
	if (this.curTranslationLanguage == null) {
		this.setTranslationLanguage(this.getDefaultTranslationLanguage());
	}
	return this.curTranslationLanguage;
}

/**
 * Get the default language for translations. It is the first one from the
 * list of model languages that is not equal to the current modelling language.
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getDefaultTranslationLanguage = function() {
	var curModelLanguage = this.getUserLanguage();
	var languages = this.getAllModelLanguages();
	for (var i=0; i<languages.length; i++) {
		if (languages[i][0] != curModelLanguage) {
			return languages[i][0];
		}
	}
	if (languages[0]) {
		return languages[0][0];
	}
	return '';
}

/**
 * Get the name of a given language.
 * @param {String} The language code
 * @param {Array} A language list to select from (@see uwm.i18n.Localization.getAllModelLanguages)
 * @return {String} The language name
 */
uwm.i18n.Localization.prototype.getLanguageName = function(language, languages) {
	for (var i=0; i<languages.length; i++) {
		if (languages[i][0] == language) {
			return languages[i][1];
		}
	}
	return '';
}

/**
 * Load all languages that this application supports for translation.
 * @param callback The function to call on complete
 */
uwm.i18n.Localization.prototype.loadModelLanguages = function(callback) {
	var self = this;
		
	uwm.persistency.Persistency.getInstance().list('Language', false, this.getUserLanguage(),
		function(options, data) {
			for (var i = 0; i < data.objects.length; i++) {
				var currObj = data.objects[i];
				self.modelLanguages.push([currObj.values[1].code, currObj.values[1].Name]);
			}
			if (callback instanceof Function) {
				callback();
			}
		}, function(options, data, errorMsg) {
			uwm.Util.showMessage("Unable to load languages", data.errorMsg, uwm.Util.messageType.ERROR);
		}
	)
}

uwm.i18n.Localization.getInstance = function() {
	if (!uwm.i18n.Localization.instance) {
		uwm.i18n.Localization.instance = new uwm.i18n.Localization();
	}
	
	return uwm.i18n.Localization.instance;
}
