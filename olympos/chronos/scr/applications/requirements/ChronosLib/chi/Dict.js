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
 * @param {String} englishText The english text to translate.
 * @return {String} The translated text, if a translation exists. English text otherwise.
 */
chi.Dict.translate = function() {
	strword = arguments[0];
	
	try {
		strresult = chi.Dict.voc[strword][chi.Session.getInstance().getLang()];
		if (!strresult) {
			strresult = strword;
		}
	} 
	catch (e) {
		strresult = strword;
	}
	
	return strresult;
}
