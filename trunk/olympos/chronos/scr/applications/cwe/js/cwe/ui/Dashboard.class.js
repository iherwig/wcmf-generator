/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.ui");

/**
 * @class The main Workbench (perspective).
 * 
 * @constructor
 * @extends Ext.Viewport
 * @param {Object}
 *            config The configuration object.
 */
cwe.ui.Dashboard = function(config) {
	cwe.ui.Dashboard.superclass.constructor.call(this, Ext.apply(this, {
	    title : chi.Dict.translate("User Dashboard"),
	    iconCls : "dashboardIcon",
	    items : [ cwe.Config.getPortlets() ]
	}, config));
}

Ext.extend(cwe.ui.Dashboard, Ext.ux.Portal);
