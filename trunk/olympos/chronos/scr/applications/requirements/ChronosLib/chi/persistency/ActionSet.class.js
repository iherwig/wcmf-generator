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
 * @class Combines several persistency calls to one backend request.
 * 
 * @constructor
 */
chi.persistency.ActionSet = function() {
	this.requests = {};
	this.currentId = 0;
}

chi.persistency.ActionSet.prototype.addLogin = function(user, password, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "login",
		user : user,
		password : password,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addLogout = function(successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "logout",
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addList = function(cweModelElementId, limit, offset, sortAttributeName, sortDirection, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "list",
		cweModelElementId : cweModelElementId,
		limit : limit,
		offset : offset,
		sortAttributeName : sortAttributeName,
		sortDirection : sortDirection,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addLoad = function(oid, depth, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "load",
		oid : oid,
		depth : depth,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addSave = function(oid, values, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "save",
		oid : oid,
		values : values,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addCreate = function(cweModelElementId, values, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "create",
		cweModelElementId : cweModelElementId,
		values : values,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addDestroy = function(oid, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "destroy",
		oid : oid,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addAssociate = function(parentOid, childOid, role, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "associate",
		parentOid : parentOid,
		childOid : childOid,
		role : role,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addDisassociate = function(parentOid, childOid, role, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "disassociate",
		parentOid : parentOid,
		childOid : childOid,
		role : role,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addLock = function(oid, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "lock",
		oid : oid,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addUnlock = function(oid, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "unlock",
		oid : oid,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.addLog = function(logtype, msg, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action : "log",
		logtype : logtype,
		msg : msg,
		successHandler : successHandler,
		errorHandler : errorHandler,
		errorLevel : errorLevel
	};
}

chi.persistency.ActionSet.prototype.commit = function(successHandler, errorHandler) {
	for ( var i in this.requests) {
		var val = this.requests[i];
		
		if (!(val instanceof Function)) {
			if (val.errorLevel) {
				val.errorLevel = chi.persistency.ActionSet.DEFAULT_ERROR_LEVEL;
			}
		}
	}
	
	this.savedSuccessHandler = successHandler;
	this.savedErrorHandler = errorHandler;
	
	chi.persistency.Persistency.getInstance().executeActionSet(this);
}

chi.persistency.ActionSet.prototype.getNextId = function() {
	var result = chi.persistency.ActionSet.ACTION_PREFIX + this.currentId;
	
	this.currentId++;
	
	return result;
}

chi.persistency.ActionSet.prototype.getRequests = function() {
	return this.requests;
}

chi.persistency.ActionSet.prototype.successHandler = function(request, data, getResponseHandler) {
	var errorLevel = null;
	
	var persistency = chi.persistency.Persistency.getInstance();
	
	for ( var currActionName in this.requests) {
		var currRequest = this.requests[currActionName];
		
		if (!(currRequest instanceof Function)) {
			var currResponse = getResponseHandler(data, currActionName);
			
			if (currResponse) {
				persistency.processSuccessHandler(currRequest.successHandler, request.recordHandlers[currActionName]("SUCCESS", currRequest, currResponse.data));
			} else {
				if (currRequest.errorLevel > errorLevel) {
					errorLevel = currRequest.errorLevel;
				}
				
				persistency.processErrorHandler(currRequest.errorHandler, request.recordHandlers[currActionName]("ERROR", currRequest, currResponse.data), currResponse.errorMsg);
				
				if (currRequest.errorLevel == chi.persistency.ActionSet.errorLevels.ERROR) {
					throw new Error(chi.Dict.translate("Critical Persistency Error") + ": " + currResponse.errorMsg);
				}
			}
		}
	}
	
	// currently, we do not react globally on errorLevels
	
	persistency.processSuccessHandler(this.savedSuccessHandler, data);
}

chi.persistency.ActionSet.prototype.errorHandler = function(data, errorMessage) {
	chi.persistency.Persistency.getInstance().processErrorHandler(this.savedErrorHandler, data, errorMessage);
}

chi.persistency.ActionSet.errorLevels = {
	IGNORE : 1,
	WARN : 2,
	ERROR : 3
}

chi.persistency.ActionSet.DEFAULT_ERROR_LEVEL = chi.persistency.ActionSet.errorLevels.WARN;

chi.persistency.ActionSet.ACTION_PREFIX = "action";
