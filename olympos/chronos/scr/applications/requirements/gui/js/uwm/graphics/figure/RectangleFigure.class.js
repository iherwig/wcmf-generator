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
uwm.graphics.figure.RectangleFigure = function(label, figure){
    uwm.graphics.figure.BaseFigure.call(this, label, figure, 80, 30, 150, 50);
}

Ext.extend(uwm.graphics.figure.RectangleFigure, uwm.graphics.figure.BaseFigure);

/**
 * Sets the label position.
 *
 * @private
 * @param {int} width New width of figure.
 * @param {int} height New height of figure.
 */
uwm.graphics.figure.RectangleFigure.prototype.setDimension = function(width, height){
    uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
    
    if (this.label != null) {
        this.label.style.width = this.getWidth() - 40 + "px";
        this.label.style.height = this.getHeight() - 3 + "px";
    }
}

/**
 * Creates the text elements of the figure.
 *
 * @private
 */
uwm.graphics.figure.RectangleFigure.prototype.createHTMLElement = function(){
    var item = uwm.graphics.figure.BaseFigure.prototype.createHTMLElement.call(this);
    
    /**
     * The label of this figure.
     *
     * @private
     * @type HTMLElement
     */
    this.label = document.createElement("div");
    this.label.style.position = "absolute";
    this.label.style.left = "20px";
    this.label.style.top = "5px";
    this.label.style.overflow = "hidden";
    
    /**
     * The image of this figure.
     *
     * @private
     * @type HTMLElement
     */
    this.image = document.createElement("div");
    this.image.className = this.getFigure().getModelObject().getModelNodeClass().getFigureIcon();
    this.image.style.position = "absolute";
    this.image.style.top = "2px";
    this.image.style.right = "2px";
    this.image.style.width = "24px";
    this.image.style.height = "24px";
    this.image.style.backgroundRepeat = "no-repeat";
    
    return item;
}

/**
 * Paints the custom elements.
 *
 * @private
 */
uwm.graphics.figure.RectangleFigure.prototype.paint = function(){
    uwm.graphics.figure.BaseFigure.prototype.paint.call(this);
    
    var width = this.getWidth() - 1;
    var height = this.getHeight() - 1;
    
    this.graphics.drawRect(0, 0, width, height);
    this.graphics.drawLine(10, 0, 10, height);
    this.graphics.drawLine(15, 0, 15, height);
    
    this.graphics.paint();
    
    this.html.appendChild(this.label);
    this.html.appendChild(this.image);
}
