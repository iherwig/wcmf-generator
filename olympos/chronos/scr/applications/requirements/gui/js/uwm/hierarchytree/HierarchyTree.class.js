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
Ext.namespace("uwm.hierarchytree");

uwm.hierarchytree.HierarchyTree = Ext.extend(uwm.objecttree.ObjectTree, {
	initComponent: function() {
	
		var self = this;
		
		Ext.apply(this, {
			id: uwm.hierarchytree.HierarchyTree.COMPONENT_ID,
			loader: new uwm.hierarchytree.Loader({
				tree: self
			}),
			iconCls: "HierarchyTab",
			rootVisible: false,
			root: new Ext.tree.TreeNode()
		});
		
		uwm.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		uwm.hierarchytree.HierarchyTree.instance = this;
	},
	
	loadNode: function(oid) {
		this.show();
		
		var modelNode = uwm.Session.getInstance().getModelContainer().getByOid(oid);
		
		currNode = new uwm.hierarchytree.Node({
			parent: null,
			modelNode: modelNode,
		});
		
		if (this.root.firstChild) {
			this.root.firstChild.remove();
		}
		
		this.root.appendChild(currNode);
		currNode.expand();
	}
});

uwm.hierarchytree.HierarchyTree.getInstance = function() {
	return uwm.hierarchytree.HierarchyTree.instance;
}

uwm.hierarchytree.HierarchyTree.COMPONENT_ID = "uwm.hierarchytree.HierarchyTree.ID";
