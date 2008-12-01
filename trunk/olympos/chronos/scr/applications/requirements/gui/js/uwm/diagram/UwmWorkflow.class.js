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
uwm.diagram.UwmWorkflow = function(id, diagram) {
	draw2d.Workflow.call(this, id);
	
	this.diagram = diagram;
	
	this.buildContextMenu();
}

uwm.diagram.UwmWorkflow.prototype = new draw2d.Workflow;

uwm.diagram.UwmWorkflow.prototype.type = "uwm.diagram.UwmWorkflow";

uwm.diagram.UwmWorkflow.prototype.buildContextMenu = function() {
	var self = this;
	
	this.uwmContextMenu = new Ext.menu.Menu({
		items: [new Ext.menu.CheckItem({
			id: uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS,
			text: "Snap to objects",
			listeners: {
				checkchange: function(item, checked) {
					self.toggleSnapToObjects(item, checked);
				}
			}
		}), new Ext.menu.Item({
			text: "Auto-layout",
			listeners: {
				click: function() {
					self.doLayout();
				}
			}
		})]
	});
}

uwm.diagram.UwmWorkflow.prototype.onContextMenu = function(x, y) {
	var snapToObjects = this.uwmContextMenu.items.get(uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS);
	
	snapToObjects.checked = this.diagram.isSnapToObjects();
	
	this.uwmContextMenu.showAt(this.diagram.getContextMenuPosition(x, y));
}

uwm.diagram.UwmWorkflow.prototype.toggleSnapToObjects = function(item, checked) {
	this.diagram.setSnapToObjects(checked);
}

uwm.diagram.UwmWorkflow.prototype.doLayout = function() {
	this.diagram.doLayout();
}

uwm.diagram.UwmWorkflow.prototype.showMenu = function(/*:draw2d.Menu*/menu,/*:int*/ xPos,/*:int*/ yPos) {

}

uwm.diagram.UwmWorkflow.prototype.getDiagram = function() {
	return this.diagram;
}

uwm.diagram.UwmWorkflow.CONTEXT_MENU_SNAP_TO_OBJECTS = "snapToObjects"
