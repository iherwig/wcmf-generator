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
 * @class Displays the information belonging to a certain group of objects
 *        selected in the ObjectDataTable.
 * @extends Ext.grid.GridPanel
 */

cwb.statistics.HitsGrid = function(config) {
	var self = this;

	this.store = new Ext.data.Store( {
	    autoLoad : true,
	    proxy : new cwb.statistics.HitsProxy(this, config.objectList)
	});

	cwb.statistics.HitsGrid.superclass.constructor.call(this, Ext.apply(this, {
	    layout : "fit",
	    viewConfig : {
		    forceFit : true
	    },
	    sm : new Ext.grid.RowSelectionModel( {
		    singleSelect : true
	    }),
	    stripeRows : true,
	    store : this.store,
	    columns : [ {
	        header : "loading",
	        width : 9999,
	        sortable : false
	    } ],
	    closable: true
	}, config));
}

Ext.extend(cwb.statistics.HitsGrid, Ext.grid.GridPanel);

cwb.statistics.HitsGrid.prototype.setColumns = function(columns) {
	this.getColumnModel().setConfig(columns);
}
