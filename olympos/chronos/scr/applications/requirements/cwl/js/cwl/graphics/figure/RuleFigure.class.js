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
  this.titlebar = null;
  this.inputDropArea = new cwl.graphics.figure.RuleDropArea("Inputs", this);
  this.conditionDropArea = new cwl.graphics.figure.RuleDropArea("Condition", this);
  this.actionDropArea = new cwl.graphics.figure.RuleDropArea("Actions", this);
  this.outputDropArea = new cwl.graphics.figure.RuleDropArea("Outputs", this);
  
  this.defaultBackgroundColor = new draw2d.Color(255, 255, 255);
  this.highlightBackgroundColor = new draw2d.Color(250, 250, 250);
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
  this.titlebar = document.createElement("div");
  this.titlebar.style.position = "absolute";
  this.titlebar.style.margin = "-1px";
  this.titlebar.style.padding = "2px";
  this.titlebar.style.font = "normal 10px verdana";
  this.titlebar.style.backgroundColor = "#eeeeee";
  this.titlebar.style.border = "1px solid gray";
  this.titlebar.style.whiteSpace = "nowrap";
  this.titlebar.style.textAlign = "center";
  var titleTextNode = document.createTextNode(this.title);
  this.titlebar.appendChild(titleTextNode);

  // create the drop areas
  var inputDropAreaElement = this.inputDropArea.createHTMLElement();
  var conditionDropAreaElement = this.conditionDropArea.createHTMLElement();
  var actionDropAreaElement = this.actionDropArea.createHTMLElement();
  var outputDropAreaElement = this.outputDropArea.createHTMLElement();
  
  item.appendChild(this.titlebar);
  item.appendChild(inputDropAreaElement);
  item.appendChild(conditionDropAreaElement);
  item.appendChild(actionDropAreaElement);
  item.appendChild(outputDropAreaElement);
  return item;
};

cwl.graphics.figure.RuleFigure.prototype.onFigureEnter = function(figure) {
  if (this.children[figure.id] == null) {
    this.setBackgroundColor(this.highlightBackgroundColor);
  }
  draw2d.CompartmentFigure.prototype.onFigureEnter.call(this, figure);
};

cwl.graphics.figure.RuleFigure.prototype.onFigureLeave = function(figure) {
  draw2d.CompartmentFigure.prototype.onFigureLeave.call(this, figure);
  this.setBackgroundColor(this.defaultBackgroundColor);
};

cwl.graphics.figure.RuleFigure.prototype.onFigureDrop = function(figure) {
  draw2d.CompartmentFigure.prototype.onFigureDrop.call(this, figure);
  this.setBackgroundColor(this.defaultBackgroundColor);
};

cwl.graphics.figure.RuleFigure.prototype.setDimension = function(w,h) {
  draw2d.CompartmentFigure.prototype.setDimension.call(this,w,h);
  
  var elementWidth = (this.getWidth()-4);
  if(this.titlebar != null) {
    this.titlebar.style.height = "15px";
    this.titlebar.style.width = elementWidth+"px";
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