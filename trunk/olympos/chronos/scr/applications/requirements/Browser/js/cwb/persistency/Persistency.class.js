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

Ext.namespace("cwb.persistency");

/**
 * @class Abstract base class defining the persistency layer.
 * 
 * <p>This class is a <i>Singleton</i>, redirecting to the appropriate concrete implementation.</p>
 * 
 * @constructor
 */
cwb.persistency.Persistency = function() {
};

cwb.persistency.Persistency.getInstance = function() {
	if (!cwb.persistency.Persistency.instance) {
		cwb.persistency.Persistency.instance = eval("new " + cwb.Session.getInstance().getPersistencyClass() + "()");
	}
	
	return cwb.persistency.Persistency.instance;
};

cwb.persistency.Persistency.prototype.processSuccessHandler = function(successHandler, request, data) {
	if (successHandler instanceof Function) {
		successHandler(request, data);
	}
};

cwb.persistency.Persistency.prototype.processErrorHandler = function(errorHandler, request, data, errorMessage) {
	if (errorHandler instanceof Function) {
		errorHandler(request, data, errorMessage);
	}
	else if (errorHandler instanceof String) {
		cwb.Util.showMessage(cwb.Dict.translate('Persistency layer error'), errorHandler + errorMessage, cwb.Util.messageType.ERROR);
	}
	else if (errorMessage) {
		cwb.Util.showMessage(cwb.Dict.translate('Persistency layer error'), errorMessage, cwb.Util.messageType.ERROR);
	} else {
		cwb.Util.showMessage(cwb.Dict.translate('Persistency layer error'), cwb.Dict.translate('An unspecified error has occured in persistency layer.'), cwb.Util.messageType.ERROR);
	}
};

cwb.persistency.Persistency.prototype.doLogin = function(login, password, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.logout = function(successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.display = function(oid, depth, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.list = function(uwmClassName, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.loadChildren = function(oid, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.lock = function(oid, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.unlock = function(oid, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.log = function(logtype, msg, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.executeActionSet = function(actionSet) {
};

cwb.persistency.Persistency.prototype.loadStatisticsOverview = function(modelOid, template, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.displayByAlias = function(aliasList, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.generateUml = function(modelOid, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.loadAllStatisticsOverview = function(modelOid, useCache, successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.lastEdited = function(successHandler, errorHandler) {
};

cwb.persistency.Persistency.prototype.doContinue = function(controller, successHandler, errorHandler ) {
};

