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
Ext.namespace("cwe.modelgrid");

/**
 * @class The Model Grid Container contains all model grids.
 * 
 * <p>
 * The model grid container is responsible for loading and showing model grids.
 * </p>
 * 
 * <p>
 * The model grid container is a <i>Singleton</i>.
 * </p>
 * 
 * @constructor
 * @extends Ext.TabPanel
 * @see cwe.modelgrid.ModelGrid
 */
cwe.modelgrid.ModelGridContainer = function() {
}

cwe.modelgrid.ModelGridContainer = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		/**
		 * List of model grids with CweModelElementId as key.
		 * 
		 * @private
		 * @type list of cwe.modelgrid.ModelGrid
		 */
		this.modelgrids = new Ext.util.MixedCollection();
		
		Ext.apply(this, {
		    region : "center",
		    xtype : "tabpanel",
		    enableTabScroll : true,
		    activeTab : 0,
		    items : [ new cwe.ui.Dashboard() ]
		});
		
		cwe.modelgrid.ModelGridContainer.superclass.initComponent.apply(this, arguments);
		
		var self = this;
		
		this.on("remove", function(tabPanel, tab) {
			self.tabClose(tabPanel, tab);
		});
		
	}
})

/**
 * Handler when tab is closed.
 * 
 * @private
 */
cwe.modelgrid.ModelGridContainer.prototype.tabClose = function(tabPanel, tab) {
	if (tab instanceof cwe.modelgrid.ModelGridPanel) {
		this.modelgrids.remove(tab);
	}
}

/**
 * Loads or shows (if already loaded) a model grid for the given Model Class.
 * 
 * @param {cwe.model.ModelClass}
 *            modelClass The Model class to show the grid for.
 */
cwe.modelgrid.ModelGridContainer.prototype.loadOrShow = function(modelClass) {
	var modelGrid = this.modelgrids.get(modelClass.getId());
	
	var explicitLayout = this.modelgrids.getCount() == 0;
	
	if (!modelGrid) {
		modelGrid = new cwe.modelgrid.ModelGridPanel( {
			modelClass : modelClass
		});
		this.modelgrids.add(modelClass.getId(), modelGrid);
		this.add(modelGrid);
	}
	
	modelGrid.show();
	
	if (explicitLayout) {
		modelGrid.doLayout();
	}
	
	return modelGrid;
}

/**
 * Returns the instance of ModelGridContainer.
 * 
 * @return The instance of ModelGridContainer.
 * @type cwe.modelgrid.ModelGridContainer
 */
cwe.modelgrid.ModelGridContainer.getInstance = function() {
	if (!cwe.modelgrid.ModelGridContainer.instance) {
		/**
		 * The instance of ModelGridContainer.
		 * 
		 * @private
		 */
		cwe.modelgrid.ModelGridContainer.instance = new cwe.modelgrid.ModelGridContainer();
	}
	
	return cwe.modelgrid.ModelGridContainer.instance;
}
