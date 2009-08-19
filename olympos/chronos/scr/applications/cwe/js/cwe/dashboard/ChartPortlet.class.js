/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.dashboard");

/**
 * @class The main Workbench (perspective).
 * 
 * @constructor
 * @extends Ext.Viewport
 * @param {Object}
 *            config The configuration object.
 */
cwe.dashboard.ChartPortlet = function(config) {
	var self = this;
	
	this.modelClass = cwe.model.ModelClassContainer.getInstance().getClass(config.cweModelElementId);
	
	this.limit = config.limit;
	this.sortAttributeName = config.sortAttributeName;
	this.sortDirection = config.sortDirection;
	this.valueAttribute = config.valueAttribute;
	
	/**
	 * The store holding the objects.
	 * 
	 * @private
	 * @type cwe.model.ModelStore
	 */
	this.store = new cwe.model.Store( {
	    modelClass : this.modelClass,
	    proxy : new cwe.dashboard.ChartProxy( {
	        modelClass : this.modelClass,
	        valueAttribute : this.valueAttribute
	    }),
	    sortInfo : {
	        field : this.sortAttributeName,
	        direction : this.sortDirection
	    }
	});
	
	this.chart = new Ext.chart.ColumnChart( {
	    store : this.store,
	    xField : "label",
	    yField : "value",
	    listeners : {
		    itemclick : function(o) {
			    var record = self.store.getAt(o.index);
			    var editors = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(self.modelClass).getEditors();
			    editors.loadOrShow(record.get("oid"), record.get("label"));
		    }
	    }
	});
	
	cwe.dashboard.ChartPortlet.superclass.constructor.call(this, Ext.apply(this, {
	    title : this.modelClass.getName() + " " + this.valueAttribute + " " + chi.Dict.translate("Chart"),
	    iconCls : this.modelClass.getTreeIconClass(),
	    bodyStyle : "padding: 5px;",
	    height : 300,
	    items : [ this.chart ]
	}, config));
	
	this.store.load( {
		params : {
			limit : this.limit
		}
	});
};

Ext.extend(cwe.dashboard.ChartPortlet, Ext.ux.Portlet);
