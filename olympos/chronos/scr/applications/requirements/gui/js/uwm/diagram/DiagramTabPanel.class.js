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

uwm.diagram.DiagramTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		Ext.apply(this, {
			region: "center",
			xtype: "tabpanel",
			//tabPosition: "bottom",
			enableTabScroll: true,
			activeTab: 0,
			id: uwm.diagram.DiagramTabPanel.COMPONENT_ID,
			items: new uwm.ui.HelpViewer({})
		})
		
		uwm.diagram.DiagramTabPanel.superclass.initComponent.apply(this, arguments);
		
		this.diagramContainer = this.initialConfig.diagramContainer;
		
		var self = this;
		
		this.on("tabchange", function(tabPanel, tab) {
			self.tabChange(tabPanel, tab);
		});
		this.on("remove", function(tabPanel, tab) {
			self.tabClose(tabPanel, tab);
		});
	},
	
	tabChange: function(tabPanel, tab) {
		//alert("TODO: tabChange");
	},
	
	tabClose: function(tabPanel, tab) {
		alert("TODO: tabClose");
	}
});

uwm.diagram.DiagramTabPanel.COMPONENT_ID = "uwm.diagram.DiagramTablPanel.ID";
