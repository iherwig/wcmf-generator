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
Ext.namespace("uwm.diagram");

uwm.diagram.Figure = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

uwm.diagram.Figure.prototype = new uwm.model.ModelNode;

uwm.diagram.Figure.prototype.createNewObject = function(diagram, modelClass, x, y) {
	this.diagram = diagram;
	this.modelObject = eval("new " + modelClass.getInstanceClassName() + "(modelClass)");
	
	var workflow = diagram.getWorkflow();
	
	var compartment = workflow.getBestCompartmentFigure(x, y);
	
	
	
	this.graphics = this.getFigure(modelClass, modelClass.getDefaultLabel());
	
	workflow.getCommandStack().execute(new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

uwm.diagram.Figure.prototype.createExistingObject = function(diagram, modelObject, x, y) {
	this.diagram = diagram;
	this.modelObject = modelObject;
	
	var workflow = diagram.getWorkflow();
	
	var compartment = workflow.getBestCompartmentFigure(x, y);
	
	this.graphics = this.getFigure(modelObject.getModelNodeClass(), modelObject.getLabel());
	
	workflow.getCommandStack().execute(new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

uwm.diagram.Figure.prototype.getFigure = function(modelClass, label) {
	return eval("new " + modelClass.getFigureClass() + "(label, this)");
}

uwm.diagram.Figure.prototype.getModelObject = function() {
	return this.modelObject;
}

uwm.diagram.Figure.prototype.getDiagram = function() {
	return this.diagram;
}

uwm.diagram.Figure.prototype.getGraphics = function() {
	return this.graphics;
}

uwm.diagram.Figure.prototype.showInModelTree = function() {
	alert("TODO: Show in model tree");
}

uwm.diagram.Figure.prototype.showInGrid = function() {
	alert("TODO: Show in gird");
}

uwm.diagram.Figure.prototype.showInHierarchy = function() {
	alert("TODO: Show in hierarchy");
}

uwm.diagram.Figure.prototype.deleteFromDiagram = function() {
	alert("TODO: Delete from diagram");
}

uwm.diagram.Figure.prototype.deleteFromModel = function() {
	alert("TODO: Show in model tree");
}
