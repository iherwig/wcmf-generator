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
Ext.namespace("uwm.graphics.figure");

/**
 * @class A simple, rectangular figure.
 * 
 * @extends uwm.graphics.figure.BaseFigure
 * @constructor
 * @param {String} label The label of the figure.
 * @param {uwm.diagram.Figure} figure The associated figure object.
 */
uwm.graphics.figure.StatusFigure = function(label, figure, initalWidth, initialHeight, minWidth, minHeight){
    uwm.graphics.figure.BaseFigure.call(this, label, figure, initalWidth, initialHeight, minWidth, minHeight);
}

Ext.extend(uwm.graphics.figure.StatusFigure, uwm.graphics.figure.BaseFigure);

/**
 * Sets the label position.
 *
 * @private
 * @param {int} width New width of figure.
 * @param {int} height New height of figure.
 */
uwm.graphics.figure.StatusFigure.prototype.setDimension = function(width, height){
    uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
    
    if (this.label != null) {
        this.label.style.width = this.getWidth() - 3 + "px";
        this.label.style.height = (this.getHeight() - 3) / 2 + "px";
    }
    if (this.status != null) {
    	this.status.style.top = (this.getHeight() - 3) / 2 + 5 + "px";
    	this.status.style.width = this.getWidth() - 3 + "px";
    	this.status.style.height = (this.getHeight() - 3) / 2 - 5 + "px";
    }
}

/**
 * Creates the text elements of the figure.
 *
 * @private
 */
uwm.graphics.figure.StatusFigure.prototype.createHTMLElement = function(){
    var item = uwm.graphics.figure.BaseFigure.prototype.createHTMLElement.call(this);
    
    /**
     * The label of this figure.
     *
     * @private
     * @type HTMLElement
     */
    this.label = document.createElement("div");
    this.label.style.position = "absolute";
    this.label.style.left = "5px";
    this.label.style.top = "5px";
    this.label.style.overflow = "hidden";
    
    this.status = document.createElement("div");
    this.status.style.position = "absolute";
    this.status.style.left = "5px";
    this.status.style.top = "5px";
    this.status.style.overflow = "hidden";
    this.status.style.textAlign = "center";

    return item;
}

/**
 * Paints the custom elements.
 *
 * @private
 */
uwm.graphics.figure.StatusFigure.prototype.paint = function(){
    uwm.graphics.figure.BaseFigure.prototype.paint.call(this);
    
    var width = this.getWidth() - 1;
    var height = this.getHeight() - 1;
    
    this.graphics.drawRect(0, 0, width, height);
    
    this.graphics.paint();
    
    this.html.appendChild(this.label);
    this.html.appendChild(this.status);
}

 /**
  * Sets the label text.
  * 
  * @param {String}
  *            newText The new label text.
  */
 uwm.graphics.figure.StatusFigure.prototype.setLabel = function(newText) {
 	var result = uwm.graphics.figure.BaseFigure.prototype.setLabel.call(this, newText);
 	
 	if (this.getFigure()) {
 		this.setStatus(this.getFigure().getModelObject().getStatus());
 	}
 }
 
 
 uwm.graphics.figure.StatusFigure.prototype.setStatus = function(newStatus) {
	 this.status.innerHTML = "[" + newStatus + "]";
 }
