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
Ext.namespace("cwl.newobjects");

/**
 * @class Enables dragging of new object from New Objects Grid.
 *
 * @extends Ext.grid.GridDragZone
 * @see cwl.newobjects.NewObjectsGrid
 * @constructor
 * @param {Ext.Element} el The Grid this Drag Zone applies to.
 * @param {Object} config The configuration object.
 */
cwl.newobjects.DragZone = function(el, config) {
	cwl.newobjects.DragZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: cwl.Constants.DD_GROUP
	}, config));
	
	this.el = el;
}

Ext.extend(cwl.newobjects.DragZone, Ext.grid.GridDragZone);

cwl.newobjects.DragZone.prototype.getDragData = function(e) {
	var result = cwl.newobjects.DragZone.superclass.getDragData.call(this, e);
	
	var sourceElement = e.getTarget();
	
	result.repairXY = Ext.fly(sourceElement).getXY();
	result.data = this.grid.getSelectionModel().getSelected().get("modelClass");
	
	this.el.dragData = result;
	
	return result;
}

cwl.newobjects.DragZone.prototype.getRepairXY = function() {
	return this.dragData.repairXY;
}
