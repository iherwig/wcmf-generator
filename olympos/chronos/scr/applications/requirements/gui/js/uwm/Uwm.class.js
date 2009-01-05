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
Ext.namespace("uwm");

uwm.Uwm = function() {
}

uwm.Uwm.prototype.processConfig = function() {
	document.title = uwm.Config.appTitle;
}

uwm.Uwm.prototype.startApplication = function() {
	var params = location.search.split(/&/);
	
	var sid = null;
	
	for (var i = 0; i < params.length; i++) {
		var parts = params[i].split(/=/);
		
		if (parts[0] = "sid") {
			sid = parts[1];
			break;
		}
	}
	
	if (sid) {
		uwm.Session.getInstance().init(sid);
		this.workbench = new uwm.ui.Workbench();
	} else {
		this.login = new uwm.ui.Login();
	}
}

uwm.Uwm.prototype.startSession = function(sid, workbenchType) {
	uwm.Session.getInstance().init(sid);
	
	this.login.destroy();
	
	switch (workbenchType) {
		case "tabs":
			this.workbench = new uwm.tabadmin.Workbench();
			break;
			
		case "tree":
			this.workbench = new uwm.treeadmin.Workbench();
			break;
			
		default:
			this.workbench = new uwm.ui.Workbench();
	}
}

uwm.Uwm.getInstance = function() {
	if (!uwm.Uwm.instance) {
		uwm.Uwm.instance = new uwm.Uwm();
	}
	
	return uwm.Uwm.instance;
}
