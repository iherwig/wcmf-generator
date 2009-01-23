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
Ext.namespace("uwm.ui");

uwm.ui.Workbench = function(config) {
	this.eastPanel = new uwm.ui.EastPanel({
		highlight: "default"
	});
	
	this.existingContent = [new uwm.modeltree.ModelTree(), new uwm.hierarchytree.HierarchyTree()];
	this.getObjectGrids();
	
	uwm.ui.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		items: [{
			region: "west",
			title: uwm.Dict.translate('Available Content'),
			collapsible: true,
			split: true,
			width: 250,
			layout: "fit",
			id: "contentContainer",
			items: {
				layout: "border",
				items: [new uwm.newobjects.NewObjectsGrid({}), {
					region: "center",
					title: uwm.Dict.translate('Existing Classes'),
					xtype: "tabpanel",
					enableTabScroll: true,
					id: "existingFiguresContainer",
					activeTab: 0,
					items: this.existingContent
				}]
			}
		}, this.eastPanel, uwm.diagram.DiagramContainer.getInstance().getTabPanel()]
	}, config));
}

Ext.extend(uwm.ui.Workbench, uwm.ui.AbstractWorkbench);

uwm.ui.Workbench.prototype.getObjectGrids = function() {

	var classes = uwm.model.ModelNodeClassContainer.getInstance().getAllClasses();
	var clsct = classes.getCount();
	for (var i = 0; i < clsct; i++) {
		var currClass = classes.itemAt(i);
		if (currClass instanceof uwm.model.ModelClass) {
			this.existingContent.push(new uwm.objectgrid.ObjectGrid({
				uwmClassName: currClass.getUwmClassName()
			}));
		}
	}
}


