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
Ext.namespace("uwm.Config");

/**
 * The URL all JSON calls should be routed to.
 * 
 * @type String
 */
uwm.Config.jsonUrl = "../application/main.php";

/**
 * Title of this application.
 * 
 * @type String
 */
uwm.Config.appTitle = "Chronos Web Modeler";

/**
 * Debug mode switch.
 * <p>
 * 	This triggers whether the application only displays an occuring error (true) or restarts (false).
 * </p>
 * 
 * @type boolean
 */
uwm.Config.debug = true;

/**
 * Default value of login.
 * 
 * @type String
 */
uwm.Config.defaultLogin = "admin";

/**
 * Default value of password.
 * 
 * @type String
 */
uwm.Config.defaultPassword = "admin";

uwm.Uwm.getInstance().processConfig();
