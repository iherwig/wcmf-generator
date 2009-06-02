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

/**
 * Graphical container for all Existing Content.
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config The configuration object.
 */

uwm.ui.ExistingContentContainer = function() {
}

uwm.ui.ExistingContentContainer = Ext.extend(Ext.Panel, {

		initComponent: function() {
	
		var self = this;
				
		this.existingContent = [new uwm.modeltree.ModelTree(), new uwm.ui.Glossary(), new uwm.hierarchytree.HierarchyTree()];
		this.getObjectGrids();

		this.expandAllButton = new Ext.Toolbar.Button({
			text: uwm.Dict.translate("expand all"),
			handler: function() {
				uwm.modeltree.ModelTree.getInstance().expandAll();
			}
		})
	
		this.collapseAllButton = new Ext.Toolbar.Button({
			text: uwm.Dict.translate("collapse all"),
			handler: function() {
				uwm.modeltree.ModelTree.getInstance().collapseAll();
			}
		})
		
		Ext.apply(this, {
			region: "center",
			title: uwm.Dict.translate('Existing Classes'),
			layout: 'card',
			activeItem: 0,
			items: this.existingContent,
			id: "existingFiguresContainer",
			tbar: [new uwm.ui.DropDown({
				Accordion: this.Accordion,
				existingContent: this.existingContent,
				expandAllButton: this.expandAllButton,
				collapseAllButton: this.collapseAllButton
			}),this.expandAllButton,this.collapseAllButton]
		});
		
		uwm.ui.ExistingContentContainer.superclass.initComponent.apply(this, arguments);
		
		uwm.ui.ExistingContentContainer.instance = this;
	}
});
	 
uwm.ui.ExistingContentContainer.prototype.getObjectGrids = function() {

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

uwm.ui.ExistingContentContainer.prototype.showPanel = function(panel) {
	var num = this.items.indexOf(panel);
	this.getLayout().setActiveItem(num);
}

uwm.ui.ExistingContentContainer.getInstance = function() {
	return uwm.ui.ExistingContentContainer.instance;
}