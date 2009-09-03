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
Ext.namespace("uwm.Dict");
 
/**
 * List of all strings and translations.
 * 
 * @type Array
 */

uwm.Dict.voc = {
	
		'Shows all'			: {'de': 'Zeigt alle'},
		'within selected scope'
							: {'de': 'innerhalb des ausgewählten Bereiches'},
		'Shows all dependencies of a specific object. Use context menu on an object to show it here.' 
							: {'de'	: 'Zeigt alle Abhängigkeiten eines Objekts an. Kontextmenü benutzen.'},
		'Shows all models, packages, and contained objects.' 
							: {'de'	: 'Zeigt alle Modelle, Pakete und enthaltenen Objekte an.'},
		'This tree shows all dependencies of an object. Select an object, right-click and select &quot;Show in hierarchy&quot; to show it here.'
							: {'de': 'Dieser Baum zeigt alle Abhängigkeiten eines Objektes. Objekt auswählen, Rechtsklick und Auswahl &quot;In Hierarchie anzeigen&quot;, um es hier anzuzeigen.'},
		'Shows all objects within selected scope. To select a scope, select the <i>Model Tree</i>, right-click on a Model or Package and select &quot;Select as grid scope&quot;.' 
							: {'de': 'Zeigt alle Objekte innerhalb des ausgewählten Bereiches. Um einen Bereich auszuwählen, <i>Model Tree</i> auswählen, Rechtsklick auf ein Modell or Paket und &quot;Als Gitterbereich wählen&quot;.'},
		'Please wait while your export is prepared ...' 			
							: {'de': 'Bitte warten, Export wird vorbereitet ...'},
		'Persistency layer error'
							: {'de': 'Fehler in Persistenzschicht'},
		'An unspecified error has occured in persistency layer.'			
							: {'de': 'In der Persistenzschicht ist ein undefinierter Fehler aufgetreten.'},
								
		'Goals' 			: {'de': 'Ziele'},
		'Goal' 				: {'de': 'Ziel'},
		'Requirements' 		: {'de': 'Anforderungen'},
		'Requirement' 		: {'de': 'Anforderung'},
		'Features' 			: {'de': 'Fähigkeiten'},
		'Feature' 			: {'de': 'Fahigkeit'},
		'Issues' 			: {'de': 'Probleme'},
		'Issue' 			: {'de': 'Problem'},
		
		'Perspectives'		: {'de': 'Perspektiven'},
		'Properties'  		: {'de': 'Eigenschaften'},
		'Available Content' : {'de': 'Verfügbarer Inhalt'},
		'New Objects' 		: {'de': 'Neue Objekte'},
		'Default' 			: {'de': 'Standard'},
		'Admin' 			: {'de': 'Administrator'},
		'Documentation Viewer' 		: {'de': 'Dokumentation'},
		'Hierarchy Tree' 	: {'de': 'Hierarchiebaum'},
		'Model Tree' 		: {'de': 'Modellbaum'},	 
		'Title' 			: {'de': 'Titel'},
		'Label' 			: {'de': 'Beschriftung'},
		'Priority' 			: {'de': 'Priorität'},
		'Help' 				: {'de': 'Hilfe'},
		'Open' 				: {'de': 'Öffnen'},
		'Name' 				: {'de': 'Name'},
		'Notes' 			: {'de': 'Notiz'},
		'created' 			: {'de': 'erstellt am'},
		'creator' 			: {'de': 'Ersteller'},
		'last_editor' 		: {'de': 'zuletzt geändert von'},
		'modified' 			: {'de': 'geändert am'},
		
		'Show in tree' 			: {'de': 'Im Baum anzeigen'},
		'Show in grid' 			: {'de': 'Im Gitter anzeigen'},
		'Show in hierarchy' 	: {'de': 'In Hierarchie anzeigen'},
		'Show in diagram' 		: {'de': 'Im Diagramm anzeigen'},
		'Show in model tree' 	: {'de': 'Im Modellbaum anzeigen'},		
		'Delete from diagram' 	: {'de': 'Aus dem Diagramm löschen'},
		'Delete from model' 	: {'de': 'Aus dem Modell löschen'},
		'Add package' 			: {'de': 'Paket hinzufügen'},
		'Add diagram' 			: {'de': 'Diagramm hinzufügen'},
		'Add activity set'		: {'de': 'Aktivitätsdiagramm hinzufügen'},
		'Select as grid scope' 	: {'de': 'Als Gitterbereich auswählen'},
		'Create model' 			: {'de': 'Modell erstellen'},		
		'Add new entry' 		: {'de': 'Neuen Eintrag hinzufügen'},
		'Remove entry' 			: {'de': 'Eintrag entfernen'},
		'Name' 					: {'de': 'Name'},
		'Model Objects' 		: {'de': 'Modellobjekte'},
		'Existing Classes' 		: {'de': 'Existierende Klassen'},
		'Login' 				: {'de': 'Einloggen'},
		'Password' 				: {'de': 'Passwort'},
		'Language' 				: {'de': 'Sprache'},
		'This panel shows the properties of each object selected by a single click.' : {'de': 'Zeigt mit Click die Eigenschaften jedes Objekts an'},
		'Export as UML'       : {'de': 'Als UML exportieren'},
		'Exporting UML ...'   : {'de': 'Exportiere UML ...'},
		'Model Upload'          : {'de': 'Modelle hochladen'},
		'Select UML model'      : {'de': 'Wählen Sie ein UML-Modell aus'},
		'File to upload'        : {'de': 'Hochzuladende Datei'},
		'Send model'            : {'de': 'Sende Modell'},
		'Sending the model ...' : {'de': 'Sende das Modell ...'},
		'Import successful'     : {'de': 'Import erfolgreich'},
		'Your import finished successfully. The application is going to restart.': {'de': 'Der Import wurde erfolgreich beendet. Die Anwendung wird nun neu gestartet.'},
		'OK'                    : {'de': 'OK'},
		'Import failed'         : {'de': 'Import fehlgeschlagen'},
		'Your import failed. See below for errors.' : {'de': 'Ihr Import ist fehlgeschlagen. Siehe unten für Fehlermeldungen (auf Englisch).'},
		'Export as Word Document': {'de': 'Als Word-Dokument exportieren'},
		'Exporting Word Document ...' : {'de': 'Exportiere Word-Dokument ...'},
		'Error occured'         : {'de': 'Ein Fehler ist aufgetreten'},
		'An application error occured. Your data will be saved and the application will be restarted.' : {'de': 'Ein Anwendungsfehler ist aufgetreten. Ihre Daten werden gespeichert und die Anwedung neu gestartet.'},
		'View'					: {'de': 'Ansicht'},
		'Error details'         : {'de': 'Fehlerdetails'},
		"Snap to objects"       : {'de': "An Objekten ausrichten"},
		"Auto-layout"           : {'de': "Auto-Layout"},
		"Reload"                : {'de': "Neu laden"},
		"Print"                 : {'de': "Drucken"},
		"Please make sure that background printing is enabled in page setup." : {'de': "Bitte stellen Sie sicher, dass 'Hintergrund drucken' aktiviert ist."},
		"NOTE: This message will not be printed." : {'de': "ACHTUNG: Diese Nachricht wird nicht gedruckt."},
		"New"					: {'de': "Neue"},
		"Continue on your own risk" : {'de': "Auf eigene Verantwortung fortfahren"},
		"Object History"		: {'de': "Objekt History"},
		"No changes have been made."	: {'de': "Es wurden keine Veränderungen vorgenommen."},
		"Undo selected"			: {'de': "Änderungen rückgängig"},
		"Undo all changes since"	: {'de': "Zeitpunkt wiederherstellen"},
		"Cancel"				: {'de': "Abbrechen"},
		"Property"				: {'de': "Eigenschaft"},
		"Date"					: {'de': "Datum"},
		"Author"				: {'de': "Autor"},
		"Changed Items"			: {'de': "Änderungen"},
		"Show object history"	: {'de': "Objekt History zeigen"},
		"Old value"				: {'de': "Alter Wert"},
		"New value"				: {'de': "Neuer Wert"},
		"The selected properties have been successfully restored."	: {'de': "Die ausgewählten Felder wurden erfolgreich wiederhergestellt."},
		"Error while exporting" : {'de': "Fehler beim Exportieren"},
		"The export was unsuccessful. Please try again.": {'de': "Der Export war unerfolgreich. Bitte probieren Sie es erneut."},
		"Forbidden connection"	: {'de':"Verbotene Verbindung"},
		"This object already has a parent. Please disconnect it from its parent and redraw this connection to change its parent."	: {'de':"Dieses Objekt hat bereits ein übergeordnetes Objekt. Um es einem anderen Objekt unterzuordnen, löschen Sie bitte die bestehende Verbindung."},
		"expand all"            : {'de': "alles erweitern" },
		"collapse all"          : {'de': "alles verkleinern" },
		"Export Documentation"  : {'de': "Dokumentation exportieren" },
		"Exporting Documentation ..." : {'de' : "Exportiere Dokumentation ..." }
		
}


/**
 * Translates a string to the currently set language.
 * 
 * @param {String} englishText The english text to translate.
 * @return {String} The translated text, if a translation exists. English text otherwise.
 */
uwm.Dict.translate = function(){
	strword=arguments[0];

	try {
		strresult = uwm.Dict.voc[strword][uwm.i18n.Localization.getInstance().getUserInterfaceLanguage()];
		if(!strresult){strresult = strword;}
	}catch(e){
		strresult = strword;
	}

	return strresult;
}