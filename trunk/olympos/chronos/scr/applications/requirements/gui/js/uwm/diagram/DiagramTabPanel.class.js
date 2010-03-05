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

/*
 * Note: The extension mechanism used for this class differs from all other's
 * extension mechanism. The mechanism used elsewhere led to errors in this component.
 */
/**
 * @class The tab panel of center view.
 *
 * @extends Ext.TabPanel
 * @constructor
 * @param {Object} config Configuration of this TabPanel.
 * @config diagramContainer The DigramContainer object.
 */
uwm.diagram.DiagramTabPanel = function() {
}
uwm.diagram.DiagramTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
	
		Ext.apply(this, {
			region: "center",
			xtype: "tabpanel",
			enableTabScroll: true,
			activeTab: 1,
			id: uwm.diagram.DiagramTabPanel.COMPONENT_ID,
			items: [uwm.ui.HelpViewer.getInstance(), uwm.Cwb.getInstance()]
		})
		
		uwm.diagram.DiagramTabPanel.superclass.initComponent.apply(this, arguments);
		
		/**
		 * The Diagram Container object.
		 *
		 * @private
		 * @type uwm.diagram.DiagramContainer
		 */
		this.diagramContainer = this.initialConfig.diagramContainer;
		
		var self = this;
		
		this.on("tabchange", function(tabPanel, tab) {
			self.tabChange(tabPanel, tab);
		});
		this.on("remove", function(tabPanel, tab) {
			self.tabClose(tabPanel, tab);
		});
	}
});

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
	var diagram = null;
	
	if (tab instanceof uwm.diagram.DiagramTab) {
		diagram = tab.getDiagram();
	}
	
	this.diagramContainer.setCurrentDiagram(diagram);
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
	if (tab instanceof uwm.diagram.DiagramTab) {
		this.diagramContainer.unloadDiagram(tab.getDiagram());
	}
}

/**
 * Component ID of DiagramTabPanel.
 *
 * @private
 * @type String
 */
uwm.diagram.DiagramTabPanel.COMPONENT_ID = "uwm.diagram.DiagramTablPanel.ID";
