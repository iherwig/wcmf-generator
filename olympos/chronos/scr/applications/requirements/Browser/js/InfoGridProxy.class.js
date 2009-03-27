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


/**
 * @class Routes the InfoGrid requests through persistency layer.
 * @param {String} id Header of the tab which is to be created
 * @param {Array} objectList List of objects for which the data must be loaded.
 */

InfoGridProxy = function(id,objectList){
    InfoGridProxy.superclass.constructor.call(this, Ext.apply(this, {
		record: [],
		columns: [],
		id: id,
        objectList: objectList,
		actionset: new uwm.persistency.ActionSet()
    }));
}

Ext.extend(InfoGridProxy, Ext.data.DataProxy);

InfoGridProxy.prototype.load = function(params, reader, callback, scope, arg){
	this.objectsToLoad=0;
    if (this.fireEvent("beforeload", this, params) !== false) {
        var self = this;
        for (var i = 0; i < this.objectList.length; i++) {
			self.objectsToLoad++;
            self.actionset.addDisplay(this.objectList[i], 0, function(options, data){
                self.loadResponse(options, data, callback, scope, arg);
            }, function(options, data){
                self.loadFailed(options, data, callback, scope, arg);
            })
        }
		self.actionset.commit();
    }
    else {
        callback.call(scope || this, null, arg, false);
    }
}

InfoGridProxy.prototype.loadResponse = function(options, data, callback, scope, arg) {
	var tempData=[];
	
	for (var i in data.node.values[1]){
		if (!(data.node.values[1][i] instanceof Function)){
			tempData[i]=data.node.values[1][i];
			var columnExists=false;
			for (var j=0;j<this.columns.length;j++){
				if (this.columns[j]==i){
					columnExists=true;
				}				
			}
			if (!(columnExists)){
				this.columns.push(i);
			}
		}
	}
	
	
	this.record.push(new Ext.data.Record(tempData));
		
	var result = {
		success: true,
		records: this.record
	};
	
	this.fireEvent("load", this, options, arg);
	callback.call(scope, result, arg, true);
	
	this.objectsToLoad--;
	
	if (this.objectsToLoad == 0) {
		Workbench.getInstance().addInformationTab(this.id, this.store, this.getColumns());
	}
	
}

InfoGridProxy.prototype.loadFailed = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

/**
 * Creates a column list from the incoming property data.
 */
InfoGridProxy.prototype.getColumns=function(){
	var result=[{
		header:'Name',
		width:31,
		dataIndex:'Name'
	},{
		header:'Notes',
		width:41,
		dataIndex:'Notes'
	}];
	for (var i=0;i<this.columns.length;i++){
		if (this.columns[i]!='Name'&&this.columns[i]!='Notes'&&this.columns[i]!='creator'&&this.columns[i]!='created'&&this.columns[i]!='last_editor'&&this.columns[i]!='modified'){
		result.push({
			header:this.columns[i],
			width:31,
			dataIndex: this.columns[i]
		});
		}
	}
	result.push({
		header:'Creator',
		width: 31,
		dataIndex:'creator'
	});
	result.push({
		header:'Created',
		width: 31,
		dataIndex:'created'
	});
	result.push({
		header:'Last editor',
		width: 31,
		dataIndex:'last_editor'
	});
	result.push({
		header:'Modified',
		width: 31,
		dataIndex:'modified'
	});
	return result;
}
