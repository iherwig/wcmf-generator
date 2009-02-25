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
Ext.namespace("uwm.property");

/**
 * @class Routes the History request through persistency layer.
 *
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object} object The object for which the history shall be shown.
 */
uwm.ui.HistoryProxy = function(object) {
	uwm.ui.HistoryProxy.superclass.constructor.call(this, Ext.apply(this, {}, object));
	
	this.oid = object.getOid();
}

Ext.extend(uwm.ui.HistoryProxy, Ext.data.DataProxy);

uwm.ui.HistoryProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().histlist(this.oid, params.start, params.limit, function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data, errorMsg) {
			self.loadFailed(options, data, errorMsg, callback, scope, arg)
		});
	} else {	
		callback.call(scope || this, null, arg, false);
	}
}

uwm.ui.HistoryProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var records = [];
	var data = data;
	var changelist = data.changelist;
	for (var i = 0; i < changelist.length; i++) {
		var propertyArray = [];
		var oldArray = [];
		var newArray = [];
		var propertyString = "";
		for (var j = 0; j < changelist[i].data.length; j++) {
			for (k in changelist[i].data[j]) {			
				propertyArray.push(k);
				oldArray.push(changelist[i].data[j][k].oldValue);
				newArray.push(changelist[i].data[j][k].newValue);
				if (propertyString == "") {
					propertyString += k;
				} else {
					propertyString += (", " + k);
				}
			}
		}
		
		records.push(new Ext.data.Record({
			id: changelist[i].id,
			date: '',
			author: changelist[i].user,
			propertyString: propertyString,
			changedProperty: propertyArray,
			oldValue: oldArray,
			newValue: newArray
		}));
	}
	var result = {
		success: true,
		records: records,
		totalRecords: records.length
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
}

uwm.ui.HistoryProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
