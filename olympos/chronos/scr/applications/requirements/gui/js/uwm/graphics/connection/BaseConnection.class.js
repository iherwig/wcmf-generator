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
Ext.namespace("uwm.graphics.connection");

/**
 * @class The default connection of UWM.
 * 
 * @extends draw2d.Connection
 * @constructor
 * @param {String} label Label of this connection.
 * @param {Array} decorators Array of 0..2 draw2d.ConnectionDecorator objects.
 */
uwm.graphics.connection.BaseConnection = function(label, decorators) {
	draw2d.Connection.call(this);
	
	this.relationObject = null;
	
	if (decorators.source) {
		this.setSourceDecorator(decorators.source);
	}
	if (decorators.target) {
		this.setTargetDecorator(decorators.target);
	}
	
	this.setSourceAnchor(new uwm.graphics.connection.ConnectionAnchor(this));
	this.setTargetAnchor(new uwm.graphics.connection.ConnectionAnchor(this));
	this.setRouter(new uwm.graphics.connection.ConnectionRouter());
	
	this.stroke = jsgStroke.DOTTED;
	
	if (label) {
		/**
		 * The label of this Connection.
		 * 
		 * @private
		 * @type draw2d.Label
		 */
		this.label = new draw2d.Label(label);
		this.label.setBackgroundColor(new draw2d.Color(255, 255, 255));
		this.label.setFontSize(8);
		
		this.addFigure(this.label, new uwm.graphics.connection.MidpointLocator(this));

		// define the label context menu
		var htmlElement = this.label.getHTMLElement();
		if (htmlElement) {
			var self = this;
			Ext.fly(htmlElement).on("contextmenu", function(e) {
				var position = e.getXY();				
				self.uwmContextMenu.showAt(position);
				e.preventDefault();
				e.stopPropagation();
				return false;
			});		
		}		
	}
	
	this.setDeleteable(true);
	
	this.buildContextMenu();
}

Ext.extend(uwm.graphics.connection.BaseConnection, draw2d.Connection);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.BaseConnection.prototype.type = "uwm.graphics.connection.BaseConnection";

/**
 * Initiates this connection.
 * 
 * @private
 * @param {uwm.diagram.UwmWorkflow} workflow The workflow containing this connection.
 */
uwm.graphics.connection.BaseConnection.prototype.setWorkflow = function(workflow) {
	draw2d.Connection.prototype.setWorkflow.call(this, workflow);
}

/**
 * Returns the label object of this connection.
 * 
 * @return The label object of this connection.
 * @type draw2d.Label
 */
uwm.graphics.connection.BaseConnection.prototype.getLabel = function() {
	return this.label;
}

/**
 * Set the label object of this connection.
 * 
 * @param The label object of this connection.
 * @type draw2d.Label
 */
uwm.graphics.connection.BaseConnection.prototype.setLabel = function(label) {
  this.label.setText(label);
}

/**
 * Builds the context menu for this connection.
 * 
 * @private
 */
uwm.graphics.connection.BaseConnection.prototype.buildContextMenu = function() {
	var self = this;
	
	/**
	 * The context menu for this connection.
	 * 
	 * @private
	 * @type Ext.menu.Menu
	 */
	this.uwmContextMenu = new Ext.menu.Menu({
		items: [/*new Ext.menu.Item({
			text: "Delete from diagram",
			handler: function(item, e) {
				self.deleteFromDiagram(item, e);
			}
		}),*/ new Ext.menu.Item({
			text: "Delete from model",
			handler: function(item, e) {
				self.deleteFromModel(item, e);
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
uwm.graphics.connection.BaseConnection.prototype.onContextMenu = function(x, y) {
	var workflow = this.getWorkflow();
	var scroll = {left:workflow.getScrollLeft(), top:workflow.getScrollTop()};
	var xy = [workflow.getAbsoluteX(), workflow.getAbsoluteY()];
	
	this.uwmContextMenu.showAt([ x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2 ]);
}

/**
 * Handler for "Delete from diagram" context menu entry.
 * 
 * @private
 * @param {Ext.menu.Item} item The selected menu item.
 * @param {Ext.EventObject} e The Ext Event.
 */
uwm.graphics.connection.BaseConnection.prototype.deleteFromDiagram = function(item, e) {
	alert("TODO: Delete connection from diagram");
	//uwm.data.currentDiagram.workflow.getCommandStack().execute(new draw2d.CommandDelete(connection));
}

/**
 * Handler for "Delete from model" context menu entry.
 * 
 * @private
 * @param {Ext.menu.Item} item The selected menu item.
 * @param {Ext.EventObject} e The Ext Event.
 */
uwm.graphics.connection.BaseConnection.prototype.deleteFromModel = function(item, e) {
	this.getWorkflow().getCommandStack().execute(new draw2d.CommandDelete(this));
}

uwm.graphics.connection.BaseConnection.prototype.setRelationObject = function(relationObject) {
	this.relationObject = relationObject;
}

uwm.graphics.connection.BaseConnection.prototype.getRelationObject = function() {
	return this.relationObject;
}
