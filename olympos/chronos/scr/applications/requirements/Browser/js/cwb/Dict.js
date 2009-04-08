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
Ext.namespace("cwb.Dict");
 
/**
 * List of all strings and translations.
 * 
 * @type Array
 */
cwb.Dict.voc = {
	'Select a model...'	: {'de':"Modell auswählen..."},
	'Package weight'	: {'de':"Paketgewicht"},
	'Package tree'		: {'de':"Paketbaum"},
	'Object information'	: {'de':"Objektinformationen"},
	'Error'				: {'de':"Fehler"},
	'Please select a model.':	{'de':"Bitte wählen Sie ein Modell aus."},
	'Loading'			: {'de':"Lädt"},
	'Loading report...'	: {'de':"Lädt Report..."},
	'Content'			: {'de':"Inhalt"},
	'Left-click to enter a package or object, right-click to leave it.'	: {'de':"Linksklick auf ein Paket um es zu betrachten, Rechtsklick um es zu verlassen."},
	'Click on an object to see its children.'	: {'de':"Klick auf ein Objekt zeigt dessen Kinder."}
		
}


/**
 * Translates a string to the currently set language.
 * 
 * @param {String} englishText The english text to translate.
 * @return {String} The translated text, if a translation exists. English text otherwise.
 */
cwb.Dict.translate = function(){
	strword=arguments[0];

	try {
		strresult = cwb.Dict.voc[strword][cwb.Session.getInstance().getLang()];
		if(!strresult){strresult = strword;}
	}catch(e){
		strresult = strword;
	}

	return strresult;
}
