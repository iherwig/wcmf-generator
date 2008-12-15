/*
 * Copyright (c) 2008 The Olympos Development Team. *  * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */Ext.namespace("uwm");

uwm.Session = function() {
	this.sid = uwm.data.sid;
	this.jsonUrl = uwm.config.jsonUrl;
	this.helpUrl = "help/index.html";
	this.persistencyClass = "uwm.persistency.Json";
}

uwm.Session.getInstance = function() {
	if (!uwm.Session.instance) {
		uwm.Session.instance = new uwm.Session();
	}
	
	return uwm.Session.instance;
}

uwm.Session.prototype.getSid = function() {
	return this.sid;
}

uwm.Session.prototype.getJsonUrl = function() {
	return this.jsonUrl;
}

uwm.Session.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

uwm.Session.prototype.getPersistencyClass = function() {
	return this.persistencyClass;
}