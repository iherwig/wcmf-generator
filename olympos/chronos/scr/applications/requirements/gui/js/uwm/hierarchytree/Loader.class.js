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
		var childOids = modelNode.getChildOids();
		var parentOids = modelNode.getParentOids();
		
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
		
		oidList = this.filterOidList(oidList, childOids, parentNodeOid, grandParentNodeOid);
		oidList = this.filterOidList(oidList, parentOids, parentNodeOid, grandParentNodeOid);
		
		this.attachFollowersList(currNode, modelNode, oidList.getRange());
		
	},
	
	filterOidList: function(oidList, checkOidList, parentNodeOid, grandParentNodeOid) {
		if (checkOidList) {
			for (var i = 0; i < checkOidList.length; i++) {
				var currOid = checkOidList[i];
				
				if (currOid != parentNodeOid && currOid != grandParentNodeOid && !oidList.contains(currOid)) {
					oidList.add(currOid);
				}
			}
		}
		
		return oidList;
	},
	
	attachFollowersList: function(currNode, modelNode, oidList) {
	
		var subClasses = new Array();
		var container = uwm.Session.getInstance().getModelContainer();
		
		for (var i = 0; i < oidList.length; i++) {
			var childModelNode = container.getByOid(oidList[i]);
			
			if (!childModelNode) {
				var self = this;
				
				container.loadByOid(oidList[i], function() {
					self.attachFollowersList(currNode, modelNode, oidList);
				});
				
				return;
			}
			
			if (childModelNode instanceof uwm.model.ModelObject) {
				var subUwmClassName = childModelNode.getUwmClassName();
				var subArray = subClasses[subUwmClassName];
				if (!subArray) {
					subArray = new Array();
				}
				subArray.push(childModelNode)
				subClasses[subUwmClassName] = subArray;
				console.log("added class: " + subUwmClassName);
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
				}
			}
		}
	}
});

uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH = 1;
