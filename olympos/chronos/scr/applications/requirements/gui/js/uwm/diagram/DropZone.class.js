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
Ext.namespace("uwm.diagram");

/**
 * @class Customized DropZone for diagram.
 *
 * <p>This DropZone receives new and existing ModelObjects.</p>
 *
 * @constructor
 * @param {Ext.Element} el The element this DropZone should act on.
 * @param {Object} config Configuration Object
 * @config diagram The diagram this DropZone should act on.
 */
uwm.diagram.DropZone = function(el, config) {
	uwm.diagram.DropZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: uwm.Constants.DD_GROUP
	}, config));
	
	/**
	 * The diagram this DropZone should act on.
	 *
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = config.diagram;
}

Ext.extend(uwm.diagram.DropZone, Ext.dd.DropZone);

/**
 * Returns the target of this drop action.
 *
 * @param {Ext.EventObject} e The Event object.
 * @return The target of this drop action.
 * @type Object
 */
uwm.diagram.DropZone.prototype.getTargetFromEvent = function(e) {
	return e.getTarget();
}

/**
 * Checks whether the current dragged object can be dropped here.
 *
 * @param {Object} nodeData
 * @param {Ext.dd.DragSource} source The source of this drag operation.
 * @param {Ext.EventObject} e The Event object.
 * @param {Object} data Data from the dragged object.
 * @return <code>Ext.dd.DropZone.prototype.dropAllowed</code> If the dragged object can be dropped here, <code>false</code> othewise.
 * @type boolean
 */
uwm.diagram.DropZone.prototype.onNodeOver = function(nodeData, source, e, data) {

	return this.checkDropable(data.data);
}

/**
 * Initiates creation of new and existing ModelObjects on a diagram.
 *
 * <ul>
 * 	<li>If <code>data.data</code> is an instance of {@link uwm.model.ModelObject}, an existing ModelObject is
 * 		added to the diagram.</li>
 * 	<li>If <code>data.data</code> is an instance of {@link uwm.model.ModelClass}, a new ModelObject is added to
 * 		the diagram.</li>
 * </ul>
 *
 * @param {Object} nodeData
 * @param {Object} source The source of this drag operation.
 * @param {Object} e The Event object.
 * @param {Object} data Data from the dragged object.
 * @return <code>Ext.dd.DropZone.prototype.dropAllowed</code> If the dragged object can be dropped here, <code>false</code> othewise.
 * @type boolean
 */
uwm.diagram.DropZone.prototype.onNodeDrop = function(nodeData, source, e, data) {
	oid = null;
	
	var modelData = data.data;
	
	var result = this.checkDropable(modelData);
	
	if (result) {
		var xOffset = this.diagram.getWorkflow().getAbsoluteX();
		var yOffset = this.diagram.getWorkflow().getAbsoluteY();
		var scrollLeft = this.diagram.getWorkflow().getScrollLeft();
		var scrollTop = this.diagram.getWorkflow().getScrollTop();
		
		var x = e.xy[0] - xOffset + scrollLeft;
		var y = e.xy[1] - yOffset + scrollTop;
		
		if (modelData instanceof uwm.model.ModelObject) {
			this.diagram.addExistingObject(modelData, x, y);
		}
		else {
			this.diagram.createNewObject(modelData, x, y);
		}
	}
	
	return result;
}

/**
 * Checks if a dragged object may be dropped here.
 *
 * <p><code>modelObject</code> may be dropped here if it is an instance of {@link uwm.model.ModelObject} or {@link uwm.model.ModelClass}.</p>
 *
 * @private
 * @param {Object} modelData Data of the dragged object.
 * @return <code>Ext.dd.DropZone.prototype.dropAllowed</code> If the dragged object can be dropped here, <code>false</code> othewise.
 * @type boolean
 */
uwm.diagram.DropZone.prototype.checkDropable = function(modelData) {
	var result = false;
	
	if (modelData instanceof uwm.model.ModelObject) {
		if (!this.diagram.containsObject(modelData)) {
			result = Ext.dd.DropZone.prototype.dropAllowed;
		}
	}
	else if (modelData instanceof uwm.model.ModelClass) {
		result = Ext.dd.DropZone.prototype.dropAllowed;
	}
	
	return result;
}
