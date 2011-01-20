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
	 * The selected objects (key: figure id, value: figure object)
	 * 
	 * @private
	 * @type {Object}
	 */
	this.selectedFigures = {};
	/**
	 * The selection markers (key: figure id, value: figure object)
	 * 
	 * @private
	 * @type {Object}
	 */
	this.selectionMarkers = {};
	/**
	 * The initial positions of all figures (key: figure id, value: [x, y])
	 * 
	 * @private
	 * @type {Object}
	 */
	this.startPositions = {};
	/**
	 * Indicates if there is a figure selected or not
	 * 
	 * @private
	 * @type {Boolean}
	 */
	this.isEmpty = false;
	
	// add the frame to the workflow
	this.workflow.addFigure(this.selectionFrame, -10, -10);
}

/**
 * Show the frame at the given start position with minimum size.
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
 * Hide the frame and select all figures inside.
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
	for (id in this.selectedFigures) {
		var curFigure = this.selectedFigures[id];
		this.unregisterMoveListener(curFigure);
	}
	this.selectedFigures = {};
	this.startPositions = {};
}

/**
 * Check if there are selected figures
 * @return {Boolean}
 */
uwm.diagram.MultiSelection.prototype.isEmpty = function() {
	return this.isEmpty;
}

/**
 * Check if a figure is included in the selection
 * @param figure The figure to check
 * @return {Boolean}
 */
uwm.diagram.MultiSelection.prototype.includesFigure = function(figure) {
	return (this.selectedFigures[figure.id] != undefined);
}

/**
 * Get all figres that are included in the selection
 * @return {Array}
 */
uwm.diagram.MultiSelection.prototype.getSelectedFigures = function() {
	var figures = [];
	for (id in this.selectedFigures) {
		var curFigure = this.selectedFigures[id];
		if (curFigure instanceof draw2d.Figure) {
			figures.push(curFigure);
		}
	}
	return figures;
}

/**
 * Add/Remove a figure from the selection, if it's not/already included in 
 * the selection
 * @param {draw2d.Figure} figure The figure to change the selection state
 * @return {Boolean} True/False wether the figure is selected afterwards or not
 */
uwm.diagram.MultiSelection.prototype.toggleSelection = function(figure) {
	if (this.selectedFigures[figure.id] != undefined) {
		delete this.selectedFigures[figure.id];
		this.unregisterMoveListener(figure);
		this.unmarkFigure(figure);
		return false;
	}
	else {
		this.selectedFigures[figure.id] = figure;
		this.registerMoveListener(figure);
		this.markFigure(figure);
		return true;
	}
}

/**
 * Create the current selection from all figures inside the selection frame.
 * @private
 */
uwm.diagram.MultiSelection.prototype.setSelectionFromFrame = function() {
	// we assume that the user only attempts to select figures, if the frame size
	// is bigger than the minimal size. 7 seems to be the minimal width/height 
	// that is assigned to a rectangle
	if (this.selectionFrame.getWidth() > 7 || this.selectionFrame.getHeight() > 7) {
		var figures = this.workflow.getContainedFigures(this.selectionFrame);
		for (var i=0, count=figures.length; i<count; i++) {
			var curFigure = figures[i];
			this.selectedFigures[curFigure.id] = curFigure;
			this.registerMoveListener(curFigure);
		}
		this.markSelection();
	}
}

/**
 * Mark the selected figures.
 * NOTE: This method only changes the visual representation.
 * @private
 */
uwm.diagram.MultiSelection.prototype.markSelection = function() {
	this.unmarkSelection();
	var figures = this.getSelectedFigures();
	for (var i=0, count=figures.length; i<count; i++) {
		this.markFigure(figures[i]);
	}
}

/**
 * Unmark the selected figures.
 * NOTE: This method only changes the visual representation.
 * @private
 */
uwm.diagram.MultiSelection.prototype.unmarkSelection = function() {
	// we don't use unmarkFigure here, because it would be slower than
	// just removing all selectionMarkers
	for (id in this.selectionMarkers) {
		var curMarker = this.selectionMarkers[id];
		this.workflow.removeFigure(curMarker);
	}
	this.selectionMarkers = {};
}

/**
 * Add a SelectionFigure to a given figure.
 * NOTE: This method only changes the visual representation.
 * @param figure The figure to mark
 * @private
 */
uwm.diagram.MultiSelection.prototype.markFigure = function(figure) {
	var selectionMarker = new uwm.graphics.figure.SelectionFigure(figure);
	this.workflow.addFigure(selectionMarker, figure.getX(), figure.getY());
	this.selectionMarkers[figure.id] = selectionMarker;
}

/**
 * Remove the SelectionFigure from a given figure
 * NOTE: This method only changes the visual representation.
 * @param figure The figure to unmark
 * @private
 */
uwm.diagram.MultiSelection.prototype.unmarkFigure = function(figure) {
	if (this.selectionMarkers[figure.id] != undefined) {
		this.workflow.removeFigure(this.selectionMarkers[figure.id]);
		delete this.selectionMarkers[figure.id];
	}
}

/**
 * Start listening to position changes of a given figure
 * @param figure The figure to listen to
 * @private
 */
uwm.diagram.MultiSelection.prototype.registerMoveListener = function(figure) {
	figure.attachMoveListener(this);
	this.startPositions[figure.id] = [figure.getX(), figure.getY()];
}

/**
 * Stop listening to position changes of a given figure
 * @param figure The figure to listen to
 * @private
 */
uwm.diagram.MultiSelection.prototype.unregisterMoveListener = function(figure) {
	figure.detachMoveListener(this);
	delete this.startPositions[figure.id];
}

/**
 * Move listener. Moves all selected objects relative to 
 *
 * @param {draw2d.Figure} figure The figure which has changed its position
 * @private
 */
uwm.diagram.MultiSelection.prototype.onOtherFigureMoved = function(/*:draw2d.Figure*/ figure) {
	// prevent recursion
	if (this.isMoving) {
		return;
	}
	this.isMoving = true;
	
	// get the position difference
	var oldPos = this.startPositions[figure.id]; // simple array
	if (oldPos) {
		var newX = figure.getX();
		var newY = figure.getY();
		var diffX = newX-oldPos[0];
		var diffY = newY-oldPos[1];
		
		// update start position of the figure
		this.startPositions[figure.id] = [newX, newY];
		
		// reposition all other figures
		var figures = this.getSelectedFigures();
		for (var i=0, count=figures.length; i<count; i++) {
			var curFigure = figures[i];
			if (curFigure.id != figure.id) {
				var curNewX = diffX+curFigure.getX();
				var curNewY = diffY+curFigure.getY();
				curFigure.setPosition(curNewX, curNewY);
				this.startPositions[curFigure.id] = [curNewX, curNewY];
			}
		}
	}
	this.isMoving = false;
};
