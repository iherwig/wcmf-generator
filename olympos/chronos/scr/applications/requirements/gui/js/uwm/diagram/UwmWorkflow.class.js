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
/**
 * @class A draw2d Workflow specified for usage in UWM.
 * 
 * @extends draw2d.Workflow
 * @constructor
 * @param {String}
 *            id id of workflow container DOM element.
 * @param {uwm.diagram.Diagram}
 *            diagram The Diagram object containing this workflow.
 */
uwm.diagram.UwmWorkflow = function(id, diagram) {
	draw2d.Workflow.call(this, id);
	
	/**
	 * The diagram containing this workflow.
	 * 
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = diagram;
	/**
	 * Indicates wether the ctrl key is pressed
	 * 
	 * @private
	 * @type Boolean
	 */
	this.isCtrlPressed = false;
	/**
	 * The multiple selection
	 * 
	 * @private
	 * @type {uwm.diagram.MultiSelection}
	 */
	this.multiSelection = new uwm.diagram.MultiSelection(this);
	
	this.buildContextMenu();
	
	var self = this;
	if (this.html) {
        // add the keyup event listener
        var keyUp=function(event)
        {
          var ctrl = event.ctrlKey;
          self.onKeyUp(event.keyCode, ctrl);
        }

	    if (this.html.addEventListener) {
	        this.html.addEventListener("keyup", keyUp, false);
	    }
	    else if (this.html.attachEvent) {
	        this.html.attachEvent("onkeyup", keyUp);
	    }
	    else {
	        throw "Open-jACOB Draw2D not supported in this browser.";
	    }
	}
	this.focus();
}

Ext.extend(uwm.diagram.UwmWorkflow, draw2d.Workflow);

/**
 * Type identifier of this class.
 */
uwm.diagram.UwmWorkflow.prototype.type = "uwm.diagram.UwmWorkflow";

/**
 * Builds the context menu of a diagram.
 * 
 * @private
 */
uwm.diagram.UwmWorkflow.prototype.buildContextMenu = function() {
	var self = this;
	
	/**
	 * The context menu of a diagram.
	 * 
	 * @private
	 * @type Ext.menu.Menu
	 */
	this.uwmContextMenu = new Ext.menu.Menu( {
		items : [ new Ext.menu.Item( {
				text : uwm.Dict.translate("Show in model tree"),
				listeners : {
					click : function() {
						self.showInModelTree();
					}
				}
		}), new Ext.menu.CheckItem( {
				// use itemId instead of id, because this has to be only locally unique
				itemId : uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS,
				text : uwm.Dict.translate("Snap to objects"),
				listeners : {
					checkchange : function(item, checked) {
						self.toggleSnapToObjects(item, checked);
					}
				}
		}), new Ext.menu.Item( {
				text : uwm.Dict.translate("Auto-layout"),
				listeners : {
					click : function() {
						self.doLayout();
					}
				}
		}), new Ext.menu.Item( {
				text : uwm.Dict.translate("Reload"),
				listeners : {
					click : function() {
						self.reloadDiagram();
					}
				}
		}), new Ext.menu.Item( {
				text : uwm.Dict.translate("Print"),
				listeners : {
					click : function() {
						self.printDiagram();
					}
				}
		}), new Ext.menu.Item( {
			text : uwm.Dict.translate("Export as UML"),
			listeners : {
				click : function() {
					self.exportDiagram();
				}
			}
	})
		]
	});
}

/**
 * draw2d handler for showing context menu.
 * 
 * @private
 * @param {int}
 *            x X position to show the context menu at.
 * @param {int}
 *            y Y position to show the context menu at.
 */
uwm.diagram.UwmWorkflow.prototype.onContextMenu = function(x, y) {
	var snapToObjects = this.uwmContextMenu.items.get(uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS);
	
	snapToObjects.checked = this.diagram.isSnapToObjects();
	
	this.uwmContextMenu.showAt(this.diagram.getContextMenuPosition(x, y));
	
	this.oldX = null;
	this.html.style.cursor = "default";
}

/**
 * Toggles this diagram's snap to objects setting.
 * 
 * @private
 * @param {Ext.menu.Item}
 *            item The selected item.
 * @param {boolean}
 *            checked Whether the checkbox was checked or not.
 */
uwm.diagram.UwmWorkflow.prototype.toggleSnapToObjects = function(item, checked) {
	this.diagram.setSnapToObjects(checked);
}

/**
 * Calls this diagram's auto-layouter.
 * 
 * @private
 */
uwm.diagram.UwmWorkflow.prototype.doLayout = function() {
	this.diagram.doLayout();
}

/**
 * Set the focus on the workspace.
 */
uwm.diagram.UwmWorkflow.prototype.focus = function() {
	this.html.focus();
}

/**
 * Shows the Diagram in Model Tree.
 * 
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.UwmWorkflow.prototype.showInModelTree = function() {
	this.diagram.showInModelTree();
}

/**
 * Reloads the diagram.
 * 
 * @see uwm.modeltree.ModelTree
 */
uwm.diagram.UwmWorkflow.prototype.reloadDiagram = function() {
	this.diagram.reloadDiagram();
}

/**
 * Prints the diagram.
 */
uwm.diagram.UwmWorkflow.prototype.printDiagram = function() {
	this.diagram.printDiagram();
}

/**
 * Exports the diagram.
 */
uwm.diagram.UwmWorkflow.prototype.exportDiagram = function() {
	this.diagram.exportDiagram();
}

/**
 * Disables draw2d default context menu.
 * 
 * @private
 * @param {Object}
 *            menu
 * @param {Object}
 *            xPos
 * @param {Object}
 *            yPos
 */
uwm.diagram.UwmWorkflow.prototype.showMenu = function(menu, xPos, yPos) {
}

/**
 * Returns the assigned Diagram.
 * 
 * @return The assigned Diagram.
 * @type uwm.diagram.Diagram
 */
uwm.diagram.UwmWorkflow.prototype.getDiagram = function() {
	return this.diagram;
}

/**
 * Determine if the workflow is in multi selection mode
 * @return {Boolean}
 */
uwm.diagram.UwmWorkflow.prototype.isMultiSelecting=function() {
	return this.isCtrlPressed;
}

/**
 * Get the multi selection object.
 * @return {uwm.diagram.MultiSelection}
 */
uwm.diagram.UwmWorkflow.prototype.getMultiSelection = function() {
	return this.multiSelection;
}

uwm.diagram.UwmWorkflow.prototype.onMouseDown = function(x, y) {
	if (!this.isMultiSelecting()) {
		this.multiSelection.clearSelection();
		this.oldX = x;
		this.oldY = y;
	}
	else {
		// show the selection frame
		this.multiSelection.showFrame(x, y);
	}
	this.html.style.cursor = "pointer";
	uwm.diagram.UwmWorkflow.superclass.onMouseDown.call(this, x, y);
}

uwm.diagram.UwmWorkflow.prototype.onMouseUp = function(x, y) {
	if (!this.isMultiSelecting()) {
		if (this.oldX) {
			var deltaX = x - this.oldX;
			var deltaY = y - this.oldY;
			this.scrollTo(this.getScrollLeft() - deltaX, this.getScrollTop() - deltaY, true);
			this.oldX = null;
			this.oldY = null;
		}
	}
	else {
		// hide the selection frame
		this.multiSelection.hideFrame();
	}
	this.html.style.cursor = "default";
	uwm.diagram.UwmWorkflow.superclass.onMouseUp.call(this, x, y);
}

uwm.diagram.UwmWorkflow.prototype.onMouseMove = function(x, y) {
	if (this.dragging) {
		if (!this.isMultiSelecting()) {
			if (this.oldX) {
				var deltaX = x - this.oldX;
				var deltaY = y - this.oldY;
				this.scrollTo(this.getScrollLeft() - deltaX, this.getScrollTop() - deltaY, true);
			}
		}
		else {
			// resize the selection frame
			this.multiSelection.updateFrame(x, y);
		}
	}
	uwm.diagram.UwmWorkflow.superclass.onMouseMove.call(this, x, y);
}

uwm.diagram.UwmWorkflow.prototype.onKeyDown=function(keyCode, ctrl) {
	if (keyCode == 17) {
		this.isCtrlPressed = true;
		if (this.dragging) {
			// show the selection frame
			this.multiSelection.showFrame(this.oldX, this.oldY);
		}
		this.html.style.cursor = "pointer";
	}
	uwm.diagram.UwmWorkflow.superclass.onKeyDown.call(this, keyCode, ctrl);
}

uwm.diagram.UwmWorkflow.prototype.onKeyUp=function(keyCode, ctrl) {
	if (keyCode == 17) {
		this.isCtrlPressed = false;
		if (this.dragging) {
			// hide the selection frame
			this.multiSelection.hideFrame();
		}
		this.html.style.cursor = "default";
	}
	// the parent class does not define this method, so there is not need to call the
	// parent class method
}

/**
 * Overwritten in order to take node ports into account. 
 * TODO: This method seems to be a bottleneck if there are many figures on the diagram
 * @type draw2d.Figure
 **/
uwm.diagram.UwmWorkflow.prototype.getBestFigure=function(/*:int*/ x, /*:int*/ y, /*:draw2d.Figure*/ figureToIgnore)
{
	var result = null;
	for(var i=0;i<this.figures.getSize();i++) {
		var figure = this.figures.get(i);
		// check ports
		var isOverPort = false;
		if (figure.getPorts) {
			var ports = figure.getPorts();
			for(var j=0;j<ports.getSize();j++) {
				var port = ports.get(j);
				if(port.isOver(x,y)==true) {
					isOverPort = true;
				}
			}
		}
		if((isOverPort || figure.isOver(x,y)==true) && figure!=figureToIgnore) {
			if(result==null) {
				result = figure;
			}
			else if(result.getZOrder() < figure.getZOrder()) {
				result = figure;
			}
		}
	}
	return result;
}

/**
 * Get all figures contained in a given rectangle
 * @param {draw2d.Rectangle} rectangle  
 * @type Array
 **/
uwm.diagram.UwmWorkflow.prototype.getContainedFigures=function(/*:draw2d.Rectangle*/ rectangle)
{
	var result = [];
	for(var i=0;i<this.figures.getSize();i++) {
		var figure = this.figures.get(i);
		if (figure instanceof draw2d.CompartmentFigure || 
				figure instanceof uwm.graphics.figure.BaseFigure) {
			var x0 = figure.getX();
			var y0 = figure.getY();
			var x1 = x0+figure.getWidth();
			var y1 = y0+figure.getHeight();
			if (rectangle.isOver(x0, y0) || rectangle.isOver(x1, y1)) {
				result.push(figure);
			}
		}
	}
	return result;
}

/**
 * The id of menu item "Snap to Objects".
 * 
 * @private
 * @type String
 */
uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS = "snapToObjects"
