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
Ext.namespace("uwm.modeltree");

/**
 * @class The Model Tree (lower left view).
 *
 * <p>This tree displays models, packages and contained diagrams and model objects.</p>
 *
 * <p>The Model Tree is a <i>Singleton</i>.</p>
 *
 * @extends Ext.tree.TreePanel
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.ModelTree = function(config) {
	this.buildContextMenu();
	
	uwm.modeltree.ModelTree.superclass.constructor.call(this, Ext.apply(this, {
		id: uwm.modeltree.ModelTree.COMPONENT_ID,
		root: new Ext.tree.AsyncTreeNode({
			text: "root",
			draggable: false,
			id: 'root'
		}),
		loader: new uwm.modeltree.Loader(),
		iconCls: "TreeTab",
		rootVisible: false,
		name: 'Model Tree',
		enableDD: true,
		ddGroup: uwm.Constants.DD_GROUP,
		tabTip: "<b>" + uwm.Dict.translate('Model Tree') + "</b><p>" + uwm.Dict.translate('Shows all models, packages, and contained objects.') + "</p>"
	}, config));
	
	/**
	 * The instance of ModelTree.
	 *
	 * @private
	 * @type uwm.modeltree.ModelTree
	 */
	uwm.modeltree.ModelTree.instance = this;
	
	var self = this;
	
	this.on("nodedragover", function(dragOverEvent) {
		self.checkDroppable(dragOverEvent);
	});
	this.on("beforenodedrop", function(dropEvent) {
		self.handleBeforeNodeDrop(dropEvent);
	});
	
	this.createdModels = new Ext.util.MixedCollection();
	this.createdPackages = new Ext.util.MixedCollection();
	this.createdDiagrams = new Ext.util.MixedCollection();
	
	this.disassociatedNodes = new Ext.util.MixedCollection();
	
	var self = this;
	uwm.event.EventBroker.getInstance().addListener({
		"create": function(modelObject) {
			self.handleCreateEvent(modelObject);
		},
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
}

Ext.extend(uwm.modeltree.ModelTree, uwm.objecttree.ObjectTree);

/**
 * Registers the not node specific context menu.
 *
 * @private
 */
uwm.modeltree.ModelTree.prototype.render = function(container, position) {
	uwm.modeltree.ModelTree.superclass.render.apply(this, arguments);
	
	var self = this;
	
	this.el.on("contextmenu", function(e, el) {
		self.showContextMenu(self, e, el);
	});
}

/**
 * Builds the not node specific context menu.
 *
 * @private
 */
uwm.modeltree.ModelTree.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu({
		items: [{
			text: uwm.Dict.translate('Create model'),
			handler: function(item, e) {
				self.createModel();
				
			}
		}]
	});
}

/**
 * Shows the not node specific context menu.
 *
 * @private
 * @param {uwm.modeltree.ModelTree} self This ModelTree.
 * @param {Ext.EventObject} e The event object.
 * @param {Ext.Element} el The element representing the ModelTree background.
 */
uwm.modeltree.ModelTree.prototype.showContextMenu = function(self, e, el) {
	e.preventDefault();
	
	self.contextMenu.showAt(e.getXY());
}

/**
 * Check if a dragOverEvent or dropEvent is valid and set the cancel
 * flag accordingly.
 * @param {Object} ddEvent The event object. See Ext.tree.TreePanel
 */
uwm.modeltree.ModelTree.prototype.checkDroppable = function(ddEvent) {
	// make sure that we have the correct defaults
	ddEvent.cancel = false;
	
	// check if the operation is inside the tree
	var insideTree = ddEvent.source.tree == this;
	
	// determine the model nodes that are involved

	// the drop node content may vary according to the drag source (grid or tree)
	var dropModelNode = null;
	if (ddEvent.dropNode) {
		dropModelNode = ddEvent.dropNode.getModelNode();
	}
	else {
		var uwmClassName = ddEvent.source.dragData.data.getUwmClassName();
		dropModelNode = uwm.model.ModelContainer.getInstance().createNodeInstance(uwmClassName);
	}

	// determine the parent node
	var parentModelNode = null;
	if (ddEvent.point != "append") {
		// drop besides target node
		var parentNode = ddEvent.target.parentNode;
		if (parentNode.id == 'root') {
			parentModelNode = null;
		}
		else {
			parentModelNode = parentNode.getModelNode();
		}
	} else {
		// append to target node
		parentModelNode = ddEvent.target.getModelNode()
	}

	// avoid dropping a node onto it's parent
	if (ddEvent.dropNode && ddEvent.dropNode.parentNode == ddEvent.target) {
		ddEvent.cancel = true;
		return;
	}
	// nodes from outside the tree can only be appended
	if (!insideTree && ddEvent.point != "append") {
		ddEvent.cancel = true;
		return;
	}

	// check model constraints
	var constraintsFulfilled = this.checkModelConstraints(parentModelNode, dropModelNode);
	ddEvent.cancel = !constraintsFulfilled;
}

/**
 * Check if a parent-child relation between two instances of uwm.model.ModelNode.
 * @param {uwm.model.ModelNode} parentModelNode The model node that will be the parent or null, 
 *   if it is the root node
 * @param {uwm.model.ModelNode} childModelNode The model node that will be the child
 * @return {Boolean} True if the relation is possible, False else
 */
uwm.modeltree.ModelTree.prototype.checkModelConstraints = function(parentModelNode, childModelNode) {
	
	// default: allow all drops
	var result = true;
	
	// disallow drops if the following conditions are met
	if (parentModelNode == null && !(childModelNode instanceof uwm.model.builtin.Model)) {
		// only allowed for models (reorder)
		result = false;
	}
	else if (parentModelNode instanceof uwm.model.builtin.Model) {
		// only activity sets can be dropped on a use case
		if (!(childModelNode instanceof uwm.model.builtin.Package)) {
			result = false;
		}
	}
	else if (parentModelNode instanceof cwm.ChiBusinessUseCase || parentModelNode instanceof cwm.ChiBusinessUseCaseCore) {
		// only activity sets can be dropped on a use case
		if (!(childModelNode instanceof uwm.diagram.ActivitySet)) {
			result = false;
		}
	}
	else if (parentModelNode instanceof cwm.ChiBusinessProcess) {
		// only use cases can be dropped on a process
		if (!(childModelNode instanceof cwm.ChiBusinessUseCase || childModelNode instanceof cwm.ChiBusinessUseCaseCore)) {
			result = false;
		}
	}
	else if (childModelNode instanceof uwm.model.builtin.Package) {
		// a package can be dropped everywhere
		result = true;
	}
	else if (childModelNode instanceof uwm.diagram.ActivitySet) {
		// activity sets cannot be dropped (except on a use case, but this is handled above)
		result = false;
	}
	
	return result;
}

uwm.modeltree.ModelTree.prototype.handleBeforeNodeDrop = function(dropEvent) {
	// check if the event is allowed
	this.checkDroppable(dropEvent);
	
	// process event, if it is not canceled
	if (!dropEvent.cancel) {
		// insert a new model node, if the drag source is not a tree.
		// we expect a uwm.model.ModelNodeClass in the event's data field
		if (!dropEvent.dropNode) {
			var dropModelNode = dropEvent.source.dragData.data;
			var newType = dropModelNode.getUwmClassName();
			var parentNode = dropEvent.target.getModelNode();
			
			// show the create node
			this.showCreateProgressNode(dropEvent.target, uwm.Dict.translate('Creating '+newType+'...'));
			uwm.model.ModelContainer.getInstance().createModelObject(newType, parentNode);
		}
		// move an existing tree node
		else {
			var actionSet = new uwm.persistency.ActionSet();
			
			var node = dropEvent.dropNode;
			var oldParent = node.parentNode;
			
			if (oldParent instanceof uwm.objecttree.Node) {
				if (dropEvent.point == "append") {
					// move to another parent
					var newParent = dropEvent.target;
					actionSet.addDisassociate(oldParent.getModelNode().getOid(), node.getModelNode().getOid());
					actionSet.addAssociate(newParent.getModelNode().getOid(), node.getModelNode().getOid(), false);
				}
				else {
					// change order
					var params = this.calculateSortParams(dropEvent);
					actionSet.addSort(node.getModelNode().getOid(), params.direction, params.distance, 
						oldParent.getModelNode().getOid());
				}
			}
			else {
				// uwm.model.builtin.Model instances don't have a Node parent
				var params = this.calculateSortParams(dropEvent);
				actionSet.addSort(node.getModelNode().getOid(), params.direction, params.distance);
			}
			
			actionSet.commit();
		}
	}
}

/**
 * Calculate distance and direction for a sort action
 * @param {Object} dropEvent The drop event
 * @return {Object} with properties 'distance' and 'direction'
 */
uwm.modeltree.ModelTree.prototype.calculateSortParams = function(dropEvent) {
	var parent = dropEvent.dropNode.parentNode;
	var oldIndex = parent.indexOf(dropEvent.dropNode);
	var newIndex = parent.indexOf(dropEvent.target);
	if (dropEvent.point == "below") {
		newIndex++;
	}
	var distance = Math.abs(newIndex-oldIndex);
	var direction = newIndex-oldIndex > 0 ? "down" : "up";
	return {distance: distance, direction: direction};
}

uwm.modeltree.ModelTree.prototype.handleDisassociateEvent = function(parentModelNode, childModelNode) {
	// NOTE: parent and child maybe opposite than defined in the relation
	if (uwm.Log.isEnabled(uwm.Log.DEBUG)) {
		uwm.Log.log("handleDisassociate: "+childModelNode.getOid()+" from "+parentModelNode.getOid(), uwm.Log.DEBUG);
	}
	
	var parentNode = this.getNodeById(parentModelNode.getOid());
	var childNode = this.getNodeById(childModelNode.getOid());

	// A UseCase node is disassociated from a Package node:
	// Only remove the UseCase from the Package, the UseCase is associated to the Process
	// in handleAssociate
	if ((parentNode instanceof uwm.modeltree.UseCaseNode || parentNode instanceof uwm.modeltree.UseCaseCoreNode) 
		&& (childNode instanceof  uwm.modeltree.PackageNode)) {
		// Iterate over all childnodes of the Package node to make sure
		// that no node representing the UseCase is left
		childNode.eachChild(function(node) {
			if (node && node.id == parentNode.id) {
				if (uwm.Log.isEnabled(uwm.Log.DEBUG)) {
					uwm.Log.log("remove node in disassociate: "+node.id+" from "+childNode.id, uwm.Log.DEBUG);
				}
				node.remove();
			}
		});
	}

	// A UseCase node is disassociated from a Process node:
	// Only remove the UseCase from the Process, the UseCase is associated to the Package
	// in handleAssociate
	if ((parentNode instanceof uwm.modeltree.UseCaseNode || parentNode instanceof uwm.modeltree.UseCaseCoreNode) 
		&& (childNode instanceof uwm.modeltree.ProcessNode)) {
		// Iterate over all childnodes of the Package node to make sure
		// that no node representing the UseCase is left
		childNode.eachChild(function(node) {
			if (node && node.id == parentNode.id) {
				if (uwm.Log.isEnabled(uwm.Log.DEBUG)) {
					uwm.Log.log("remove node in disassociate: "+node.id+" from "+childNode.id, uwm.Log.DEBUG);
				}
				node.remove();
			}
		});
	}
}

/**
 * Creates a new Model.
 */
uwm.modeltree.ModelTree.prototype.createModel = function() {
	uwm.model.ModelContainer.getInstance().createModel();
}

/**
 * Marks the given oid in this tree.
 *
 * Makes best efforts to find the node, even if it's not currently loaded.
 *
 * @param {oid} oid The oid to mark.
 */
uwm.modeltree.ModelTree.prototype.markNodeByOid = function(oid) {
	var node = null;
	var currOid = oid;
	
	var parents = new Array();
	
	var container = uwm.model.ModelContainer.getInstance();
	
	do {
		parents.push(currOid);
		
		node = this.getNodeById(currOid);
		
		if (node == null) {
		
			var modelObject = container.getByOid(currOid);
			
			if (modelObject == null) {
				var self = this;
				container.loadByOid(currOid, function() {
					self.markNodeByOid(oid);
				});
				
				return;
			}
			
			var parentOids = modelObject.getParentOids();
			var goodParent = null;
			for (var i = 0; i < parentOids.length; i++) {
				goodParent = parentOids[i];
				var parentUwmClassName = uwm.Util.getUwmClassNameFromOid(goodParent);
				if (parentUwmClassName == "Package" || parentUwmClassName == "Model") {
					break;
				}
			}
			
			currOid = goodParent;
		}
	} while (node == null);
	
	this.show();
	
	if (parents.length == 1) {
		var parentNode = node.parentNode;
		parentNode.ensureVisible();
		parentNode.expand();
		
		node.select();
	} else {
		this.expandListAsync(parents);
	}
}

/**
 * Recursively expands all the nodes in <code>parents</code>.
 *
 * @private
 * @param {Array} parents List of parents to expand, sorted from innermost to outermost.
 * @param {uwm.modeltree.Node} currNode The last expanded node.
 */
uwm.modeltree.ModelTree.prototype.expandListAsync = function(parents, currNode) {
	var oid = parents.pop();
	
	if (parents.length > 0) {
		if (currNode) {
			currNode.expandChildNodes(false);
		}
		
		var node = this.getNodeById(oid);
		node.ensureVisible();
		
		var self = this;
		
		node.expand(false, true, function(currNode) {
			self.expandListAsync(parents, currNode);
		});
	} else {
		var node = this.getNodeById(oid);
		node.ensureVisible();
		node.select();
	}
}

uwm.modeltree.ModelTree.prototype.handleCreateEvent = function(modelObject) {
	if (modelObject instanceof uwm.model.builtin.Model) {
		this.createdModels.add(modelObject.getOid(), modelObject);
	} else if (modelObject instanceof uwm.model.builtin.Package) {
		this.createdPackages.add(modelObject.getOid(), modelObject);
	} else {
		if (modelObject instanceof uwm.diagram.Diagram || modelObject instanceof uwm.diagram.ActivitySet) {
			this.createdDiagrams.add(modelObject.getOid(), modelObject);
		}
	}
}

uwm.modeltree.ModelTree.prototype.handleDeleteEvent = function(modelObject) {
	var node = this.getNodeById(modelObject.getOid());
	
	if (node) {
		node.remove();
	}
}

uwm.modeltree.ModelTree.prototype.handleChangeLabelEvent = function(modelObject, oldLabel, newLabel) {
	// don't update nodes, it the are translated into a different language
	if (modelObject.getLanguage() != uwm.i18n.Localization.getInstance().getUserLanguage()) {
		return;
	}

	var oid = modelObject.getOid();
	
	var createdModel = this.createdModels.get(oid);
	
	if (!createdModel) {
		var node = this.getNodeById(oid);
		if (!newLabel) {
			if (node) {
				node.setText(modelObject.getLabel());
			}
		}else{
			if (node){
				node.setText(newLabel);
			}
		}
	} else {
		this.createdModels.removeKey(oid);
		
		var node = new uwm.modeltree.ModelNode({
			oid: oid,
			text: modelObject.getLabel()
		});
		
		this.getRootNode().appendChild(node);
	}
}

uwm.modeltree.ModelTree.prototype.handleAssociateEvent = function(parentModelObject, childModelObject) {
	// NOTE: parent and child maybe opposite than defined in the relation
	if (uwm.Log.isEnabled(uwm.Log.DEBUG)) {
		uwm.Log.log("handleAssociate: "+childModelObject.getOid()+" to "+parentModelObject.getOid(), uwm.Log.DEBUG);
	}

	var parentOid = parentModelObject.getOid();
	var parentNode = this.getNodeById(parentOid);
	  
	if (parentNode) {
		if (parentNode instanceof uwm.modeltree.UseCaseNode || parentNode instanceof uwm.modeltree.UseCaseCoreNode) {
			if (!(childModelObject instanceof uwm.diagram.ActivitySet)) {
				if (parentModelObject.parentOids) {
					for (var i = 0; i < parentModelObject.parentOids.length; i++) {
						var tempParentNode = this.getNodeById(parentModelObject.parentOids[i]);
						if (tempParentNode instanceof uwm.modeltree.PackageNode || tempParentNode instanceof uwm.modeltree.ProcessNode) {
							parentNode = tempParentNode;
							parentModelObject = uwm.model.ModelContainer.getInstance().getByOid(parentNode.oid);
							break;
						}
					}
				}
			}
		}
		
		var childNode = null;
		
		if (childModelObject instanceof uwm.model.builtin.Package && this.createdPackages.get(childModelObject.getOid())) {
			this.createdPackages.remove(childModelObject.getOid());
			
			childNode = new uwm.modeltree.PackageNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof uwm.diagram.ActivitySet && this.createdDiagrams.get(childModelObject.getOid())) {
			this.createdPackages.remove(childModelObject.getOid());
			childNode = new uwm.modeltree.ActivitySetNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof cwm.ChiBusinessUseCase) {
			this.createdPackages.remove(childModelObject.getOid());
			childNode = new uwm.modeltree.UseCaseNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof cwm.ChiBusinessUseCaseCore) {
			this.createdPackages.remove(childModelObject.getOid());
			childNode = new uwm.modeltree.UseCaseCoreNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof cwm.ChiBusinessProcess) {
			this.createdPackages.remove(childModelObject.getOid());
			childNode = new uwm.modeltree.ProcessNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof uwm.diagram.Diagram && this.createdDiagrams.get(childModelObject.getOid())) {
			this.createdPackages.remove(childModelObject.getOid());
			childNode = new uwm.modeltree.DiagramNode({
				oid: childModelObject.getOid(),
				text: childModelObject.getLabel()
			});
		} else if (childModelObject instanceof uwm.model.ModelObject) {
			childNode = this.getNodeById(childModelObject.getOid());
			if (!childNode) {
				childNode = new uwm.modeltree.Node({
					oid: childModelObject.getOid(),
					text: childModelObject.getLabel(),
					uwmClassName: childModelObject.getModelNodeClass().getUwmClassName()
				})
			};
		}
		
		if (childNode) {
			if (!parentNode.findChild("id", childNode.id)) {
				if (uwm.Log.isEnabled(uwm.Log.DEBUG)) {
					uwm.Log.log("append node in associate: "+childNode.id+" to "+parentNode.id, uwm.Log.DEBUG);
				}
				if (parentNode.isExpanded()) {
					this.removeCreateProgressNode();
					parentNode.appendChild(childNode);
					childNode.ensureVisible();
				} else {
					parentNode.expand();
				}
			}
		}
	}
}

/**
 * Show a progress node while creating a node. There can only 
 * be one node at a time, so another instance will be removed.
 * @param parent The node to attach the progress node to.
 * @param text The node's text.
 */
uwm.modeltree.ModelTree.prototype.showCreateProgressNode = function(parent, text) {
	this.removeCreateProgressNode();
	this.createProgressNode = new Ext.tree.AsyncTreeNode({
		id: uwm.modeltree.ModelTree.CREATE_PROGRESS_NODE_ID,
		disabled: true,
		leaf: true,
		text: text,
		cls: "x-tree-node-loading"
	});
	parent.appendChild(this.createProgressNode);
	this.createProgressNode.ensureVisible();
}

/**
 * Remove the progress node safely (no need to be created before).
 */
uwm.modeltree.ModelTree.prototype.removeCreateProgressNode = function() {
	if (this.createProgressNode && this.createProgressNode.parentNode) {
		this.createProgressNode.remove();
	}
}

/**
 * Returns the instance of ModelTree.
 *
 * @return The instance of ModelTree.
 * @type uwm.modeltree.ModelTree
 */
uwm.modeltree.ModelTree.getInstance = function() {
	return uwm.modeltree.ModelTree.instance;
}

/**
 * ID of the ModelTree component.
 * @type String
 */
uwm.modeltree.ModelTree.COMPONENT_ID = "uwm.modeltree.ModelTree.ID";

/**
 * ID of the create progress node.
 * @type String
 */
uwm.modeltree.ModelTree.CREATE_PROGRESS_NODE_ID = "uwm.modeltree.ModelTree.CREATE_PROGRESS_NODE_ID";
