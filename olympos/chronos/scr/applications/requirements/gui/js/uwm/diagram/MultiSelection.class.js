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
	this.selectionFrame = new draw2d.Rectangle(1, 1);
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
	this.selectedObjects = [];
	
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
	this.clearSelection();

	this.fixPoint = new draw2d.Point(x-1, y-1);
	this.selectionFrame.setDimension(1, 1);
	this.selectionFrame.setPosition(x-1, y-1);
}

/**
 * Hide the frame.
 */
uwm.diagram.MultiSelection.prototype.hideFrame = function() {
	this.setSelectionFromFrame();

	this.fixPoint = null;
	this.selectionFrame.setDimension(1, 1);
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

uwm.diagram.MultiSelection.prototype.clearSelection = function() {
	this.unmarkSelection();
	this.selectedObjects = [];
}

uwm.diagram.MultiSelection.prototype.setSelectionFromFrame = function() {
	this.selectedObjects = this.workflow.getContainedFigures(this.selectionFrame);
	this.markSelection();
	console.log("selected figures: "+this.selectedObjects.length);
}

uwm.diagram.MultiSelection.prototype.markSelection = function() {
	for(var i=0, count=this.selectedObjects.length; i<count; i++) {
		this.selectedObjects[i].setAlpha(0.5);
	}
}

uwm.diagram.MultiSelection.prototype.unmarkSelection = function() {
	for(var i=0, count=this.selectedObjects.length; i<count; i++) {
		this.selectedObjects[i].setAlpha(1);
	}
}