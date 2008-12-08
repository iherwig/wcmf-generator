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
 * @constructor
 * @extends Ext.tree.TreePanel
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
		tabTip: "<b>Model Tree</b><p>Shows all models, packages, and contained objects.</p>"
	}, config));
	
	/**
	 * The instance of ModelTree.
	 *
	 * @private
	 * @type uwm.modeltree.ModelTree
	 */
	uwm.modeltree.ModelTree.instance = this;
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
			text: "Create model",
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
 * Creates a new Model.
 */
uwm.modeltree.ModelTree.prototype.createModel = function() {
	alert("TODO: add Model");
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
	
	var container = uwm.Session.getInstance().getModelContainer();
	
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
	}
	while (node == null);
	
	this.show();
	
	if (parents.length == 1) {
		var parentNode = node.parentNode;
		parentNode.ensureVisible();
		parentNode.expand();
		
		node.select();
	}
	else {
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
	}
	else {
		var node = this.getNodeById(oid);
		node.ensureVisible();
		node.select();
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
