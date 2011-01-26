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
 * @class A <i>Singleton</i> representing the configuration.
 * 
 * @constructor
 */
chi.Config = function() {
	/**
	 * The url for server requests.
	 * 
	 * @type String
	 */
	this.jsonUrl = "../application/main.php";

	/**
	 * The class name implementing persistency.
	 * 
	 * @type String
	 */
	this.persistencyClass = "chi.persistency.DionysosJson";

	/**
	 * Title of this application.
	 * 
	 * @type String
	 */
	this.appTitle = "";

	/**
	 * Debug mode switch.
	 * <p>
	 * This triggers whether the application only displays an occuring error
	 * (true) or restarts (false).
	 * </p>
	 * 
	 * @type boolean
	 */
	this.debug = true;

	/**
	 * The log level for frontend logging.
	 * <p>
	 * All calls to chi.Log.log that have a log level greater or equal than this
	 * are passed through. Possible values are chi.Log.DEBUG, chi.Log.INFO,
	 * chi.Log.WARN, chi.Log.ERROR
	 * </p>
	 * 
	 * @type Integer
	 */
	this.logLevel = chi.Log.ERROR;

	/**
	 * Default value of login.
	 * 
	 * @type String
	 */
	this.defaultLogin = "admin";

	/**
	 * Default value of password.
	 * 
	 * @type String
	 */
	this.defaultPassword = "admin";

	/**
	 * Default value of lang (language).
	 * 
	 * @type String
	 */
	this.defaultLang = "en";
};

/**
 * Initializes the configuration.
 * 
 * @param {Object}
 *            config A configuration object whose properties specify the
 *            configuration options. If a property is not defined, the default
 *            property is used
 */
chi.Config.prototype.processConfig = function(config) {
	Ext.apply(this, config);
};

/**
 * Returns the instance of this class.
 * 
 * @return The instance of this class.
 * @type chi.Config
 */
chi.Config.getInstance = function() {
	if (!chi.Config.instance) {
		chi.Config.instance = new chi.Config();
	}

	return chi.Config.instance;
};
