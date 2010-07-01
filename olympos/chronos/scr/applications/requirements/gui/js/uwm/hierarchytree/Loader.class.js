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
	
	uwm.persistency.Persistency.getInstance().display(oid, uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH, 
		uwm.i18n.Localization.getInstance().getModelLanguage(), function(request, data) {
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
	
	this.attachFollowersList(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid);
	
}

uwm.hierarchytree.Loader.prototype.filterOidList = function(oidList, checkOidList, parentNodeOid, grandParentNodeOid) {
	if (checkOidList) {
		for (var i = 0; i < checkOidList.length; i++) {
			var currOid = checkOidList[i];
			
			if (currOid != parentNodeOid && currOid != grandParentNodeOid && !oidList.containsKey(currOid)) {
				oidList.add(currOid, null); // second parameter is the relation object for later reference
			}
		}
	}
	
	return oidList;
}

uwm.hierarchytree.Loader.prototype.attachFollowersList = function(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid) {
	var subClasses = new Array();
	var container = uwm.model.ModelContainer.getInstance();
	
	var self = this;
	
	var oids = oidList.keys;
	for (var i = 0; i < oids.length; i++) {
		var currOid = oids[i];
		var relationObject = oidList.get(currOid);
		var childModelNode = container.getByOid(currOid);
		
		if (!childModelNode) {
			container.loadByOid(currOid, function() {
				self.attachFollowersList(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid);
			});
			
			return;
		}
		
		if (childModelNode instanceof uwm.model.Relation) {
			var parentOids = childModelNode.getParentOids();
			for (var j = 0; j < parentOids.length; j++) {
				var otherNodeOid = parentOids[j];
				
				if (otherNodeOid != modelNode.getOid()) {
					oidList.removeKey(currOid);
					
					if (otherNodeOid != parentNodeOid && otherNodeOid != grandParentNodeOid) {
						oidList.add(otherNodeOid, childModelNode);
						container.loadByOid(otherNodeOid, function() {
							self.attachFollowersList(currNode, modelNode, oidList, parentNodeOid, grandParentNodeOid);
						});
						
						return;
					}
				}
			}
		}
		
		if (childModelNode instanceof uwm.model.ModelObject) {
			var connectionType = 'undefined';
			// get the ConnectionNode name from the connection info
			var connectionInfo = modelNode.getModelNodeClass().getConnectionInfo(childModelNode.getModelNodeClass());
			if (connectionInfo.connections && relationObject) {
				// if there are several possible connection infos, we need to select the correct one by using the
				// relation object
				for (var j in connectionInfo.connections) {
					var currConnection = connectionInfo.connections[j];
					if (currConnection.connectionType == relationObject.getProperty('relationType')) {
						connectionType = currConnection.connectionType;
					}
				}
			}
			else if (connectionInfo.connection) {
				connectionType = connectionInfo.connection.label;
			}
			else {
				connectionType = connectionInfo.label;
			}
			var subArray = subClasses[connectionType];
			if (!subArray) {
				subArray = new Array();
			}
			subArray.push(childModelNode)
			subClasses[connectionType] = subArray;
		}
	};
	
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
				// mark remote nodes
				if (subNode.modelNode && subNode.modelNode.isRemoteNode()) {
					subNode.cls = "RemoteTreeNode";
				}
				
				connectionNode.appendChild(subNode);
			}
		}
	}
}

uwm.hierarchytree.Loader.DEFAULT_LOAD_DEPTH = 1;
