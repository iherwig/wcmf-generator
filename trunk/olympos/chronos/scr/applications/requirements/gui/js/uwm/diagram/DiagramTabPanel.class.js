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
Ext.namespace("uwm.diagram");

/**
 * @class The tab panel of center view.
 * 
 * @constructor
 * @param {Object} config Configuration of this TabPanel.
 * @config diagramContainer The DigramContainer object.
 */
uwm.diagram.DiagramTabPanel = function(config) {
	uwm.diagram.DiagramTabPanel.superclass.constructor.call(this, Ext.apply(this, {
		region: "center",
		xtype: "tabpanel",
		enableTabScroll: true,
		activeTab: 0,
		id: uwm.diagram.DiagramTabPanel.COMPONENT_ID,
		items: new uwm.ui.HelpViewer({})
	}, config));
	
	/**
	 * The Diagram Container object.
	 * 
	 * @private
	 * @type uwm.diagram.DiagramContainer
	 */
	this.diagramContainer = config.diagramContainer;
	
	var self = this;
	
	this.on("tabchange", function(tabPanel, tab) {
		self.tabChange(tabPanel, tab);
	});
	this.on("remove", function(tabPanel, tab) {
		self.tabClose(tabPanel, tab);
	});
}

Ext.extend(uwm.diagram.DiagramTabPanel, Ext.TabPanel);

/**
 * Handler when tab is changed.
 * 
 * <p>Refreshes DiagramContainer's current diagram setting.</p>
 * 
 * @private
 * @param {uwm.diagram.DiagramTabPanel} tabPanel This TabPanel.
 * @param {Ext.Panel} tab The new active tab.
 */
uwm.diagram.DiagramTabPanel.prototype.tabChange = function(tabPanel, tab) {
	//alert("TODO: tabChange");
}

/**
 * Handler when tab is closed.
 * 
 * <p>Removes all references to the closed diagram from DiagramContainer.</p>
 * 
 * @private
 * @param {uwm.diagram.DiagramTabPanel} tabPanel This TabPanel.
 * @param {Ext.Panel} tab The closed tab.
 */
uwm.diagram.DiagramTabPanel.prototype.tabClose = function(tabPanel, tab) {
	alert("TODO: tabClose");
}

/**
 * Component ID of DiagramTabPanel.
 * 
 * @private
 * @type String
 */
uwm.diagram.DiagramTabPanel.COMPONENT_ID = "uwm.diagram.DiagramTablPanel.ID";
