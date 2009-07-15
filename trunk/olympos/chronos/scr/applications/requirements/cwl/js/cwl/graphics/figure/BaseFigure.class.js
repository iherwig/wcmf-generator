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
 * BaseFigure is the base class for all diagram figures. It adds support
 * for a label to draw2d.VectorFigure.
 */
cwl.graphics.figure.BaseFigure = function(label) {
  this.label = label;
  this.lableNode = null;
  draw2d.VectorFigure.call(this);
}

Ext.extend(cwl.graphics.figure.BaseFigure, draw2d.VectorFigure);

cwl.graphics.figure.BaseFigure.prototype.checkDropable = function(modelElement, x, y) {
  return false;
}

cwl.graphics.figure.BaseFigure.prototype.onElementDrop = function(modelElement) {
  return false;
}

cwl.graphics.figure.BaseFigure.prototype.setLabel = function(label) {
  this.label = label;
  this.textNode.textContent = label;
  
  // reposition label (centered)
  this.labelNode.style.marginLeft = parseInt((this.getWidth()-this.labelNode.offsetWidth)/2)+"px";
}

/**
 * Creates the label element.
 *
 * @private
 */
cwl.graphics.figure.BaseFigure.prototype.createHTMLElement = function(){
    var item = draw2d.VectorFigure.prototype.createHTMLElement.call(this);
    
  /**
   * The label of this figure.
   *
   * @private
   * @type HTMLElement
   */
  this.labelNode = document.createElement("div");
  this.labelNode.style.position = "absolute";
  this.labelNode.style.paddingTop = "15%";
  this.labelNode.style.textAlign = "center";
  this.labelNode.style.overflow = "visible";
  this.labelNode.style.zIndex = 1111;
  this.textNode = document.createTextNode(this.label);
  this.labelNode.appendChild(this.textNode);

	item.appendChild(this.labelNode);

	return item;
}
