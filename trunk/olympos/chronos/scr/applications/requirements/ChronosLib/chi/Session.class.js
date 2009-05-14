/*
 * Copyright (c) 2009 The Olympos Development Team. *  * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */Ext.namespace("chi");

/**
 * @class A <i>Singleton</i> representing the current session.
 * 
 * @constructor
 */
chi.Session = function() {
	this.sid = null;
	this.persistencyClass = "chi.persistency.Json";
	this.lang = "en";
}

chi.Session.prototype.init = function(sid, lang, jsonUrl, helpUrl) {
	this.sid = sid;
	this.lang = lang;
	this.jsonUrl = jsonUrl;
	this.helpUrl = helpUrl;
}

chi.Session.prototype.getSid = function() {
	return this.sid;
}

chi.Session.prototype.getJsonUrl = function() {
	return this.jsonUrl;
}

chi.Session.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

chi.Session.prototype.getPersistencyClass = function() {
	return this.persistencyClass;
}

chi.Session.prototype.getLang = function() {
	return this.lang;	
}


chi.Session.getInstance = function() {
	if (!chi.Session.instance) {
		chi.Session.instance = new chi.Session();
	}
	
	return chi.Session.instance;
}
