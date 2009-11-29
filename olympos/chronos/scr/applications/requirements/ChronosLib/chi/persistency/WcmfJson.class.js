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
	this.baseUrl = chi.Config.getInstance().jsonUrl;
	this.timeout = 180000;
}

Ext.extend(chi.persistency.WcmfJson, chi.persistency.Persistency);

chi.persistency.WcmfJson.prototype.jsonRequest = function(params, successHandler, errorHandler, getRecordHandler) {
	params.sid = this.getSid();
	// params.request_format = "JSON";
	params.response_format = "JSON";
	
	var self = this;
	
	Ext.Ajax.request( {
		url : this.jsonUrl,
		method : "post",
		timeout : this.timeout,
		headers: {
			'session_id': params.sid
		},
		params : params,
		callback : function(options, success, response) {
			if (success) {
				var data = Ext.util.JSON.decode(response.responseText);
				
				if (!data.errorMsg) {
					self.processSuccessHandler(successHandler, getRecordHandler.call(self, chi.persistency.WcmfJson.Handler.SUCCESS, options, data));
				} else {
					self.processErrorHandler(errorHandler, getRecordHandler.call(self, chi.persistency.WcmfJson.Handler.SUCCESS_ERROR, options, data), data.errorMsg);
				}
			} else {
				self.processErrorHandler(errorHandler, getRecordHandler.call(self, chi.persistency.WcmfJson.Handler.ERROR, options, data));
			}
		}
	});
}

chi.persistency.WcmfJson.prototype.array2CommaList = function(array) {
	var result = array;
	
	if (array instanceof Array) {
		var first = true;
		result = "";
		
		for ( var i = 0; i < array.length; i++) {
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

chi.persistency.WcmfJson.prototype.getSid = function() {
	if (!this.sid) {
		this.sid = chi.Session.getInstance().getSid();
	}
	
	return this.sid;
}

chi.persistency.WcmfJson.prototype.readObject = function(data) {
	var chiModelElementId = data.type;
	
	var values = {};
	
	for ( var attributeName in data.values[1]) {
		var attributeValue = data.values[1][attributeName];
		
		if (!(attributeValue instanceof Function)) {
			values[attributeName] = attributeValue;
		}
	}
	
	var children = this.groupOidList(data.properties.childoids);
	var parents = this.groupOidList(data.properties.parentoids);
	
	values = this.createReferences("child", children, values);
	values = this.createReferences("parent", parents, values);
	
	values.oid = data.oid;
	
	var record = new chi.model.ModelRecord(chi.model.ModelClassContainer.getInstance().getClass(chiModelElementId), values);
	
	return record;
	
}

chi.persistency.WcmfJson.prototype.groupOidList = function(list) {
	var result = {};
	
	if (list) {
		for ( var i = 0; i < list.length; i++) {
			var currOid = list[i];
			var currModelElementId = chi.Util.getClassNameFromOid(currOid);
			
			if (!result[currModelElementId]) {
				result[currModelElementId] = [];
			}
			
			result[currModelElementId].push(currOid);
		}
	}
	
	return result;
}

chi.persistency.WcmfJson.prototype.createReferences = function(prefix, list, data) {
	
	for ( var currChiModelElementId in list) {
		var currOidList = list[currChiModelElementId];
		
		if (!(currOidList instanceof Function)) {
			var currEntry = new chi.model.ModelReferenceList(chi.model.ModelClassContainer.getInstance().getClass(currChiModelElementId));
			
			for ( var i = 0; i < currOidList.length; i++) {
				currEntry.add(new chi.model.ModelReference(currOidList[i]));
			}
		}
		
		var propertyName = prefix + currChiModelElementId;
		
		data[propertyName] = currEntry;
	}
	
	return data;
}

chi.persistency.WcmfJson.prototype.login = function(user, password, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "dologin",
		login : user,
		password : password
	}, successHandler, errorHandler, this.loginRecordHandler);
}

chi.persistency.WcmfJson.prototype.loginRecordHandler = function(handler, options, data) {
	return {
		user : options.params.login,
		password : options.params.password,
		sid : data.sid
	};
}

chi.persistency.WcmfJson.prototype.logout = function(successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "logout"
	}, successHandler, errorHandler, this.logoutRecordHandler);
}

chi.persistency.WcmfJson.prototype.logoutRecordHandler = function(handler, options, data) {
	return {};
}

chi.persistency.WcmfJson.prototype.list = function(chiModelElementId, limit, offset, sortAttributeName, sortDirection, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "list",
		type : chiModelElementId,
		limit : limit,
		start : offset,
		sort : sortAttributeName,
		dir : sortDirection,
		completeObjects: true
	}, successHandler, errorHandler, this.listRecordHandler);
}

chi.persistency.WcmfJson.prototype.listRecordHandler = function(handler, options, data) {
	return {
		chiModelElementId : options.params.type,
		limit : options.params.limit,
		offset : options.params.start,
		sortAttributeName : options.params.sort,
		sortDirection : options.params.dir,
		records : this.createListRecords(data),
		totalCount : data.totalCount
	};
}

chi.persistency.WcmfJson.prototype.createListRecords = function(data) {
	var records = [];
	
	for ( var i = 0; i < data.objects.length; i++) {
		records.push(this.readObject(data.objects[i]));
	}
	
	return records;
}

chi.persistency.WcmfJson.prototype.load = function(oid, depth, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "display",
		oid : oid,
		depth : depth,
		omitMetaData : true,
		translateValues : false
	}, successHandler, errorHandler, this.loadRecordHandler);
}

chi.persistency.WcmfJson.prototype.loadRecordHandler = function(handler, options, data) {
	return {
		oid : options.params.oid,
		depth : options.params.depth,
		records : this.createLoadRecords(data)
	};
}

chi.persistency.WcmfJson.prototype.createLoadRecords = function(data) {
	var records = {};
	
	var node = data.node;
	
	var furtherElements = true;
	
	var outstandingNodes = new Ext.util.MixedCollection();
	
	while (furtherElements) {
		var chiModelElementId = node.type;
		var origOid = node.oid;
		
		records[origOid] = this.readObject(node);
		
		for ( var i in node) {
			if (i != "values" && i != "oid" && i != "type" && i != "properties" && !(node[i] instanceof Function)) {
				var container = node[i];
				
				for ( var j = 0; j < container.length; j++) {
					outstandingNodes.add(container[j].oid, container[j]);
				}
			}
		}
		
		outstandingNodes.removeKey(origOid);
		
		furtherElements = outstandingNodes.getCount() > 0;
		
		node = outstandingNodes.first();
	}
	
	return records;
}

chi.persistency.WcmfJson.prototype.save = function(oid, values, successHandler, errorHandler) {
	
	/*
	 * var request = {};
	 * 
	 * request.usr_action = "save";
	 * 
	 * var node = {};
	 * 
	 * node.oid = oid; node.type = chi.Util.getClassNameFromOid(oid);
	 * node.values = {}; node.values[1] = {};
	 * 
	 * for ( var i in values) { if (!(values[i] instanceof Function)) {
	 * node.values[1][i] = values[i]; } }
	 * 
	 * request[oid] = Ext.util.JSON.encode(node);
	 */
	var data = {
		usr_action : "save"
	};
	
	for ( var i in values) {
		if (!(values[i] instanceof Function)) {
			data["value--" + i + "-" + oid] = values[i];
		}
	}
	
	this.jsonRequest(data, successHandler, errorHandler, this.saveRecordHandler);
}

chi.persistency.WcmfJson.prototype.saveRecordHandler = function(handler, options, data) {
	return {
	// oid : options.params.oid,
	// values : options.params.values[1]
	};
}

chi.persistency.WcmfJson.prototype.create = function(chiModelElementId, values, successHandler, errorHandler) {
	var data = {
		usr_action : "new",
		newtype : chiModelElementId
	};
	
	// FIXME: Workaround for immediately saving values
	var self = this;
	
	this.jsonRequest(data, function(innerData) {
		self.save(innerData.newOid, values, function() {
			self.processSuccessHandler(successHandler, innerData);
		}, errorHandler);
	}, errorHandler, this.createRecordHandler);
}

chi.persistency.WcmfJson.prototype.createRecordHandler = function(handler, options, data) {
	return {
		chiModelElementId : options.params.newtype,
		newOid : data.oid
	};
}

chi.persistency.WcmfJson.prototype.destroy = function(oid, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "delete",
		deleteoids : oid
	}, successHandler, errorHandler, this.destroyRecordHandler);
}

chi.persistency.WcmfJson.prototype.destroyRecordHandler = function(handler, options, data) {
	return {
		oid : options.params.deleteoids
	};
}

chi.persistency.WcmfJson.prototype.associate = function(parentOid, childOid, role, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "associate",
		oid : parentOid,
		associateoids : childOid,
		associateAs : "child",
		role : role
	}, successHandler, errorHandler, this.associateRecordHandler);
}

chi.persistency.WcmfJson.prototype.associateRecordHandler = function(handler, options, data) {
	return {
		parentOid : options.params.oid,
		childOid : options.params.associateoids,
		role : options.params.role
	};
}

chi.persistency.WcmfJson.prototype.disassociate = function(parentOid, childOid, role, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "disassociate",
		oid : parentOid,
		associateoids : childOid,
		role : role
	}, successHandler, errorHandler, this.disassociateRecordHandler);
}

chi.persistency.WcmfJson.prototype.disassociateRecordHandler = function(handler, options, data) {
	return {
		parentOid : options.params.oid,
		childOid : options.params.associateoids,
		role : options.params.role
	};
}

chi.persistency.WcmfJson.prototype.lock = function(oid, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "lock",
		oid : oid
	}, successHandler, errorHandler, this.lockRecordHandler);
}

chi.persistency.WcmfJson.prototype.lockRecordHandler = function(handler, options, data) {
	return {
		oid : options.params.oid
	};
}

chi.persistency.WcmfJson.prototype.unlock = function(oid, successHandler, errorHandler) {
	this.jsonRequest( {
		usr_action : "unlock",
		oid : oid
	}, successHandler, errorHandler, this.unlockRecordHandler);
}

chi.persistency.WcmfJson.prototype.unlockRecordHandler = function(handler, options, data) {
	return {
		oid : options.params.oid
	};
}

chi.persistency.WcmfJson.prototype.log = function(logtype, message, successHandler, errorHandler) {
	var self = this;
	
	this.jsonRequest( {
		usr_action : "log",
		logtype : logtype,
		msg : message
	}, successHandler, function(request, data, errorMessage) {
		if (errorMessage) {
			self.processSuccessHandler(successHandler);
		} else {
			self.processErrorHandler(errorHandler, request, data);
		}
	}, this.logRecordHandler);
}

chi.persistency.WcmfJson.prototype.logRecordHandler = function(handler, options, data) {
	return {
		logtype : options.params.logtype,
		message : options.params.msg
	};
}

chi.persistency.WcmfJson.prototype.executeActionSet = function(actionSet) {
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
					jsonRequest.usr_action = "dologin";
					jsonRequest.login = currRequest.user;
					jsonRequest.password = currRequest.password;
					recordHandler = function(handler, request, data) {
						return {
							user : request.user,
							password : request.password,
							sid : data.sid
						};
					};
					break;
				
				case "logout":
					jsonRequest.usr_action = "logout";
					recordHandler = function(handler, request, data) {
						return {};
					};
					break;
				
				case "list":
					jsonRequest.usr_action = "list";
					jsonRequest.type = currRequest.chiModelElementId;
					jsonRequest.limit = currRequest.limit;
					jsonRequest.start = currRequest.offset;
					jsonRequest.sort = currRequest.sortAttributeName;
					jsonRequest.dir = currRequest.sortDirection;
					jsonRequest.completeObjects = true;
					recordHandler = function(handler, request, data) {
						return {
							chiModelElementId : request.chiModelElementId,
							limit : request.limit,
							offset : request.offset,
							sortAttributeName : request.sortAttributeName,
							sortDirection : request.sortDirection,
							records : self.createListRecords(data),
							totalCount : data.totalCount
						};
					};
					break;
				
				case "load":
					jsonRequest.usr_action = "display";
					jsonRequest.oid = currRequest.oid;
					jsonRequest.depth = currRequest.depth;
					jsonRequest.omitMetaData = true;
					jsonRequest.translateValues = false;
					recordHandler = function(handler, request, data) {
						return {
							oid : request.oid,
							depth : request.depth,
							records : self.createLoadRecords(data)
						};
					};
					break;
				
				case "save":

					var changeNode = {};
					
					changeNode.oid = currRequest.oid;
					changeNode.type = chi.Util.getClassNameFromOid(currRequest.oid);
					changeNode.values = {};
					changeNode.values["1"] = {};
					
					for ( var i in currRequest.values) {
						if (!(currRequest.values[i] instanceof Function)) {
							changeNode.values["1"][i] = currRequest.values[i];
						}
					}
					
					jsonRequest.usr_action = "save";
					jsonRequest[currRequest.oid] = changeNode;
					recordHandler = function(handler, request, data) {
						return {

						};
					};
					break;
				
				case "create":
					jsonRequest.usr_action = "new";
					jsonRequest.newtype = currRequest.chiModelElementId;
					jsonRequest.values = {};
					jsonRequest.values[1] = currRequest.values;
					recordHandler = function(handler, request, data) {
						return {
							chiModelElementId : request.chiModelElementId,
							newOid : data.oid
						};
					};
					break;
				
				case "destroy":
					jsonRequest.usr_action = "delete";
					jsonRequest.deleteoids = currRequest.oid;
					recordHandler = function(handler, request, data) {
						return {
							oid : request.oid
						};
					};
					break;
				
				case "associate":
					jsonRequest.usr_action = "associate";
					jsonRequest.oid = currRequest.parentOid;
					jsonRequest.associateoids = this.array2CommaList(currRequest.childOid);
					jsonRequest.associateAs = "child";
					recordHandler = function(handler, request, data) {
						return {
							parentOid : request.parentOid,
							childOid : request.childOid,
							role : request.role
						};
					};
					break;
				
				case "disassociate":
					jsonRequest.usr_action = "disassociate";
					jsonRequest.oid = currRequest.parentOid;
					jsonRequest.associateoids = currRequest.childOid;
					recordHandler = function(handler, request, data) {
						return {
							parentOid : request.parentOid,
							childOid : request.childOid,
							role : request.role
						};
					};
					break;
				
				case "lock":
					jsonRequest.usr_action = "lock";
					jsonRequest.oid = currRequest.oid;
					recordHandler = function(handler, request, data) {
						return {
							oid : request.oid
						};
					};
					break;
				
				case "unlock":
					jsonRequest.usr_action = "unlock";
					jsonRequest.oid = currRequest.oid;
					recordHandler = function(handler, request, data) {
						return {
							oid : request.oid
						};
					};
					break;
				
				case "log":
					jsonRequest.usr_action = "log";
					jsonRequest.logtype = currRequest.logtype;
					jsonRequest.msg = currRequest.message;
					recordHandler = function(handler, request, data) {
						return {
							logtype : request.logtype,
							message : request.message
						};
					};
					break;
				
				default:
					throw "Unknown action in ActionSet: " + currRequest.action;
			}
			data[currActionName] = jsonRequest;
			recordHandlers[currActionName] = recordHandler;
		}
	}
	
	var responseHandler = function(data, actionName) {
		return data.data[actionName];
	}

	this.jsonRequest( {
		controller : "TerminateController",
		usr_action : "multipleAction",
		request_format : "JSON",
		data : Ext.encode(data),
		actionSet : actionSet,
		recordHandlers : recordHandlers
	}, function(data) {
		data.request.recordHandlers = data.request.params.recordHandlers;
		data.request.params.actionSet.successHandler(data.request, data.data, responseHandler);
	}, function(data, errorMessage) {
		data.request.params.actionSet.errorHandler(data, errorMessage);
	}, function(handler, options, data) {
		return {
			request : options,
			data : data
		}
	});
}

chi.persistency.WcmfJson.Handler = {
	SUCCESS : 0,
	SUCCESS_ERROR : 1,
	ERROR : 2
}
