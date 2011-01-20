/*
 * Copyright (c) 2011 The Olympos Development Team.
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
 * @class A figure indicating a selection of the atached figure.
 * 
 * @extends draw2d.VectorFigure
 * @constructor
 * @param {draw2d.Figure} figure The selected figure.
 */
uwm.graphics.figure.SelectionFigure = function(figure){
    draw2d.VectorFigure.call(this);
    
    /**
     * The selected figure
     * @type {draw2d.Figure}
     */
    this.figure = figure;
    
    // initialize the selection
    this.setPosition(figure.getX(), figure.getY());
    this.setDimension(figure.getWidth(), figure.getHeight());
    this.setSelectable(false);
    this.setZOrder(figure.getZOrder()-100);
    this.figure.attachMoveListener(this);
}

Ext.extend(uwm.graphics.figure.SelectionFigure, draw2d.VectorFigure);

/**
 * Get the selected figure.
 * @return {draw2d.Figure}
 */
uwm.graphics.figure.SelectionFigure.prototype.getFigure = function() {
    return this.figure;
}

/**
 * Paints the custom elements.
 *
 * @private
 */
uwm.graphics.figure.SelectionFigure.prototype.paint = function() {
    draw2d.VectorFigure.prototype.paint.call(this);
    
    var width = this.getWidth();
    var height = this.getHeight();
    
    this.graphics.fillRect(-6, -6, 6, 6);
    this.graphics.fillRect(-6, height+1, 6, 6);
    this.graphics.fillRect(width+1, -6, 6, 6);
    this.graphics.fillRect(width+1, height+1, 6, 6);
    
    this.graphics.paint();
}

/**
 * Callback method of the movemoent of a figure
 * @see draw2d.Figure#attachMoveListener
 * @param {draw2d.Figure} figure The figure which has been moved
 **/
uwm.graphics.figure.SelectionFigure.prototype.onOtherFigureMoved=function(/*:draw2d.Figure*/ figure)
{
	this.setPosition(figure.getX(), figure.getY());
	if (this.graphics!==null) {
		this.paint();
	}
};
