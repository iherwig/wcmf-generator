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
 */
uwm.graphics.connection.UwmPort = function(){
    draw2d.Port.call(this, new uwm.graphics.connection.UwmPortGraphics());
    
    this.setDimension(10, 10);
}

Ext.extend(uwm.graphics.connection.UwmPort, draw2d.Port);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.UwmPort.prototype.type = "uwm.graphics.connection.UwmPort";


/**
 * Checks model constraints for allowing or disallowing connection attempts.
 *
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDragEnter = function(port){
    if (port.parentNode.getFigure().getModelObject().connectableWith(this.parentNode.getFigure().getModelObject())) {
        draw2d.Port.prototype.onDragEnter.call(this, port);
    }
}

/**
 * Establishes connection according to model constraints.
 *
 * @param {uwm.graphics.connection.UwmPort} port The other end port.
 */
uwm.graphics.connection.UwmPort.prototype.onDrop = function(port){
    if (this.parentNode.id == port.parentNode.id) {
        // same parentNode -> do nothing
    }
    else {
        var portModelObject = port.parentNode.getFigure().getModelObject();
        var thisModelObject = this.parentNode.getFigure().getModelObject();
        
        this.parentNode.getFigure().getDiagram().createConnection(thisModelObject, portModelObject, this, port, port.parentNode.x, port.parentNode.y);
    }
}
