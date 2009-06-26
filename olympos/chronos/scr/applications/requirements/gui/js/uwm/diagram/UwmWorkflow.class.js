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
	
	this.buildContextMenu();
	
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
		    id : uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS,
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

uwm.diagram.UwmWorkflow.prototype.onMouseDown = function(x, y) {
	this.oldX = x;
	this.oldY = y;
	this.html.style.cursor = "pointer";
}

uwm.diagram.UwmWorkflow.prototype.onMouseUp = function(x, y) {
	if (this.oldX) {
		var deltaX = x - this.oldX;
		var deltaY = y - this.oldY;
		this.scrollTo(this.getScrollLeft() - deltaX, this.getScrollTop() - deltaY, true);
		this.oldX = null;
		this.oldY = null;
	}
	this.html.style.cursor = "default";
}

uwm.diagram.UwmWorkflow.prototype.onMouseMove = function(x, y) {
	if (this.oldX) {
		var deltaX = x - this.oldX;
		var deltaY = y - this.oldY;
		this.scrollTo(this.getScrollLeft() - deltaX, this.getScrollTop() - deltaY, true);
	}
}
/**
 * The id of menu item "Snap to Objects".
 * 
 * @private
 * @type String
 */
uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS = "snapToObjects"
