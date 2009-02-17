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

/**
 * @class A Model Object inside the Hierarchy Tree.
 * 
 * @extends uwm.objecttree.ObjectNode
 * @see uwm.hierarchytree.HierarchyTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.hierarchytree.Node = function(config) {
	var childOids = config.modelNode.getChildOids(true);
	var parentOids = this.removeDirectParent(config.parent, config.modelNode.getParentOids(true));
	
	uwm.hierarchytree.Node.superclass.constructor.call(this, Ext.apply(this, {
		text: config.modelNode.getLabel(),
		iconCls: config.modelNode.getModelNodeClass().getTreeIcon(),
		leaf: childOids || parentOids,
		allowDrop: false
	}, config));
	
	this.modelNode = config.modelNode;
}

Ext.extend(uwm.hierarchytree.Node, uwm.objecttree.ObjectNode, {
	buildContextMenu: function() {
		var self = this;
		
		this.contextMenu = uwm.hierarchytree.Node.superclass.buildContextMenu.apply(this);
		
		this.contextMenu.add({
			text: uwm.Dict.translate('Show in model tree'),
			handler: function(item, e) {
				self.showInModelTree(item, e);
			}
		});
		
		return this.contextMenu;
	},
	
	showInModelTree: function(self, e) {
		uwm.modeltree.ModelTree.getInstance().markNodeByOid(this.getModelNode().getOid());
	},
	
	removeDirectParent: function(parent, parentOids) {
	
		var result = new Array();
		
		if (parentOid) {
			var parentOid = parent.getOid();
			
			for (var i = 0; i < parentOids; i++) {
				if (parentOids[i] != parentOid) {
					result.push(parentOids[i]);
				}
			}
		}
		else {
			result = parentOids;
		}
		
		return result;
	}
});
