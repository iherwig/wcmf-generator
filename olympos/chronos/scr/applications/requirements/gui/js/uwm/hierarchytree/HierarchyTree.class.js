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
			enableDrop: false,
			root: new Ext.tree.TreeNode(),
			tabTip: "<b>Hierarchy Tree</b><p>Shows all dependencies of a specific object. Use context menu on an object to show it here.</p>"
		});
		
		uwm.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		uwm.hierarchytree.HierarchyTree.instance = this;
		
		var self = this;
		uwm.event.EventBroker.getInstance().addListener({
			"delete": function(modelObject) {
				self.handleDeleteEvent(modelObject);
			},
			"changeLabel": function(modelObject, oldLabel) {
				self.handleChangeLabelEvent(modelObject, oldLabel);
			}
		});
	},
	
	loadNode: function(oid) {
		this.show();
		
		var modelNode = uwm.model.ModelContainer.getInstance().getByOid(oid);
		
		currNode = new uwm.hierarchytree.Node({
			parent: null,
			modelNode: modelNode,
		});
		
		if (this.root.firstChild) {
			this.root.firstChild.remove();
		}
		
		this.root.appendChild(currNode);
		currNode.expand();
	},
	
	handleDeleteEvent: function(modelObject) {
		var instances = this.getInstances(modelObject.getOid());
		
		for (var i in instances) {
			if (!(instances[i] instanceof Function)) {
				instances[i].remove();
			}
		}
	},
	
	handleChangeLabelEvent: function(modelObject, oldLabel) {
		var instances = this.getInstances(modelObject.getOid());
		var label = modelObject.getLabel();
		
		for (var i in instances) {
			if (!(instances[i] instanceof Function)) {
				instances[i].setText(label);
			}
		}
	},
	
	getInstances: function(oid) {
		result = new Array();
		
		return this.walkTree(this.getRootNode(), oid, result);
		
	},
	
	walkTree: function(currNode, oid, result) {
		for (var i in currNode.childNodes) {
			if (!(currNode.childNodes[i] instanceof Function)) {
				var currChild = currNode.childNodes[i];
				
				if (currChild instanceof uwm.hierarchytree.Node && currChild.getModelNode().getOid() == oid) {
					result.push(currChild);
				}
				
				result = this.walkTree(currChild, oid, result);
			}
		}
		
		return result;
	}
});

uwm.hierarchytree.HierarchyTree.getInstance = function() {
	return uwm.hierarchytree.HierarchyTree.instance;
}

uwm.hierarchytree.HierarchyTree.COMPONENT_ID = "uwm.hierarchytree.HierarchyTree.ID";
