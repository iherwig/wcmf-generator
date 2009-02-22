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
 * @class Loads the contents of the Hierarchy Tree asynchronously.
 *
 * @extends Ext.tree.TreeLoader
 * @see uwm.hierarchytree.HierarchyTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.hierarchytree.Loader = function() {
}

uwm.hierarchytree.Loader = Ext.extend(Ext.tree.TreeLoader, {
	initComponent: function(config) {
		Ext.apply(this, {
			preloadChildren: false
		});
		
		uwm.hierarchytree.Loader.superclass.initComponent.apply(this, arguments);
		
		this.tree = config.tree;
	}
})

uwm.hierarchytree.Loader.prototype.load = function(node, callback) {
	var oid = node;
	
	if (node instanceof uwm.hierarchytree.Node) {
		oid = node.getModelNode().getOid();
	}
	
	var self = this;
	
	uwm.persistency.Persistency.getInstance().display(oid, uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH, function(request, data) {
		self.reformatData(self, node, callback, data);
	});
}

uwm.hierarchytree.Loader.prototype.reformatData = function(self, node, callback, data) {
	var modelNode = uwm.model.ModelContainer.getInstance().createByDisplayResult(data);
	
	var currNode = node;
	
	this.attachFollowers(currNode, modelNode);
	
	if (callback instanceof Function) {
		callback(this, node);
	}
}

uwm.hierarchytree.Loader.prototype.attachFollowers = function(currNode, modelNode, parentModel) {
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
	
	this.attachFollowersList(currNode, modelNode, oidList.getRange(), parentNodeOid, grandParentNodeOid);
	
}

uwm.hierarchytree.Loader.prototype.filterOidList = function(oidList, checkOidList, parentNodeOid, grandParentNodeOid) {
	if (checkOidList) {
		for (var i = 0; i < checkOidList.length; i++) {
			var currOid = checkOidList[i];
			
			if (currOid != parentNodeOid && currOid != grandParentNodeOid && !oidList.contains(currOid)) {
				oidList.add(currOid);
			}
		}
	}
	
	return oidList;
}

uwm.hierarchytree.Loader.prototype.attachFollowersList = function(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid) {
	var subClasses = new Array();
	var container = uwm.model.ModelContainer.getInstance();
	
	var self = this;
	
	for (var i = 0; i < oidList.length; i++) {
		var childModelNode = container.getByOid(oidList[i]);
		
		if (!childModelNode) {
			container.loadByOid(oidList[i], function() {
				self.attachFollowersList(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid);
			});
			
			return;
		}
		
		if (childModelNode instanceof uwm.model.Relation) {
			var parentOids = childModelNode.getParentOids();
			for (var j = 0; j < parentOids.length; j++) {
				var currOid = parentOids[j];
				
				if (currOid != modelNode.getOid()) {
					oidList.splice(i, 1);
					i--;
					
					if (currOid != parentNodeOid && currOid != grandParentNodeOid) {
						oidList.push(currOid);
						container.loadByOid(currOid, function() {
							self.attachFollowersList(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid);
						});
						
						return;
					}
				}
			}
		}
		
		if (childModelNode instanceof uwm.model.ModelObject) {
			var connectionType = modelNode.getModelNodeClass().getConnectionInfo(childModelNode.getModelNodeClass()).label;
			var subArray = subClasses[connectionType];
			if (!subArray) {
				subArray = new Array();
			}
			subArray.push(childModelNode)
			subClasses[connectionType] = subArray;
		}
	}
	
	for (var currClass in subClasses) {
		if (!(subClasses[currClass] instanceof Function)) {
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

uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH = 1;
