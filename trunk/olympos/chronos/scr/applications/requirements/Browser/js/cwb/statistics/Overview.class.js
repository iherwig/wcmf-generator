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
 * @class Displays the model information which is generated in backend.
 * @param {Object}
 *            workbench The workbench this table belongs to.
 * @extends Ext.grid.GridPanel
 */
cwb.statistics.Overview = function() {
}

cwb.statistics.Overview = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		this.fields = [ 'id', 'objectList', 'object', 'quantity', 'status' ];
		
		this.store = new Ext.data.Store( {
		    autoLoad : false,
		    proxy : new cwb.statistics.OverviewProxy()
		});
		
		Ext.apply(this, {
		    region : 'center',
		    title : cwb.Dict.translate('Statistical Data'),
		    store : this.store,
		    columns : [ {
		        id : 'object',
		        header : "Object",
		        width : 170,
		        sortable : false,
		        dataIndex : 'object'
		    }, {
		        header : "Quantity",
		        width : 50,
		        sortable : false,
		        dataIndex : 'quantity'
		    }, {
		        header : "",
		        width : 21,
		        sortable : false,
		        dataIndex : 'status',
		        renderer : self.statusRenderer
		    } ],
		    viewConfig : {
			    forceFit : true
		    },
		    sm : new Ext.grid.RowSelectionModel( {
			    singleSelect : true
		    }),
		    stripeRows : true
		});
		
		cwb.statistics.Overview.superclass.initComponent.apply(this, arguments);
		
		this.on('click', function(event) {
			if (ObjectContainer.getInstance().modelLoaded) {
				workbench.maskTabPanel();
				workbench.createInformationTab(this.selectionModel.selections.items[0].data.id, this.selectionModel.selections.items[0].data.objectList);
			}
		});
	}
})

cwb.statistics.Overview.prototype.statusRenderer = function(value) {
	var result = "";
	if (value !== null && value !== '') {
		result = "<img src='img/signal" + value + ".png' />";
	}
	
	return result;
}

cwb.statistics.Overview.prototype.loadData = function() {
	this.reload(cwb.ObjectContainer.getInstance().getCurrModelOid());
}

cwb.statistics.Overview.prototype.clear = function() {
	this.store.removeAll();
}

cwb.statistics.Overview.prototype.reload = function(modelOid) {
	this.store.load( {
		modelOid : modelOid
	});
}

cwb.statistics.Overview.getInstance = function() {
	if (!cwb.statistics.Overview.instance) {
		cwb.statistics.Overview.instance = new cwb.statistics.Overview();
	}
	return cwb.statistics.Overview.instance;
}
