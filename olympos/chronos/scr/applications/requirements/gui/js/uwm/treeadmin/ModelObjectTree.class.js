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
Ext.namespace("uwm.treeadmin");

uwm.treeadmin.ModelObjectTree = Ext.extend(Ext.tree.TreePanel, {
	initComponent: function() {
	
		Ext.apply(this, {
			region: "west",
			layout: "fit",
			width: 250,
			title: "Model Objects",
			autoScroll: true,
			animate: true,
			containerScroll: true,
			root: new Ext.tree.TreeNode(),
			rootVisible: false,
			loader: new uwm.treeadmin.ModelObjectTreeLoader()
		});
		
		uwm.treeadmin.ModelObjectTree.superclass.initComponent.apply(this, arguments);
		
		var classes = uwm.model.ModelNodeClassContainer.getInstance().getAllClasses();
		
		for (var i = 0; i < classes.getCount(); i++) {
			var currClass = classes.itemAt(i);
			
			if (currClass instanceof uwm.model.ModelClass) {
				this.getRootNode().appendChild(new uwm.treeadmin.ModelClassNode({
					modelClass: currClass
				}));
			}
		}
	}
});

uwm.treeadmin.ModelObjectTree.getInstance = function() {
	if (!uwm.treeadmin.ModelObjectTree.instance) {
		uwm.treeadmin.ModelObjectTree.instance = new uwm.treeadmin.ModelObjectTree();
	}
	
	return uwm.treeadmin.ModelObjectTree.instance;
}
