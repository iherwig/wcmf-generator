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
Ext.namespace("uwm.model");

uwm.model.ModelContainer = function() {
	this.items = new Ext.util.MixedCollection();
}

uwm.model.ModelContainer.prototype.getByOid = function(oid) {
	return this.items.get(oid);
}

uwm.model.ModelContainer.prototype.createByDisplayResult = function(displayResult) {
	var firstModelNode = null;
	var node = displayResult.node;
	
	var furtherElements = true;
	
	var outstandingNodes = new Ext.util.MixedCollection();
	
	while (furtherElements) {
		var uwmClassName = node.type;
		var oid = node.oid;
		
		var newModelNode = this.getNode(uwmClassName, oid);
		
		newModelNode.initByDisplayResult(node);
		
		this.items.add(oid, newModelNode);
		
		if (!firstModelNode) {
			firstModelNode = newModelNode;
			
			for (var i in node) {
				if (i != "values" && i != "oid" && i != "type" && i != "properties" && i != "remove") {
					var container = node[i];
					
					for (var j = 0; j < container.length; j++) {
						outstandingNodes.add(container[j].oid, container[j]);
					}
				}
			}
		}
		
		outstandingNodes.removeKey(oid);
		
		furtherElements = outstandingNodes.getCount() > 0;
		
		node = outstandingNodes.first();
	}
	return firstModelNode;
}

uwm.model.ModelContainer.prototype.createByClassAndOid = function(uwmClassName, oid) {
	var newModelNode = this.getNode(uwmClassName, oid);
	
	newModelNode.initByOid(oid);
	
	this.items.add(oid, newModelNode);
	
	return newModelNode;
}

uwm.model.ModelContainer.prototype.createByClassAndNameAndOid = function(uwmClassName, name, oid) {
	var newModelNode = this.getNode(uwmClassName, oid);
	
	newModelNode.initByNameAndOid(name, oid);
	
	this.items.add(oid, newModelNode);
	
	return newModelNode;
}

uwm.model.ModelContainer.prototype.getNode = function(uwmClassName, oid) {
	var newModelNode = this.items.get(oid);
	
	if (!newModelNode) {
		var modelClass = uwm.Session.getInstance().getModelNodeClassContainer().getClass(uwmClassName);
		var newModelNode = eval("new " + modelClass.getInstanceClassName() + "(modelClass)");
	}
	
	return newModelNode;
}