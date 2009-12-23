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
Ext.namespace("chi.editor.control");

/**
 * @class Routes the ComboBox request through persistency layer.
 * 
 * @extends Ext.data.DataProxy
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config modelDescription The Model Description to load object of.
 */
chi.editor.control.ComboBoxProxy = function(config) {
	this.fullOid = false || config.fullOid;
	this.modelDescription = config.modelDescription;
	this.prependWildcard = false || config.prependWildcard;
	this.appendWildcard = true || config.appendWildcard;
	
	chi.editor.control.ComboBoxProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
};

Ext.extend(chi.editor.control.ComboBoxProxy, Ext.data.DataProxy);

/**
 * Loads the data.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.editor.control.ComboBoxProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		
		var query = "";
		if (this.prependWildcard) {
			query += "*";
		}
		query += params.query;
		if (this.appendWildcard) {
			query += "*";
		}

		chi.persistency.Persistency.getInstance().search(query, this.modelDescription.getId(), params.limit, params.start, true, undefined, undefined, function(data) {
			self.loadResponse(params, data, callback, scope, arg);
		}, function(data, errorMsg) {
			self.loadFailed(params, data, errorMsg, callback, scope, arg);
		});
	} else {
		callback.call(scope || this, null, arg, false);
	}
};

/**
 * Reformats the result to only display numeric part of oid and label.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.editor.control.ComboBoxProxy.prototype.loadResponse = function(params, data, callback, scope, arg) {
	var self = this;

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
		    "key" : self.fullOid ? currRecord.getOid() : chi.Util.getNumericFromOid(currRecord.getOid()),
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

/**
 * Handles an error of the JSON call to load the data.
 * 
 * <p>
 * Refer to Ext.data.DataProxy for details.
 * </p>
 */
chi.editor.control.ComboBoxProxy.prototype.loadFailed = function(params, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, params, data);
	callback.call(scope, null, arg, false);
};
