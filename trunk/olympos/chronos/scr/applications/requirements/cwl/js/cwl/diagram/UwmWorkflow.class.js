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
 * @param {cwl.diagram.Diagram}
 *            diagram The Diagram object containing this workflow.
 */
cwl.diagram.UwmWorkflow = function(id, diagram) {
	draw2d.Workflow.call(this, id);
	
	/**
	 * The diagram containing this workflow.
	 * 
	 * @private
	 * @type cwl.diagram.Diagram
	 */
	this.diagram = diagram;
  
  this.menuPos = [];
	
	this.buildContextMenu();
	
}

Ext.extend(cwl.diagram.UwmWorkflow, draw2d.Workflow);

/**
 * Type identifier of this class.
 */
cwl.diagram.UwmWorkflow.prototype.type = "cwl.diagram.UwmWorkflow";

/**
 * Builds the context menu of a diagram.
 * 
 * @private
 */
cwl.diagram.UwmWorkflow.prototype.buildContextMenu = function() {
	var self = this;
	
	/**
	 * The context menu of a diagram.
	 * 
	 * @private
	 * @type Ext.menu.Menu
	 */
	this.uwmContextMenu = new Ext.menu.Menu( {
		items : [ /*new Ext.menu.Item( {
		    text : chi.Dict.translate("Show in model tree"),
		    listeners : {
			    click : function() {
				    self.showInModelTree();
			    }
		    }
		}), new Ext.menu.CheckItem( {
		    id : cwl.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS,
		    text : chi.Dict.translate("Snap to objects"),
		    listeners : {
			    checkchange : function(item, checked) {
				    self.toggleSnapToObjects(item, checked);
			    }
		    }
		}), new Ext.menu.Item( {
		    text : chi.Dict.translate("Auto-layout"),
		    listeners : {
			    click : function() {
				    self.doLayout();
			    }
		    }
		}), new Ext.menu.Item( {
		    text : chi.Dict.translate("Reload"),
		    listeners : {
			    click : function() {
				    self.reloadDiagram();
			    }
		    }
		}), new Ext.menu.Item( {
		    text : chi.Dict.translate("Print"),
		    listeners : {
			    click : function() {
				    self.printDiagram();
			    }
		    }
		})*/
      new Ext.menu.Item({
        text : chi.Dict.translate("New Rule"),
        listeners : {
          click : function(item, e) {
            var element = new cwl.model.ModelElement();
            element.type = "Rule";
            self.diagram.addNewObject(element, self.menuPos[0], self.menuPos[1]);
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
cwl.diagram.UwmWorkflow.prototype.onContextMenu = function(x, y) {
  /*
	var snapToObjects = this.uwmContextMenu.items.get(cwl.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS);
	
	snapToObjects.checked = this.diagram.isSnapToObjects();
	*/
	this.uwmContextMenu.showAt(this.diagram.getContextMenuPosition(x, y));
	
	this.oldX = null;
	this.html.style.cursor = "default";
  this.menuPos = [x, y];
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
cwl.diagram.UwmWorkflow.prototype.toggleSnapToObjects = function(item, checked) {
	this.diagram.setSnapToObjects(checked);
}

/**
 * Calls this diagram's auto-layouter.
 * 
 * @private
 */
cwl.diagram.UwmWorkflow.prototype.doLayout = function() {
	this.diagram.doLayout();
}

/**
 * Shows the Diagram in Model Tree.
 * 
 * @see uwm.modeltree.ModelTree
 */
cwl.diagram.UwmWorkflow.prototype.showInModelTree = function() {
	this.diagram.showInModelTree();
}

/**
 * Reloads the diagram.
 * 
 * @see uwm.modeltree.ModelTree
 */
cwl.diagram.UwmWorkflow.prototype.reloadDiagram = function() {
	this.diagram.reloadDiagram();
}

/**
 * Prints the diagram.
 */
cwl.diagram.UwmWorkflow.prototype.printDiagram = function() {
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
cwl.diagram.UwmWorkflow.prototype.showMenu = function(menu, xPos, yPos) {
	
}

/**
 * Returns the assigned Diagram.
 * 
 * @return The assigned Diagram.
 * @type cwl.diagram.Diagram
 */
cwl.diagram.UwmWorkflow.prototype.getDiagram = function() {
	return this.diagram;
}

cwl.diagram.UwmWorkflow.prototype.onMouseDown = function(x, y) {
	this.oldX = x;
	this.oldY = y;
	this.html.style.cursor = "pointer";
}

cwl.diagram.UwmWorkflow.prototype.onMouseUp = function(x, y) {
	if (this.oldX) {
		var deltaX = x - this.oldX;
		var deltaY = y - this.oldY;
		this.scrollTo(this.getScrollLeft() - deltaX, this.getScrollTop() - deltaY, true);
		this.oldX = null;
		this.oldY = null;
	}
	this.html.style.cursor = "default";
}

cwl.diagram.UwmWorkflow.prototype.onMouseMove = function(x, y) {
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
cwl.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS = "snapToObjects"
