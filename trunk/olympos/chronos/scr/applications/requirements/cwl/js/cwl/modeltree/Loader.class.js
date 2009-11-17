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
	
	chi.persistency.Persistency.getInstance().loadChildren(node.id, function(request, data) {
		self.reformatData(self, node, callback, data);
	});
}

cwl.modeltree.Loader.prototype.reformatData = function(self, node, callback, data) {
	var changed = false;
	
	for (var i = 0; i < data.objects.length; i++) {
		changed = true;
		
		var responseNode = data['objects'][i];
		var chiClassName = chi.Util.getClassNameFromOid(responseNode.oid);
		
		var newNode = null;
		
		switch (chiClassName) {
		/*
			case "Model":
				newNode = new cwl.modeltree.ModelNode({
					text: responseNode.text,
					//leaf: !responseNode.hasChildren,
					oid: responseNode.oid
				});
				break;
				
			case "Package":
				newNode = new cwl.modeltree.PackageNode({
					text: responseNode.text,
					//leaf: !responseNode.hasChildren,
					oid: responseNode.oid
				});
				break;
				
			case "Diagram":
				newNode = new cwl.modeltree.DiagramNode({
					text: responseNode.text,
					oid: responseNode.oid
				});
				break;
				
			case "ActivitySet":
				newNode = new cwl.modeltree.ActivitySetNode({
					text: responseNode.text,
					oid: responseNode.oid
				});
				break;
				
			case "ChiBusinessUseCase":
				newNode = new cwl.modeltree.UseCaseNode({
					text: responseNode.text,
					oid: responseNode.oid
				});
				break;
				
			case "ChiBusinessUseCaseCore":
				newNode = new cwl.modeltree.UseCaseCoreNode({
					text: responseNode.text,
					oid: responseNode.oid
				});
				break;
			case "ChiBusinessProcess":
				newNode = new cwl.modeltree.ProcessNode({
					text: responseNode.text,
					oid: responseNode.oid
				});
				break;
				
			// FIXME: Better ask the parent node, if several child nodes 
			// should be displayed or not
			case "Figure":
			case "NMUCActor":
			case "ChiUseCaseSourceEnd":
			case "ChiUseCaseTargetEnd":
			case "ChiUseCaseCoreSourceEnd":
			case "ChiUseCaseCoreTargetEnd":
				break;
				
		*/
			default:
				newNode = new cwl.modeltree.Node({
					text: responseNode.text,
					oid: responseNode.oid,
					chiClassName: chiClassName
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
