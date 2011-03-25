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

/**
 * @class Implements persistency against a wCMF backend via JSON calls.
 * 
 * @extends uwm.persistency.Persistency.
 * @constructor
 */
uwm.persistency.Json = function() {
	this.sid = uwm.Session.getInstance().getSid();
	this.jsonUrl = uwm.Session.getInstance().getJsonUrl();
}

uwm.persistency.Json.prototype = new uwm.persistency.Persistency;

uwm.persistency.Json.prototype.jsonRequest = function(params, successHandler, errorHandler) {
	// the default parameters
	params.sid = this.sid;
	params.response_format = "JSON";
	if (params.language == undefined) {
		params.language = uwm.i18n.Localization.getInstance().getModelLanguage();
	}
	
	var self = this;
	
	Ext.Ajax.request({
		url: this.jsonUrl,
		method: "post",
		timeout: uwm.Constants.AJAX_TIMEOUT,
		params: params,
		callback: function(options, success, response) {
			if (success) {
				try {
					var data = Ext.util.JSON.decode(response.responseText);
				}
				catch (ex) {
					uwm.Log.log("JSON response expected, but received: "+response.responseText, uwm.Log.ERROR);
				}
				
				// Only proceed if the response has been decoded (no exception was handled)
				if(data) {
						if (!data.errorMsg) {
							self.processSuccessHandler(successHandler, options, data);
						} else {
							self.processErrorHandler(errorHandler, options, data, data.errorMsg);
						}
				}
			} else {
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
			} else {
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
		associateoids: this.array2CommaList(childOid)
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.save = function(oid, values, language, successHandler, errorHandler) {
	var data = {
		usr_action: "save",
		language: language
	};
	
	for (var i in values) {
		if (!(values[i] instanceof Function)) {
			data["value--" + i + "-" + oid] = values[i];
		}
	}
	
	this.jsonRequest(data, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.copy = function(oid, targetOid, recursive, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "copy",
		oid: oid,
		targetoid: targetOid,
    recursive: recursive
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.sort = function(oid, direction, distance, poid, successHandler, errorHandler) {
	var action = "sortdown";
	if (direction == "up") {
		action = "sortup";
	}
	this.jsonRequest({
		usr_action: action,
		sortoid: oid,
		dist: distance,
		poid: poid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.display = function(oid, depth, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "display",
		oid: oid,
		depth: depth,
		language: language,
		omitMetaData: true,
		translateValues: true
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.batchdisplay = function(oid, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "batchdisplay",
		oid: oid,
		language: language,
		omitMetaData: true,
		translateValues: true
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.list = function(uwmClassName, completeObjects, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "list",
		type: uwmClassName,
		language: language,
		completeObjects: completeObjects
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.listbox = function(type, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "listbox",
		type: type,
		language: language
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.autocomplete = function(query, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'autocomplete',
		query: query,
		language: language
	}, successHandler, errorHandler);
	
}

uwm.persistency.Json.prototype.histlist = function(oid, start, limit, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'histlist',
		oid:oid,
		start: start,
		limit:limit
	}, successHandler, errorHandler);
	
}

uwm.persistency.Json.prototype.restorehistliststate = function(id, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'restorehistliststate',
		ids:id
	}, successHandler, errorHandler);
	
}

uwm.persistency.Json.prototype.restorehistlistfields = function(ids, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'restorehistlistfields',
		ids:ids
	}, successHandler, errorHandler);
	
}

uwm.persistency.Json.prototype.loadChildren = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "TreeViewController",
		usr_action: "loadChildren",
		node: oid,
		sort: "sortkey"
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.loadInheritedAttributes = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "InheritanceController",
		usr_action: "loadInheritedAttributes",
		node: oid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.doesClassContainAttribute = function(nodeOid, attributeOid, successHandler, errorHandler) {
	this.jsonRequest({
		controller: "InheritanceController",
		usr_action: "doesClassContainAttribute",
		node: nodeOid,
		attribute: attributeOid
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

uwm.persistency.Json.prototype.createDiagramFromPackage = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "packdiagr",
		oid: oid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.createControllerFromUseCase = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "usecasectrl",
		oid: oid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.createMapping = function(sourceOid, sourceNodeOid, targetOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "createMapping",
		sourceoid: sourceOid,
		sourcenodeoid: sourceNodeOid,
		targetoid: targetOid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.deleteMapping = function(targetOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "deleteMapping",
		targetoid: targetOid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.putChildnodesToActivitySetDiagram = function(oid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: "actsdiagr",
		oid: oid
	}, successHandler, errorHandler);
}	

uwm.persistency.Json.prototype.log = function(logtype, msg, successHandler, errorHandler) {
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

uwm.persistency.Json.prototype.templatelist = function(scope, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'templatelist',
		scope: scope
	}, successHandler, errorHandler);
	
}

uwm.persistency.Json.prototype.exportDoc = function(startOid, language, templateName, exportFormat, diagramFormat, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportDoc',
		startOid: startOid,
		templateName: templateName,
		exportFormat: exportFormat,
		diagramFormat: diagramFormat,
		language: language
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.exportUwm = function(startOid, language, diagramFormat, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportUWM',
		startOid: startOid,
		language: language,
		diagramFormat: diagramFormat
	}, successHandler, errorHandler);
}
 
uwm.persistency.Json.prototype.exportImage = function(diagramOid, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportImage',
		diagramOid: diagramOid,
		language: language
	}, successHandler, errorHandler);
}
 
uwm.persistency.Json.prototype.getCodeGeneratorList = function(successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'generatorList'
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.generateCode = function(codeId, modelOid, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'generateCode',
		codeId: codeId,
		modelOid: modelOid
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.doContinue = function(controller, successHandler, errorHandler) {
	this.jsonRequest({
		controller: controller,
		usr_action: 'continue'
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.exportUcDomain = function(startOid, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportUcDomain',
		startOid: startOid,
		language: language
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.exportUcDocumentation = function(startOid, language, templateName, exportFormat, diagramFormat, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportUcDocumentation',
		startOid: startOid,
		templateName: templateName,
		exportFormat: exportFormat,
		diagramFormat: diagramFormat,
		language: language
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.exportUcTestData = function(startOid, language, successHandler, errorHandler) {
	this.jsonRequest({
		usr_action: 'exportUcTestData',
		startOid: startOid,
		language: language
	}, successHandler, errorHandler);
}

uwm.persistency.Json.prototype.executeActionSet = function(actionSet) {
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
				jsonRequest.newtype = currRequest.uwmClassName;
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
				changeNode.type = uwm.Util.getUwmClassNameFromOid(currRequest.oid);
				changeNode.values = {};
				changeNode.values[1] = {};
				
				for (var i in currRequest.values) {
					if (!(currRequest.values[i] instanceof Function)) {
						changeNode.values[1][i] = currRequest.values[i];
					}
				}
				
				jsonRequest[currRequest.oid] = changeNode;
				break;
				
			case "copy":
				jsonRequest.oid = currRequest.oid;
				jsonRequest.targetoid = currRequest.targetOid;
				jsonRequest.recursive = currRequest.recursive;
				break;
				
			case "sortup":
			case "sortdown":
				jsonRequest.sortoid = currRequest.sortoid;
				jsonRequest.dist = currRequest.dist;
				jsonRequest.poid = currRequest.poid;
				break;
				
			case "display":
				jsonRequest.oid = currRequest.oid;
				jsonRequest.depth = currRequest.depth;
				jsonRequest.language = currRequest.language;
				jsonRequest.omitMetaData = true;
				jsonRequest.translateValues = true;
				break;
				
			case "batchdisplay":
				jsonRequest.oid = currRequest.oid;
				jsonRequest.language = currRequest.language;
				jsonRequest.omitMetaData = true;
				jsonRequest.translateValues = true;
				break;
				
			case "list":
				jsonRequest.type = currRequest.uwmClassName;
				jsonRequest.language = currRequest.language;
				jsonRequest.completeObjects = currRequest.completeObjects;
				break;
				
			case "listbox":
				jsonRequest.type = currRequest.type;
				jsonRequest.language = currRequest.language;
				break;
				
			case "autocomplete":
				jsonRequest.query = currRequest.query;
				jsonRequest.language = currRequest.language;
				break;
				
			case "loadChildren":
				jsonRequest.controller = "TreeViewController";
				jsonRequest.node = currRequest.oid;
				jsonRequest.sort = currRequest.sort;
				break;
				
			case "lock":
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "unlock":
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "createMapping":
				jsonRequest.sourceOid = currRequest.sourceOid;
				jsonRequest.sourceNodeOid = currRequest.sourceNodeOid;
				jsonRequest.targetOid = currRequest.targetOid;
				break;
				
			case "deleteMapping":
				jsonRequest.targetOid = currRequest.targetOid;
				break;
				
			case "log":
				jsonRequest.logtype = currRequest.logtype;
				jsonRequest.msg = currRequest.msg;
				break;
				
			case "packdiagr":
				jsonRequest.controller = "PackageDiagramController";
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "usecasectrl":
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "actsdiagr":
				jsonRequest.controller = "ActivitySetDiagramController";
				jsonRequest.oid = currRequest.oid;
				break;
				
			case "templatelist":
				jsonRequest.controller = "TemplateListController";
				jsonRequest.scope = currRequest.scope;
				break;
				
			case "loadInheritedAttributes":
				jsonRequest.controller = "InheritanceController";
				jsonRequest.node = currRequest.node;
				break;
				
			case "doesClassContainAttribute":
				jsonRequest.controller = "InheritanceController";
				jsonRequest.node = currRequest.node;
				jsonRequest.attribute = currRequest.attribute;
				break;
				
			default:
				uwm.Util.showMessage("Programming Error", "Unknown action in ActionSet: " + currRequest.action, uwm.Util.messageType.ERROR);
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