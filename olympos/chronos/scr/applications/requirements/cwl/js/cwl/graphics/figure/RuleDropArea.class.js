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

cwl.graphics.figure.RuleDropArea = function(label, container) {
  this.container = container;
  this.label = label;
  this.div = null;
  this.textNode = null;
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
  if (this.div) {
    this.div.style.left = x+"px";
    this.div.style.top = y+"px";
    this.div.style.width = w+"px";
    this.div.style.height = h+"px";
  }
}
