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
Ext.namespace("uwm.diagram");

/**
 * @class The MultiSelection allows to select multiple objects, since this
 * is not supported by draw2d nativly.
 * @param {uwm.diagram.UwmWorkflow} workflow The uwm workflow to which 
 *   this frame will be connected
 *   
 * @constructor
 */
uwm.diagram.MultiSelection = function(workflow) {
	/**
	 * The workflow
	 * 
	 * @private
	 * @type {uwm.diagram.UwmWorkflow}
	 */
	this.workflow = workflow;
	/**
	 * The visual representation
	 * 
	 * @private
	 * @type {draw2d.Rectangle}
	 */
	this.selectionFrame = new draw2d.Rectangle(0, 0);
	this.selectionFrame.setColor(new draw2d.Color(128, 128, 128)); 
	/**
	 * The point from which the selection frame is resized
	 * 
	 * @private
	 * @type {draw2d.Point}
	 */
	this.fixPoint = null;
	/**
	 * The selected objects
	 * 
	 * @private
	 * @type {Array}
	 */
	this.selectedFigures = [];
	this.selectionFigures = [];
	
	// add the frame to the workflow
	this.workflow.addFigure(this.selectionFrame, -10, -10);
}

/**
 * Show the frame at the given start position. The size is initially 1x1 pixel.
 * The start position will not change until hide is called. Subsequent calls to
 * update will change the size of the frame relative to the start position.
 * @param x The x coordinate
 * @param y The y coordinate
 */
uwm.diagram.MultiSelection.prototype.showFrame = function(x, y) {
	this.fixPoint = new draw2d.Point(x, y);
	this.selectionFrame.setDimension(0, 0);
	this.selectionFrame.setPosition(x, y);
}

/**
 * Hide the frame.
 */
uwm.diagram.MultiSelection.prototype.hideFrame = function() {
	this.setSelectionFromFrame();

	this.fixPoint = null;
	this.selectionFrame.setDimension(0, 0);
	this.selectionFrame.setPosition(-10, -10);
}

/**
 * Update the frame size with the given position relative to the start position.
 * @param x The x coordinate
 * @param y The y coordinate
 */
uwm.diagram.MultiSelection.prototype.updateFrame = function(x, y) {
	var fixX = this.fixPoint.getX();
	var fixY = this.fixPoint.getY();

	// determine the quadrant relative to the fix point
	//
	// 2 | 1
	// -----
	// 3 | 4
	var quadrant = 0;
	if (x > fixX) {
		quadrant = (y > fixY) ? 4 : 1;
	}
	else {
		quadrant = (y > fixY) ? 3 : 2;
	}

	// update position
	switch (quadrant) {
		case 1:
			this.selectionFrame.setPosition(fixX, y);
			break;
		case 2:
			this.selectionFrame.setPosition(x, y);
			break;
		case 3:
			this.selectionFrame.setPosition(x, fixY);
			break;
		case 4:
			this.selectionFrame.setPosition(fixX, fixY);
			break;
	}
	
	// update dimension
	var width = Math.abs(x-fixX);
	var height = Math.abs(y-fixY);
	this.selectionFrame.setDimension(width, height);
}

/**
 * Clear the selection
 */
uwm.diagram.MultiSelection.prototype.clearSelection = function() {
	this.unmarkSelection();
	this.selectedFigures = [];
}

/**
 * Check if there are selected figures
 * @return {Boolean}
 */
uwm.diagram.MultiSelection.prototype.hasSelection = function() {
	return this.selectedFigures.length > 0;
}

/**
 * Add/Remove a figure from the selection, if it's not/already included in 
 * the selection
 * @param {draw2d.Figure} figure The figure to change the selection state
 */
uwm.diagram.MultiSelection.prototype.toggleSelection = function(figure) {
	var newSelection = [];
	var wasSelected = false;
	// copy all figures to a temporary list except for the given one
	for(var i=0, count=this.selectedFigures.length; i<count; i++) {
		var curFigure = this.selectedFigures[i];
		if (curFigure != figure) {
			newSelection.push(curFigure);
		}
		else {
			wasSelected = true;
			this.unmarkFigure(figure);
		}
	}
	// the figure is not copied in the temporary list,
	// so we just have to added in the case it was not contained
	if (!wasSelected) {
		newSelection.push(figure);
		this.markFigure(figure);
	}
}

/**
 * Find the selected figures included in the selection frame
 * @private
 */
uwm.diagram.MultiSelection.prototype.setSelectionFromFrame = function() {
	// we assume that the user only attempts to select figures, if the frame size
	// is bigger than the minimal size. 7 seems to be the minimal width/height 
	// that is assigned to a rectangle
	if (this.selectionFrame.getWidth() > 7 || this.selectionFrame.getHeight() > 7) {
		this.selectedFigures = this.workflow.getContainedFigures(this.selectionFrame);
		this.markSelection();
	}
}

/**
 * Mark the selected figures
 * @private
 */
uwm.diagram.MultiSelection.prototype.markSelection = function() {
	this.unmarkSelection();
	for(var i=0, count=this.selectedFigures.length; i<count; i++) {
		var curFigure = this.selectedFigures[i];
		this.markFigure(curFigure);
	}
}

/**
 * Unmark the selected figures
 * @private
 */
uwm.diagram.MultiSelection.prototype.unmarkSelection = function() {
	// we don't use unmarkFigure here, because it would be slower than
	// just removing all selectionFigures
	for (var i=0, count=this.selectionFigures.length; i<count; i++) {
		this.workflow.removeFigure(this.selectionFigures[i]);
		delete this.selectionFigures[i];
	}
	this.selectionFigures = [];
}

/**
 * Add a SelectionFigure to a given figure
 * @param figure The figure to mark
 * @private
 */
uwm.diagram.MultiSelection.prototype.markFigure = function(figure) {
	var selectionFigure = new uwm.graphics.figure.SelectionFigure(figure);
	this.workflow.addFigure(selectionFigure, figure.getX(), figure.getY());
	this.selectionFigures.push(selectionFigure);
}

/**
 * Remove the SelectionFigure from a given figure
 * @param figure The figure to unmark
 * @private
 */
uwm.diagram.MultiSelection.prototype.unmarkFigure = function(figure) {
	var newSelectionFigures = [];
	for (var i=0, count=this.selectionFigures.length; i<count; i++) {
		var curSelectionFigure = this.selectionFigures[i];
		if (curSelectionFigure.getFigure() == figure) {
			this.workflow.removeFigure(curSelectionFigure);
			delete curSelectionFigure;
		}
		else {
			newSelectionFigures.push(curSelectionFigure);
		}
	}
	this.selectionFigures = newSelectionFigures;
}