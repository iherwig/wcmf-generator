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

		this.packageWeight = new cwb.ui.Treemap();
		this.packageTree = new cwb.ui.Spacetree();
		
		/**
		 * Tab containing treemap (package weight).
		 */
		this.weightPanel = new Ext.Panel( {
		    title : cwb.Dict.translate('Package weight'),
		    tabTip : cwb.Dict.translate('Left-click to enter a package or object, right-click to leave it.'),
		    html : '<div id="' + cwb.ui.StructureTabPanel.WEIGHT_ID + '" style="height: 100%;width:100%;"></div>'
		});
		
		/**
		 * Tab containing spacetree (package tree).
		 */
		this.treePanel = new Ext.Panel( {
		    title : cwb.Dict.translate('Package tree'),
		    tabTip : cwb.Dict.translate('Click on an object to see its children.'),
		    html : '<div id="' + cwb.ui.StructureTabPanel.PACKAGE_ID + '" style="overflow: auto; width: 100%; height: 100%;"></div>',
		    cls : "cwb-treePanel"
		});
		
		this.lastEditedPanel = new cwb.ui.LastEditedGrid( {});
		
		Ext.apply(this, {
		    region : 'center',
		    activeTab : 0,
		    deferredRender : false,
		    items : [ this.weightPanel, this.treePanel, this.lastEditedPanel ]
		});
		
		cwb.ui.StructureTabPanel.superclass.initComponent.apply(this, arguments);
		
		this.on("tabchange", function(tabPanel, tab) {
			self.handleTabChange(tabPanel, tab);
		});
		this.on("remove", function(tabPanel, tab) {
			self.removeHitsGrid(tab);
		});
		
		this.hitsGrids = new Ext.util.MixedCollection();
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
	var scrollArea = Ext.get(cwb.ui.StructureTabPanel.PACKAGE_ID);
	var scroll = scrollArea.getScroll();
	if (scroll.left == 0 && scroll.top == 0) {
		scrollArea.scrollTo("left", scrollArea.dom.scrollWidth / 2 - scrollArea.getWidth() / 2);
		scrollArea.scrollTo("top", scrollArea.dom.scrollHeight / 2 - scrollArea.getHeight() / 2);
	}
}

cwb.ui.StructureTabPanel.prototype.clear = function() {
	var tabCount = this.items.getCount();
	
	for ( var i = cwb.ui.StructureTabPanel.STATIC_TAB_COUNT; i < tabCount; i++) {
		this.remove(this.items.itemAt(cwb.ui.StructureTabPanel.STATIC_TAB_COUNT));
	}
	
	this.hitsGrids.clear();
	
	cwb.Util.emptyDiv(cwb.ui.StructureTabPanel.WEIGHT_ID);
	
	this.setActiveTab(0);
}

cwb.ui.StructureTabPanel.prototype.removeHitsGrid = function(hitsGrid) {
	this.hitsGrids.remove(hitsGrid);
}

cwb.ui.StructureTabPanel.prototype.showDiagrams = function() {

	cwb.Util.showDiv(cwb.ui.StructureTabPanel.WEIGHT_ID);
	cwb.Util.showDiv(cwb.ui.StructureTabPanel.PACKAGE_ID);
	
	this.packageWeight.show();
	this.packageTree.show();
}

cwb.ui.StructureTabPanel.prototype.createHitsGrid = function(id, tabTitle, tabContentOids) {
	var tab = this.hitsGrids.get(id);
	
	if (!tab) {
		var tab = new cwb.statistics.HitsGrid( {
		    title : tabTitle,
		    objectList : tabContentOids
		});
		this.hitsGrids.add(id, tab);
		this.add(tab);
	}
	
	tab.show();
}

cwb.ui.StructureTabPanel.getInstance = function() {
	if (!(cwb.ui.StructureTabPanel.instance)) {
		cwb.ui.StructureTabPanel.instance = new cwb.ui.StructureTabPanel();
	}
	return cwb.ui.StructureTabPanel.instance;
}

cwb.ui.StructureTabPanel.WEIGHT_ID = "cwb-weight-id";
cwb.ui.StructureTabPanel.PACKAGE_ID = "cwb-package-id";
cwb.ui.StructureTabPanel.STATIC_TAB_COUNT = 3;
