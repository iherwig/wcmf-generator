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
 * @class Asynchronously loads elements in Model Tree.
 * 
 * @extends Ext.tree.TreeLoader
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.Loader = function() {
}

uwm.modeltree.Loader = Ext.extend(Ext.tree.TreeLoader, {
	initComponent: function() {
		Ext.apply(this, {});
		
		uwm.modeltree.Loader.superclass.initComponent.apply(this, arguments);
	},
	
	load: function(node, callback) {
		var self = this;
		
		uwm.persistency.Persistency.getInstance().loadChildren(node.id, function(request, data) {
			self.reformatData(self, node, callback, data);
		});
	},
	
	reformatData: function(self, node, callback, data) {
		var changed = false;
		
		for (var i = 0; i < data.objects.length; i++) {
			changed = true;
			
			var responseNode = data['objects'][i];
			var uwmClassName = uwm.Util.getUwmClassNameFromOid(responseNode.oid);
			
			var newNode = null;
			
			switch (uwmClassName) {
				case "Model":
					newNode = new uwm.modeltree.ModelNode({
						text: responseNode.text,
						//leaf: !responseNode.hasChildren,
						oid: responseNode.oid
					});
					break;
					
				case "Package":
					newNode = new uwm.modeltree.PackageNode({
						text: responseNode.text,
						//leaf: !responseNode.hasChildren,
						oid: responseNode.oid
					});
					break;
					
				case "Diagram":
					newNode = new uwm.modeltree.DiagramNode({
						text: responseNode.text,
						oid: responseNode.oid
					});
					break;
					
				case "ActivitySet":
					newNode = new uwm.modeltree.ActivitySetNode({
						text: responseNode.text,
						oid: responseNode.oid
					});
					break;
					
				case "ChiBusinessUseCase":
					newNode = new uwm.modeltree.UseCaseNode({
						text: responseNode.text,
						oid: responseNode.oid
					});
					break;
					
				case "ChiBusinessUseCaseCore":
					newNode = new uwm.modeltree.UseCaseCoreNode({
						text: responseNode.text,
						oid: responseNode.oid
					});
					break;
					
				case "Figure":
				case "NMUCActor":
					break;
					
				default:
					newNode = new uwm.modeltree.Node({
						text: responseNode.text,
						oid: responseNode.oid,
						uwmClassName: uwmClassName
					});
					break;
			}
			if (newNode) {
				node.appendChild(newNode);
			}
		}
		
		if (callback instanceof Function) {
			callback(this, node);
		}
	}
});
