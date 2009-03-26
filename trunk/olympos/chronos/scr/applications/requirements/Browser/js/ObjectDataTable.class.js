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
 * @class Displays the model information which is generated in backend.
 * @param {Object} workbench The workbench this zable belongs to.
 * @extends Ext.grid.GridPanel
 */
ObjectDataTable = function(workbench){
	var self = this;
	var workbench=workbench;
	    
    this.fields = ['id','objectList','object', 'quantity', 'status'];
    
    this.store = new Ext.data.SimpleStore({
        fields: this.fields
    });
	
	
	
	this.selectionModel=new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
	
    this.store.loadData(ObjectContainer.getInstance().getTableData());
    ObjectDataTable.superclass.constructor.call(this, Ext.apply(this, {
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
            dataIndex: 'status'
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
Ext.extend(ObjectDataTable, Ext.grid.GridPanel);

ObjectDataTable.prototype.reload=function(){
	this.store.reloaded=true;
	this.store.loadData(ObjectContainer.getInstance().getTableData());
}
