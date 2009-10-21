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

/**
 * @class Container for all ModelNodes.
 *
 * <p>
 * This class manages all loading and event firing for Model Nodes.
 * </p>
 *
 * <p>
 * TODO: no ModelNode is ever deleted from this container.
 * </p>
 *
 * @see uwm.model.ModelNode
 * @see uwm.model.ModelNodeClass
 * @constructor
 */
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
		var origOid = node.oid;
		
		var newModelNode = this.getNode(uwmClassName, origOid);
		var oid = newModelNode.oid;
		
		newModelNode.initByDisplayResult(node);
		newModelNode.oid = oid;
		
		this.items.add(oid, newModelNode);
		
		if (!firstModelNode) {
			firstModelNode = newModelNode;
		}
		
		for (var i in node) {
			if (i != "values" && i != "oid" && i != "type" && i != "properties" &&
			!(node[i] instanceof Function)) {
				var container = node[i];
				
				for (var j = 0; j < container.length; j++) {
					outstandingNodes.add(container[j].oid, container[j]);
				}
			}
		}
		
		outstandingNodes.removeKey(origOid);
		
		furtherElements = outstandingNodes.getCount() > 0;
		
		node = outstandingNodes.first();
	}
	return firstModelNode;
}

uwm.model.ModelContainer.prototype.createByClassAndOid = function(uwmClassName, oid) {
	var newModelNode = this.getNode(uwmClassName, oid);
	oid = newModelNode.oid;
	
	newModelNode.initByOid(oid);
	
	this.items.add(oid, newModelNode);
	
	return newModelNode;
}

uwm.model.ModelContainer.prototype.createByClassAndNameAndOid = function(uwmClassName, name, oid) {
	var newModelNode = this.getNode(uwmClassName, oid);
	oid = newModelNode.oid;
	
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

uwm.model.ModelContainer.prototype.handleCreatedModel = function(oid, callback) {
	var newModelNode = this.getNode("Model", oid);
	oid = newModelNode.oid;
	
	this.items.add(oid, newModelNode);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	var nodeLabel = newModelNode.getLabel();
	if (nodeLabel == oid) {
		// no label was set before
		newModelNode.setDefaultLabel();
	}
	else {
		// the label is already set, notify listeners
		uwm.event.EventBroker.getInstance().fireEvent("changeLabel", newModelNode, nodeLabel, nodeLabel);
	}

	if (callback instanceof Function) {
		callback(newModelNode);
	}
}

uwm.model.ModelContainer.prototype.createPackage = function(parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Package", function(request, data) {
		self.handleCreatedPackage(data.oid, parentModelNode);
	});
	
}

uwm.model.ModelContainer.prototype.handleCreatedPackage = function(oid, parentModelNode) {
	var newModelNode = this.getNode("Package", oid);
	oid = newModelNode.oid;
	
	this.items.add(oid, newModelNode);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	newModelNode.setDefaultLabel();
	
	newModelNode.associate(parentModelNode);
}

uwm.model.ModelContainer.prototype.createDiagram = function(parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("Diagram", function(request, data) {
		self.handleCreatedDiagram(data.oid, parentModelNode, "Diagram");
	});
}

uwm.model.ModelContainer.prototype.createActivitySet = function(parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().newObject("ActivitySet", function(request, data) {
		self.handleCreatedDiagram(data.oid, parentModelNode, "ActivitySet");
	});
}

uwm.model.ModelContainer.prototype.handleCreatedDiagram = function(oid, parentModelNode, type) {
	var newModelNode;
	switch (type) {
		case 'ActivitySet':
			newModelNode = this.getNode("ActivitySet", oid);
			newModelNode.containedPackage = newModelNode;
			break;
		case 'default':
		default:
			newModelNode = this.getNode("Diagram", oid);
			newModelNode.containedPackage = parentModelNode;
			break;
	}
	
	oid = newModelNode.oid;
	
	this.items.add(oid, newModelNode);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newModelNode);
	
	newModelNode.setDefaultLabel();
	
	newModelNode.associate(parentModelNode);
}

uwm.model.ModelContainer.prototype.createFigure = function(diagramModelNode, modelObject, actionSet, callback) {
	var self = this;
	
	var figureOid = null;
	
	actionSet.addNewObject("Figure", function(request, data) {
		figureOid = data.oid;
		self.handleCreatedFigure(data.oid, diagramModelNode, callback);
	});
	
	actionSet.addAssociate(diagramModelNode.getOid(), "{last_created_oid:Figure}", false, function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("associate", diagramModelNode, self.getByOid(figureOid), false);
	});
	
	if (modelObject) {
		actionSet.addAssociate(modelObject.getOid(), "{last_created_oid:Figure}", false, function(request, data) {
			uwm.event.EventBroker.getInstance().fireEvent("associate", modelObject, self.getByOid(figureOid));
		});
	}
}

uwm.model.ModelContainer.prototype.handleCreatedFigure = function(oid, diagramModelNode, callback) {
	var newFigure = this.getNode("Figure", oid);
	oid = newFigure.oid;
	
	this.items.add(oid, newFigure);
	
	newFigure.diagram = diagramModelNode;
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newFigure);
	
	if (callback instanceof Function) {
		callback(newFigure);
	}
}

uwm.model.ModelContainer.prototype.createController = function(useCaseModelNode, parentModelNode) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().createControllerFromUseCase(useCaseModelNode.getOid(),
		function(request, data) {
			self.loadByOid(data.oid, 
				self.handleCreatedController.createDelegate(self, [data.oid, parentModelNode]), 1
			);
		}
	);
}

uwm.model.ModelContainer.prototype.handleCreatedController = function(oid, parentModelNode) {
	var newModelNode = this.getNode("ChiController", oid);
	newModelNode.containedPackage = parentModelNode;
	
	oid = newModelNode.oid;
	
	this.items.add(oid, newModelNode);
	
	newModelNode.associate(parentModelNode);
}

uwm.model.ModelContainer.prototype.createModelObject = function(uwmClassName, packageNode, actionSet, callback) {
	var self = this;
	
	var newObjectOid = null;
	
	if (actionSet instanceof uwm.persistency.ActionSet) {
		actionSet.addNewObject(uwmClassName, function(request, data) {
			newObjectOid = data.oid;
			
			self.handleCreatedModelObject(data.oid, uwmClassName, undefined, callback);
		});
		
		actionSet.addAssociate(packageNode.getOid(), "{last_created_oid:" +
		uwmClassName +
		"}", false, function(request, data) {
			uwm.event.EventBroker.getInstance().fireEvent("associate", packageNode, self.getByOid(newObjectOid));
		});
	} else {
		uwm.persistency.Persistency.getInstance().newObject(uwmClassName, function(request, data) {
			self.handleCreatedModelObject(data.oid, uwmClassName, packageNode, callback);
		});
	}
}

uwm.model.ModelContainer.prototype.handleCreatedModelObject = function(oid, uwmClassName, packageNode, callback) {
	var newObject = this.getNode(uwmClassName, oid);
	oid = newObject.oid;
	this.items.add(oid, newObject);
	
	uwm.event.EventBroker.getInstance().fireEvent("create", newObject);
	
	var nodeLabel = newObject.getLabel();
	if (nodeLabel == oid) {
		// no label was set before
		newObject.setDefaultLabel();
	}
	else {
		// the label is already set, notify listeners
		uwm.event.EventBroker.getInstance().fireEvent("changeLabel", newObject, nodeLabel, nodeLabel);
	}
	
	if (packageNode) {
		newObject.associate(packageNode);
	}
	
	if (callback instanceof Function) {
		callback(newObject);
	}
}

uwm.model.ModelContainer.prototype.loadByOid = function(oid, callback, depth, secondCallback) {
	var self = this;
	
	if (!depth) {
		depth = 0;
	}
	
	if (callback instanceof uwm.persistency.ActionSet) {
		callback.addDisplay(oid, depth, uwm.i18n.Localization.getInstance().getModelLanguage(), 
			function(request, data) {
				var node = self.createByDisplayResult(data);
				if (secondCallback) {
					secondCallback(node);
				}
		});
	} else {
		uwm.persistency.Persistency.getInstance().display(oid, depth, 
			uwm.i18n.Localization.getInstance().getModelLanguage(), function(request, data) {
				var node = self.createByDisplayResult(data);
				
				if (callback) {
					callback(node);
				}
		});
	}
}

uwm.model.ModelContainer.prototype.deleteByModelNode = function(modelNode) {
	if (modelNode.getUwmClassName() != "Figure") {
		Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete ' + modelNode.getLabel() + "?", function(btn) {
			if (btn == "yes") {
				uwm.model.ModelContainer.getInstance().deleteObject(modelNode);
			}
		});
	}else{
		uwm.model.ModelContainer.getInstance().deleteObject(modelNode);
	}
}

uwm.model.ModelContainer.prototype.deleteObject = function(modelNode) {
	modelNode.markDeleted();
	
	uwm.persistency.Persistency.getInstance().deleteObject(modelNode.getOid(), function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("delete", modelNode);
	});
}

uwm.model.ModelContainer.prototype.duplicateObject = function(modelNode, parentNode) {
	var uwmClassName = modelNode.getModelNodeClass().getUwmClassName();
	var packageNode = this.getNode("Package", parentNode.getOid());
	var self = this;

	var longTaskRunner = new uwm.ui.LongTaskRunner( {
			title : uwm.Dict.translate('Copying Object ...'),
			call : function(successHandler, errorHandler) {
				uwm.persistency.Persistency.getInstance().copy(modelNode.getOid(), parentNode.getOid(), true, successHandler, errorHandler);
			},
			successHandler : function(data) {
				uwm.persistency.Persistency.getInstance().display(data.oid, 0, 
					uwm.i18n.Localization.getInstance().getModelLanguage(), function(request, data) {
						var node = self.createByDisplayResult(data);
						self.handleCreatedModelObject(node.oid, uwmClassName, packageNode, function(newObject){
							longTaskRunner.close();
						});
					}
				)
			},
			errorHandler : function(data) {
				uwm.Util.showMessage(uwm.Dict.translate("Error while copying"), uwm.Dict.translate("The process was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
			},
			isReturningDocument : false
	}).show();
}

uwm.model.ModelContainer.prototype.duplicateModel = function(modelNode) {
	var uwmClassName = modelNode.getModelNodeClass().getUwmClassName();
	var self = this;

	var longTaskRunner = new uwm.ui.LongTaskRunner( {
			title : uwm.Dict.translate('Copying Project ...'),
			call : function(successHandler, errorHandler) {
				uwm.persistency.Persistency.getInstance().copy(modelNode.getOid(), null, true, successHandler, errorHandler);
			},
			successHandler : function(data) {
				uwm.persistency.Persistency.getInstance().display(data.oid, 0, 
					uwm.i18n.Localization.getInstance().getModelLanguage(), function(request, data) {
						var node = self.createByDisplayResult(data);
						self.handleCreatedModel(node.oid, function(newObject){
							longTaskRunner.close();
						});
					}
				)
			},
			errorHandler : function(data) {
				uwm.Util.showMessage(uwm.Dict.translate("Error while copying"), uwm.Dict.translate("The process was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
			},
			isReturningDocument : false
	}).show();
}

uwm.model.ModelContainer.prototype.getNode = function(uwmClassName, oid) {
	var modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(uwmClassName);
	if (!modelClass) {
		uwm.Log.log("Model class: "+uwmClassName+" is not defined", uwm.Log.ERROR);
	}
	oid = modelClass.demaskOid(oid);
	
	var newModelNode = this.items.get(oid);
	
	if (!newModelNode) {
		var newModelNode = this.createNodeInstance(uwmClassName);
	}

	newModelNode.oid = oid;
	
	return newModelNode;
}

uwm.model.ModelContainer.prototype.createNodeInstance = function(uwmClassName) {
	var modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(uwmClassName);
	var realModelClass = modelClass.getRealModelClass();
	var newModelNode = eval("new " + modelClass.getInstanceClassName() + "(realModelClass)");
	return newModelNode;
}

uwm.model.ModelContainer.getInstance = function() {
	if (!uwm.model.ModelContainer.instance) {
		uwm.model.ModelContainer.instance = new uwm.model.ModelContainer();
	}
	
	return uwm.model.ModelContainer.instance;
}
