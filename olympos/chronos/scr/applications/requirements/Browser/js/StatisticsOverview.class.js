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
 * @class Displays the model information which is generated in backend.
 * @param {Object}
 *            workbench The workbench this table belongs to.
 * @extends Ext.grid.GridPanel
 */
cwb.StatisticsOverview = function(workbench){
	var self = this;
	var workbench=workbench;
	    
    this.fields = ['id','objectList','object', 'quantity', 'status'];
    
    this.store = new Ext.data.Store({
    	autoLoad: false,
    	proxy: new cwb.StatisticsOverviewProxy({})
    });
	
	this.selectionModel=new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
	

	cwb.StatisticsOverview.superclass.constructor.call(this, Ext.apply(this, {
        store: this.store,
        columns: [{
            id: 'object',
            header: "Object",
            width: 170,
            sortable: false,
            dataIndex: 'object'
        }, {
            header: "Quantity",
            width: 50,
            sortable: false,
            dataIndex: 'quantity'
        }, {
            header: "",
            width: 21,
            sortable: false,
            dataIndex: 'status',
            renderer: self.statusRenderer
        }],
        viewConfig: {
            forceFit: true,
        },
        sm: this.selectionModel,
        stripeRows: true
    }));
	
	this.on('click', function(event){
		if (ObjectContainer.getInstance().modelLoaded) {
			workbench.maskTabPanel();
			workbench.createInformationTab(this.selectionModel.selections.items[0].data.id, this.selectionModel.selections.items[0].data.objectList);
		}
	});
}

Ext.extend(cwb.StatisticsOverview, Ext.grid.GridPanel);

cwb.StatisticsOverview.prototype.statusRenderer = function(value) {
	return "<img src='img/signal" + value + ".png' />";
}

cwb.StatisticsOverview.prototype.reload=function(modelOid){
	this.store.load({modelOid: modelOid});
}
