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
	
	if (decorators.source) {
		this.setSourceDecorator(decorators.source);
	}
	if (decorators.target) {
		this.setTargetDecorator(decorators.target);
	}
	
	this.setSourceAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setTargetAnchor(new draw2d.ChopboxConnectionAnchor(this));
	this.setRouter(new draw2d.ManhattanConnectionRouter());
	
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
		
		this.createHTMLElement();
		this.html = this.getHTMLElement();
		
		this.addFigure(this.label, new uwm.graphics.connection.MidpointLocator(this));
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
	
	var htmlElement = this.getHTMLElement();
	if (htmlElement) {
	
		var contextMenu = this.uwmContextMenu;
		var self = this;
		
		this.tmpContextMenu = function(e) {
			//var position = workflow.getDiagram().getContextMenuPosition(e.xy[0], e.xy[1]);
			var position = e.getXY();
			
			contextMenu.showAt(position);
			
			e.preventDefault();
			
			return false;
		}
		
		var event = "mousedown";
		if (Ext.isWindows) {
			event = "mouseup";
		}
		Ext.fly(htmlElement).on(event, this.tmpContextMenu);
		
	}
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
