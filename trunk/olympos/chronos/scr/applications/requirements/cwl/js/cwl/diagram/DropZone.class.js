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
Ext.namespace("cwl.diagram");

/**
 * @class Customized DropZone for diagram.
 *
 * <p>This DropZone receives new and existing ModelObjects.</p>
 *
 * @extends Ext.dd.DropZone
 * @constructor
 * @param {Ext.Element} el The element this DropZone should act on.
 * @param {Object} config Configuration Object
 * @config diagram The diagram this DropZone should act on.
 */
cwl.diagram.DropZone = function(el, config) {
	cwl.diagram.DropZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: cwl.Constants.DD_GROUP
	}, config));
	
	/**
	 * The diagram this DropZone should act on.
	 *
	 * @private
	 * @type cwl.diagram.Diagram
	 */
	this.diagram = config.diagram;
}

Ext.extend(cwl.diagram.DropZone, Ext.dd.DropZone);

/**
 * Returns the target of this drop action.
 *
 * @param {Ext.EventObject} e The Event object.
 * @return The target of this drop action.
 * @type Object
 */
cwl.diagram.DropZone.prototype.getTargetFromEvent = function(e) {
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
cwl.diagram.DropZone.prototype.onNodeOver = function(nodeData, source, e, data) {

  var modelElement = this.getModelDataFromDragSource(data);
  var position = this.getDiagramPositionFromEvent(e);
	return this.checkDropable(modelElement, position[0], position[1]);
}

/**
 * Initiates creation of new and existing ModelObjects on a diagram.
 *
 * <ul>
 * 	<li>If <code>data.data</code> is an instance of {@link cwl.model.ModelObject}, an existing ModelObject is
 * 		added to the diagram.</li>
 * 	<li>If <code>data.data</code> is an instance of {@link cwl.model.ModelClass}, a new ModelObject is added to
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
cwl.diagram.DropZone.prototype.onNodeDrop = function(nodeData, source, e, data) {
	var modelElement = this.getModelDataFromDragSource(data);
  var position = this.getDiagramPositionFromEvent(e);
	var result = this.checkDropable(modelElement, position[0], position[1]);
	
	if (result == this.dropAllowed) {
    console.info("dropped: "+modelElement.type+" ["+modelElement.name+"]");
/*
    Ext.Msg.show({
       title: modelData.name + ' instance name',
       msg: 'Please enter a name for the domain object',
       buttons: Ext.Msg.OK,
       prompt: true,
       fn: function(btn, text) {
        if (btn == 'ok'){
            // process text value and close...
        }
       },
    });
*/    
    this.diagram.addNewObject(modelElement, position[0], position[1]);
	}
	return result;
}

/**
 * Checks if a dragged object may be dropped here.
 *
 * @private
 * @param {Object} modelData Data of the dragged object.
 * @param {integer} x The x position in diagram space.
 * @param {integer} y The y position in diagram space.
 * @return <code>Ext.dd.DropZone.prototype.dropAllowed</code> If the dragged object can be dropped here, <code>false</code> othewise.
 * @type boolean
 */
cwl.diagram.DropZone.prototype.checkDropable = function(modelElement, x, y) {
	var result = this.dropNotAllowed;
  
  // check for allowed content
	if (modelElement != null && ((modelElement.getSemanticGroup() && modelElement.getSemanticGroup().indexOf("Rule") == 0) || 
    modelElement.getType() == "ChiValue" || modelElement.getType() == "Operation")) {
    
    // check diagram content
    if (this.diagram.checkDropable(modelElement, x, y))
      result = this.dropAllowed;
	}
	
	return result;
}

/**
 * Get the data from the DragSource
 *
 * @private
 * @param {Object} data Data of the dragged object.
 * @return The model element or null
 * @type cwl.model.ModelElement
 */
cwl.diagram.DropZone.prototype.getModelDataFromDragSource = function(data) {

  // dragged from Grid
  if (data.grid)
    return data.data;
  // dragged from Tree
  if (data.node)
    return data.node.modelElement;
	
	return null;
}

/**
 * Get the coordinates of a mouse event translated to diagram space
 *
 * @private
 * @param {Event} e The mouse event.
 * @return An array of coordinates (x, y)
 * @type Array
 */
cwl.diagram.DropZone.prototype.getDiagramPositionFromEvent = function(e) {
  var xOffset = this.diagram.getWorkflow().getAbsoluteX();
  var yOffset = this.diagram.getWorkflow().getAbsoluteY();
  var scrollLeft = this.diagram.getWorkflow().getScrollLeft();
  var scrollTop = this.diagram.getWorkflow().getScrollTop();
  
  var x = e.xy[0] - xOffset + scrollLeft;
  var y = e.xy[1] - yOffset + scrollTop;
  return [x, y];
}
