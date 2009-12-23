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
Ext.namespace("chi.Dict");

/**
 * Translates a string to the currently set language.
 * 
 * @param {String}
 *            englishText The English text to translate.
 * @return {String} The translated text, if a translation exists. English text
 *         otherwise.
 */
chi.Dict.translate = function(englishText) {
	var selectedLang = chi.Session.getInstance().getLang();

	var params = chi.Dict.translate.arguments;

	var result = chi.Dict.insertParams(englishText, params);

	var entry = chi.Dict.voc[englishText];
	if (entry) {
		var translation = entry[selectedLang];
		if (translation) {
			result = chi.Dict.insertParams(translation, params);
		}
	}

	return result;
};

chi.Dict.insertParams = function(text, params) {
	for ( var i = 1; i < params.length; i++) {
		var regExpStr = "\\$\\{" + i + "}";
		var regExp = new RegExp(regExpStr, "g");
		text = text.replace(regExp, params[i]);
	}

	return text;
};
