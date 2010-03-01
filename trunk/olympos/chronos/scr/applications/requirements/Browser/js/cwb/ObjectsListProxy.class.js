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
 * @class Routes the InfoGrid requests through persistency layer.
 * @param {Array}
 *            objectList List of objects for which the data must be loaded.
 */

cwb.ObjectsListProxy = function(config) {
	cwb.ObjectsListProxy.superclass.constructor.call(this, Ext.apply(this, {
	    record : [],
	    columns : []
	}));
	
	this.grid = config.grid;
	this.objectList = config.objectList;
	this.iconRenderer = config.iconRenderer;
};

Ext.extend(cwb.ObjectsListProxy, Ext.data.DataProxy);

cwb.ObjectsListProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	for ( var currIndex in data.list) {
		var currNode = data.list[currIndex];
		
		if (!(currNode instanceof Function)) {
			if (currNode.type) {

				var tempData = [];
				tempData.uwmClassName = currNode.type;
				tempData.oid = currNode.oid;
				
				for ( var currValueIndex in currNode.values[1]) {
					var currValue = currNode.values[1][currValueIndex];
					
					if (!(currValue instanceof Function)) {
						tempData[currValueIndex] = currValue;
						
						var columnExists = false;
						for ( var j = 0; j < this.columns.length; j++) {
							if (this.columns[j] == currValueIndex) {
								columnExists = true;
								break;
							}
						}
						if (!(columnExists)) {
							this.columns.push(currValueIndex);
						}
					}
				}
				
				this.record.push(new Ext.data.Record(tempData));
			}
		}
	}
	
	var result = {
	    success : true,
	    records : this.record
	};
	
	this.grid.setColumns(this.getColumns());
	
	this.fireEvent("load", this, options, arg);
	if (callback instanceof Function) {
		callback.call(scope, result, arg, true);
	}
};

cwb.ObjectsListProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	if (callback instanceof Function) {
		callback.call(scope, null, arg, false);
	}
};

/**
 * Creates a column list from the incoming property data.
 */
cwb.ObjectsListProxy.prototype.getColumns = function() {
	var result = [ {
	    header : '',
	    width : 16,
	    dataIndex : 'uwmClassName',
	    renderer : this.iconRenderer,
	    sortable : false,
	    resizable : false
	}, {
	    header : 'Name',
	    width : 100,
	    dataIndex : 'Name'
	}, {
	    header : 'Notes',
	    width : 300,
	    dataIndex : 'Notes'
	}, {
	    header : 'Alias',
	    width : 50,
	    dataIndex : 'Alias'
	} ];
	for ( var i = 0; i < this.columns.length; i++) {
		if (this.columns[i] != 'Name' && this.columns[i] != 'Notes' && this.columns[i] != 'Alias' && this.columns[i] != 'creator' && this.columns[i] != 'created' && this.columns[i] != 'last_editor'
		        && this.columns[i] != 'modified') {
			result.push( {
			    header : this.columns[i],
			    width : 31,
			    dataIndex : this.columns[i],
			    hidden : true
			});
		}
	}
	result.push( {
	    header : 'Creator',
	    width : 31,
	    dataIndex : 'creator',
	    hidden : true
	});
	result.push( {
	    header : 'Created',
	    width : 31,
	    dataIndex : 'created',
	    hidden : true
	});
	result.push( {
	    header : 'Last editor',
	    width : 31,
	    dataIndex : 'last_editor',
	    hidden : true
	});
	result.push( {
	    header : 'Modified',
	    width : 31,
	    dataIndex : 'modified',
	    hidden : true
	});
	
	return result;
};
