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
}

/**
 * Get the model language. This is the default language of
 * all model data.
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getModelLanguage = function() {
	return uwm.Config.defaultLanguage;
}

/**
 * Get the language that the user selected on login. The application
 * and all model data that is not explicitly translated should be localized
 * in this language. 
 * @return {String} The language code
 */
uwm.i18n.Localization.prototype.getUserLanguage = function() {
	return uwm.Session.getInstance().getLang();
}

/**
 * Get the name of a given language.
 * @param {String} The language code
 * @return {String} The language name
 */
uwm.i18n.Localization.prototype.getLanguageName = function(language) {
	var languages = this.getAllLanguages();
	for (var i=0; i<languages.length; i++) {
		if (languages[i][0] == language) {
			return languages[i][1];
		}
	}
	return '';
}

/**
 * Get all languages that this application supports.
 * @return {Array} An array of arrays where the first item is the language
 * code and the second item is the language name
 */
uwm.i18n.Localization.prototype.getAllLanguages = function() {
	return uwm.Config.languages;
}

uwm.i18n.Localization.getInstance = function() {
	if (!uwm.i18n.Localization.instance) {
		uwm.i18n.Localization.instance = new uwm.i18n.Localization();
	}
	
	return uwm.i18n.Localization.instance;
}
