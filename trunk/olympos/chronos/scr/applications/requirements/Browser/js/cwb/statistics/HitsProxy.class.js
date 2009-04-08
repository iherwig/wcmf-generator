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
Ext.namespace("cwb.statistics");

/**
 * @class Routes the InfoGrid requests through persistency layer.
 * @param {String}
 *            id Header of the tab which is to be created
 * @param {Array}
 *            objectList List of objects for which the data must be loaded.
 */

cwb.statistics.HitsProxy = function(id, objectList) {
	cwb.statistics.HitsProxy.superclass.constructor.call(this, Ext.apply(this, {
	    record : [],
	    columns : [],
	    id : id,
	    objectList : objectList,
	    actionset : new uwm.persistency.ActionSet()
	}));
}

Ext.extend(cwb.statistics.HitsProxy, Ext.data.DataProxy);

cwb.statistics.HitsProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		uwm.persistency.Persistency.getInstance().displayByAlias(this.objectList, function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data) {
			self.loadFailed(options, data, callback, scope, arg);
		})
	} else {
		callback.call(scope || this, null, arg, false);
	}
}

cwb.statistics.HitsProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	
	for ( var currIndex in data.list) {
		var currNode = data.list[currIndex];
		
		if (!(currNode instanceof Function)) {
			var tempData = [];
			
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
	
	var result = {
	    success : true,
	    records : this.record
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
	
	Workbench.getInstance().addInformationTab(this.id, this.store, this.getColumns());
}

cwb.statistics.HitsProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

/**
 * Creates a column list from the incoming property data.
 */
cwb.statistics.HitsProxy.prototype.getColumns = function() {
	var result = [ {
	    header : 'Name',
	    width : 31,
	    dataIndex : 'Name'
	}, {
	    header : 'Notes',
	    width : 41,
	    dataIndex : 'Notes'
	} ];
	for ( var i = 0; i < this.columns.length; i++) {
		if (this.columns[i] != 'Name' && this.columns[i] != 'Notes' && this.columns[i] != 'creator' && this.columns[i] != 'created' && this.columns[i] != 'last_editor'
		        && this.columns[i] != 'modified') {
			result.push( {
			    header : this.columns[i],
			    width : 31,
			    dataIndex : this.columns[i]
			});
		}
	}
	result.push( {
	    header : 'Creator',
	    width : 31,
	    dataIndex : 'creator'
	});
	result.push( {
	    header : 'Created',
	    width : 31,
	    dataIndex : 'created'
	});
	result.push( {
	    header : 'Last editor',
	    width : 31,
	    dataIndex : 'last_editor'
	});
	result.push( {
	    header : 'Modified',
	    width : 31,
	    dataIndex : 'modified'
	});
	return result;
}
