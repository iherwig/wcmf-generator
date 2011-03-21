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
 * @class Graphical representation of a {@link uwm.model.ModelObject} on a
 *        {@link uwm.diagram.Diagram}.
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 * @param {uwm.model.ModelNodeClass}
 *            modelNodeClass The instance of {@link uwm.diagram.FigureClass}.
 */
uwm.diagram.Figure = function(modelNodeClass) {
	this.inheritedChilds = [];
	this.inheritedChildsLoaded = false;
	this.showInherited = false;
	
	uwm.model.ModelNode.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.Figure, uwm.model.ModelNode);

/**
 * Creates a graphical representation of a new ModelObject on the associated
 * Diagram.
 * 
 * @param {uwm.diagram.Diagram}
 *            diagram The Diagram to create the ModelObject on.
 * @param {uwm.model.ModelClass}
 *            modelClass The ModelClass of the ModelObject to create.
 * @param {int}
 *            x X position where to create the Figure.
 * @param {int}
 *            y Y position where to create the Figure.
 */
uwm.diagram.Figure.prototype.createNewObject = function(diagram, modelClass, x,
		y) {
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
	this.modelObject = eval("new " + modelClass.getInstanceClassName()
			+ "(modelClass)");

	var workflow = diagram.getWorkflow();
	var compartment = null //workflow.getBestCompartmentFigure(x, y);

	/**
	 * The graphical (draw2d) figure.
	 * 
	 * @private
	 * @type uwm.graphics.figure.BaseFigure
	 */
	this.graphics = this.getFigure(modelClass, modelClass.getDefaultLabel());

	workflow.getCommandStack().execute(
			new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

/**
 * Creates a graphical representation of an existing ModelObject on the
 * associated Diagram.
 * 
 * @param {uwm.model.ModelObject}
 *            modelObject The ModelObject to create a figure for.
 * @param {int}
 *            x X position where to create the Figure.
 * @param {int}
 *            y Y position where to create the Figure.
 */
uwm.diagram.Figure.prototype.init = function(modelObject, x, y) {

	this.modelObject = modelObject;

	var workflow = this.diagram.getWorkflow();

	var compartment = null //workflow.getBestCompartmentFigure(x, y);

	this.graphics = this.getFigure(modelObject.getModelNodeClass(), modelObject
			.getLabel());

	workflow.getCommandStack().execute(
			new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
}

uwm.diagram.Figure.prototype.load = function(modelObject, diagram) {
	this.modelObject = modelObject;
	this.diagram = diagram;

	var x = this.getPositionX();
	var y = this.getPositionY();

	var workflow = diagram.getWorkflow();
	var compartment = null //workflow.getBestCompartmentFigure(x, y);

	this.graphics = this.getFigure(modelObject.getModelNodeClass(), modelObject
			.getLabel());
	
	this.graphics.setWorkflow(workflow);
	this.graphics.setDimension(this.getWidth(), this.getHeight());

	workflow.getCommandStack().execute(
			new draw2d.CommandAdd(workflow, this.graphics, x, y, compartment));
	
	// Add inherited children. Currently only attributes are supported.
	if (this.showInherited) {
		this.updateGraphicsForInheritedAttributes();
	}
}

/**
 * Creates a new ModelObject.
 * 
 * @private
 * @param {uwm.model.ModelClass}
 *            The ModelClass to create a ModelObject from.
 * @param {String}
 *            label Label of the new ModelObject.
 * @return The created draw2d.Figure subclass.
 * @type uwm.model.ModelObject
 */
uwm.diagram.Figure.prototype.getFigure = function(modelClass, label) {
	return modelClass.getGraphics(label, this);
}

/**
 * Returns the ModelObject associated with this Figure.
 * 
 * @return The ModelObject associated with this Figure.
 * @type uwm.model.ModelObject
 */
uwm.diagram.Figure.prototype.getModelObject = function() {
	return this.modelObject;
}

/**
 * Returns an array of inherited childs. The array is only loaded if showInheritedAttributes is set to true.
 * 
 * @return The array of inherited childs.
 */
uwm.diagram.Figure.prototype.getInheritedChilds = function() {
	return this.inheritedChilds;
}

/**
 * Returns if the inherited childs have already been loaded for this object
 * 
 * @return true if the inheritedChilds have previously been loaded
 */
uwm.diagram.Figure.prototype.areInheritedChildsLoaded = function() {
	return this.inheritedChildsLoaded;
}

/**
 * Adds a model object for an inherited child. Currently only attributes are supported.
 * 
 */
uwm.diagram.Figure.prototype.addInheritedChild = function(child) {
	this.inheritedChilds.push(child);
}

/**
 * Set if inherited attributes should be displayed for the class
 */
uwm.diagram.Figure.prototype.setShowInherited = function(showInheritedParam) {
	this.showInherited = showInheritedParam;
}

/**
 * Returns if inherited attributes should be displayed for the class
 */
uwm.diagram.Figure.prototype.isShowInherited = function() {
	return this.showInherited;
}

/**
 * Returns the Diagram associated with this Figure.
 * 
 * @return The Diagram associated with this Figure.
 * @type uwm.diagram.Diagram
 */
uwm.diagram.Figure.prototype.getDiagram = function() {
	return this.diagram;
}

/**
 * Returns the graphics associated with this Figure.
 * 
 * @return The graphics associated with this Figure.
 * @type uwm.graphics.figure.BaseFigure
 */
uwm.diagram.Figure.prototype.getGraphics = function() {
	return this.graphics;
}

/**
 * Checks if x, y, width and height properties are valid.
 *
 * @return True, if the geometry is valid.
 * @type Boolean
 */
uwm.diagram.Figure.prototype.hasValidGeometry = function() {
	if (isNaN(this.getPositionX()) || isNaN(this.getPositionY()) || isNaN(this.getWidth()) || isNaN(this.getHeight())) {
		return false;
	}
	return true;
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

uwm.diagram.Figure.prototype.remove = function() {
	this.diagram.getWorkflow().getCommandStack().execute(
			new draw2d.CommandDelete(this.graphics));
}

/**
 * Shows the associated ModelObject in Model Tree.
 * 
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.Figure.prototype.showInModelTree = function() {
	uwm.modeltree.ModelTree.getInstance().markNodeByOid(
			this.getModelObject().getOid());
}

uwm.diagram.Figure.prototype.gridAvailable = function() {
	return uwm.objectgrid.ObjectGridContainer.getInstance().isGridAvailable(
			this.getModelObject());
}

/**
 * Shows the associated ModelObject in Grid.
 */
uwm.diagram.Figure.prototype.showInGrid = function() {
	uwm.objectgrid.ObjectGridContainer.getInstance().selectRow(
			this.getModelObject());
}

/**
 * Shows the associated ModelObject in Hierarchy Tree.
 * 
 * @see uwm.hierarchytree.HierarchyTree
 */
uwm.diagram.Figure.prototype.showInHierarchy = function() {
	uwm.hierarchytree.HierarchyTree.getInstance().loadNode(
			this.getModelObject().getOid());
}

/**
 * Deletes this Figure from associated Diagram.
 * 
 * @see uwm.diagram.Diagram
 */
uwm.diagram.Figure.prototype.deleteFromDiagram = function() {
	this.remove();
}

/**
 * Deletes this Figure and the associated ModelObject from Model.
 */
uwm.diagram.Figure.prototype.deleteFromModel = function() {
	uwm.model.ModelContainer.getInstance().deleteByModelNode(
			this.getModelObject());
}

uwm.diagram.Figure.prototype.showHelp = function() {
	uwm.ui.HelpViewer.getInstance().loadUrl(
			this.getModelObject().getModelNodeClass().getHelpUrl());
}

uwm.diagram.Figure.prototype.showObjectHistory = function(self, e) {
	new uwm.ui.History(this.modelObject);
}

uwm.diagram.Figure.prototype.showInheritedAttributes = function() {
	this.setShowInherited(true);
	this.loadInheritedAttributes(false, true);
	this.getGraphics().buildContextMenu();
}

uwm.diagram.Figure.prototype.hideInheritedAttributes = function() {
	this.setShowInherited(false);
	this.updateGraphicsForInheritedAttributes();
	this.getGraphics().buildContextMenu();
}

uwm.diagram.Figure.prototype.loadInheritedAttributes = function(forceReload, updateGraphics, callback) {
	if (this.inheritedChilds.length == 0 || forceReload) {
		this.inheritedChilds = [];
		var self = this;
		
		var persistency = uwm.persistency.Persistency.getInstance();
		persistency.loadInheritedAttributes(this.getModelObject().getOid(), function (request, data) {
			self.handleLoadedInheritedAttributes(data, updateGraphics, callback);
		});
	}
	else {
		if (callback) {
			callback(this);
		}
	}
}

uwm.diagram.Figure.prototype.handleLoadedInheritedAttributes = function(data, updateGraphics, callback) {
	for (var i in data.inheritedAttributes) {
		if (!(data.inheritedAttributes[i] instanceof Function)) {
			var modelContainer = uwm.model.ModelContainer.getInstance();
			var inheritedAttribute = modelContainer.createNodeFromData(data.inheritedAttributes[i].ChiValue[0]);
			this.addInheritedChild(inheritedAttribute);
		}
	}
	this.inheritedChildsLoaded = true;
	if (updateGraphics) {
		this.updateGraphicsForInheritedAttributes();
	}
	if (callback) {
		callback(this);
	}
}

uwm.diagram.Figure.prototype.updateGraphicsForInheritedAttributes = function() {
	
	// Get model objects for currently displayed child attributes
	var graphicsChildElements = this.graphics.getChildElements();
	var graphicsChildModelObjects = [];
	var graphicsChildElementsToRemove = [];
	for (var i = 0; i < graphicsChildElements.length; i++) {
		if (graphicsChildElements[i] instanceof uwm.graphics.figure.Attribute) {
			var graphicsChildModelObject = graphicsChildElements[i].getModelObject();
			// If the model object of the graphics child element is not a child of the figure model object it might have to be removed
			if (this.getModelObject().getChildOids().indexOf(graphicsChildModelObject.getOid()) == -1) {
				// If the inherited attributes should not be displayed or the model object is also not an inherited attribute it is removed
				if (!this.isShowInherited() || this.inheritedChilds.indexOf(graphicsChildModelObject) == -1) {
					graphicsChildElementsToRemove.push(graphicsChildElements[i]);
					continue;
				}
			}
			// Otherwise it is added to the list of child model objects for the following check that all model objects are displayed
			graphicsChildModelObjects.push(graphicsChildModelObject);
		}
	}
	
	// Remove the objects that were marked for removal
	for (var i = 0; i < graphicsChildElementsToRemove.length; i++) {
		this.graphics.removeChildElement(graphicsChildElementsToRemove[i], true);
	}
	
	// Make sure that all inheritedChilds are in the list if the inherited attributes should be displayed
	if (this.isShowInherited()) {
		for (var i = 0; i < this.inheritedChilds.length; i++) {
			if(graphicsChildModelObjects.indexOf(this.inheritedChilds[i]) == -1) {
				var inheritedAttributeGraphic = new uwm.graphics.figure.InheritedAttribute(this.inheritedChilds[i].getName(), this.inheritedChilds[i]);
				this.graphics.addChildElement(inheritedAttributeGraphic, true);
			}
		}
	}
}