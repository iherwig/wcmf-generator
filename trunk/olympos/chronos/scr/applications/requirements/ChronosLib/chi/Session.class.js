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

Ext.namespace("chi");

/**
 * @class A <i>Singleton</i> representing the current session.
 * 
 * @constructor
 */
chi.Session = function() {
	/**
	 * The session id of the current session.
	 * 
	 * @type String
	 */
	this.sid = null;
	
	/**
	 * The class name implementing persistency.
	 * 
	 * @type String
	 */
	this.persistencyClass = "chi.persistency.DionysosJson";
	
	/**
	 * The language selected for application UI.
	 * 
	 * @type String
	 */
	this.lang = "en";
	
	/**
	 * The URL of the help file.
	 * 
	 * @type String
	 */
	this.helpUrl = null;
}

/**
 * Initializes the session.
 * 
 * @param {String}
 *            sid The current session id.
 * @param {String}
 *            lang The language selected for application UI.
 * @param {String}
 *            jsonUrl Currently not used.
 * @param {String}
 *            helpUrl The URL of the help file.
 */
chi.Session.prototype.init = function(sid, lang, jsonUrl, helpUrl) {
	this.sid = sid;
	this.lang = lang;
	this.helpUrl = helpUrl;
}

/**
 * Returns the current session id.
 * 
 * @return The current session id.
 * @type String
 */
chi.Session.prototype.getSid = function() {
	return this.sid;
}

/**
 * Returns the URL of the help file.
 * 
 * @return The URL of the help file.
 * @type String
 */
chi.Session.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

/**
 * Returns the class name implementing persistency.
 * 
 * @return The class name implementing persistency.
 * @type String
 */
chi.Session.prototype.getPersistencyClass = function() {
	return this.persistencyClass;
}

/**
 * Returns the language selected for application UI.
 * 
 * @return The language selected for application UI.
 * @type String
 */
chi.Session.prototype.getLang = function() {
	return this.lang;
}

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class.
 * @type chi.Session
 */
chi.Session.getInstance = function() {
	if (!chi.Session.instance) {
		chi.Session.instance = new chi.Session();
	}
	
	return chi.Session.instance;
}
