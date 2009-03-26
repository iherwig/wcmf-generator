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

InfoGrid = function(store,columnList){
	var self=this;
	
	this.colModel=new Ext.grid.ColumnModel(columnList);
    
  	
	this.selectionModel=new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
	
	
    InfoGrid.superclass.constructor.call(this, Ext.apply(this, {
        store: store,
		height:1000,
        columns:columnList,
        viewConfig: {
            forceFit: true,
        },
        sm: this.selectionModel,
        stripeRows: true
    }));
	
	Workbench.getInstance().unmaskTabPanel();
}
Ext.extend(InfoGrid, Ext.grid.GridPanel);

InfoGrid.prototype.setColumns=function(columns){
	for (var i = 0;i<columns.length;i++){
		this.columnList.push({
			header: columns[i],
			width:31,
			sortable:true,
			dataIndex:columns[i]
		});
	}
	
}

InfoGrid.prototype.getColModel=function(){
	var result=new Ext.grid.ColumnModel(this.columnList);
	return result;
}
