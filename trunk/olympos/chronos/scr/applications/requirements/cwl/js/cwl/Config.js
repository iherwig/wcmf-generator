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
Ext.namespace("cwl.Config");

/**
 * The URL all JSON calls should be routed to.
 *
 * @type String
 */
cwl.Config.jsonUrl = "../application/main.php";

/**
 * The Persistency implementation.
 *
 * @type String
 */
cwl.Config.persistencyClass = "chi.persistency.WcmfJson";

/**
 * Title of this application.
 *
 * @type String
 */
cwl.Config.appTitle = "Chronos Web Logic";

/**
 * Debug mode switch.
 * <p>
 * 	This triggers whether the application only displays an occuring error (true) or restarts (false).
 * </p>
 *
 * @type boolean
 */
cwl.Config.debug = true;

/**
 * Default value of login.
 *
 * @type String
 */
cwl.Config.defaultLogin = "admin";

/**
 * Default value of password.
 *
 * @type String
 */
cwl.Config.defaultPassword = "admin";

/**
 * Default value of lang (language).
 *
 * @type String
 */
cwl.Config.defaultLang = "en";

/**
 * Initialize the Config singleton
 */
chi.Config.getInstance().processConfig(cwl.Config);
