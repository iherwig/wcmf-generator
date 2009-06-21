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
Ext.namespace("chi.persistency");

/**
 * @class Implements persistency against a wCMF backend via JSON calls.
 * 
 * @extends chi.persistency.Persistency.
 * @constructor
 */
chi.persistency.WcmfJson = function() {
	this.sid = chi.Session.getInstance().getSid();
	this.jsonUrl = "../application/main.php";
}

Ext.extend(chi.persistency.WcmfJson, new chi.persistency.Persistency);

chi.persistency.WcmfJson.prototype.jsonRequest = function(params, successHandler, errorHandler) {
	params.sid = this.sid;
	params.response_format = "JSON";
	
	var self = this;
	
	Ext.Ajax.request({
		url: this.jsonUrl,
		method: "post",
		timeout: chi.Constants.AJAX_TIMEOUT,
		params: params,
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
}

chi.persistency.WcmfJson.prototype.array2CommaList = function(array) {
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
}

chi.persistency.WcmfJson.prototype.doLogin = function(login, password, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "dologin",
		login: login,
		password: password
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.logout = function(successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "logout"
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.newObject = function(chiClassName, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "new",
		newtype: chiClassName
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.deleteObject = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "delete",
		deleteoids: this.array2CommaList(oid)
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.associate = function(parentOid, childOid, invert, successHandler, errorHandler) {
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

chi.persistency.WcmfJson.prototype.disassociate = function(parentOid, childOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "disassociate",
		oid: parentOid,
		associateoids: this.array2CommaList(childOid)
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.save = function(oid, values, successHandler, errorHandler) {
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

chi.persistency.WcmfJson.prototype.display = function(oid, depth, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "display",
		oid: oid,
		depth: depth,
		omitMetaData: true,
		translateValues: true
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.list = function(chiClassName, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "list",
		type: chiClassName
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.listbox = function(type, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "listbox",
		type: type
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.autocomplete = function(query, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'autocomplete',
		query: query
	}, successHandler, errorHandler);
	
}

chi.persistency.WcmfJson.prototype.histlist = function(oid,start,limit, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'histlist',
		oid:oid,
		start: start,
		limit:limit
	}, successHandler, errorHandler);
	
}

chi.persistency.WcmfJson.prototype.restorehistliststate = function(id, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'restorehistliststate',
		ids:id
	}, successHandler, errorHandler);
	
}

chi.persistency.WcmfJson.prototype.restorehistlistfields = function(ids, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'restorehistlistfields',
		ids:ids
	}, successHandler, errorHandler);
	
}

chi.persistency.WcmfJson.prototype.loadChildren = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "TreeViewController",
		usr_action: "loadChildren",
		node: oid
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.lock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "lock",
		oid: oid
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.unlock = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "unlock",
		oid: oid
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.createDiagramFromPackage = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "packdiagr",
		oid: oid
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.putChildnodesToActivitySetDiagram = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "actsdiagr",
		oid: oid
	}, successHandler, errorHandler);
}	

chi.persistency.WcmfJson.prototype.log = function(logtype, msg, successHandler, errorHandler) {
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
}

chi.persistency.WcmfJson.prototype.templatelist = function( successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'templatelist'
	}, successHandler, errorHandler);
	
}

chi.persistency.WcmfJson.prototype.glossary = function( successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'glossary'
	}, successHandler, errorHandler);
}

chi.persistency.WcmfJson.prototype.executeActionSet = function(actionSet) {
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
				
			case "new":
				jsonRequest.newtype = currRequest.chiClassName;
				break;
				
			case "delete":
				jsonRequest.deleteoids = this.array2CommaList(currRequest.oid);
				break;
				
			case "associate":
				var direction = "child";
				
				if (currRequest.invert) {
					direction = "parent";
				}
				
				jsonRequest.oid = currRequest.parentOid;
				jsonRequest.associateoids = this.array2CommaList(currRequest.childOid);
				jsonRequest.associateAs = direction;
				break;
				
			case "disassociate":
				jsonRequest.oid = currRequest.parentOid;
				jsonRequest.associateoids = this.array2CommaList(currRequest.childOid);
				break;
				
			case "save":
				/*
				for (var i in currRequest.values) {
					if (!(currRequest.values[i] instanceof Function)) {
						jsonRequest["value--" + i + "-" + currRequest.oid] = currRequest.values[i];
					}
				}
				*/
					
				var changeNode = {};
				
				changeNode.oid = currRequest.oid;
				changeNode.type = chi.Util.getchiClassNameFromOid(currRequest.oid);
				changeNode.values = {};
				changeNode.values[1] = {};
				
				for (var i in currRequest.values) {
					if (!(currRequest.values[i] instanceof Function)) {
						changeNode.values[1][i] = currRequest.values[i];
					}
				}
				
				jsonRequest[currRequest.oid] = changeNode;
				break;
				
			case "display":
				jsonRequest.oid = currRequest.oid;
				jsonRequest.depth = currRequest.depth;
				jsonRequest.omitMetaData = true;
				jsonRequest.translateValues = true;
				break;
				
			case "list":
				jsonRequest.type = currRequest.chiClassName;
				break;
				
			case "listbox":
				jsonRequest.type = currRequest.type;
				break;
				
			case "autocomplete":
				jsonRequest.query = currRequest.query;
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
				
			case "packdiagr":
				jsonRequest.controller = "PackageDiagramController";
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "actsdiagr":
				jsonRequest.controller = "ActivitySetDiagramController";
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "templatelist":
				jsonRequest.controller = "TemplateListController";
				break;
				
			case "glossary":
				jsonRequest.controller = "GlossaryController";
				break;
				
			default:
				chi.Util.showMessage("Programming Error", "Unknown action in ActionSet: " + currRequest.action, chi.Util.messageType.ERROR);
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
}