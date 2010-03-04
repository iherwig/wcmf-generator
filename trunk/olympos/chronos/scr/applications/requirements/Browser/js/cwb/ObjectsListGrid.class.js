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
 * @class Displays the information belonging to a certain group of objects
 *        selected in the ObjectDataTable.
 * @extends Ext.grid.GridPanel
 */

cwb.ObjectsListGrid = function(config) {
	var self = this;
	
	cwb.ObjectsListGrid.superclass.constructor.call(this, Ext.apply(this, {
	    layout: "fit",
	    viewConfig: {
		    forceFit: true
	    },
	    sm: new Ext.grid.RowSelectionModel( {
		    singleSelect: true
	    }),
	    stripeRows: true,
	    store: this.store,
	    columns: [],
	    loadMask: true,
	    viewConfig: {
	        getRowClass: function(record, index) {
	    		return 'clickableRow';
	        }		    
		}
	}, config));
};

Ext.extend(cwb.ObjectsListGrid, Ext.grid.GridPanel);

cwb.ObjectsListGrid.prototype.setColumns = function(columns) {
	this.getColumnModel().setConfig(columns);
};

cwb.ObjectsListGrid.prototype.iconRenderer = function(uwmClassName) {
	return "<img src='"+cwb.Config.baseHref+"img/icons/"+uwmClassName+
		".png' width='16' height='16' title='"+uwmClassName+"' />";
};
