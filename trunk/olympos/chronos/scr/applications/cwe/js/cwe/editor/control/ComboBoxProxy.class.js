/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.editor.control");

/**
 * @class Routes the ComboBox request through persistency layer.
 * 
 * @extends cwe.modelgrid.GridProxy
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.control.ComboBoxProxy = function(config) {
	cwe.editor.control.ComboBoxProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
};

Ext.extend(cwe.editor.control.ComboBoxProxy, cwe.modelgrid.GridProxy);

/**
 * Reformats the result to only display numeric part of oid and label.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
cwe.editor.control.ComboBoxProxy.prototype.loadResponse = function(params, data, callback, scope, arg) {
	var records = [];
	
	var template = Ext.data.Record.create( [ {
	    name : "key",
	    mapping : "key"
	}, {
	    name : "val",
	    mapping : "val"
	} ]);
	
	for ( var i = 0; i < data.records.length; i++) {
		var currRecord = data.records[i];
		
		records.push(new template( {
		    "key" : chi.Util.getNumericFromOid(currRecord.getOid()),
		    "val" : currRecord.getLabel()
		}));
	}
	
	var result = {
	    success : true,
	    records : records,
	    totalRecords : records.length
	};
	
	this.fireEvent("load", this, params, arg);
	callback.call(scope, result, arg, true);
};
