/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwb.persistency");

/**
 * @class Implements persistency against a wCMF backend via JSON calls.
 * 
 * @extends cwb.persistency.Persistency.
 * @constructor
 */
cwb.persistency.Json = function() {
	this.sid = cwb.Session.getInstance().getSid();
	this.jsonUrl = cwb.Session.getInstance().getJsonUrl();
};

cwb.persistency.Json.prototype = new cwb.persistency.Persistency;

cwb.persistency.Json.prototype.jsonRequest = function(params, successHandler, errorHandler) {
	params.sid = this.sid;
	params.response_format = "JSON";
	
	var self = this;
	
	Ext.Ajax.request({
		url: this.jsonUrl,
		method: "post",
		params: params,
		timeout: cwb.Constants.AJAX_TIMEOUT,
		callback: function(options, success, response) {
			if (success) {
				var data = Ext.util.JSON.decode(response.responseText);
				
				if (!data.errorMsg) {
					self.processSuccessHandler(successHandler, options, data);
				} else {
					self.processErrorHandler(errorHandler, options, data, data.errorMsg);
				}
			} else {
				self.processErrorHandler(errorHandler, options, data);
			}
		}
	});
};

cwb.persistency.Json.prototype.array2CommaList = function(array) {
	var result = array;
	
	if (array instanceof Array) {
		var first = true;
		result = "";
		
		for (var i = 0; i < array.length; i++) {
			if (!first) {
				result += ",";
			} else {
				first = false;
			}
			result += array[i];
		}
	}
	
	return result;
};

cwb.persistency.Json.prototype.doLogin = function(login, password, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "dologin",
		login: login,
		password: password
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.logout = function(successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "logout"
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.display = function(oid, depth, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "display",
		oid: oid,
		depth: depth,
		omitMetaData: true,
		translateValues: true
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.list = function(uwmClassName, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "list",
		type: uwmClassName
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.loadChildren = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "TreeViewController",
		usr_action: "loadChildren",
		node: oid
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.lock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "lock",
		oid: oid
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.unlock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "unlock",
		oid: oid
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.log = function(logtype, msg, successHandler, errorHandler) {
	var self = this;
	
	this.jsonRequest({
		usr_action: "log",
		logtype: logtype,
		msg: msg
	}, successHandler, function(request, data, errorMessage) {
		if (errorMessage) {
			self.processSuccessHandler(successHandler);
		} else {
			self.processErrorHandler(errorHandler, request, data);
		}
	});
};

cwb.persistency.Json.prototype.doContinue = function(controller, successHandler, errorHandler) {
	this.jsonRequest({
		controller: controller,
		usr_action: 'continue'
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.executeActionSet = function(actionSet) {
	var data = {};
	
	var requests = actionSet.getRequests();
	
	for (var currActionName in requests) {
		var currRequest = requests[currActionName];
		
		if (!(currRequest instanceof Function)) {
			var jsonRequest = {};
			
			jsonRequest.usr_action = currRequest.action;
			
			switch (currRequest.action) {
			case "dologin":
				jsonRequest.login = currRequest.login;
				jsonRequest.password = currRequest.password;
				break;
				
			case "dologout":
				break;
				
			case "display":
				jsonRequest.oid = currRequest.oid;
				jsonRequest.depth = currRequest.depth;
				jsonRequest.omitMetaData = true;
				jsonRequest.translateValues = true;
				break;
				
			case "list":
				jsonRequest.type = currRequest.uwmClassName;
				break;
				
			case "loadChildren":
				jsonRequest.controller = "TreeViewController";
				jsonRequest.node = currRequest.oid;
				break;
				
			case "lock":
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "unlock":
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "log":
				jsonRequest.logtype = currRequest.logtype;
				jsonRequest.msg = currRequest.msg;
				break;
				
			default:
				cwb.Util.showMessage("Programming Error", "Unknown action in ActionSet: " + currRequest.action, cwb.Util.messageType.ERROR);
			}
			data[currActionName] = 	jsonRequest;
		}
	}
	
	this.jsonRequest({
		controller: "TerminateController",
		usr_action: "multipleAction",
		request_format: "JSON",
		data: Ext.encode(data),
		actionSet: actionSet
	}, function(request, data) {
		request.params.actionSet.successHandler(request, data);
	}, function(request, data, errorMessage) {
		request.params.actionSet.errorHandler(request, data, errorMessage);
	});
};

cwb.persistency.Json.prototype.loadStatisticsOverview = function(modelOid, template, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "loadStatisticsOverview",
		modelOid: modelOid,
		template: template
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.displayByAlias = function(aliasList, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "displayByAlias",
		aliasList: this.array2CommaList(aliasList),
		translateValues: true
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.generateUml = function(modelOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "generateUml",
		modelOid: modelOid
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.loadAllStatisticsOverview = function(modelOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "loadAllStatisticsOverview",
		modelOid: modelOid
	}, successHandler, errorHandler);
};

cwb.persistency.Json.prototype.lastEdited = function(successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "lastEdited"
	}, successHandler, errorHandler);
};
