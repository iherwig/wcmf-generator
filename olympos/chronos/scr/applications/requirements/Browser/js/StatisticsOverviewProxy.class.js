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

Ext.namespace("cwb");

/**
 * @class Routes the statistics overview requests through persistency layer.
 * @extends Ext.data.DataProxy
 */

cwb.StatisticsOverviewProxy = function(config) {
	cwb.StatisticsOverviewProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(cwb.StatisticsOverviewProxy, Ext.data.DataProxy);

cwb.StatisticsOverviewProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().loadStatisticsOverview(arg.modelOid, 'statistics', function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data, errorMsg) {
			self.loadFailed(options, data, errorMsg, callback, scope, arg)
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

cwb.StatisticsOverviewProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var records = [];
	
	for(var i in data) {
		var val = data[i];
		
		if (!(val instanceof Function)) {
			records.push(new Ext.data.Record(val));
		}
	}
	
	var result = {
	    success : true,
	    records : records
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
}

cwb.StatisticsOverviewProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
