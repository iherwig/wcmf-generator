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
Ext.namespace("cwl.modeltree");

/**
 * @class Asynchronously loads elements in Model Tree.
 *
 * @extends Ext.tree.TreeLoader
 * @see cwl.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
cwl.modeltree.Loader = function() {
}

cwl.modeltree.Loader = Ext.extend(Ext.tree.TreeLoader, {
	initComponent: function() {
		Ext.apply(this, {});
		
		cwl.modeltree.Loader.superclass.initComponent.apply(this, arguments);
	}
})

cwl.modeltree.Loader.prototype.load = function(node, callback) {
	var self = this;
	
	if (node.id == 'root') {
		chi.persistency.Persistency.getInstance().list('Model', 999, 0, 'Name', 'asc', function(data) {
			self.reformatData(self, node, callback, data);
		});
	}
	else {
		var modelNode = node.getModelElement();
		if (modelNode) {
			chi.persistency.Persistency.getInstance().read(modelNode.getOid(), 1, function(data) {
				self.reformatData(self, node, callback, data);
			});
		}
	}
}

/**
 * Create cwl.modeltree.Node instances for the loaded data.
 *
 * @param {cwl.modeltree.Loader}
 *            self The loader instance.
 * @param {cwl.modeltree.Node}
 *            node The node, whose data (children) were loaded.
 * @param {Function}
 *            callback A function to call on finish.
 * @param {Object}
 *            data The data returned by the persistence call. The nodes are either
 *                 contained in the field data.records (after loading the root node) or
 *                 data.record (after loading any other node)
 */
cwl.modeltree.Loader.prototype.reformatData = function(self, node, callback, data) {

	// the model nodes to display
	var nodes = [];
	
	if (data.records) {
		// if the data result from a call to the 'list' action, the model nodes are contained in
		// the data.records field
		nodes = data.records;
	}
	else if (data.record) {
		// if the data result from a call to the 'read' action, the model nodes are contained in
		// the data.record field
		
		// get the child classes of the loaded node
		var chiParentClassName = chi.Util.getClassNameFromOid(data.record.oid);
		var chiParentClass = chi.model.ModelDescriptionContainer.getInstance().getDescription(chiParentClassName);
		if (chiParentClass) {
			var childClasses = chiParentClass.getRelatedDescriptions('children');

			// get the model nodes for each child class from the appropriate parent class field
			for (var i=0; i<childClasses.length; i++) {
				var curChildren = data.record.data[childClasses[i].getId()];
				if (curChildren) {
					if (curChildren instanceof Array) {	
						// multi-valued field
						for (var j=0; j<curChildren.length; j++) {
							nodes.push(curChildren[j]);
						}
					}
					else {
						// single-valued field
						nodes.push(curChildren);
					}
				}
			}
		}
	}
	
	// contruct the tree nodes for the model nodes
	for (var i=0; i<nodes.length; i++) {
		
		var newNode = null;
		
		var responseNode = nodes[i];
		if (responseNode && responseNode.isModelRecord) {
			var chiClassName = chi.Util.getClassNameFromOid(responseNode.oid);
			switch (chiClassName) {

				default:
					newNode = new cwl.modeltree.Node({
						text: responseNode.getLabel(),
						modelElement: responseNode
					});
					break;
			}
		}
		else {
			// the node is a reference -> ignore it
		}
		
		if (newNode) {
			node.appendChild(newNode);
		}
	}
	
	if (callback instanceof Function) {
		callback(this, node);
	}
}
