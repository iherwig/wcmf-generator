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
 * @class Base class showing the label at the center of the figure.
 *
 * <p>This class is not intended to be instantiated, it should rather be extended.</p>
 *
 * @constructor
 * @param {String} label The label of the figure.
 * @param {uwm.diagram.Figure} figure The associated figure object.
 * @param {int} minWidth Minimum width of figure.
 * @param {int} minHeight Minimum height of figure.
 * @param {int} startWidth Initial width of figure.
 * @param {int} startHeight Initial height of figure.
 */
uwm.graphics.figure.LabelCenterFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight){
    uwm.graphics.figure.ComplexFigure.call(this, label, figure, minWidth, minHeight, startWidth, startHeight);
}

Ext.extend(uwm.graphics.figure.LabelCenterFigure, uwm.graphics.figure.ComplexFigure);

/**
 * Creates the label element.
 *
 * @private
 */
uwm.graphics.figure.LabelCenterFigure.prototype.createHTMLElement = function(){
    var item = uwm.graphics.figure.ComplexFigure.prototype.createHTMLElement.call(this);
    
    /**
     * The label of this figure.
     *
     * @private
     * @type HTMLElement
     */
    this.label = document.createElement("div");
    this.label.style.position = "absolute";
    this.label.style.width = "100%";
    this.label.style.textAlign = "center";
    this.label.style.left = "5px";
    this.label.style.overflow = "hidden";
    this.label.style.height = "20px";
    
    return item;
}
