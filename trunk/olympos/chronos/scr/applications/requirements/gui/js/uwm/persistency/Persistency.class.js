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
 * @class Abstract base class defining the persistency layer.
 * 
 * <p>This class is a <i>Singleton</i>, redirecting to the appropriate concrete implementation.</p>
 * 
 * @constructor
 */
uwm.persistency.Persistency = function() {
}

uwm.persistency.Persistency.getInstance = function() {
	if (!uwm.persistency.Persistency.instance) {
		uwm.persistency.Persistency.instance = eval("new " + uwm.Session.getInstance().getPersistencyClass() + "()");
	}
	
	return uwm.persistency.Persistency.instance;
}

uwm.persistency.Persistency.prototype.processSuccessHandler = function(successHandler, request, data) {
	if (successHandler instanceof Function) {
		successHandler(request, data);
	}
}

uwm.persistency.Persistency.prototype.processErrorHandler = function(errorHandler, request, data, errorMessage) {
	if (errorHandler instanceof Function) {
		errorHandler(request, data, errorMessage);
	}
	else if (errorHandler instanceof String) {
		uwm.Util.showMessage(uwm.Dict.translate('Persistency layer error'), errorHandler + errorMessage, uwm.Util.messageType.ERROR);
	}
	else if (errorMessage) {
		uwm.Util.showMessage(uwm.Dict.translate('Persistency layer error'), errorMessage, uwm.Util.messageType.ERROR);
	} else {
		uwm.Util.showMessage(uwm.Dict.translate('Persistency layer error'), uwm.Dict.translate('An unspecified error has occured in persistency layer.'), uwm.Util.messageType.ERROR);
	}
}

uwm.persistency.Persistency.prototype.doLogin = function(login, password, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.logout = function(successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.newObject = function(uwmClassName, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.deleteObject = function(oid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.associate = function(parentOid, childOid, invert, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.disassociate = function(parentOid, childOid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.save = function(oid, values, language, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.copy = function(oid, targetOid, recursive, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.sort = function(oid, direction, distance, poid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.display = function(oid, depth, language, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.batchdisplay = function(oid, language, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.list = function(uwmClassName, completeObjects, language, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.listbox = function(type, language, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.autocomplete = function(query, language, successHandler, errorHandler){
}

uwm.persistency.Persistency.prototype.histlist = function(oid, start, limit, successHandler, errorHandler){
}

uwm.persistency.Persistency.prototype.restorehistliststate = function(id, successHandler, errorHandler){
}

uwm.persistency.Persistency.prototype.restorehistlistfields = function(ids, successHandler, errorHandler){
}

uwm.persistency.Persistency.prototype.loadChildren = function(oid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.lock = function(oid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.unlock = function(oid, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.log = function(logtype, msg, successHandler, errorHandler) {
}

uwm.persistency.Persistency.prototype.executeActionSet = function(actionSet) {
}

uwm.persistency.Persistency.prototype.createDiagramFromPackage = function(oid, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.createControllerFromUseCase = function(oid, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.putChildnodesToActivitySetDiagram = function(oid, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.templatelist = function( successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.exportDoc = function(templateName, startOid, exportFormat, diagramFormat, language, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.exportUwm = function(startOid, language, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.exportImage = function(diagramOid, language, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.getCodeGeneratorList = function(successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.generateCode = function(codeId, modelOid, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.doContinue = function(controller, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.exportUcDomain = function(startOid, language, successHandler, errorHandler ) {
}

uwm.persistency.Persistency.prototype.exportUcDocumentation = function(startOid, language, successHandler, errorHandler ) {
}
