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
 * @class A Diagram displaying graphic depiction of a subset of a model.
 *
 * <p>A Diagram consists of a drawing area and figures on the drawing area. 
 * It contains an auto-layouter, the panel for its tab, and two lists for 
 * both the contained figures and the contained Model Objects.</p>
 *
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass
 */
uwm.diagram.Diagram = function(modelNodeClass) {
	uwm.diagram.Diagram.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.Diagram, uwm.diagram.DiagramBase);

/**
 * Initiates a new diagram.
 * 
 * <p>Creates a new panel for the tab, initiates internal state to default values.</p>
 */
uwm.diagram.Diagram.prototype.init = function() {
	var container = uwm.diagram.DiagramContainer.getInstance();
	
	/**
	 * The panel for the tab of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.DiagramTab
	 */
	this.tab = new uwm.diagram.DiagramTab({
		title: "New Diagram",
		diagram: this
	});
	
	/**
	 * Whether Objects should snap to other objects when moving.
	 * 
	 * @private
	 * @type boolean
	 */
	this.snapToObjects = false;
	
	/**
	 * The width of this diagram.
	 * 
	 * @private
	 * @type int
	 */
	this.workspaceWidth = 10000;
	
	/**
	 * The height of this diagram.
	 * 
	 * @private
	 * @type int
	 */
	this.workspaceHeight = 10000;
	
	container.getTabPanel().add(this.tab);
}

/**
 * Initiates the draw2d elements of this diagram.
 * 
 * @private
 */
uwm.diagram.Diagram.prototype.initWorkflow = function() {
	/**
	 * The viewport of this diagram.
	 * 
	 * @private
	 * @type Ext.Element
	 */
	this.viewPort = this.tab.getEl();
	this.viewPort.applyStyles({
		overflow: "auto",
		display: "block",
		position: "fixed"
	});
	
	var canvas = Ext.DomHelper.append(this.viewPort, {
		tag: "div"
	}, true);
	canvas.applyStyles({
		width: this.workspaceWidth + "px",
		height: this.workspaceHeight + "px"
	})
	
	uwm.Util.setElementUnselectable(this.viewPort.dom);
	
	/**
	 * The draw2d workflow of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.UwmWorkflow
	 */
	this.workflow = new uwm.diagram.UwmWorkflow(canvas.id, this);
	
	this.workflow.diagram = this;
	
	this.workflow.setViewPort(this.viewPort.id);
	
	//this.workflow.scrollTo(this.workspaceHeight / 2, this.workspaceWidth / 2);
	
	var workflow = this.workflow;
	var height = this.workspaceHeight / 2;
	var width = this.workspaceWidth / 2;
	
	var self = this;
	
	setTimeout(function() {
		workflow.scrollTo(height, width, true);
	}, 500);
	
	/**
	 * The Selection Lister of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.SelectionListener
	 */
	this.selectionListener = new uwm.diagram.SelectionListener(this);
	this.workflow.addSelectionListener(this.selectionListener);
	
	/**
	 * The Workflow Event Listener of this diagram.
	 * 
	 *  @private
	 *  @type uwm.diagram.WorkflowEventListener
	 */
	this.workflowEventListener = new uwm.diagram.WorkflowEventListener(this);
	this.workflow.getCommandStack().addCommandStackEventListener(this.workflowEventListener);
	
	/**
	 * The auto-layouter of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.autolayout.Layouter
	 */
	this.layouter = new uwm.diagram.autolayout.Layouter(this.workflow);
}

/**
 * Return the tab of this diagram.
 * 
 * @return The tab of this diagram.
 * @type uwm.diagram.DiagramTab
 */
uwm.diagram.Diagram.prototype.getTab = function() {
	return this.tab;
}

/**
 * Initiates the drop zone of this diagram.
 * 
 * @private
 */
uwm.diagram.Diagram.prototype.initDropZone = function() {
	var self = this;
	
	/**
	 * The drop zone of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.DropZone
	 */
	this.dropZone = new uwm.diagram.DropZone(this.viewPort, {
		diagram: this
	});
}

/**
 * Loads saved figures.
 * 
 * @private
 */
uwm.diagram.Diagram.prototype.loadFigures = function() {
	//alert("TODO: load figures");
}

/**
 * Checks whether a @link{uwm.model.ModelObject} with the given oid is contained in this diagram.
 * 
 * @param {String} oid The oid to check.
 * @return <code>true</code> if a Model Object with <code>oid</code> is contained in this diagram. <code>false</code> otherwise.
 * @type boolean
 */
uwm.diagram.Diagram.prototype.containsByOid = function(oid) {
	return false;
}

/**
 * Returns the draw2d workflow of this diagram.
 * 
 * @return The draw2d workflow of this diagram.
 * @type uwm.diagram.UwmWorkflow
 */
uwm.diagram.Diagram.prototype.getWorkflow = function() {
	return this.workflow;
}

/**
 * Returns whether snap to objects is activated for this diagram.
 * 
 * @return <code>true</code> if snap to objects is activated for this diagram, <code>false</code> otherwise.
 * @type boolean
 */
uwm.diagram.Diagram.prototype.isSnapToObjects = function() {
	return this.snapToObjects;
}

/**
 * Sets snap to objects for this diagram.
 * 
 * @param {boolean} snapToObjects <code>true</code> if object should snap to other objects, <code>false</code> if objects should not snap to other objects when moving.
 */
uwm.diagram.Diagram.prototype.setSnapToObjects = function(snapToObjects) {
	this.snapToObjects = snapToObjects;
}

/**
 * Starts the auto-layouter.
 */
uwm.diagram.Diagram.prototype.doLayout = function() {
	this.layouter.doLayout();
}

/**
 * Returns the position a context menu should be shown at.
 * 
 * @param {int} x The draw2d event x position.
 * @param {int} y The draw2d event y position.
 * @return The position of the context menu in Ext format.
 * @type Object
 */
uwm.diagram.Diagram.prototype.getContextMenuPosition = function(x, y) {
	var scroll = this.viewPort.getScroll();
	var xy = this.viewPort.getXY();
	
	return [x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2];
}

/**
 * Adds an existing object to this diagram.
 * 
 * @param {uwm.model.ModelObject} modelObject The ModelObject to add to the diagram.
 * @param {int} x The draw2d x position to add the ModelObject at.
 * @param {int} y The draw2d x position to add the ModelObject at.
 */
uwm.diagram.Diagram.prototype.addExistingObject = function(modelObject, x, y) {
	var newFigure = this.getFigure();
	
	newFigure.createExistingObject(this, modelObject, x, y);
}

/**
 * Creates a new object on this diagram. 
 * 
 * <p>The new ModelObject is added to the package this diagram is contained in.</p>
 * 
 * @param {uwm.model.ModelClass} modelClass The ModelClass of which a new ModelObject should be created.
 * @param {int} x The draw2d x position to add the ModelObject at.
 * @param {int} y The draw2d x position to add the ModelObject at.
 */
uwm.diagram.Diagram.prototype.createNewObject = function(modelClass, x, y) {
	var newFigure = this.getFigure();
	
	newFigure.createNewObject(this, modelClass, x, y);
}

/**
 * Creates a new Figure.
 * 
 * @private
 * @return the new Figure.
 * @type uwm.diagram.Figure
 */
uwm.diagram.Diagram.prototype.getFigure = function() {
	return new uwm.diagram.Figure(uwm.Session.getInstance().getModelNodeClassContainer().getClass("Figure"));
}
