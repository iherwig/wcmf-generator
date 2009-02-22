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
Ext.namespace("uwm.objecttree");

/**
 * @class Enables dragging elements from the Model Tree or the Hierarchy Tree to a Diagram.
 *
 * @extends Ext.tree.TreeDragZone
 * @see uwm.objecttree.ObjectTree
 * @constructor
 * @param {Ext.Element} el The Tree to apply this Drag Zone to.
 * @param {Object} config The configuration object.
 */
uwm.objecttree.DragZone = function(el, config) {
	uwm.objecttree.DragZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: uwm.Constants.DD_GROUP
	}, config));
	
	this.el = el;
}

Ext.extend(uwm.objecttree.DragZone, Ext.tree.TreeDragZone);

uwm.objecttree.DragZone.prototype.getDragData = function(e) {
	var result = uwm.objecttree.DragZone.superclass.getDragData.call(this, e);
	
	if (result) {
		var node = result.node;
		
		if (node instanceof uwm.objecttree.Node) {
			var sourceElement = e.getTarget();
			
			result.repairXY = Ext.fly(sourceElement).getXY();
			result.data = result.node.getModelNode();
			
			this.el.dragData = result;
		}
	}
	
	return result;
}

uwm.objecttree.DragZone.prototype.getRepairXY = function() {
	return this.dragData.repairXY;
}
