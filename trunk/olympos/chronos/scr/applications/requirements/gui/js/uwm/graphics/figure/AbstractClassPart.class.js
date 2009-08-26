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
 * @class Graphical representation of a UML class AbstractClassPart.
 * 
 * @extends draw2d.Node
 * @constructor
 * @param {String}
 *            label The label of the figure.
 */
uwm.graphics.figure.AbstractClassPart = function(label, modelObject) {
	this.modelObject = modelObject;

	draw2d.Node.call(this);

	this.setDimension(150, 16);

	if (label) {
		this.setLabel(label);
	}

	this.buildContextMenu();
	
	this.setCanDrag(false);
	this.setResizeable(false);
	
}

Ext.extend(uwm.graphics.figure.AbstractClassPart, draw2d.Node);

/**
 * Builds the context menu of this figure.
 * 
 * @private
 */
uwm.graphics.figure.AbstractClassPart.prototype.buildContextMenu = function() {
	var modelObject = this.getModelObject();
	var self = this;

	/**
	 * The context menu of this figure.
	 * 
	 * @private
	 * @type Ext.menu.Menu
	 */
	this.uwmContextMenu = new Ext.menu.Menu( {
		items : [ new Ext.menu.Item( {
			text :uwm.Dict.translate('Delete from model'),
			handler : function(item, e) {
				// add an delete event listener to delete the graphic,
				// when the object is deleted. we don't remove it afterwards,
				// but don't expect this to become a problem
				uwm.event.EventBroker.getInstance().addListener({
					"delete": function(modelObject) {
						if (self.getParent()) {
							self.getParent().removeChildElement(self, true);
						}
					}
				});
				uwm.model.ModelContainer.getInstance().deleteByModelNode(modelObject);
			}
		}) ]
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
uwm.graphics.figure.AbstractClassPart.prototype.onContextMenu = function(x, y) {
	this.uwmContextMenu.showAt(this.getParent().getFigure().getDiagram().getContextMenuPosition(x, y));
}

uwm.graphics.figure.AbstractClassPart.prototype.getModelObject = function() {
	return this.modelObject;
}

/**
 * Deactivates text selection on this figure.
 * 
 * @private
 */
uwm.graphics.figure.AbstractClassPart.prototype.createHTMLElement = function() {
	var item = draw2d.Node.prototype.createHTMLElement.call(this);

	item.style.border = "none";
	
	/**
	 * The label of this figure.
	 * 
	 * @private
	 * @type HTMLElement
	 */
	this.label = document.createElement("div");
	this.label.style.position = "absolute";
	this.label.style.left = "0px";
	this.label.style.top = "0px";
	this.label.style.overflow = "hidden";

	return item;
}

/**
 * Sets the label text.
 * 
 * @param {String}
 *            newText The new label text.
 */
uwm.graphics.figure.AbstractClassPart.prototype.setLabel = function(newText) {
	return uwm.graphics.figure.BaseFigure.prototype.setLabel.call(this, newText);
}

/**
 * Returns the label text.
 * 
 * @return The label text.
 * @type String
 */
uwm.graphics.figure.AbstractClassPart.prototype.getLabel = function() {
	return uwm.graphics.figure.BaseFigure.prototype.getLabel.call(this);
}

/**
 * Paints the custom elements.
 * 
 * @private
 */
uwm.graphics.figure.AbstractClassPart.prototype.paint = function() {
	uwm.graphics.figure.BaseFigure.prototype.paint.call(this);

	this.graphics.paint();

	this.html.appendChild(this.label);
}