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
	this.baseUrl = chi.Config.getInstance().jsonUrl;
	this.timeout = chi.Config.getInstance().ajaxTimeout;
};

Ext.extend(chi.persistency.DionysosJson, chi.persistency.Persistency);

chi.persistency.DionysosJson.prototype.jsonRequest = function(params, successHandler, errorHandler, getRecordHandler, requestParams) {
	params.sid = this.getSid();

	var self = this;

	var request = {};
	request.url = this.baseUrl;
	request.method = "post";
	request.localParams = params;
	request.timeout = this.timeout;
	request.headers = {
		'session_id' : params.sid
	};
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
	
	// override defaults with custom request parameters
	request = Ext.apply(request, requestParams);

	return Ext.Ajax.request(request);
};

chi.persistency.DionysosJson.prototype.getSid = function() {
	if (!this.sid) {
		this.sid = chi.Session.getInstance().getSid();
	}

	return this.sid;
};

chi.persistency.DionysosJson.prototype.readObject = function(data) {
	var result = null;

	var chiModelElementId = data["className"];
	var oid = data["oid"];

	if (!data.isReference) {
		var values = {};

		for ( var attributeName in data.attributes) {
			var attributeValue = data.attributes[attributeName];

			if (!(attributeValue instanceof Function)) {
				if (Ext.isArray(attributeValue)) {
					values[attributeName] = this.readObjectList(attributeValue);
				} else if (Ext.isObject(attributeValue)) {
					values[attributeName] = this.readObject(attributeValue);
				} else {
					values[attributeName] = attributeValue;
				}
			}
		}

		result = chi.model.ModelDescriptionContainer.getInstance().getDescription(chiModelElementId).createInstance(oid, values);
	} else {
		result = new chi.model.ModelReference(oid);
	}

	return result;
};

/**
 * Read an object list from json data and returns them.
 * @param {Array} list The list of objects from the json response
 * @return {Array}
 */
chi.persistency.DionysosJson.prototype.readObjectList = function(list) {
	var result = [];
	for ( var i = 0; i < list.length; i++) {
		var currArrayEntry = list[i];

		if (Ext.isObject(currArrayEntry)) {
			result.push(this.readObject(currArrayEntry));
		} else {
			result = currArrayEntry;
		}
	}
	return result;
};

chi.persistency.DionysosJson.prototype.cancelRequest = function(transactionId) {
	Ext.Ajax.abort(transactionId);
};

chi.persistency.DionysosJson.prototype.login = function(user, password, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "login",
	    user : user,
	    password : password
	}, successHandler, errorHandler, this.loginRecordHandler);
};

chi.persistency.DionysosJson.prototype.loginRecordHandler = function(handler, options, data) {
	return {
	    user : options.localParams.user,
	    password : options.localParams.password,
	    sid : data.sid,
	    roles : data.roles,
	    implementedPackages : data.implementedPackages
	};
};

chi.persistency.DionysosJson.prototype.logout = function(successHandler, errorHandler) {
	return this.jsonRequest( {
		action : "logout"
	}, successHandler, errorHandler, this.logoutRecordHandler);
};

chi.persistency.DionysosJson.prototype.logoutRecordHandler = function(handler, options, data) {
	return {};
};

chi.persistency.DionysosJson.prototype.list = function(chiModelElementId, limit, offset, sortAttributeName, sortDirection, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "list",
	    className : chiModelElementId,
	    limit : limit,
	    offset : offset,
	    sortFieldName : sortAttributeName,
	    sortDirection : sortDirection
	}, successHandler, errorHandler, this.listRecordHandler);
};

chi.persistency.DionysosJson.prototype.listRecordHandler = function(handler, options, data) {
	return {
	    chiModelElementId : options.localParams.className,
	    limit : options.localParams.limit,
	    offset : options.localParams.offset,
	    sortAttributeName : options.localParams.sortFieldName,
	    sortDirection : options.localParams.sortDirection,
	    records : this.createListRecords(data.list),
	    totalCount : data.totalCount
	};
};

chi.persistency.DionysosJson.prototype.createListRecords = function(data) {
	var records = [];

	for ( var i = 0; i < data.length; i++) {
		records.push(this.readObject(data[i]));
	}

	return records;
};

chi.persistency.DionysosJson.prototype.read = function(oid, depth, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "read",
	    oid : oid,
	    depth : depth
	}, successHandler, errorHandler, this.readRecordHandler);
};

chi.persistency.DionysosJson.prototype.readRecordHandler = function(handler, options, data) {
	return {
	    oid : data.oid,
	    depth : options.localParams.depth,
	    record : this.readObject(data.object)
	};
};

chi.persistency.DionysosJson.prototype.update = function(oid, attributes, successHandler, errorHandler) {
	attributes = this.convertUpdateFormats(attributes);

	return this.jsonRequest( {
	    action : "update",
	    oid : oid,
	    attributes : attributes
	}, successHandler, errorHandler, this.updateRecordHandler);
};

chi.persistency.DionysosJson.prototype.convertUpdateFormats = function(attributes) {
	for ( var key in attributes) {
		var val = attributes[key];
		
		if (val instanceof Date) {
			attributes[key] = val.format("Y-m-d H:i:s");
		}
		else {
			// replace "
			attributes[key] = val.replace(/"/g, '\\"');
		}
	}
	return attributes;
};

chi.persistency.DionysosJson.prototype.updateRecordHandler = function(handler, options, data) {
	return {
	    oid : data.oid,
	    attributes : options.localParams.attributes
	};
};

chi.persistency.DionysosJson.prototype.create = function(chiModelElementId, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "create",
	    className : chiModelElementId
	}, successHandler, errorHandler, this.createRecordHandler);
};

chi.persistency.DionysosJson.prototype.createRecordHandler = function(handler, options, data) {
	return {
	    chiModelElementId : options.localParams.chiModelElementId,
	    oid : data.oid
	};
};

chi.persistency.DionysosJson.prototype.destroy = function(oid, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "delete",
	    oid : oid
	}, successHandler, errorHandler, this.destroyRecordHandler);
};

chi.persistency.DionysosJson.prototype.destroyRecordHandler = function(handler, options, data) {
	return {
		oid : data.oid
	};
};

chi.persistency.DionysosJson.prototype.associate = function(sourceOid, targetOid, role, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "associate",
	    sourceOid : sourceOid,
	    targetOid : targetOid,
	    role : role
	}, successHandler, errorHandler, this.associateRecordHandler);
};

chi.persistency.DionysosJson.prototype.associateRecordHandler = function(handler, options, data) {
	return {
	    sourceOid : data.sourceOid,
	    targetOid : data.targetOid,
	    role : options.localParams.role
	};
};

chi.persistency.DionysosJson.prototype.disassociate = function(sourceOid, targetOid, role, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "disassociate",
	    sourcOid : sourceOid,
	    targetOid : targetOid,
	    role : role
	}, successHandler, errorHandler, this.disassociateRecordHandler);
};

chi.persistency.DionysosJson.prototype.disassociateRecordHandler = function(handler, options, data) {
	return {
	    sourceOid : data.sourceOid,
	    targetOid : data.targetOid,
	    role : options.localParams.role
	};
};

chi.persistency.DionysosJson.prototype.log = function(type, message, successHandler, errorHandler) {
	return this.jsonRequest( {
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
};

chi.persistency.DionysosJson.prototype.logRecordHandler = function(handler, options, data) {
	return {
	    type : options.localParams.type,
	    message : options.localParams.message
	};
};

chi.persistency.DionysosJson.prototype.search = function(query, chiModelElementId, limit, offset, sortByRelevance, sortAttributeName, sortDirection, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "search",
	    query : query,
	    className : chiModelElementId,
	    limit : limit,
	    offset : offset,
	    sortByRelevance : sortByRelevance,
	    sortFieldName : sortAttributeName,
	    sortDirection : sortDirection
	}, successHandler, errorHandler, this.searchRecordHandler);
};

chi.persistency.DionysosJson.prototype.searchRecordHandler = function(handler, options, data) {
	return {
	    chiModelElementId : options.localParams.className,
	    limit : options.localParams.limit,
	    offset : options.localParams.offset,
	    sortByRelevance : options.localParams.sortByRelevance,
	    sortAttributeName : options.localParams.sortFieldName,
	    sortDirection : options.localParams.sortDirection,
	    records : this.createListRecords(data.list),
	    totalCount : data.totalCount,
	    searchData : data.searchData,
	    maxRelevance : data.maxRelevance
	};
};

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
					jsonRequest.className = currRequest.chiModelElementId;
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
					jsonRequest.attributes = this.convertUpdateFormats(currRequest.attributes);
					recordHandler = this.updateRecordHandler;
					break;

				case "create":
					jsonRequest.action = "create";
					jsonRequest.className = currRequest.chiModelElementId;
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
					recordHandler = this.associateRecordHandler;
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

				case "createChild":
					jsonRequest.action = "createChild";
					jsonRequest.parentOid = currRequest.parentOid;
					jsonRequest.childRole = currRequest.childRole;
					recordHandler = this.createChildRecordHandler;
					break;

				case "search":
					jsonRequest.action = "search";
					jsonRequest.query = currRequest.query;
					jsonRequest.className = currRequest.chiModelElementId;
					jsonRequest.limit = currRequest.limit;
					jsonRequest.offset = currRequest.offset;
					jsonRequest.sortByRelevance = currRequest.sortByRelevance;
					jsonRequest.sortFieldName = currRequest.sortAttributeName;
					jsonRequest.sortDirection = currRequest.sortDirection;
					recordHandler = this.searchRecordHandler;
					break;

				default:
					throw "Unknown action in ActionSet: " + currRequest.action;
			}
			data[currActionName] = jsonRequest;
			recordHandlers[currActionName] = recordHandler;
		}
	}

	var responseHandler = function(data, actionName) {
    	if (data.resultSet) {
			return data.resultSet[actionName];
    	}
    	return null;
	};

	return this.jsonRequest( {
	    action : "executeActionSet",
	    actionSet : data
	}, function(data) {
		data.request.actionSet.successHandler(data.request, data.data, responseHandler);
	}, function(data, errorMessage) {
		data.request.actionSet.errorHandler(data.request, data.data, responseHandler, errorMessage);
	}, function(handler, options, data) {
		return {
		    request : options,
		    data : data
		};
	}, {
	    recordHandlers : recordHandlers,
	    actionSet : actionSet
	});
};

chi.persistency.DionysosJson.prototype.createChild = function(parentOid, childRole, successHandler, errorHandler) {
	return this.jsonRequest( {
	    action : "createChild",
	    parentOid : parentOid,
	    childRole : childRole
	}, successHandler, errorHandler, this.createChildRecordHandler);
};

chi.persistency.DionysosJson.prototype.createChildRecordHandler = function(handler, options, data) {
	return {
	    parentOid : options.localParams.parentOid,
	    childRole : options.localParams.childRole,
	    childOid : data.childOid
	};
};

chi.persistency.DionysosJson.Handler = {
    SUCCESS : 0,
    ERROR : 1,
    ERROR_STATUS : 2
};
