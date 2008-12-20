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
 * @class The base class for all graphical figures in UWM.
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
uwm.graphics.figure.BaseFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight){
    /**
     * Minimum width.
     *
     * @private
     * @type int
     */
    this.minWidth = minWidth;
    
    /**
     * Minimum height.
     *
     * @private
     * @type int
     */
    this.minHeight = minHeight;
    
    /**
     * The associated figure.
     *
     * @private
     * @type uwm.diagram.Figure
     */
    this.figure = figure;
    
    draw2d.VectorFigure.call(this);
    
    if (startWidth && startHeight) {
        this.setDimension(startWidth, startHeight);
    }
    if (label) {
        this.setLabel(label);
    }
    
    this.buildContextMenu();
}

Ext.extend(uwm.graphics.figure.BaseFigure, draw2d.VectorFigure);

/**
 * Initiates this figure.
 *
 * @private
 * @param {uwm.diagram.UwmWorkflow} workflow The workflow containing this figure.
 */
uwm.graphics.figure.BaseFigure.prototype.setWorkflow = function(workflow){
    draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
    
    if (workflow != null && this.port == null) {
        /**
         * The port of this figure.
         *
         * @private
         * @type uwm.graphics.connection.UwmPort
         */
        this.port = new uwm.graphics.connection.UwmPort();
        this.port.setWorkflow(workflow);
        this.addPort(this.port, this.width + 8, 0);
    }
}

/**
 * Builds the context menu of this figure.
 *
 * @private
 */
uwm.graphics.figure.BaseFigure.prototype.buildContextMenu = function(){
    var figure = this.getFigure();
    
    /**
     * The context menu of this figure.
     *
     * @private
     * @type Ext.menu.Menu
     */
    this.uwmContextMenu = new Ext.menu.Menu({
        items: [new Ext.menu.Item({
            text: "Show in tree",
            handler: function(item, e){
                figure.showInModelTree();
            }
        }), new Ext.menu.Item({
            text: "Show in grid",
            handler: function(item, e){
                figure.showInGrid();
            }
        }), new Ext.menu.Item({
            text: "Show in Hierarchy",
            handler: function(item, e){
                figure.showInHierarchy();
            }
        }), "-", new Ext.menu.Item({
            text: "Delete from diagram",
            handler: function(item, e){
                figure.deleteFromDiagram();
            }
        }), new Ext.menu.Item({
            text: "Delete from model",
            handler: function(tiem, e){
                figure.deleteFromModel();
            }
        })]
    });
}

/**
 * The draw2d context menu handler.
 *
 * @private
 * @param {int} x X position where to show the context menu.
 * @param {int} y Y position where to show the context menu.
 */
uwm.graphics.figure.BaseFigure.prototype.onContextMenu = function(x, y){
    this.uwmContextMenu.showAt(this.figure.getDiagram().getContextMenuPosition(x, y));
}

/**
 * Returns the associated figure.
 *
 * @return The associated figure.
 * @type uwm.diagram.Figure
 */
uwm.graphics.figure.BaseFigure.prototype.getFigure = function(){
    return this.figure;
}

/**
 * Returns the minimum width of this figure.
 *
 * @return The minimum width of this figure.
 * @type int
 */
uwm.graphics.figure.BaseFigure.prototype.getMinWidth = function(){
    var result = draw2d.VectorFigure.prototype.getMinWidth.call(this);
    
    if (this.minWidth) {
        result = this.minWidth;
    }
    return result;
}

/**
 * Returns the minimum height of this figure.
 *
 * @return The minimum height of this figure.
 * @type int
 */
uwm.graphics.figure.BaseFigure.prototype.getMinHeight = function(){
    var result = draw2d.VectorFigure.prototype.getMinHeight.call(this);
    
    if (this.minHeight) {
        result = this.minHeight;
    }
    
    return result;
}

/**
 * Repositions the label.
 *
 * @private
 * @param {int} width New width of the figure.
 * @param {int} height New height of the figure.
 */
uwm.graphics.figure.BaseFigure.prototype.setDimension = function(width, height){
    draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
    
    if (this.port != null) {
        this.port.setPosition(this.getWidth() + 8, 0);
    }
}

/**
 * Deactivates text selection on this figure.
 *
 * @private
 */
uwm.graphics.figure.BaseFigure.prototype.createHTMLElement = function(){
    var item = draw2d.Figure.prototype.createHTMLElement.call(this);
    item.className = "uwmFigure";
    
    uwm.Util.setElementUnselectable(item);
    
    return item;
}

/**
 * Sets the label text.
 *
 * @param {String} newText The new label text.
 */
uwm.graphics.figure.BaseFigure.prototype.setLabel = function(newText){
    if (this.label) {
        this.label.innerHTML = newText;
    }
}

/**
 * Returns the label text.
 *
 * @return The label text.
 * @type String
 */
uwm.graphics.figure.BaseFigure.prototype.getLabel = function(){
    if (this.label) {
        return this.label.innerHTML;
    }
}
