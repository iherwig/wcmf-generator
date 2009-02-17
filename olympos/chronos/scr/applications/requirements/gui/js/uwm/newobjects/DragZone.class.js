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
Ext.namespace("uwm.newobjects");

/**
 * @class Enables dragging of new object from New Objects Grid.
 *
 * @extends Ext.grid.GridDragZone
 * @see uwm.newobjects.NewObjectsGrid
 * @constructor
 * @param {Ext.Element} el The Grid this Drag Zone applies to.
 * @param {Object} config The configuration object.
 */
uwm.newobjects.DragZone = function(el, config) {
	uwm.newobjects.DragZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: uwm.Constants.DD_GROUP
	}, config));
	
	this.el = el;
}

Ext.extend(uwm.newobjects.DragZone, Ext.grid.GridDragZone, {
	getDragData: function(e) {
		var result = uwm.newobjects.DragZone.superclass.getDragData.call(this, e);
		
		var sourceElement = e.getTarget();
		
		result.repairXY = Ext.fly(sourceElement).getXY();
		result.data = this.grid.getSelectionModel().getSelected().get("modelClass");
		
		this.el.dragData = result;
		
		return result;
	},
	
	getRepairXY: function() {
		return this.dragData.repairXY;
	}
})
