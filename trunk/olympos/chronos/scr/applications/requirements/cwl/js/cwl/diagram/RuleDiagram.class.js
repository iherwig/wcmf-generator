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
Ext.namespace("cwl.diagram");

/**
 * @class One tab containing a Diagram.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config Configuraton of this tab.
 * @config diagram The diagram of this tab.
 */
cwl.diagram.RuleDiagram = function(config) {
	cwl.diagram.RuleDiagram.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
    border: false,
    autoscroll: true
	}, config));
	
	this.figures = new Ext.util.MixedCollection();
	this.objects = new Ext.util.MixedCollection();
	
	this.dropWindow = null;
	this.canvas = null;
}

Ext.extend(cwl.diagram.RuleDiagram, Ext.Panel);

/**
 * Initiates a new diagram.
 *
 * <p>
 * Creates a new panel for the tab, initiates internal state to default values.
 * </p>
 */
cwl.diagram.RuleDiagram.prototype.init = function() {
	
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
	
	this.createdObjects = new Array();
}

/**
 * Initiates the contained diagram.
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.render = function() {
	cwl.diagram.RuleDiagram.superclass.render.apply(this, arguments);
	
  this.init();
  this.initWorkflow();
  this.initDropZone();

  // create the initial rule
  var rule = new cwl.model.ModelElement();
  rule.type = "Rule";
  this.addNewObject(rule, 20, 20);
}

/**
 * Initiates the draw2d elements of this diagram.
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.initWorkflow = function() {
	/**
	 * The viewport of this diagram.
	 *
	 * @private
	 * @type Ext.Element
	 */
	this.viewPort = this.body;
	this.viewPort.applyStyles( {
	    overflow : "auto",
	    display : "block",
	    position : "fixed"
	});
	
	this.canvas = Ext.DomHelper.append(this.viewPort, {
		tag : "div"
	}, true);
	this.canvas.applyStyles( {
	    width : this.workspaceWidth + "px",
	    height : this.workspaceHeight + "px"
	})

	chi.Util.setElementUnselectable(this.viewPort.dom);
	
	/**
	 * The draw2d workflow of this diagram.
	 * 
	 * @private
	 * @type cwl.diagram.UwmWorkflow
	 */
	this.workflow = new cwl.diagram.UwmWorkflow(this.canvas.id, this);
	
	this.workflow.diagram = this;
	
	this.workflow.setViewPort(this.viewPort.id);
	
	// this.workflow.scrollTo(this.workspaceHeight / 2, this.workspaceWidth /
	// 2);
	
	//this.scrollToCenter();
	
	/**
	 * The Selection Lister of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.SelectionListener
	 */
	//this.selectionListener = new uwm.diagram.SelectionListener(this);
	//this.workflow.addSelectionListener(this.selectionListener);
	
	/**
	 * The Workflow Event Listener of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.WorkflowEventListener
	 */
	//this.workflowEventListener = new uwm.diagram.WorkflowEventListener(this);
	//this.workflow.getCommandStack().addCommandStackEventListener(this.workflowEventListener);
	
	/**
	 * The auto-layouter of this diagram.
	 * 
	 * @private
	 * @type uwm.diagram.autolayout.Layouter
	 */
	//this.layouter = new uwm.diagram.autolayout.Layouter(this.workflow);
}

/**
 * Returns whether snap to objects is activated for this diagram.
 *
 * @return <code>true</code> if snap to objects is activated for this diagram,
 *         <code>false</code> otherwise.
 * @type boolean
 */
cwl.diagram.RuleDiagram.prototype.isSnapToObjects = function() {
	return this.snapToObjects;
}

/**
 * Sets snap to objects for this diagram.
 *
 * @param {boolean}
 *            snapToObjects <code>true</code> if object should snap to other
 *            objects, <code>false</code> if objects should not snap to other
 *            objects when moving.
 */
cwl.diagram.RuleDiagram.prototype.setSnapToObjects = function(snapToObjects) {
	this.snapToObjects = snapToObjects;
	this.workflow.setSnapToGeometry(snapToObjects);
}

/**
 * Returns the position a context menu should be shown at.
 *
 * @param {int}
 *            x The draw2d event x position.
 * @param {int}
 *            y The draw2d event y position.
 * @return The position of the context menu in Ext format.
 * @type Object
 */
cwl.diagram.RuleDiagram.prototype.getContextMenuPosition = function(x, y) {
	var scroll = this.viewPort.getScroll();
	var xy = this.viewPort.getXY();
	
	return [ x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2 ];
}

cwl.diagram.RuleDiagram.prototype.getWorkflow = function() {
  return this.workflow;
}

/**
 * Initiates the drop zone of this diagram.
 *
 * @private
 */
cwl.diagram.RuleDiagram.prototype.initDropZone = function() {
	var self = this;
	
	/**
	 * The drop zone of this diagram.
	 * 
	 * @private
	 * @type cwl.diagram.DropZone
	 */
	this.dropZone = new cwl.diagram.DropZone(this.viewPort, {
		diagram : this
	});
}

cwl.diagram.RuleDiagram.prototype.checkDropable = function(modelElement, x, y) {
  var bestFigure = this.getBestFigure(x, y);
  if (bestFigure) {
    if (bestFigure.checkDropable(modelElement, x, y)) {
      return true;
    }
  }
  return false;
}

cwl.diagram.RuleDiagram.prototype.addNewObject = function(modelElement, x, y) {

  // check if there is an object under the new object that can handle the drop
  // event
  var bestFigure = this.getBestFigure(x, y);
  var isHandled = false;
  if (bestFigure && bestFigure instanceof cwl.graphics.figure.BaseFigure)
    isHandled = bestFigure.onElementDrop(modelElement);

  if (!isHandled) {
    // if not, we create a new figure
    var figure = null;  
    if (modelElement.getType() == "Rule") {
      figure = new cwl.graphics.figure.RuleFigure(this, "New Rule");
      figure.setDimension(300, 500);
    }
    if (modelElement.getType() == "RuleCondition") {
      var conditionText = "NewCondition";
      figure = new cwl.graphics.figure.ConditionFigure(this, conditionText);
      figure.setDimension(80, 40);
      cwl.rule.ExpressionPanel.getInstance().setConditionText(figure.getId(), conditionText);
    }
    if (modelElement.getType() == "RuleAction") {
      var actionText = "New"+modelElement.getName()+"Action";
      if (modelElement.getName() == "Read")
        figure = new cwl.graphics.figure.ReadActionFigure(this, actionText);
      else
        figure = new cwl.graphics.figure.ActionFigure(this, actionText);
      figure.setDimension(95, 60);
      cwl.rule.ExpressionPanel.getInstance().setActionText(figure.getId(), actionText);
    }
    if (modelElement.getType() == "Operation") {
      var actionText = "My"+modelElement.getOwner().getName()+"."+modelElement.getName()+"()";
      figure = new cwl.graphics.figure.ActionFigure(this, actionText);
      figure.setDimension(95, 60);
      cwl.rule.ExpressionPanel.getInstance().setActionText(figure.getId(), "<strong>INVOKE</strong> "+actionText);
    }
    if (figure) {
      this.workflow.addFigure(figure, x, y);
      var compFigure = this.workflow.getBestCompartmentFigure(x, y);
      if (compFigure && compFigure != figure)
        compFigure.addChild(figure);
        
      this.figures.add(figure.getId(), figure);
      
      return figure;
    }
  }
  return null;
}

cwl.diagram.RuleDiagram.prototype.getBestFigure = function(x, y) {
  var result = null;
  this.figures.each(function(figure, index, length) {
    if (figure.isOver(x, y) && figure) {
      if (result == null)
        result = figure;
      else if (result.getZOrder() < figure.getZOrder())
        result = figure;
    }
  });
  return result;
}
