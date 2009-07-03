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
Ext.namespace("cwe.model");

/**
 * @class Routes requests of a class of TechnicalObjects through persistency
 *        layer.
 * 
 * @extends Ext.data.DataProxy
 * @see cwe.model.EnumTab
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.model.ModelProxy = function(config) {
	this.modelClass = config.modelClass;
	
	cwe.model.ModelProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(cwe.model.ModelProxy, Ext.data.DataProxy);

cwe.model.ModelProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		chi.persistency.Persistency.getInstance().list(this.modelClass.getId(), params.limit, params.start, params.sort, params.dir, function(data) {
			self.loadResponse(params, data, callback, scope, arg);
		}, function(data, errorMsg) {
			self.loadFailed(params, data, errorMsg, callback, scope, arg)
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

cwe.model.ModelProxy.prototype.loadResponse = function(params, data, callback, scope, arg) {
	var result = {
		success : true,
		records : data.records,
		totalRecords : data.totalCount
	};
	
	this.fireEvent("load", this, params, arg);
	callback.call(scope, result, arg, true);
}

cwe.model.ModelProxy.prototype.loadFailed = function(params, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, params, data);
	callback.call(scope, null, arg, false);
}
