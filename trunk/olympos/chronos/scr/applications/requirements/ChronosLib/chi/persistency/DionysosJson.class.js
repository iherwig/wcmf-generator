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
Ext.namespace("chi.persistency");

/**
 * @class Implements persistency against a backend compliant to Dionysos JSON
 *        spec.
 * 
 * @extends chi.persistency.Persistency.
 * @constructor
 */
chi.persistency.DionysosJson = function() {
	this.baseUrl = "../gui";
	this.timeout = 180000;
}

Ext.extend(chi.persistency.DionysosJson, chi.persistency.Persistency);

chi.persistency.DionysosJson.prototype.jsonRequest = function(params, successHandler, errorHandler, getRecordHandler, requestParams) {
	params.sid = this.getSid();
	
	var self = this;
	
	var request = requestParams || {};
	
	request.url = this.baseUrl;
	request.method = "post";
	request.localParams = params;
	request.timeout = this.timeout;
	request.headers = {'session_id': params.sid};
	request.jsonData = Ext.util.JSON.encode(params);
	request.callback = function(options, success, response) {
		if (success) {
			var data = Ext.util.JSON.decode(response.responseText);
			
			if (!data.errorCode) {
				self.processSuccessHandler(successHandler, getRecordHandler.call(self, chi.persistency.DionysosJson.Handler.SUCCESS, options, data));
			} else {
				self.processErrorHandler(errorHandler, getRecordHandler.call(self, chi.persistency.DionysosJson.Handler.ERROR, options, data), data.errorMessage);
			}
		} else {
			self.processErrorHandler(errorHandler, getRecordHandler.call(self, chi.persistency.DionysosJson.Handler.ERROR_STATUS, options, data));
		}
	};
	
	Ext.Ajax.request(request);
}

chi.persistency.DionysosJson.prototype.getSid = function() {
	if (!this.sid) {
		this.sid = chi.Session.getInstance().getSid();
	}
	
	return this.sid;
}

chi.persistency.DionysosJson.prototype.readObject = function(data) {
	var result = null;
	
	var cweModelElementId = data["className"];
	var oid = data["oid"];
	
	if (!data.isReference) {
		var values = {};
		
		for ( var attributeName in data.attributes) {
			var attributeValue = data.attributes[attributeName];
			
			if (!(attributeValue instanceof Function)) {
				if (Ext.isArray(attributeValue)) {
					values[attributeName] = [];
					
					for ( var i = 0; i < attributeValue.length; i++) {
						var currArrayEntry = attributeValue[i];
						
						if (Ext.isObject(currArrayEntry)) {
							values[attributeName].push(this.readObject(currArrayEntry));
						} else {
							values[attributeName] = currArrayEntry;
						}
					}
				} else if (Ext.isObject(attributeValue)) {
					values[attributeName] = this.readObject(attributeValue);
				} else {
					values[attributeName] = attributeValue;
				}
			}
		}
		
		result = new cwe.model.ModelRecord(cwe.model.ModelClassContainer.getInstance().getClass(cweModelElementId), oid, values);
	} else {
		result = new cwe.model.ModelReference(oid);
	}
	
	return result;
}

chi.persistency.DionysosJson.prototype.login = function(user, password, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "login",
	    user : user,
	    password : password
	}, successHandler, errorHandler, this.loginRecordHandler);
}

chi.persistency.DionysosJson.prototype.loginRecordHandler = function(handler, options, data) {
	return {
	    user : options.localParams.user,
	    password : options.localParams.password,
	    sid : data.sid,
	    roles : data.roles,
	    implementedPackages : data.implementedPackages
	};
}

chi.persistency.DionysosJson.prototype.logout = function(successHandler, errorHandler) {
	this.jsonRequest( {
		action : "logout"
	}, successHandler, errorHandler, this.logoutRecordHandler);
}

chi.persistency.DionysosJson.prototype.logoutRecordHandler = function(handler, options, data) {
	return {};
}

chi.persistency.DionysosJson.prototype.list = function(cweModelElementId, limit, offset, sortAttributeName, sortDirection, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "list",
	    className : cweModelElementId,
	    limit : limit,
	    offset : offset,
	    sortFieldName : sortAttributeName,
	    sortDirection : sortDirection
	}, successHandler, errorHandler, this.listRecordHandler);
}

chi.persistency.DionysosJson.prototype.listRecordHandler = function(handler, options, data) {
	return {
	    cweModelElementId : options.localParams.className,
	    limit : options.localParams.limit,
	    offset : options.localParams.offset,
	    sortAttributeName : options.localParams.sortFieldName,
	    sortDirection : options.localParams.sortDirection,
	    records : this.createListRecords(data.list),
	    totalCount : data.totalCount
	};
}

chi.persistency.DionysosJson.prototype.createListRecords = function(data) {
	var records = [];
	
	for ( var i = 0; i < data.length; i++) {
		records.push(this.readObject(data[i]));
	}
	
	return records;
}

chi.persistency.DionysosJson.prototype.read = function(oid, depth, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "read",
	    oid : oid,
	    depth : depth
	}, successHandler, errorHandler, this.readRecordHandler);
}

chi.persistency.DionysosJson.prototype.readRecordHandler = function(handler, options, data) {
	return {
	    oid : data.oid,
	    depth : options.localParams.depth,
	    record : this.readObject(data.object)
	};
}

chi.persistency.DionysosJson.prototype.update = function(oid, attributes, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "update",
	    oid : oid,
	    attributes : attributes
	}, successHandler, errorHandler, this.updateRecordHandler);
}

chi.persistency.DionysosJson.prototype.updateRecordHandler = function(handler, options, data) {
	return {
	    oid : data.oid,
	    attributes : options.localParams.attributes
	};
}

chi.persistency.DionysosJson.prototype.create = function(cweModelElementId, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "create",
	    className : cweModelElementId
	}, successHandler, errorHandler, this.createRecordHandler);
}

chi.persistency.DionysosJson.prototype.createRecordHandler = function(handler, options, data) {
	return {
	    cweModelElementId : options.localParams.className,
	    oid : data.oid
	};
}

chi.persistency.DionysosJson.prototype.destroy = function(oid, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "delete",
	    oid : oid
	}, successHandler, errorHandler, this.destroyRecordHandler);
}

chi.persistency.DionysosJson.prototype.destroyRecordHandler = function(handler, options, data) {
	return {
		oid : data.oid
	};
}

chi.persistency.DionysosJson.prototype.associate = function(sourceOid, targetOid, role, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "associate",
	    sourceOid : sourceOid,
	    targetOid : targetOid,
	    role : role
	}, successHandler, errorHandler, this.associateRecordHandler);
}

chi.persistency.DionysosJson.prototype.associateRecordHandler = function(handler, options, data) {
	return {
	    sourceOid : data.sourceOid,
	    targetOid : data.targetOid,
	    role : options.localParams.role
	};
}

chi.persistency.DionysosJson.prototype.disassociate = function(sourceOid, targetOid, role, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "disassociate",
	    sourcOid : sourceOid,
	    targetOid : targetOid,
	    role : role
	}, successHandler, errorHandler, this.disassociateRecordHandler);
}

chi.persistency.DionysosJson.prototype.disassociateRecordHandler = function(handler, options, data) {
	return {
	    sourceOid : data.sourceOid,
	    targetOid : data.targetOid,
	    role : options.localParams.role
	};
}

chi.persistency.DionysosJson.prototype.log = function(type, message, successHandler, errorHandler) {
	this.jsonRequest( {
	    action : "log",
	    type : type,
	    message : message
	}, successHandler, function(request, data, errorMessage) {
		if (errorMessage) {
			self.processSuccessHandler(successHandler);
		} else {
			self.processErrorHandler(errorHandler, request, data);
		}
	}, this.logRecordHandler);
}

chi.persistency.DionysosJson.prototype.logRecordHandler = function(handler, options, data) {
	return {
	    type : options.localParams.type,
	    message : options.localParams.message
	};
}

chi.persistency.DionysosJson.prototype.executeActionSet = function(actionSet) {
	var data = {};
	var recordHandlers = {};
	
	var requests = actionSet.getRequests();
	
	var self = this;
	
	for ( var currActionName in requests) {
		var currRequest = requests[currActionName];
		
		if (!(currRequest instanceof Function)) {
			var jsonRequest = {};
			var recordHandler;
			
			switch (currRequest.action) {
				case "login":
					jsonRequest.action = "login";
					jsonRequest.user = currRequest.user;
					jsonRequest.password = currRequest.password;
					recordHandler = this.loginRecordHandler;
					break;
				
				case "logout":
					jsonRequest.action = "logout";
					recordHandler = this.logoutRecordHandler;
					break;
				
				case "list":
					jsonRequest.action = "list";
					jsonRequest.className = currRequest.cweModelElementId;
					jsonRequest.limit = currRequest.limit;
					jsonRequest.offset = currRequest.offset;
					jsonRequest.sortFieldName = currRequest.sortAttributeName;
					jsonRequest.sortDirection = currRequest.sortDirection;
					recordHandler = this.listRecordHandler;
					break;
				
				case "read":
					jsonRequest.action = "read";
					jsonRequest.oid = currRequest.oid;
					jsonRequest.depth = currRequest.depth;
					recordHandler = this.readRecordHandler;
					break;
				
				case "update":
					jsonRequest.action = "update";
					jsonRequest.oid = currRequest.oid;
					jsonRequest.attributes = currRequest.attributes;
					recordHandler = this.updateRecordHandler;
					break;
				
				case "create":
					jsonRequest.action = "create";
					jsonRequest.className = currRequest.cweModelElementId;
					recordHandler = this.createRecordHandler;
					break;
				
				case "destroy":
					jsonRequest.action = "delete";
					jsonRequest.oid = currRequest.oid;
					recordHandler = this.destroyRecordHandler;
					break;
				
				case "associate":
					jsonRequest.action = "associate";
					jsonRequest.sourceOid = currRequest.sourceOid;
					jsonRequest.targetOid = currRequest.targetOid;
					jsonRequest.role = currRequest.role;
					recordHandler = this.associateRecordHandler
					break;
				
				case "disassociate":
					jsonRequest.action = "disassociate";
					jsonRequest.sourceOid = currRequest.sourceOid;
					jsonRequest.targetOid = currRequest.targetOid;
					jsonRequest.role = currRequest.role;
					recordHandler = this.disassociateRecordHandler;
					break;
				
				case "log":
					jsonRequest.action = "log";
					jsonRequest.type = currRequest.type;
					jsonRequest.message = currRequest.message;
					recordHandler = this.logRecordHandler;
					break;
				
				default:
					throw "Unknown action in ActionSet: " + currRequest.action;
			}
			data[currActionName] = jsonRequest;
			recordHandlers[currActionName] = recordHandler;
		}
	}
	
	var responseHandler = function(data, actionName) {
		return data.resultSet[actionName];
	}

	this.jsonRequest( {
	    action : "executeActionSet",
	    actionSet : data
	}, function(data) {
		data.request.recordHandlers = data.request.recordHandlers;
		data.request.actionSet.successHandler(data.request, data.data, responseHandler);
	}, function(data, errorMessage) {
		data.request.params.actionSet.errorHandler(data, errorMessage);
	}, function(handler, options, data) {
		return {
		    request : options,
		    data : data
		}
	}, {
	    recordHandlers : recordHandlers,
	    actionSet : actionSet
	});
}

chi.persistency.DionysosJson.Handler = {
    SUCCESS : 0,
    ERROR : 1,
    ERROR_STATUS : 2
}