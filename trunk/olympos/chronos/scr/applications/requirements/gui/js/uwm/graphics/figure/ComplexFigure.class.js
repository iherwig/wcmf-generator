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
 * @class The base class for all complex (i. e. non-rectangular) figures in UWM.
 *
 * <p>This class is not intended to be instantiated, it should rather be extended.</p>
 * 
 * @extends uwm.graphics.figure.BaseFigure
 * @constructor
 * @param {String} label The label of the figure.
 * @param {uwm.diagram.Figure} figure The associated figure object.
 * @param {int} minWidth Minimum width of figure.
 * @param {int} minHeight Minimum height of figure.
 * @param {int} startWidth Initial width of figure.
 * @param {int} startHeight Initial height of figure.
 */
uwm.graphics.figure.ComplexFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight){
    uwm.graphics.figure.BaseFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

Ext.extend(uwm.graphics.figure.ComplexFigure, uwm.graphics.figure.BaseFigure);

uwm.graphics.figure.ComplexFigure.prototype.setWorkflow = function(workflow) {
	uwm.graphics.figure.BaseFigure.prototype.setWorkflow.call(this, workflow);
	
	this.setLabelDimension();
}

/**
 * Adjusts the label position.
 *
 * @private
 * @param {int} width New figure width.
 * @param {int} height New figure height.
 */
uwm.graphics.figure.ComplexFigure.prototype.setDimension = function(width, height){
    uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
    
    this.setLabelDimension();
}

/**
 * Adjusts the label position.
 *
 * <p>To be implemented by extending classes.</p>
 */
uwm.graphics.figure.ComplexFigure.prototype.setLabelDimension = function(){

}
