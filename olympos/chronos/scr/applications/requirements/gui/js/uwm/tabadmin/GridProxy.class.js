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
Ext.namespace("uwm.tabadmin");

uwm.tabadmin.GridProxy = function(config) {
	uwm.tabadmin.GridProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	this.listType = config.listType;
}

Ext.extend(uwm.tabadmin.GridProxy, Ext.data.DataProxy);

uwm.tabadmin.GridProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().list(this.listType, function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data, errorMsg) {
			self.loadFailed(options, data, errorMsg, callback, scope, arg)
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

uwm.tabadmin.GridProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var records = new Array();
	
	for (var i = 0; i < data.objects.length; i++) {
		var currObj = data.objects[i];
		
		var currRecord = {
			oid: currObj.oid,
			uwmClassName: currObj.type
		};
		
		for (var j in currObj.values) {
			var currValue = currObj.values[j];
			
			if (!(currValue instanceof Function)) {
				for (var k in currValue) {
					var currElem = currValue[k];
					
					if (!(currElem instanceof Function)) {
						currRecord[k] = currElem;
					}
				}
			}
		}
		
		records.push(new Ext.data.Record(currRecord));
	}
	
	var result = {
		success: true,
		records: records,
		totalRecords: records.length
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
}

uwm.tabadmin.GridProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
