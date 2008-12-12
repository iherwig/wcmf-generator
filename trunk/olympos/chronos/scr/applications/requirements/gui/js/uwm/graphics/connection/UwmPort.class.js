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
        
        if (portModelObject.connectableWith(thisModelObject)) {
            var connectionInfo = portModelObject.getModelNodeClass().getConnectionInfo(thisModelObject.getModelNodeClass());
            
            var decorators = this.getConnectionTypeDecorators(connectionInfo.connectionType);
            
            var startPort = this;
            var endPort = port;
            
            if (connectionInfo.invert) {
                startPort = port;
                endPort = this;
            }
            
            var command = new draw2d.CommandConnect(this.parentNode.workflow, startPort, endPort);
            command.setConnection(new uwm.graphics.connection.BaseConnection(connectionInfo.label, decorators));
            this.parentNode.workflow.getCommandStack().execute(command);
        }
        
    }
}

/**
 * Assigns proper graphical representations according to connection type.
 *
 * @param {String} connectionType The type of connection. Currently supported are <code>aggregation</code> and <code>composition</code>.
 * @return Array of proper connection decorators.
 * @type Array
 */
uwm.graphics.connection.UwmPort.prototype.getConnectionTypeDecorators = function(connectionType){
    var result = new Array();
    
    switch (connectionType) {
        case "aggregation":
            result.source = new uwm.connection.OpenDiamondDecorator();
            result.target = new uwm.connection.ArrowDecorator();
            break;
            
        case "composition":
            result.source = new uwm.connection.FilledDiamondDecorator();
            result.target = new uwm.connection.ArrowDecorator();
            break;
            
        default:
            result.target = new uwm.connection.ArrowDecorator();
    }
    
    return result;
}
