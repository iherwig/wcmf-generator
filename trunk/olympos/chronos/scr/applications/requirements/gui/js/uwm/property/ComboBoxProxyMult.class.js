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
 * @class Routes the ComboBox request through persistency layer.
 * 
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.property.ComboBoxProxyMult = function(config){
	uwm.property.ComboBoxProxyMult.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	this.listType = config.listType;
}

Ext.extend(uwm.property.ComboBoxProxyMult, Ext.data.DataProxy);

uwm.property.ComboBoxProxyMult.prototype.load = function(params, reader, callback, scope, arg){
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
	
		uwm.persistency.Persistency.getInstance().listbox(this.listType, 
			uwm.i18n.Localization.getInstance().getModelLanguage(), function(options, data) {
				self.loadResponse(options, data, callback, scope, arg);
			}, function(options, data, errorMsg){
					self.loadFailed(options, data, errorMsg, callback, scope, arg)
			}
		);
	}
	else {
		callback.call(scope || this, null, arg, false);
	}
}

uwm.property.ComboBoxProxyMult.prototype.loadResponse = function(options, data, callback, scope, arg){
	var records = new Array();
		
	for (var i = 0; i < data.objects.length; i++) {
		records.push(new Ext.data.Record({
			key: data.objects[i].key,
			val: data.objects[i].val
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

uwm.property.ComboBoxProxyMult.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg){
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
