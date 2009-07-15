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

cwl.graphics.figure.RuleFigure = function(title) {
  this.title = title;
  
  this.titleNode = null;
  
  this.inputDropArea = new cwl.graphics.figure.RuleDropArea("Inputs", ["ChiValue"]);
  this.conditionDropArea = new cwl.graphics.figure.RuleDropArea("Condition", ["RuleCondition"]);
  this.actionDropArea = new cwl.graphics.figure.RuleDropArea("Actions", ["RuleAction"]);
  this.outputDropArea = new cwl.graphics.figure.RuleDropArea("Outputs", ["ChiValue"]);
  
  this.defaultBackgroundColor = new draw2d.Color(255, 255, 255);
  this.highlightBackgroundColor = new draw2d.Color(150, 150, 150);
  draw2d.CompartmentFigure.call(this);
  
  this.setBackgroundColor(this.defaultBackgroundColor);
};

cwl.graphics.figure.RuleFigure.prototype = new draw2d.CompartmentFigure;

cwl.graphics.figure.RuleFigure.prototype.createHTMLElement = function() { 
  var item = draw2d.CompartmentFigure.prototype.createHTMLElement.call(this);
  item.style.margin = "0px";
  item.style.padding = "0px";
  item.style.border = "1px solid black";
  item.style.cursor = null;
  
  // create the title bar
  this.titleNode = document.createElement("div");
  this.titleNode.style.position = "absolute";
  this.titleNode.style.margin = "-1px";
  this.titleNode.style.padding = "2px";
  this.titleNode.style.font = "normal 10px verdana";
  this.titleNode.style.backgroundColor = "#eeeeee";
  this.titleNode.style.border = "1px solid gray";
  this.titleNode.style.whiteSpace = "nowrap";
  this.titleNode.style.textAlign = "center";
  var titleTextNode = document.createTextNode(this.title);
  this.titleNode.appendChild(titleTextNode);

  // create the drop areas
  var inputDropAreaElement = this.inputDropArea.createHTMLElement();
  var conditionDropAreaElement = this.conditionDropArea.createHTMLElement();
  var actionDropAreaElement = this.actionDropArea.createHTMLElement();
  var outputDropAreaElement = this.outputDropArea.createHTMLElement();
  
  item.appendChild(this.titleNode);
  item.appendChild(inputDropAreaElement);
  item.appendChild(conditionDropAreaElement);
  item.appendChild(actionDropAreaElement);
  item.appendChild(outputDropAreaElement);
  return item;
};

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

cwl.graphics.figure.RuleFigure.prototype.setDimension = function(w,h) {
  draw2d.CompartmentFigure.prototype.setDimension.call(this,w,h);
  
  var elementWidth = (this.getWidth()-4);
  if(this.titleNode != null) {
    this.titleNode.style.height = "15px";
    this.titleNode.style.width = elementWidth+"px";
  }
  this.inputDropArea.setDimension(0, 15, elementWidth, 20);
  this.conditionDropArea.setDimension(0, 35, elementWidth, 100);
  this.actionDropArea.setDimension(0, 135, elementWidth, this.getHeight()-155);
  this.outputDropArea.setDimension(0, this.getHeight()-20, elementWidth, 20);
};

cwl.graphics.figure.RuleFigure.prototype.setTitle = function(title) {
  this.title=title;
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