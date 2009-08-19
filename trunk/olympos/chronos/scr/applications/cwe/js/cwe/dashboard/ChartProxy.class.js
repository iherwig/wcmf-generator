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
Ext.namespace("cwe.dashboard");

/**
 * @class Routes the Chart request through persistency layer.
 * 
 * @extends cwe.modelgrid.GridProxy
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.dashboard.ChartProxy = function(config) {
	this.valueAttribute = config.valueAttribute;
	
	cwe.dashboard.ChartProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
};

Ext.extend(cwe.dashboard.ChartProxy, cwe.model.Proxy);

/**
 * Reformats the result to only display numeric part of oid and label.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
cwe.dashboard.ChartProxy.prototype.loadResponse = function(params, data, callback, scope, arg) {
	var records = [];
	
	var template = Ext.data.Record.create( [ {
	    name : "oid",
	    mapping : "oid"
	}, {
	    name : "label",
	    mapping : "label"
	}, {
	    name : "value",
	    mapping : "value"
	} ]);
	
	for ( var i = 0; i < data.records.length; i++) {
		var currRecord = data.records[i];
		
		records.push(new template( {
		    "oid" : currRecord.getOid(),
		    "label" : currRecord.getLabel(),
		    "value" : Number(currRecord.get(this.valueAttribute))
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
