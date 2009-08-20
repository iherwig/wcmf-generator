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

/**
 * Represents a DropArea inside a RuleFigure. All coordinates are relative to
 * the RuleFigure.
 */
cwl.graphics.figure.RuleDropArea = function(label, acceptableTypes) {
  this.acceptableTypes = acceptableTypes;
  this.label = label;
  this.div = null;
  this.textNode = null;
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
}

/**
 * Create the html element representing the drop area
 * @return A HTML Element
 */
cwl.graphics.figure.RuleDropArea.prototype.createHTMLElement = function() {

  this.div = document.createElement("div");
  this.div.style.position = "absolute";
  this.div.style.margin = "-1px";
  this.div.style.padding = "2px";
  this.div.style.font = "normal 10px verdana";
  this.div.style.backgroundColor = "#ffffff";
  this.div.style.border = "1px solid gray";
  this.div.style.whiteSpace = "nowrap";
  this.div.style.textAlign = "left";
  this.textNode = document.createTextNode(this.label);
  this.div.appendChild(this.textNode);
  
  return this.div;
}

/**
 * Set the position and dimension of the DropArea
 */
cwl.graphics.figure.RuleDropArea.prototype.setDimension = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;

  if (this.div) {
    this.div.style.left = this.x+"px";
    this.div.style.top = this.y+"px";
    this.div.style.width = this.width+"px";
    this.div.style.height = this.height+"px";
  }
}

/**
 * Check if the DropArea accepts the given ModelElement
 */
cwl.graphics.figure.RuleDropArea.prototype.acceptsElement = function(modelElement) {
  if (this.acceptableTypes.indexOf(modelElement.getType()) >= 0) {
    return true;
  }
  return false;
}

/**
 * Check if the DropArea covers a given point
 */
cwl.graphics.figure.RuleDropArea.prototype.isOver = function (x, y) {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = x1 + this.width;
    var y2 = y1 + this.height;
    var result = (x >= x1 && x <= x2 && y >= y1 && y <= y2);
    return result;
}