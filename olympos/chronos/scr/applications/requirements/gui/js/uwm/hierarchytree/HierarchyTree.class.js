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
 * @class The Hierarchy Tree displays all relations of a selected ModelObject.
 *
 * @extends uwm.objecttree.ObjectTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.hierarchytree.HierarchyTree = function() {
}

uwm.hierarchytree.HierarchyTree = Ext.extend(uwm.objecttree.ObjectTree, {
	initComponent: function() {
	
		var self = this;
		
		Ext.apply(this, {
			id: uwm.hierarchytree.HierarchyTree.COMPONENT_ID,
			loader: new uwm.hierarchytree.Loader({
				tree: self
			}),
			iconCls: "HierarchyTab",
			name: "Hierarchy Tree",
			rootVisible: false,
			enableDrop: false,
			root: new Ext.tree.TreeNode(),
			tabTip: "<b>" + uwm.Dict.translate('Hierarchy Tree') + "</b><p>" + uwm.Dict.translate('Shows all dependencies of a specific object. Use context menu on an object to show it here.') + "</p>"
		});
		
		uwm.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		uwm.hierarchytree.HierarchyTree.instance = this;
		
		var self = this;
		uwm.event.EventBroker.getInstance().addListener({
			"delete": function(modelObject) {
				self.handleDeleteEvent(modelObject);
			},
			"changeLabel": function(modelObject, oldLabel, newLabel) {
				self.handleChangeLabelEvent(modelObject, oldLabel, newLabel);
			},
			"associate": function(parentModelObject, childModelObject) {
				self.handleAssociateEvent(parentModelObject, childModelObject);
			},
			"disassociate": function(parentModelObject, childModelObject) {
				self.handleDisassociateEvent(parentModelObject, childModelObject);
			}
		});
		
		this.on("afterlayout", this.showInfoMask);
		
		this.wasActive = false;
	}
})

uwm.hierarchytree.HierarchyTree.prototype.showInfoMask = function() {
	if (!this.wasActive) {
		this.infoMask = new uwm.ui.InfoMask(this.body, {
			msg: uwm.Dict.translate('This tree shows all dependencies of an object. Select an object, right-click and select &quot;Show in hierarchy&quot; to show it here.')
		});
		this.infoMask.show();
	}
	this.un("afterlayout", this.showInfoMask);
}

uwm.hierarchytree.HierarchyTree.prototype.loadNode = function(oid) {
	this.wasActive = true;
	
	if (this.infoMask) {
		this.infoMask.hide();
	}
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
}

uwm.hierarchytree.HierarchyTree.prototype.handleDeleteEvent = function(modelObject) {
	var instances = this.getInstances(modelObject.getOid());
	
	for (var i in instances) {
		if (!(instances[i] instanceof Function)) {
			var parent = instances[i].parentNode;
			
			instances[i].remove();
			
			if (!parent.hasChildNodes()) {
				parent.remove();
			}
		}
	}
}

uwm.hierarchytree.HierarchyTree.prototype.handleChangeLabelEvent = function(modelObject, oldLabel, newLabel) {
	// don't update nodes, it the are translated into a different language
	if (modelObject.getLanguage() != uwm.i18n.Localization.getInstance().getUserLanguage()) {
		return;
	}

	var instances = this.getInstances(modelObject.getOid());
	if (!newLabel) {
		var label = modelObject.getLabel();
	}else{
		var label= newLabel;
	}
	
	for (var i in instances) {
		if (!(instances[i] instanceof Function)) {
			instances[i].setText(label);
		}
	}
}

uwm.hierarchytree.HierarchyTree.prototype.handleAssociateEvent = function(parentModelObject, childModelObject) {
	if (parentModelObject instanceof uwm.model.ModelObject && childModelObject instanceof uwm.model.ModelObject) {
		this.addPossibleNewChildren(parentModelObject, childModelObject);
		this.addPossibleNewChildren(childModelObject, parentModelObject);
	}
}

uwm.hierarchytree.HierarchyTree.prototype.addPossibleNewChildren = function(parentModelObject, childModelObject) {
	var instances = this.getInstances(parentModelObject.getOid());
	
	for (var i in instances) {
		var currNode = instances[i];
		
		if (!(currNode instanceof Function)) {
			var found = false;
			
			var searchNode = currNode;
			for (var j = 0; j < 4; j++) {
				if (searchNode) {
					if (searchNode instanceof uwm.hierarchytree.Node && searchNode.getModelNode().getOid() == childModelObject.getOid()) {
						found = true;
						break;
					}
					
					searchNode = searchNode.parentNode;
				} else {
					break;
				}
			}
			
			if (!found) {
				var connectionType = parentModelObject.getModelNodeClass().getConnectionInfo(childModelObject.getModelNodeClass()).label;
				
				var connectionNode = currNode.findChild("text", connectionType);
				if (!connectionNode) {
					connectionNode = new uwm.hierarchytree.ConnectionNode({
						text: connectionType
					});
					
					currNode.appendChild(connectionNode);
				}
				
				var existingNodes = connectionNode.childNodes;
				var alreadyThere = false;
				for (var j in existingNodes) {
					var existingNode = existingNodes[j];
					
					if (!(existingNode instanceof Function)) {
						if (existingNode.getModelNode().getOid() == childModelObject.getOid()) {
							alreadyThere = true;
							break;
						}
					}
				}
				
				if (!alreadyThere) {
					var subNode = new uwm.hierarchytree.Node({
						parent: parentModelObject,
						modelNode: childModelObject
					});
					
					connectionNode.appendChild(subNode);
				}
			}
		}
	}
}

uwm.hierarchytree.HierarchyTree.prototype.handleDisassociateEvent = function(parentModelObject, childModelObject) {
	if (parentModelObject instanceof uwm.model.ModelObject && childModelObject instanceof uwm.model.ModelObject) {
		this.deletePossibleChildren(parentModelObject, childModelObject);
		this.deletePossibleChildren(childModelObject, parentModelObject);
	}
}

uwm.hierarchytree.HierarchyTree.prototype.deletePossibleChildren = function(parentModelObject, childModelObject) {
	var instances = this.getInstances(parentModelObject.getOid());
	
	var self = this;
	var childOid = childModelObject.getOid();
	
	for (var i in instances) {
		var currNode = instances[i];
		
		if (!(currNode instanceof Function)) {
			var connectionNodes = currNode.childNodes;
			
			for (var j in connectionNodes) {
				if (!(connectionNodes[j] instanceof Function)) {
					var child = connectionNodes[j].findChildBy(function(node) {
						return self.isNodeWithOid(node, childOid);
					});
					
					if (child) {
						var parent = child.parentNode;
						child.remove();
						
						if (!parent.hasChildNodes()) {
							parent.remove();
						}
					}
				}
			}
		}
	}
}

uwm.hierarchytree.HierarchyTree.prototype.isNodeWithOid = function(node, childOid) {
	var result = false;
	
	if (node instanceof uwm.hierarchytree.Node) {
		result = node.getModelNode().getOid() == childOid;
	}
	
	return result;
}

uwm.hierarchytree.HierarchyTree.prototype.getInstances = function(oid) {
	result = new Array();
	
	return this.walkTree(this.getRootNode(), oid, result);
	
}

uwm.hierarchytree.HierarchyTree.prototype.walkTree = function(currNode, oid, result) {
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


uwm.hierarchytree.HierarchyTree.getInstance = function() {
	return uwm.hierarchytree.HierarchyTree.instance;
}

uwm.hierarchytree.HierarchyTree.COMPONENT_ID = "uwm.hierarchytree.HierarchyTree.ID";
