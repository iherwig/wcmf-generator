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
Ext.namespace("uwm.Log");

/**
 * A simple logging class. It logs messages to the Firebug console
 * if they have a logLevel greater or equal than uwm.Config.logLevel.
 */

uwm.Log.DEBUG = 0;
uwm.Log.INFO = 	1;
uwm.Log.WARN = 	2;
uwm.Log.ERROR = 3;

/**
 * Check if logging is enabled for the given log level.
 * @param {Integer}
 *				logLevel E.g. uwm.Log.DEBUG
 * @return {boolean}
 */
uwm.Log.isEnabled = function(logLevel) {
	return uwm.Config.logLevel <= logLevel;
}

/**
 * Extracts the numeric part out of an OID.
 * 
 * @param {String}
 *            message The message to log
 * @param {Integer}
 *				logLevel E.g. uwm.Log.DEBUG
 */
uwm.Log.log = function(message, logLevel) {
	var consoleExists = false;
	try {
		consoleExists = console != null;
	}
	catch (e) {}
	
	if (consoleExists) {
		if (uwm.Log.isEnabled(logLevel)) {
		
			switch (logLevel) {
			
				case uwm.Log.DEBUG: console.debug(message);
					break;
 
				case uwm.Log.INFO: console.info(message);
					break;
 
				case uwm.Log.WARN: console.warn(message);
					break;
 
				case uwm.Log.ERROR: console.error(message);
					break;
 
				default: console.log(message);
			}
		}
	}
}
