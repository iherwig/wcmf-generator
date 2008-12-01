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

uwm.hierarchytree.Loader = Ext.extend(Ext.tree.TreeLoader, {
	initComponent: function(config) {
		Ext.apply(this, {
			preloadChildren: false
		});
		
		uwm.hierarchytree.Loader.superclass.initComponent.apply(this, arguments);
		
		this.tree = config.tree;
	},
	
	load: function(node, callback) {
		var oid = node;
		
		if (node instanceof uwm.hierarchytree.Node) {
			oid = node.getModelNode().getOid();
		}
		
		var self = this;
		
		uwm.persistency.Persistency.getInstance().display(oid, uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH, function(request, data) {
			self.reformatData(self, node, callback, data);
		});
	},
	
	reformatData: function(self, node, callback, data) {
		var modelNode = uwm.Session.getInstance().getModelContainer().createByDisplayResult(data);
		
		var currNode = node;
		
		this.attachFollowers(currNode, modelNode);
		
		if (node instanceof String) {
			this.tree.root.firstChild.render();
		}
		if (callback instanceof Function) {
			callback(this, node);
		}
	},
	
	attachFollowers: function(currNode, modelNode, parentModel) {
		var childOids = modelNode.getChildOids(true);
		var parentOids = modelNode.getParentOids(true);
		
		var parentNodeOid = null;
		if (parentModel) {
			parentNodeOid = parentModel.getOid();
		}
		
		var grandParentNodeOid = null;
		var parentNode = currNode.parentNode;
		if (parentNode) {
			var grandParentNode = parentNode.parentNode;
			if (grandParentNode) {
				grandParentNodeOid = grandParentNode.getModelNode().getOid();
			}
		}
		
		var oidList = new Ext.util.MixedCollection();
		oidList.addAll(childOids);
		
		for (var i = 0; i < parentOids.length; i++) {
			var currOid = parentOids[i];
			
			if (currOid != parentNodeOid && currOid != grandParentNodeOid && !oidList.contains(currOid)) {
				oidList.add(currOid);
			}
		}
		
		this.attachFollowersList(currNode, modelNode, oidList.getRange());
		
	},
	
	
	attachFollowersList: function(currNode, modelNode, oidList) {
	
		var subClasses = new Array();
		
		for (var i = 0; i < oidList.length; i++) {
			var childModelNode = uwm.Session.getInstance().getModelContainer().getByOid(oidList[i]);
			
			if (childModelNode && childModelNode instanceof uwm.model.ModelObject) {
				var subUwmClassName = childModelNode.getUwmClassName();
				var subArray = subClasses[subUwmClassName];
				if (!subArray) {
					subArray = new Array();
				}
				subArray.push(childModelNode)
				subClasses[subUwmClassName] = subArray;
			}
		}
		
		for (var currClass in subClasses) {
			if (currClass != "remove") {
				var currEntry = subClasses[currClass];
				
				var connectionNode = new uwm.hierarchytree.ConnectionNode({
					text: currClass
				});
				
				currNode.appendChild(connectionNode);
				
				for (var i = 0; i < currEntry.length; i++) {
					var childModelNode = currEntry[i];
					
					var subNode = new uwm.hierarchytree.Node({
						parent: modelNode,
						modelNode: childModelNode
					});
					
					connectionNode.appendChild(subNode);
					
					this.attachFollowers(subNode, childModelNode, modelNode);
				}
			}
		}
	}
});

uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH = 1;
