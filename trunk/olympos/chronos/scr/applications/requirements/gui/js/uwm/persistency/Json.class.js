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
Ext.namespace("uwm.persistency");

uwm.persistency.Json = function() {
	this.sid = uwm.Session.getInstance().getSid();
	this.jsonUrl = uwm.Session.getInstance().getJsonUrl();
}

uwm.persistency.Json.prototype = new uwm.persistency.Persistency;

uwm.persistency.Json.prototype.jsonRequest = function(params, successHandler, errorHandler) {
	params.sid = this.sid;
	params.response_format = "JSON";
	
	var self = this;
	
	Ext.Ajax.request({
		url: this.jsonUrl,
		method: "post",
		params: params,
		callback: function(options, success, response) {
			if (success) {
				var data = Ext.util.JSON.decode(response.responseText);
				
				if (!data.errorMsg) {
					self.processSuccessHandler(successHandler, options, data);
				}
				else {
					self.processErrorHandler(errorHandler, options, data, data.errorMsg);
				}
			}
			else {
				self.processErrorHandler(errorHandler, options, data);
			}
		}
	});
}

uwm.persistency.Json.prototype.array2CommaList = function(array) {
	var result = array;
	
	if (array instanceof Array) {
		var first = true;
		result = "";
		
		for (var i = 0; i < array.length; i++) {
			if (!first) {
				result += ",";
			}
			else {
				first = false;
			}
			result += array[i];
		}
	}
	
	return result;
}

uwm.persistency.Json.prototype.doLogin = function(login, password, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "dologin",
		login: login,
		password: password
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.logout = function(successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "logout"
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.newObject = function(uwmClassName, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "new",
		newtype: uwmClassName
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.deleteObject = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "delete",
		deleteoids: this.array2CommaList(oid)
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.associate = function(parentOid, childOid, invert, successHandler, errorHandler) {
	var direction = "child";
	
	if (invert) {
		direction = "parent";
	}
	
	this.jsonRequest({
		usr_action: "associate",
		oid: parentOid,
		associateoids: this.array2CommaList(childOid),
		associateAs: direction
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.disassociate = function(parentOid, childOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "disassociate",
		oid: parentOid,
		associateoids: this.array2CommaList(childOid),
		associateAs: direction
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.save = function(oid, values, successHandler, errorHandler) {
	var data = {
		usr_action: "save"
	};
	
	for (var i in values) {
		if (!(values[i] instanceof Function)) {
			data["value--" + i + "-" + oid] = values[i];
		}
	}
	
	this.jsonRequest(data, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.display = function(oid, depth, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "display",
		oid: oid,
		depth: depth,
		omitMetaData: true,
		translateValues: true
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.list = function(uwmClassName, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "list",
		type: umwClassName
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.listbox = function(type, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "listbox",
		type: type
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.loadChildren = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "TreeViewController",
		usr_action: "loadChildren",
		node: oid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.lock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "lock",
		oid: oid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.unlock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "unlock",
		oid: oid
	}, successHandler, errorHandler);
}
