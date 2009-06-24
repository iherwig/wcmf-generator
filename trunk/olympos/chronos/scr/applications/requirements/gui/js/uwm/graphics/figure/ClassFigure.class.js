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
Ext.namespace("uwm.graphics.figure");

/**
 * @class Graphical representation of a UML class.
 * 
 * @extends draw2d.CompartmentFigure
 * @constructor
 * @param {String}
 *            label The label of the figure.
 * @param {uwm.diagram.Figure}
 *            figure The associated figure object.
 */
uwm.graphics.figure.ClassFigure = function(label, figure) {
	/**
	 * Minimum width.
	 * 
	 * @private
	 * @type int
	 */
	this.minWidth = 150;
	
	/**
	 * Minimum height.
	 * 
	 * @private
	 * @type int
	 */
	this.minHeight = 65;
	
	/**
	 * The associated figure.
	 * 
	 * @private
	 * @type uwm.diagram.Figure
	 */
	this.figure = figure;
	
	this.childElements = [];
	
	draw2d.CompartmentFigure.call(this);
	
	this.setDimension(150, 65);
	
	if (label) {
		this.setLabel(label);
	}
	
	this.buildContextMenu();
}

Ext.extend(uwm.graphics.figure.ClassFigure, draw2d.CompartmentFigure);

/**
 * Initiates this figure.
 * 
 * @private
 * @param {uwm.diagram.UwmWorkflow}
 *            workflow The workflow containing this figure.
 */
uwm.graphics.figure.ClassFigure.prototype.setWorkflow = function(workflow) {
	return uwm.graphics.figure.BaseFigure.prototype.setWorkflow.call(this, workflow);
}

/**
 * Builds the context menu of this figure.
 * 
 * @private
 */
uwm.graphics.figure.ClassFigure.prototype.buildContextMenu = function() {
	var figure = this.getFigure();
	
	var items = [];
	
	if (figure.getModelObject().getModelNodeClass().isAttributeEnabled()) {
		items.push(new Ext.menu.Item( {
		    text : uwm.Dict.translate("Add Attribute"),
		    handler : function(item, e) {
			    figure.getModelObject().addAttribute();
		    }
		}));
	}
	
	if (figure.getModelObject().getModelNodeClass().isOperationEnabled()) {
		items.push(new Ext.menu.Item( {
		    text : uwm.Dict.translate("Add Operation"),
		    handler : function(item, e) {
			    figure.getModelObject().addOperation();
		    }
		}));
	}
	
	items.push(new Ext.menu.Item( {
	    text : uwm.Dict.translate('Show in tree'),
	    handler : function(item, e) {
		    figure.showInModelTree();
	    }
	}));
	items.push(new Ext.menu.Item( {
	    id : uwm.graphics.figure.BaseFigure.CONTEXTMENU_SHOW_IN_GRID_ID,
	    text : uwm.Dict.translate('Show in grid'),
	    handler : function(item, e) {
		    figure.showInGrid();
	    }
	}));
	items.push(new Ext.menu.Item( {
	    text : uwm.Dict.translate('Show in hierarchy'),
	    handler : function(item, e) {
		    figure.showInHierarchy();
	    }
	}));
	items.push("-");
	items.push(new Ext.menu.Item( {
	    text : uwm.Dict.translate('Delete from diagram'),
	    handler : function(item, e) {
		    figure.deleteFromDiagram();
	    }
	}));
	items.push(new Ext.menu.Item( {
	    text : uwm.Dict.translate('Delete from model'),
	    handler : function(tiem, e) {
		    figure.deleteFromModel();
	    }
	}));
	items.push(new Ext.menu.Item( {
	    text : uwm.Dict.translate('Show object history'),
	    handler : function(item, e) {
		    figure.showObjectHistory(item, e);
	    }
	}));
	items.push(new Ext.menu.Item( {
	    text : "Help",
	    // iconCls: "uwm-help-icon",
	    handler : function(item, e) {
		    figure.showHelp(item, e);
	    }
	}));
	
	/**
	 * The context menu of this figure.
	 * 
	 * @private
	 * @type Ext.menu.Menu
	 */
	this.uwmContextMenu = new Ext.menu.Menu( {
		items : items
	});
}

/**
 * The draw2d context menu handler.
 * 
 * @private
 * @param {int}
 *            x X position where to show the context menu.
 * @param {int}
 *            y Y position where to show the context menu.
 */
uwm.graphics.figure.ClassFigure.prototype.onContextMenu = function(x, y) {
	return uwm.graphics.figure.BaseFigure.prototype.onContextMenu.call(this, x, y);
}

/**
 * Returns the associated figure.
 * 
 * @return The associated figure.
 * @type uwm.diagram.Figure
 */
uwm.graphics.figure.ClassFigure.prototype.getFigure = function() {
	return uwm.graphics.figure.BaseFigure.prototype.getFigure.call(this);
}

/**
 * Returns the minimum width of this figure.
 * 
 * @return The minimum width of this figure.
 * @type int
 */
uwm.graphics.figure.ClassFigure.prototype.getMinWidth = function() {
	return uwm.graphics.figure.BaseFigure.prototype.getMinWidth.call(this);
}

/**
 * Returns the minimum height of this figure.
 * 
 * @return The minimum height of this figure.
 * @type int
 */
uwm.graphics.figure.ClassFigure.prototype.getMinHeight = function() {
	var result = this.minHeight;
	
	return result;
}

/**
 * Repositions the label.
 * 
 * @private
 * @param {int}
 *            width New width of the figure.
 * @param {int}
 *            height New height of the figure.
 */
uwm.graphics.figure.ClassFigure.prototype.setDimension = function(width, height) {
	uwm.graphics.figure.BaseFigure.prototype.setDimension.call(this, width, height);
	
	var children = this.getChildren();
	if (children) {
		var childWidth = this.getWidth() - 4;
		
		for ( var i = 0; i < children.getSize(); i++) {
			var currChild = children.get(i);
			
			currChild.setDimension(childWidth, currChild.getHeight());
		}
	}
}

/**
 * Deactivates text selection on this figure.
 * 
 * @private
 */
uwm.graphics.figure.ClassFigure.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.BaseFigure.prototype.createHTMLElement.call(this);
	
	/**
	 * The label of this figure.
	 * 
	 * @private
	 * @type HTMLElement
	 */
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "5px";
	this.label.style.top = "5px";
	this.label.style.overflow = "hidden";
	this.label.style.height = (uwm.graphics.figure.ClassFigure.LABEL_HEIGHT - 10) + "px";
	
	/**
	 * The image of this figure.
	 * 
	 * @private
	 * @type HTMLElement
	 */
	this.image = document.createElement("div");
	this.image.className = this.getFigure().getModelObject().getModelNodeClass().getFigureIcon();
	this.image.style.position = "absolute";
	this.image.style.top = "2px";
	this.image.style.right = "2px";
	this.image.style.width = "24px";
	this.image.style.height = "24px";
	this.image.style.backgroundRepeat = "no-repeat";
	
	return item;
}

/**
 * Sets the label text.
 * 
 * @param {String}
 *            newText The new label text.
 */
uwm.graphics.figure.ClassFigure.prototype.setLabel = function(newText) {
	return uwm.graphics.figure.BaseFigure.prototype.setLabel.call(this, newText);
}

/**
 * Returns the label text.
 * 
 * @return The label text.
 * @type String
 */
uwm.graphics.figure.ClassFigure.prototype.getLabel = function() {
	return uwm.graphics.figure.BaseFigure.prototype.getLabel.call(this);
}

uwm.graphics.figure.ClassFigure.prototype.addChildElement = function(newChild, expandFigure) {
	var newPropertyPosition = uwm.graphics.figure.ClassFigure.LABEL_HEIGHT + uwm.graphics.figure.ClassFigure.SECTIONS_SPACING;
	var newOperationPosition = newPropertyPosition + uwm.graphics.figure.ClassFigure.SECTIONS_SPACING * 3;
	
	var children = this.getChildren();
	
	for ( var i = 0; i < children.getSize(); i++) {
		var currChild = children.get(i);
		var height = currChild.getHeight();
		
		if (currChild instanceof uwm.graphics.figure.Attribute) {
			newPropertyPosition += height;
			newOperationPosition += height;
		} else if (currChild instanceof uwm.graphics.figure.Operation) {
			if (newChild instanceof uwm.graphics.figure.Attribute) {
				var position = currChild.getPosition();
				currChild.setPosition(position.x, position.y + newChild.getHeight());
			}
			
			newOperationPosition += height;
		}
	}
	
	this.childElements.push(newChild);
	
	var myPosition = this.getPosition();
	
	if (newChild instanceof uwm.graphics.figure.Attribute) {
		this.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.workflow, newChild, myPosition.x + 2, myPosition.y + newPropertyPosition, this));
	} else if (newChild instanceof uwm.graphics.figure.Operation) {
		this.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.workflow, newChild, myPosition.x + 2, myPosition.y + newOperationPosition, this));
	}
	
	this.minHeight += newChild.getHeight();
	
	if (expandFigure) {
		var command = new draw2d.CommandResize(this);
		command.setDimension(this.getWidth(), this.getHeight() + newChild.getHeight());
		this.workflow.getCommandStack().execute(command);
	} else {
		this.paint();
	}
}

uwm.graphics.figure.ClassFigure.prototype.removeChildElement = function(childToRemove, shrinkFigure) {
	var childHeight = childToRemove.getHeight();
	
	try {
		this.removeChild(childToRemove);
	} catch (e) {
	}
	
	var existingFigure = this.workflow.getFigure(childToRemove.getId());
	if (existingFigure) {
		this.workflow.removeFigure(childToRemove);
	}
	
	var newPropertyPosition = uwm.graphics.figure.ClassFigure.LABEL_HEIGHT + uwm.graphics.figure.ClassFigure.SECTIONS_SPACING;
	var newOperationPosition = newPropertyPosition + uwm.graphics.figure.ClassFigure.SECTIONS_SPACING * 3;
	
	var children = this.getChildren();
	var parentPosition = this.getPosition();
	
	for ( var i = 0; i < children.getSize(); i++) {
		var currChild = children.get(i);
		var height = currChild.getHeight();
		var childPosition = currChild.getPosition();
		
		if (currChild instanceof uwm.graphics.figure.Attribute) {
			currChild.setPosition(childPosition.x, parentPosition.y + newPropertyPosition);
			
			newPropertyPosition += height;
			newOperationPosition += height;
		}
	}
	
	for ( var i = 0; i < children.getSize(); i++) {
		var currChild = children.get(i);
		var height = currChild.getHeight();
		var childPosition = currChild.getPosition();
		
		if (currChild instanceof uwm.graphics.figure.Operation) {
			currChild.setPosition(childPosition.x, parentPosition.y + newOperationPosition);
			
			newOperationPosition += height;
		}
	}
	
	this.minHeight -= childHeight;
	
	var index = this.childElements.indexOf(childToRemove);
	if (index != -1) {
		this.childElements.splice(index, 1);
	}
	
	if (shrinkFigure) {
		var command = new draw2d.CommandResize(this);
		command.setDimension(this.getWidth(), this.getHeight() - childToRemove.getHeight());
		this.workflow.getCommandStack().execute(command);
	} else {
		this.paint();
	}
}

uwm.graphics.figure.ClassFigure.prototype.getChildElements = function() {
	return this.childElements;
}

/**
 * Paints the custom elements.
 * 
 * @private
 */
uwm.graphics.figure.ClassFigure.prototype.paint = function() {
	uwm.graphics.figure.BaseFigure.prototype.paint.call(this);
	
	var width = this.getWidth() - 1;
	var height = this.getHeight() - 1;
	
	this.graphics.drawRect(0, 0, width, height);
	this.graphics.drawLine(0, uwm.graphics.figure.ClassFigure.LABEL_HEIGHT, width, uwm.graphics.figure.ClassFigure.LABEL_HEIGHT);
	
	var children = this.getChildren();
	
	var propertySize = 0;
	for ( var i = 0; i < children.getSize(); i++) {
		if (children.get(i) instanceof uwm.graphics.figure.Attribute) {
			propertySize += children.get(i).getHeight();
		}
	}
	
	var linePos = uwm.graphics.figure.ClassFigure.LABEL_HEIGHT + propertySize + uwm.graphics.figure.ClassFigure.SECTIONS_SPACING * 2;
	
	if (linePos < height) {
		this.graphics.drawLine(0, linePos, width, linePos);
	}
	
	this.graphics.paint();
	
	this.html.appendChild(this.label);
    this.html.appendChild(this.image);
}

uwm.graphics.figure.ClassFigure.LABEL_HEIGHT = 45;

uwm.graphics.figure.ClassFigure.SECTIONS_SPACING = 5;

uwm.graphics.figure.ClassFigure.CONTEXTMENU_SHOW_IN_GRID_ID = "showInGrid";
