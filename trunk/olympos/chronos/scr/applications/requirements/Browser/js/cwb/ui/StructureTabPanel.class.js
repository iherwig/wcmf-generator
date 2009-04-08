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
 * TabPanel containing package weight, package tree and InfoGrid tabs
 */
cwb.ui.StructureTabPanel = function() {
}

cwb.ui.StructureTabPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		
		var self = this;
		
		/**
		 * Tab containing treemap (package weight).
		 */
		this.weightPanel = new Ext.Panel( {
		    title : cwb.Dict.translate('Package weight'),
		    tabTip : cwb.Dict.translate('Left-click to enter a package or object, right-click to leave it.'),
		    html : '<iframe id="' + cwb.ui.StructureTabPanel.WEIGHT_ID + '" style="height: 100%;width:100%;" src="html/Treemap.html"/>'
		});
		
		/**
		 * Tab containing spacetree (package tree).
		 */
		this.treePanel = new Ext.Panel( {
		    title : cwb.Dict.translate('Package tree'),
		    tabTip : cwb.Dict.translate('Click on an object to see its children.'),
		    cls: "cwb-treePanel",
		    listeners : {
			    render : function(self) {
				    self.getEl().dom.innerHTML = "<div id='" + cwb.ui.StructureTabPanel.PACKAGE_ID + "' style='overflow: auto; width: 100%; height: 100%;'></div>";
				    init();
			    }
		    }
		});
		
		Ext.apply(this, {
		    region : 'center',
		    activeTab : 0,
		    deferredRender: false,
		    items : [ this.weightPanel, this.treePanel ]
		});
		
		cwb.ui.StructureTabPanel.superclass.initComponent.apply(this, arguments);
		
		this.on("tabchange", function(tabPanel, tab) {
			self.handleTabChange(tabPanel, tab);
		});
	}
})

/**
 * Sets scroll position to middle of the frame when spacetree is activated.
 * 
 * @param {Object}
 *            tabPanel this.structureTabPanel
 * @param {Object}
 *            tab The Tab which is being activated.
 */
cwb.ui.StructureTabPanel.prototype.handleTabChange = function(tabPanel, tab) {
	if (tab == tabPanel.getActiveTab()) {
		if (frames[3]) {
			frames[3].window.scroll(0, 1000 - (frames[3].window.innerHeight / 2));
		}
	}
}

cwb.ui.StructureTabPanel.prototype.resetTabs = function() {
	var tabCount = this.items.getCount();
	
	for (var i = 2; i < tabCount; i++) {
		this.items.getAt(i).remove();
	}
}

cwb.ui.StructureTabPanel.prototype.showDiagrams = function() {
	/**
	 * Reloads treemap window.
	 */
	Ext.get(cwb.ui.StructureTabPanel.WEIGHT_ID).dom.contentWindow.location.reload();

	/**
	 * Reloads frametree window if it has already been rendered.
	 */
	var div = Ext.get(cwb.ui.StructureTabPanel.PACKAGE_ID);
	if (div) {
		div.dom.innerHTML = "";
	}
	
	start();
}

cwb.ui.StructureTabPanel.getInstance = function() {
	if (!(cwb.ui.StructureTabPanel.instance)) {
		cwb.ui.StructureTabPanel.instance = new cwb.ui.StructureTabPanel();
	}
	return cwb.ui.StructureTabPanel.instance;
}

cwb.ui.StructureTabPanel.WEIGHT_ID = "cwb-weight-id";
cwb.ui.StructureTabPanel.PACKAGE_ID = "cwb-package-id";