/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwl.graphics.figure");

cwl.graphics.figure.RuleFigure = function(diagram, label) {
  this.diagram = diagram;
  this.label = label;
  
  this.labelNode = null;
  
  this.inputDropArea = new cwl.graphics.figure.RuleDropArea("Inputs", ["ChiValue"]);
  this.conditionDropArea = new cwl.graphics.figure.RuleDropArea("Condition", ["RuleCondition"]);
  this.actionDropArea = new cwl.graphics.figure.RuleDropArea("Actions", ["RuleAction", "Operation"]);
  this.outputDropArea = new cwl.graphics.figure.RuleDropArea("Outputs", ["ChiValue"]);
  
  this.createSequenceRuleNode = null;
  this.createParallelRuleNode = null;

  this.sequenceRuleInPort = null;
  this.parallelRuleInPort = null;
  this.sequenceRuleOutPort = null;
  this.parallelRuleOutPort = null;
  
  this.defaultBackgroundColor = new draw2d.Color(255, 255, 255);
  this.highlightBackgroundColor = new draw2d.Color(150, 150, 150);
  draw2d.CompartmentFigure.call(this);
  
  this.setBackgroundColor(this.defaultBackgroundColor);
  this.setSelectable(false);
  this.setCanDrag(false);

  //draw2d.CompartmentFigure.call(this);
};

cwl.graphics.figure.RuleFigure.prototype = new draw2d.CompartmentFigure;

cwl.graphics.figure.RuleFigure.prototype.createHTMLElement = function() { 
  var item = draw2d.CompartmentFigure.prototype.createHTMLElement.call(this);
  item.style.margin = "0px";
  item.style.padding = "0px";
  item.style.border = "1px solid black";
  item.style.cursor = null;
  
  // create the label bar
  this.labelNode = document.createElement("div");
  this.labelNode.style.position = "absolute";
  this.labelNode.style.margin = "-1px";
  this.labelNode.style.padding = "2px";
  this.labelNode.style.font = "normal 10px verdana";
  this.labelNode.style.backgroundColor = "#eeeeee";
  this.labelNode.style.border = "1px solid gray";
  this.labelNode.style.whiteSpace = "nowrap";
  this.labelNode.style.textAlign = "center";
  var labelTextNode = document.createTextNode(this.label);
  this.labelNode.appendChild(labelTextNode);

  // create the drop areas
  var inputDropAreaElement = this.inputDropArea.createHTMLElement();
  var conditionDropAreaElement = this.conditionDropArea.createHTMLElement();
  var actionDropAreaElement = this.actionDropArea.createHTMLElement();
  var outputDropAreaElement = this.outputDropArea.createHTMLElement();
  
  // add rule creation handles
  this.createSequenceRuleNode = document.createElement("div");
  this.createSequenceRuleNode.style.position = "absolute";
  this.createSequenceRuleNode.style.width = "14px";
  this.createSequenceRuleNode.style.height = "14px";
  this.createSequenceRuleNode.style.font = "normal 10px verdana";
  this.createSequenceRuleNode.style.backgroundColor = "#eeeeee";
  this.createSequenceRuleNode.style.border = "1px solid gray";
  this.createSequenceRuleNode.style.whiteSpace = "nowrap";
  this.createSequenceRuleNode.style.textAlign = "center";
  this.createSequenceRuleNode.style.cursor = "pointer";
  Ext.get(this.createSequenceRuleNode).on({
    'click': this.onCreateSequenceRule,
    scope: this
  });

  this.createParallelRuleNode = document.createElement("div");
  this.createParallelRuleNode.style.position = "absolute";
  this.createParallelRuleNode.style.width = "14px";
  this.createParallelRuleNode.style.height = "14px";
  this.createParallelRuleNode.style.font = "normal 10px verdana";
  this.createParallelRuleNode.style.backgroundColor = "#eeeeee";
  this.createParallelRuleNode.style.border = "1px solid gray";
  this.createParallelRuleNode.style.whiteSpace = "nowrap";
  this.createParallelRuleNode.style.textAlign = "center";
  this.createParallelRuleNode.style.cursor = "pointer";
  Ext.get(this.createParallelRuleNode).on({
    'click': this.onCreateParallelRule,
    scope: this
  });
  
  item.appendChild(this.labelNode);
  item.appendChild(inputDropAreaElement);
  item.appendChild(conditionDropAreaElement);
  item.appendChild(actionDropAreaElement);
  item.appendChild(outputDropAreaElement);
  item.appendChild(this.createSequenceRuleNode);
  item.appendChild(this.createParallelRuleNode);
  return item;
};

/**
 * Initiates this figure.
 *
 * @private
 * @param {cwl.diagram.UwmWorkflow} workflow The workflow containing this figure.
 */
cwl.graphics.figure.RuleFigure.prototype.setWorkflow = function(workflow) {
	draw2d.CompartmentFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null) {
		/**
		 * The sequence rule in port of this figure.
		 *
		 * @private
		 * @type draw2d.Port
		 */
		this.sequenceRuleInPort = new draw2d.Port();
		this.sequenceRuleInPort.setWorkflow(workflow);
    this.sequenceRuleInPort.setAlpha(0);
		this.addPort(this.sequenceRuleInPort, -1, this.getHeight()/2);

		/**
		 * The parallel rule in port of this figure.
		 *
		 * @private
		 * @type draw2d.Port
		 */
		this.parallelRuleInPort = new draw2d.Port();
    this.parallelRuleInPort.setAlpha(0);
		this.parallelRuleInPort.setWorkflow(workflow);
		this.addPort(this.parallelRuleInPort, this.getWidth()/2, -2);

		/**
		 * The sequence rule out port of this figure.
		 *
		 * @private
		 * @type draw2d.Port
		 */
		this.sequenceRuleOutPort = new draw2d.Port();
		this.sequenceRuleOutPort.setWorkflow(workflow);
    this.sequenceRuleOutPort.setAlpha(0);
		this.addPort(this.sequenceRuleOutPort, this.getWidth()+1, this.getHeight()/2);

		/**
		 * The parallel rule out port of this figure.
		 *
		 * @private
		 * @type draw2d.Port
		 */
		this.parallelRuleOutPort = new draw2d.Port();
		this.parallelRuleOutPort.setWorkflow(workflow);
    this.parallelRuleOutPort.setAlpha(0);
		this.addPort(this.parallelRuleOutPort, this.getWidth()/2, this.getHeight()+5);
	}
}

cwl.graphics.figure.RuleFigure.prototype.checkDropable = function(modelElement, x, y) {
  var xRel = x-this.getAbsoluteX();
  var yRel = y-this.getAbsoluteY();

  // check drop areas
  if (this.inputDropArea.isOver(xRel, yRel) && this.inputDropArea.acceptsElement(modelElement))
    return true;
  if (this.conditionDropArea.isOver(xRel, yRel) && this.conditionDropArea.acceptsElement(modelElement))
    return true;
  if (this.actionDropArea.isOver(xRel, yRel) && this.actionDropArea.acceptsElement(modelElement))
    return true;
  if (this.outputDropArea.isOver(xRel, yRel) && this.outputDropArea.acceptsElement(modelElement))
    return true;

  return false;
}

cwl.graphics.figure.RuleFigure.prototype.onCreateSequenceRule = function(e, el, op) {
  // create rule
  var rule = new cwl.model.ModelElement();
  rule.type = "Rule";
  var ruleFigure = this.getDiagram().addNewObject(rule, (this.getX()+this.getWidth()+20), this.getY());
  
  // create connection
  var c = new draw2d.Connection();
  c.setSource(this.sequenceRuleOutPort);
  c.setTarget(ruleFigure.sequenceRuleInPort);
  c.setColor(new draw2d.Color(0, 255, 0));
  c.setLineWidth(4);
  this.getWorkflow().addFigure(c);

  // hide button
  el.style.display = "none";
}

cwl.graphics.figure.RuleFigure.prototype.onCreateParallelRule = function(e, el, op) {
  // create rule
  var rule = new cwl.model.ModelElement();
  rule.type = "Rule";
  var ruleFigure = this.getDiagram().addNewObject(rule, this.getX(), this.getY()+this.getHeight()+22);

  // create connection
  var c = new draw2d.Connection();
  c.setSource(this.parallelRuleOutPort);
  c.setTarget(ruleFigure.parallelRuleInPort);
  c.setColor(new draw2d.Color(0, 255, 0));
  c.setLineWidth(4);
  this.getWorkflow().addFigure(c);
  
  // hide button
  el.style.display = "none";
}

cwl.graphics.figure.RuleFigure.prototype.setDimension = function(w,h) {
  draw2d.CompartmentFigure.prototype.setDimension.call(this,w,h);
  
  var elementWidth = (this.getWidth()-4);
  if(this.labelNode != null) {
    this.labelNode.style.height = "15px";
    this.labelNode.style.width = elementWidth+"px";
  }
  this.inputDropArea.setDimension(0, 15, elementWidth, 20);
  this.conditionDropArea.setDimension(0, 35, elementWidth, 100);
  this.actionDropArea.setDimension(0, 135, elementWidth, this.getHeight()-155);
  this.outputDropArea.setDimension(0, this.getHeight()-20, elementWidth, 20);
  
  if(this.createSequenceRuleNode != null) {
    this.createSequenceRuleNode.style.left = (this.getWidth()+20)+"px";
    this.createSequenceRuleNode.style.top = "0px";
  }
  if(this.createParallelRuleNode != null) {
    this.createParallelRuleNode.style.left = "0px";
    this.createParallelRuleNode.style.top = (this.getHeight()+22)+"px";
  }
};

cwl.graphics.figure.RuleFigure.prototype.setLabel = function(label) {
  this.label = label;
};

cwl.graphics.figure.RuleFigure.prototype.getLabel = function() {
  return this.label;
};

cwl.graphics.figure.RuleFigure.prototype.getDiagram = function() {
  return this.diagram;
};

cwl.graphics.figure.RuleFigure.prototype.getMinWidth = function() {
  return 50;
};

cwl.graphics.figure.RuleFigure.prototype.getMinHeight = function() {
  return 255;
};

cwl.graphics.figure.RuleFigure.prototype.setBackgroundColor = function(color) {
  this.bgColor=color;
  if (this.bgColor != null) {
    this.html.style.backgroundColor = this.bgColor.getHTMLStyle();
  }
  else {
    this.html.style.backgroundColor="transparent";
  }
};