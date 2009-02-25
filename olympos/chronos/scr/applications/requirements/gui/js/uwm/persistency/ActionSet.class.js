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
 * @class Combines several persistency calls to one backend request.
 * 
 * @constructor
 */
uwm.persistency.ActionSet = function() {
	this.requests = {};
	this.currentId = 0;
}

uwm.persistency.ActionSet.prototype.addLogin = function(login, password,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"dologin",
		login :login,
		password :password,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addLogout = function(successHandler,
		errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"dologout",
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addNewObject = function(uwmClassName,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"new",
		uwmClassName :uwmClassName,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addDeleteObject = function(oid,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"delete",
		oid :oid,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addAssociate = function(parentOid,
		childOid, invert, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"associate",
		parentOid :parentOid,
		childOid :childOid,
		invert :invert,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addDisassociate = function(parentOid,
		childOid, successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"disassociate",
		parentOid :parentOid,
		childOid :childOid,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addSave = function(oid, values,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"save",
		oid :oid,
		values :values,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addDisplay = function(oid, depth,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"display",
		oid :oid,
		depth :depth,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addList = function(uwmClassName,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"list",
		uwmClassName :uwmClassName,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addListbox = function(type, successHandler,
		errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"listbox",
		type :type,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addAutocomplete = function(query,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"autocomplete",
		query :query,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addLoadChildren = function(oid,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"loadChildren",
		oid :oid,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addLock = function(oid, successHandler,
		errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"lock",
		oid :oid,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addUnlock = function(oid, successHandler,
		errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"unlock",
		oid :oid,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.addLog = function(logtype, msg,
		successHandler, errorHandler, errorLevel) {
	this.requests[this.getNextId()] = {
		action :"log",
		logtype :logtype,
		msg :msg,
		successHandler :successHandler,
		errorHandler :errorHandler,
		errorLevel :errorLevel
	};
}

uwm.persistency.ActionSet.prototype.commit = function(successHandler,
		errorHandler) {
	for ( var i in this.requests) {
		var val = this.requests[i];

		if (!(val instanceof Function)) {
			if (val.errorLevel) {
				val.errorLevel = uwm.persistency.ActionSet.DEFAULT_ERROR_LEVEL;
			}
		}
	}

	this.savedSuccessHandler = successHandler;
	this.savedErrorHandler = errorHandler;

	uwm.persistency.Persistency.getInstance().executeActionSet(this);
}

uwm.persistency.ActionSet.prototype.getNextId = function() {
	var result = uwm.persistency.ActionSet.ACTION_PREFIX + this.currentId;

	this.currentId++;

	return result;
}

uwm.persistency.ActionSet.prototype.getRequests = function() {
	return this.requests;
}

uwm.persistency.ActionSet.prototype.successHandler = function(request, data) {
	var errorLevel = null;

	var persistency = uwm.persistency.Persistency.getInstance();

	for ( var currActionName in this.requests) {
		var currRequest = this.requests[currActionName];

		if (!(currRequest instanceof Function)) {
			var currResponse = data.data[currActionName];

			if (!currResponse.success || currResponse.success == 1) {
				persistency.processSuccessHandler(currRequest.successHandler,
						currRequest, currResponse);
			} else {
				if (currRequest.errorLevel > errorLevel) {
					errorLevel = currRequest.errorLevel;
				}

				persistency.processErrorHandler(currRequest.errorHandler,
						currRequest, currResponse, currResponse.errorMsg);

				if (currRequest.errorLevel == uwm.persistency.ActionSet.errorLevels.ERROR) {
					throw new Error(uwm.Dict
							.translate("Critical Persistency Error")
							+ ": " + currResponse.errorMsg);
				}
			}
		}
	}

	// currently, we do not react globally on errorLevels

	persistency.processSuccessHandler(this.savedSuccessHandler, request, data);
}

uwm.persistency.ActionSet.prototype.XXerrorHandler = function(request, data,
		errorMessage) {
	uwm.persistency.Persistency.getInstance().processErrorHandler(
			this.savedErrorHandler, request, data, errorMessage);
}

uwm.persistency.ActionSet.errorLevels = {
	IGNORE :1,
	WARN :2,
	ERROR :3
}

uwm.persistency.ActionSet.DEFAULT_ERROR_LEVEL = uwm.persistency.ActionSet.errorLevels.WARN;

uwm.persistency.ActionSet.ACTION_PREFIX = "action";