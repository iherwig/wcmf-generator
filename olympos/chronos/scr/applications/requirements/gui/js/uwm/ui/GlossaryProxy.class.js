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
Ext.namespace("uwm.ui");

/**
 * 
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.GlossaryProxy = function(config) {
	uwm.ui.GlossaryProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.ui.GlossaryProxy, Ext.data.DataProxy);

uwm.ui.GlossaryProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().glossary(function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data, errorMsg) {
			self.loadFailed(options, data, errorMsg, callback, scope, arg)
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

uwm.ui.GlossaryProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var records = new Array();
	
	for (var i = 0; i < data.glossary.length; i++) {
		var currObj = data.glossary[i];
		
		var currRecord = {
			oid: "Glossary:" + currObj.id,
			entrytype: currObj.entrytype,
			name: currObj.name,
			notes: currObj.notes
		};
		
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

uwm.ui.GlossaryProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
