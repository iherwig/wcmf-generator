/*
 * Copyright (c) 2008 The Olympos Development Team. *  * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */Ext.namespace("cwb");

/**
 * @class A <i>Singleton</i> representing the current session.
 * 
 * @constructor
 */
cwb.Session = function() {
	this.sid = null;
	this.jsonUrl = cwb.Config.jsonUrl;
	this.helpUrl = "welcome/welcome.html";
	this.persistencyClass = "cwb.persistency.Json";
	this.lang = "en";
}

cwb.Session.prototype.init = function(sid, lang) {
	this.sid = sid;
	this.lang = lang;
}

cwb.Session.prototype.getSid = function() {
	return this.sid;
}

cwb.Session.prototype.getJsonUrl = function() {
	return this.jsonUrl;
}

cwb.Session.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

cwb.Session.prototype.getPersistencyClass = function() {
	return this.persistencyClass;
}

cwb.Session.prototype.getLang = function() {
	return this.lang;	
}


cwb.Session.getInstance = function() {
	if (!cwb.Session.instance) {
		cwb.Session.instance = new cwb.Session();
	}
	
	return cwb.Session.instance;
}
