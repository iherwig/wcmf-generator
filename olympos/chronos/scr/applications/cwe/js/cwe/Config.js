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
Ext.namespace("cwe.Config");

/**
 * The URL all JSON calls should be routed to.
 *
 * @type String
 */
cwe.Config.jsonUrl = "../application/dionysos/main.php";

/**
 * The Persistency implementation.
 *
 * @type String
 */
cwe.Config.persistencyClass = "chi.persistency.DionysosJson";

/**
 * Title of this application.
 *
 * @type String
 */
cwe.Config.appTitle = "Chronos Web Editor";

/**
 * Debug mode switch.
 * <p>
 * 	This triggers whether the application only displays an occuring error (true) or restarts (false).
 * </p>
 *
 * @type boolean
 */
cwe.Config.debug = true;

/**
 * The log level for frontend logging.
 * <p>
 * All calls to uwm.Log.log that have a log level greater or equal than this are passed through.
 * Possible values are uwm.Log.DEBUG, uwm.Log.INFO, uwm.Log.WARN, uwm.Log.ERROR
 * </p>
 * 
 * @type Integer
 */
cwe.Config.logLevel = chi.Log.DEBUG;

/**
 * Default value of login.
 *
 * @type String
 */
cwe.Config.defaultLogin = "admin";

/**
 * Default value of password.
 *
 * @type String
 */
cwe.Config.defaultPassword = "admin";

/**
 * Default value of lang (language).
 *
 * @type String
 */
cwe.Config.defaultLang = "en";

cwe.Config.getPortlets = function() {
	return [ new Ext.ux.PortalColumn( {
	    columnWidth : .5,
	    style : "margin: 5px",
	    items : [ new cwe.dashboard.WelcomePortlet() ]
	}), new Ext.ux.PortalColumn( {
	    columnWidth : .5,
	    style : "margin: 5px",
	    items : [/* new cwe.dashboard.ChartPortlet( {
	        cweModelElementId : "ChiRequirement",
	        limit : 50,
	        valueAttribute : "Priority",
	        sortAttributeName : "Priority",
	        sortDirection : "desc"
	    }), new cwe.dashboard.MapPortlet( {
		    cweModelElementId : "ChiGoal"
	    }) */]
	}) ];
};

/**
 * Initialize the Config singleton
 */
chi.Config.getInstance().processConfig(cwe.Config);
