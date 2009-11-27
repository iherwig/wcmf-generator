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
Ext.namespace("chi.model");

/**
 * @class Routes requests of a grid store through persistency layer.
 * 
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class to load object of.
 */
chi.model.Proxy = function(config) {
	this.modelClass = config.modelClass;
	
	chi.model.Proxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
};

Ext.extend(chi.model.Proxy, Ext.data.DataProxy);

/**
 * Loads the data.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.model.Proxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		chi.persistency.Persistency.getInstance().list(this.modelClass.getId(), params.limit, params.start, params.sort, params.dir ? params.dir.toLowerCase() : undefined, function(data) {
			self.loadResponse(params, data, callback, scope, arg);
		}, function(data, errorMsg) {
			self.loadFailed(params, data, errorMsg, callback, scope, arg);
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
};

/**
 * Handles the response of the JSON call to load the data.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.model.Proxy.prototype.loadResponse = function(params, data, callback, scope, arg) {
	var result = {
	    success : true,
	    records : data.records,
	    totalRecords : data.totalCount
	};
	
	this.fireEvent("load", this, params, arg);
	callback.call(scope, result, arg, true);
};

/**
 * Handles an error of the JSON call to load the data.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.model.Proxy.prototype.loadFailed = function(params, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, params, data);
	callback.call(scope, null, arg, false);
};
