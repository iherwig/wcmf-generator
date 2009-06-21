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
Ext.namespace("chi.persistency");

chi.persistency.Persistency = function() {
}

chi.persistency.Persistency.getInstance = function() {
	if (!chi.persistency.Persistency.instance) {
		chi.persistency.Persistency.instance = eval("new " + chi.Session.getInstance().getPersistencyClass() + "()");
	}
	
	return chi.persistency.Persistency.instance;
}

chi.persistency.Persistency.prototype.processSuccessHandler = function(successHandler, request, data) {
	if (successHandler instanceof Function) {
		successHandler(request, data);
	}
}

chi.persistency.Persistency.prototype.processErrorHandler = function(errorHandler, request, data, errorMessage) {
	if (errorHandler instanceof Function) {
		errorHandler(request, data, errorMessage);
	} else if (errorHandler instanceof String) {
		chi.Util.showMessage(chi.Dict.translate('Persistency layer error'), errorHandler + errorMessage, chi.Util.messageType.ERROR);
	} else if (errorMessage) {
		chi.Util.showMessage(chi.Dict.translate('Persistency layer error'), errorMessage, chi.Util.messageType.ERROR);
	} else {
		chi.Util.showMessage(chi.Dict.translate('Persistency layer error'), chi.Dict.translate('An unspecified error has occured in persistency layer.'), chi.Util.messageType.ERROR);
	}
}

chi.persistency.Persistency.prototype.login = function(user, password, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.login not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.logout = function(successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.logout not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.list = function(cweModelElementId, limit, offset, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.list not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.load = function(oid, depth, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.load not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.save = function(oid, values, offset, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.save not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.create = function(cweModelElementId, values, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.create not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.destroy = function(oid, offset, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.destroy not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.associate = function(parentOid, childOid, role, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.associate not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.disassociate = function(parentOid, childOid, role, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.disassociate not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.lock = function(oid, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.lock not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.unlock = function(oid, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.unlock not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.log = function(logtype, message, successHandler, errorHandler) {
	throw "Method chi.persistency.Persistency.log not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.executeActionSet = function(actionSet) {
	throw "Method chi.persistency.Persistency.executeActionSet not implemented by current persistency adapter.";
}

chi.persistency.Persistency.prototype.translateCweModelElementId(cweModelElementId) {
	throw "Method chi.persistency.Persistency.translateCweModelElementId not implemented by current persistency adapter.";
}

