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

uwm.graphics.figure.BaseFigure = function(label, figure, minWidth, minHeight, startWidth, startHeight) {
	this.minWidth = minWidth;
	this.minHeight = minHeight;
	
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

uwm.graphics.figure.BaseFigure.prototype = new draw2d.VectorFigure;

uwm.graphics.figure.BaseFigure.prototype.setWorkflow = function(workflow) {
	draw2d.VectorFigure.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.port == null) {
		this.port = new uwm.graphics.connection.UwmPort();
		this.port.setWorkflow(workflow);
		this.addPort(this.port, this.width + 8, 0);
	}
}

uwm.graphics.figure.BaseFigure.prototype.buildContextMenu = function() {
	figure = this.getFigure();
	
	this.uwmContextMenu = new Ext.menu.Menu({
		items: [new Ext.menu.Item({
			text: "Show in tree",
			handler: function(item, e) {
				figure.showInModelTree();
			}
		}), new Ext.menu.Item({
			text: "Show in grid",
			handler: function(item, e) {
				figure.showInGrid();
			}
		}), new Ext.menu.Item({
			text: "Show in Hierarchy",
			handler: function(item, e) {
				figure.showInHierarchy();
			}
		}), "-", new Ext.menu.Item({
			text: "Delete from diagram",
			handler: function(item, e) {
				figure.deleteFromDiagram();
			}
		}), new Ext.menu.Item({
			text: "Delete from model",
			handler: function(tiem, e) {
				figure.deleteFromModel();
			}
		})]
	});
}

uwm.graphics.figure.BaseFigure.prototype.onContextMenu = function(x, y) {
	this.uwmContextMenu.showAt(this.figure.getDiagram().getContextMenuPosition(x, y));
}

uwm.graphics.figure.BaseFigure.prototype.getFigure = function() {
	return this.figure;
}

uwm.graphics.figure.BaseFigure.prototype.getMinWidth = function() {
	var result = draw2d.VectorFigure.prototype.getMinWidth.call(this);
	
	if (this.minWidth) {
		result = this.minWidth;
	}
	return result;
}

uwm.graphics.figure.BaseFigure.prototype.getMinHeight = function() {
	var result = draw2d.VectorFigure.prototype.getMinHeight.call(this);
	
	if (this.minHeight) {
		result = this.minHeight;
	}
	
	return result;
}

uwm.graphics.figure.BaseFigure.prototype.setDimension = function(width, height) {
	draw2d.VectorFigure.prototype.setDimension.call(this, width, height);
	
	if (this.port != null) {
		this.port.setPosition(this.getWidth() + 8, 0);
	}
}

uwm.graphics.figure.BaseFigure.prototype.createHTMLElement = function() {
	var item = draw2d.Figure.prototype.createHTMLElement.call(this);
	item.className = "uwmFigure";
	
	uwm.setUnselectable(item);
	
	return item;
}

uwm.graphics.figure.BaseFigure.prototype.setLabel = function(newText) {
	if (this.label) {
		this.label.innerHTML = newText;
	}
}

uwm.graphics.figure.BaseFigure.prototype.getLabel = function() {
	if (this.label) {
		return this.label.innerHTML;
	}
}
