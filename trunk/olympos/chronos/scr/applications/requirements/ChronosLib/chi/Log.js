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
Ext.namespace("chi.Log");

/**
 * A simple logging class. It logs messages to the Firebug console
 * if they have a logLevel greater or equal than chi.Config.logLevel.
 */

chi.Log.DEBUG = 0;
chi.Log.INFO = 	1;
chi.Log.WARN = 	2;
chi.Log.ERROR = 3;

/**
 * Check if logging is enabled for the given log level.
 * @param {Integer}
 *				logLevel E.g. chi.Log.DEBUG
 * @return {boolean}
 */
chi.Log.isEnabled = function(logLevel) {
	return chi.Config.getInstance().logLevel <= logLevel;
}

/**
 * Extracts the numeric part out of an OID.
 * 
 * @param {String}
 *            message The message to log
 * @param {Integer}
 *				logLevel E.g. chi.Log.DEBUG
 */
chi.Log.log = function(message, logLevel) {
	var consoleExists = false;
	try {
		consoleExists = console != null;
	}
	catch (e) {}
	
	if (consoleExists) {
		if (chi.Log.isEnabled(logLevel)) {
		
			switch (logLevel) {
			
				case chi.Log.DEBUG: console.debug(message);
					break;
 
				case chi.Log.INFO: console.info(message);
					break;
 
				case chi.Log.WARN: console.warn(message);
					break;
 
				case chi.Log.ERROR: console.error(message);
					break;
 
				default: console.log(message);
			}
		}
	}
}
