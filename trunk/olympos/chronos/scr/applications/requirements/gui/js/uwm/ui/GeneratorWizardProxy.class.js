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
Ext.namespace("uwm.ui");

/**
 * 
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.ui.GeneratorWizardProxy = function(config) {
	uwm.ui.GeneratorWizardProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.ui.GeneratorWizardProxy, Ext.data.DataProxy);

uwm.ui.GeneratorWizardProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().getCodeGeneratorList(function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data, errorMsg) {
			self.loadFailed(options, data, errorMsg, callback, scope, arg)
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

uwm.ui.GeneratorWizardProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var records = new Array();
	
	var recordTemplate = new Ext.data.Record.create( [ "id", "name", "targetPlatform", "description" ]);
	
	for ( var i = 0; i < data.list.length; i++) {
		var currObj = data.list[i];
		
		var currRecord = new recordTemplate(currObj);
		
		records.push(currRecord);
	}
	
	var result = {
	    success : true,
	    records : records,
	    totalRecords : records.length
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
}

uwm.ui.GeneratorWizardProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}
