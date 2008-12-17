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

/**
 * @class Graphical representation of a {@link uwm.model.ModelObject} on a {@link uwm.diagram.Diagram}.
 *
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass The instance of {@link uwm.diagram.FigureClass}.
 */
uwm.diagram.Figure = function(modelNodeClass){
    uwm.model.ModelNode.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.Figure, uwm.model.ModelNode);

/**
 * Creates a graphical representation of a new ModelObject on the associated Diagram.
 *
 * @param {uwm.diagram.Diagram} diagram The Diagram to create the ModelObject on.
 * @param {uwm.model.ModelClass} modelClass The ModelClass of the ModelObject to create.
 * @param {int} x X position where to create the Figure.
 * @param {int} y Y position where to create the Figure.
 */
uwm.diagram.Figure.prototype.createNewObject = function(diagram, modelClass, x, y){
    /**
     * The associated Diagram.
     *
     * @private
     * @type uwm.diagram.Diagram
     */
    this.diagram = diagram;
    
    /**
     * The associated ModelObject.
     *
     * @private
     * @type uwm.model.ModelObject
     */
    this.modelObject = eval("new " + modelClass.getInstanceClassName() + "(modelClass)");
    
    var workflow = diagram.getWorkflow();
    var compartment = workflow.getBestCompartmentFigure(x, y);
    
    /**
     * The graphical (draw2d) figure.
     *
     * @private
     * @type uwm.graphics.figure.BaseFigure
     */
    this.graphics = this.getFigure(modelClass, modelClass.getDefaultLabel());
    
    workflow.getCommandStack().execute(new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

/**
 * Creates a graphical representation of an existing ModelObject on the associated Diagram.
 *
 * @param {uwm.model.ModelObject} modelObject The ModelObject to create a figure for.
 * @param {int} x X position where to create the Figure.
 * @param {int} y Y position where to create the Figure.
 */
uwm.diagram.Figure.prototype.init = function(modelObject, x, y){
    this.modelObject = modelObject;
    
    var workflow = this.diagram.getWorkflow();
    
    var compartment = workflow.getBestCompartmentFigure(x, y);
    
    this.graphics = this.getFigure(modelObject.getModelNodeClass(), modelObject.getLabel());
    
    workflow.getCommandStack().execute(new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

uwm.diagram.Figure.prototype.load = function(modelObject, diagram) {
	this.modelObject = modelObject;
	this.diagram = diagram;
	
	var x = this.getPositionX();
	var y = this.getPositionY();
	
	var workflow = diagram.getWorkflow();
	var compartment = workflow.getBestCompartmentFigure(x, y);
	
    this.graphics = this.getFigure(modelObject.getModelNodeClass(), modelObject.getLabel());
	this.graphics.setDimension(this.getWidth(), this.getHeight());
    
    workflow.getCommandStack().execute(new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

/**
 * Creates a new ModelObject.
 *
 * @private
 * @param {uwm.model.ModelClass} The ModelClass to create a ModelObject from.
 * @param {String} label Label of the new ModelObject.
 * @return The created ModelObject.
 * @type uwm.model.ModelObject
 */
uwm.diagram.Figure.prototype.getFigure = function(modelClass, label){
    return eval("new " + modelClass.getFigureClass() + "(label, this)");
}

/**
 * Returns the ModelObject associated with this Figure.
 *
 * @return The ModelObject associated with this Figure.
 * @type uwm.model.ModelObject
 */
uwm.diagram.Figure.prototype.getModelObject = function(){
    return this.modelObject;
}

/**
 * Returns the Diagram associated with this Figure.
 *
 * @return The Diagram associated with this Figure.
 * @type uwm.diagram.Diagram
 */
uwm.diagram.Figure.prototype.getDiagram = function(){
    return this.diagram;
}

/**
 * Returns the graphics associated with this Figure.
 *
 * @return The graphics associated with this Figure.
 * @type uwm.graphics.figure.BaseFigure
 */
uwm.diagram.Figure.prototype.getGraphics = function(){
    return this.graphics;
}

uwm.diagram.Figure.prototype.getPositionX = function() {
	return parseInt(this.data.PositionX);
}

uwm.diagram.Figure.prototype.getPositionY = function() {
	return parseInt(this.data.PositionY);
}

uwm.diagram.Figure.prototype.getWidth = function() {
	return parseInt(this.data.Width);
}

uwm.diagram.Figure.prototype.getHeight = function() {
	return parseInt(this.data.Height);
}

/**
 * Shows the associated ModelObject in Model Tree.
 *
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.Figure.prototype.showInModelTree = function(){
		uwm.modeltree.ModelTree.getInstance().markNodeByOid(this.getModelObject().getOid());
}

/**
 * Shows the associated ModelObject in Grid.
 */
uwm.diagram.Figure.prototype.showInGrid = function(){
    alert("TODO: Show in gird");
}

/**
 * Shows the associated ModelObject in Hierarchy Tree.
 *
 * @see uwm.hierarchytree.HierarchyTree
 */
uwm.diagram.Figure.prototype.showInHierarchy = function(){
    uwm.hierarchytree.HierarchyTree.getInstance().loadNode(this.getModelObject().getOid());
}

/**
 * Deletes this Figure from associated Diagram.
 *
 * @see uwm.diagram.Diagram
 */
uwm.diagram.Figure.prototype.deleteFromDiagram = function(){
    alert("TODO: Delete from diagram");
}

/**
 * Deletes this Figure and the associated ModelObject from Model.
 */
uwm.diagram.Figure.prototype.deleteFromModel = function(){
	uwm.model.ModelContainer.getInstance().deleteByModelNode(this.getModelObject());
}
