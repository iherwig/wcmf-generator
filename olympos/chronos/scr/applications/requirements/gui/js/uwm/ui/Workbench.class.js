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
	uwm.ui.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		layout: "border",
		items: [{
			region: "west",
			title: "Available Content",
			collapsible: true,
			split: true,
			width: 250,
			layout: "fit",
			id: "contentContainer",
			items: {
				layout: "border",
				items: [new uwm.newobjects.NewObjectsGrid({}), {
					region: "center",
					title: "Existing Classes",
					xtype: "tabpanel",
					enableTabScroll: true,
					id: "existingFiguresContainer",
					activeTab: 0,
					items: [new uwm.modeltree.ModelTree(), new uwm.hierarchytree.HierarchyTree(), new uwm.objectgrid.ObjectGrid({
						uwmClassName: "ChiGoal"
					}), new uwm.objectgrid.ObjectGrid({
						uwmClassName: "ChiRequirement"
					})]
				}]
			}
		}, new uwm.ui.EastPanel({
			highlight: "default"
		}), uwm.diagram.DiagramContainer.getInstance().getTabPanel()]
	}, config));
}

Ext.extend(uwm.ui.Workbench, Ext.Viewport);
