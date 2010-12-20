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
 * @class A port for docking connections.
 *
 * @extends draw2d.Port
 * @constructor
 * @param {String} orientation IN or OUT depending in which direction the arrow should point (defaults to OUT).
 */
uwm.graphics.connection.UwmPort = function(orientation) {
    if (orientation != 'IN' && orientation != 'OUT') {
    	orientation = 'OUT';
    }
    draw2d.Port.call(this, new uwm.graphics.connection.UwmPortGraphics(orientation));

    this.orientation = orientation;
    this.setDimension(10, 10);
}

Ext.extend(uwm.graphics.connection.UwmPort, draw2d.Port);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.UwmPort.prototype.type = "uwm.graphics.connection.UwmPort";

/**
 * Checks model constraints for allowing or disallowing connection attempts.
 */
uwm.graphics.connection.UwmPort.prototype.onDrag = function() {
    var thisModelObject = this.getModelObject();
    if (!thisModelObject.isRemoteNode()) {
        draw2d.Port.prototype.onDrag.call(this);
    }
}

/**
 * Checks model constraints for allowing or disallowing connection attempts.
 *
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDragEnter = function(port) {
    var portModelObject = port.getModelObject();
    if (portModelObject.isRemoteNode()) {
        // coming from remote object -> do nothing
        return;
    }
    if (portModelObject.connectableWith(this.getModelObject())) {
        draw2d.Port.prototype.onDragEnter.call(this, port);
        if (this.parentNode) {
        	this.parentNode.showTools();
        }
    }
}

/**
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDragLeave = function(port) {
    draw2d.Port.prototype.onDragLeave.call(this, port);
    if (this.parentNode) {
    	this.parentNode.hideTools();
    }
}

/**
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDragend = function(port) {
    draw2d.Port.prototype.onDragend.call(this, port);
    if (this.parentNode) {
    	this.parentNode.hideTools();
    }
}

/**
 * Establishes connection according to model constraints.
 *
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDrop = function(port) {
    var thisModelObject = this.getModelObject();	
    if (thisModelObject.isRemoteNode()) {
        // remote object -> do nothing
        return;
    }

    var portModelObject = port.getModelObject();        
    if (portModelObject.connectableWith(thisModelObject)) {
    	this.getDiagram().createConnection(thisModelObject, portModelObject, this, port, port.parentNode.x, port.parentNode.y);
    }
}

/**
 * Get the ModelObject whose representation owns this port.
 *
 * @return The ModelObject associated with this port.
 * @type uwm.model.ModelObject
 */
uwm.graphics.connection.UwmPort.prototype.getModelObject = function() {
	return this.parentNode.getModelObject();
}


/**
 * Get the Diagram to which the port owner belongs.
 *
 * @return The Diagram associated with the owner.
 * @type uwm.diagram.Diagram
 */
uwm.graphics.connection.UwmPort.prototype.getDiagram = function() {
	return this.parentNode.getWorkflow().getDiagram();
}
