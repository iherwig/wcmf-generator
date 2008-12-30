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
		}

		for (var i in node) {
			if (i != "values" && i != "oid" && i != "type" && i != "properties" && !(node[i] instanceof Function)) {
				var container = node[i];
				
				for (var j = 0; j < container.length; j++) {
					outstandingNodes.add(container[j].oid, container[j]);
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

uwm.model.ModelContainer.prototype.createModel = function() {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Model", function(request, data) {
		self.handleCreatedModel(data.oid);
	});
}

uwm.model.ModelContainer.prototype.handleCreatedModel = function(oid) {
	var newModelNode = this.getNode("Model", oid);
	
	this.items.add(oid, newModelNode);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	newModelNode.setDefaultLabel();
}

uwm.model.ModelContainer.prototype.createPackage = function(parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Package", function(request, data) {
		self.handleCreatedPackage(data.oid, parentModelNode);
	});
	
}

uwm.model.ModelContainer.prototype.handleCreatedPackage = function(oid, parentModelNode) {
	var newModelNode = this.getNode("Package", oid);
	
	this.items.add(oid, newModelNode);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	newModelNode.setDefaultLabel();
	
	newModelNode.associate(parentModelNode);
}

uwm.model.ModelContainer.prototype.createDiagram = function(parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Diagram", function(request, data) {
		self.handleCreatedDiagram(data.oid, parentModelNode);
	});
}

uwm.model.ModelContainer.prototype.handleCreatedDiagram = function(oid, parentModelNode) {
	var newModelNode = this.getNode("Diagram", oid);
	
	this.items.add(oid, newModelNode);
	
	newModelNode.containedPackage = parentModelNode;
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	newModelNode.setDefaultLabel();
	
	newModelNode.associate(parentModelNode);
	
	uwm.diagram.DiagramContainer.getInstance().loadDiagram(newModelNode);
}

uwm.model.ModelContainer.prototype.createFigure = function(diagramModelNode, modelObject) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Figure", function(request, data) {
		self.handleCreatedFigure(data.oid, diagramModelNode, modelObject);
	});
}

uwm.model.ModelContainer.prototype.handleCreatedFigure = function(oid, diagramModelNode, modelObject) {
	var newFigure = this.getNode("Figure", oid);
	
	this.items.add(oid, newFigure);
	
	newFigure.diagram = diagramModelNode;
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newFigure);
	
	newFigure.associate(diagramModelNode);
	
	if (modelObject) {
		newFigure.associate(modelObject);
	}
}

uwm.model.ModelContainer.prototype.createModelObject = function(uwmClassName, packageNode, figureNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject(uwmClassName, function(request, data) {
		self.handleCreatedModelObject(data.oid, uwmClassName, packageNode, figureNode);
	});
}

uwm.model.ModelContainer.prototype.handleCreatedModelObject = function(oid, uwmClassName, packageNode, figureNode) {
	var newObject = this.getNode(uwmClassName, oid);
	
	this.items.add(oid, newObject);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newObject);
	
	newObject.setDefaultLabel();
	
	if (packageNode) {
		newObject.associate(packageNode);
	}
	
	if (figureNode) {
		figureNode.associate(newObject);
	}
}

uwm.model.ModelContainer.prototype.loadByOid = function(oid, callback, depth) {
	var self = this;
	
	if (!depth) {
		depth = 0;
	}
	
	uwm.persistency.Persistency.getInstance().display(oid, depth, function(request, data) {
		callback(self.createByDisplayResult(data));
	});
}

uwm.model.ModelContainer.prototype.deleteByModelNode = function(modelNode) {
	uwm.persistency.Persistency.getInstance().deleteObject(modelNode.getOid(), function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("delete", modelNode);
	});
}

uwm.model.ModelContainer.prototype.getNode = function(uwmClassName, oid) {
	var newModelNode = this.items.get(oid);
	
	if (!newModelNode) {
		var modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(uwmClassName);
		var newModelNode = eval("new " + modelClass.getInstanceClassName() + "(modelClass)");
		newModelNode.oid = oid;
	}
	
	return newModelNode;
}

uwm.model.ModelContainer.getInstance = function() {
	if (!uwm.model.ModelContainer.instance) {
		uwm.model.ModelContainer.instance = new uwm.model.ModelContainer();
	}
	
	return uwm.model.ModelContainer.instance;
}
