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

Ext.namespace("cwb.ui");

/**
 * @class The workbench which contains all diagrams and tables
 * @extends Ext.Viewport
 */
cwb.ui.Workbench = function(config) {
	var self = this;
	
	this.modelChooser = new cwb.ui.ModelChooser();
	
	cwb.ui.Workbench.superclass.constructor.call(this, Ext.apply(this, {
	    layout : "border",
	    items : [ {
	        region : 'west',
	        width : 307,
	        layout : 'border',
	        items : [ 
	                 this.modelChooser, 
	                 cwb.statistics.Overview.getInstance()
	        ]
	    }, {
	        region : 'center',
	        layout : 'border',
	        items : [ 
				cwb.ui.DiagramPanel.getInstance(),
				cwb.ui.StructureTabPanel.getInstance() 
	        ]
	    } ]
	}));
};

Ext.extend(cwb.ui.Workbench, Ext.Viewport);

/**
 * Initiates creation of InfoGrid.
 * 
 * @param {String}
 *            id Header of the tab which is to be created.
 * @param {Array}
 *            objectList Array of oids which shall be shown in the InfoGrid.
 */
cwb.ui.Workbench.prototype.createInformationTab = function(id, objectList) {
	var proxy = new InfoGridProxy(id, objectList);
	
	var store = new Ext.data.Store( {
		proxy : proxy
	});
	
	proxy['store'] = store;
	store.load();
};

/**
 * Creates InfoGrid and adds it to structureTabPanel AFTER loading all objects.
 * @param {String} id Header of the tab which is to be created
 * @param {Object} store Ext.data.Store for the InfoGrid.
 * @param {Array} columnList Array containing all columns which are shown in the grid.
 */
cwb.ui.Workbench.prototype.addInformationTab = function(id, store, columnList) {
	var newTab = new InfoGrid( {
	    title : id,
	    store : store,
	    columns : columnList,
	    closable : true
	});
	var structureTabPanel = cwb.ui.StructureTabPanel.getInstance()
	structureTabPanel.add(newTab);
	structureTabPanel.activate(newTab);
	this.doLayout();
};

cwb.ui.Workbench.prototype.showMask = function() {
	//Ext.WindowMgr.zseed = 25000;
	
	Ext.Msg.progress(cwb.Dict.translate("Loading"), cwb.Dict.translate("Loading report ..."), cwb.Dict.translate("Generating UML export"));
};

cwb.ui.Workbench.getInstance = function() {
	if (!(cwb.ui.Workbench.instance)) {
		cwb.ui.Workbench.instance = new cwb.ui.Workbench();
	}
	return cwb.ui.Workbench.instance;
};
