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
 * @class Displays the information belonging to a certain group of objects selected in the ObjectDataTable.
 * @extends Ext.grid.GridPanel
 */

InfoGrid = function(uwmClassName){
	
    this.data = [['','New '+uwmClassName,'50','Proposed','','pgiuseppe','2009-03-17 14:05:02','pgiuseppe','2009-03-17 14:05:02'],
	['','New '+uwmClassName,'20','Satisfied','further information coming soon','pgiuseppe','2009-02-25 09:55:08','pgiuseppe','2009-03-01 20:28:20'],
	['','New '+uwmClassName,'90','tbd','','pgiuseppe','2009-03-01 20:28:37','enikao','2009-03-24 22:32:42']
	];
    
    this.fields = ['id','name', 'priority', 'status','notes','creator','created','last_editor','modified'];
    
    this.store = new Ext.data.SimpleStore({
        fields: this.fields
    });
	
	this.selectionModel=new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
	
    this.store.loadData(this.data);
	
    InfoGrid.superclass.constructor.call(this, Ext.apply(this, {
        store: this.store,
		height:1000,
        columns: [{
            header: "Name",
            width: 30,
            sortable: false,
            dataIndex: 'name'
        }, {
            header: "Priority",
            width: 21,
            sortable: false,
            dataIndex: 'priority'
        }, {
            header: "Status",
            width: 21,
            sortable: false,
            dataIndex: 'status'
        },{
            header: "Notes",
            width: 80,
            sortable: false,
            dataIndex: 'notes'
        },{
            header: "Creator",
            width: 21,
            sortable: false,
            dataIndex: 'creator'
        },{
            header: "Created",
            width: 31,
            sortable: false,
            dataIndex: 'created'
        },{
            header: "Last editor",
            width: 21,
            sortable: false,
            dataIndex: 'last_editor'
        },{
            header: "Modified",
            width: 31,
            sortable: false,
            dataIndex: 'modified'
        }],
        viewConfig: {
            forceFit: true,
        },
        sm: this.selectionModel,
        stripeRows: true
    }));
	this.doLayout();
}
Ext.extend(InfoGrid, Ext.grid.GridPanel);
