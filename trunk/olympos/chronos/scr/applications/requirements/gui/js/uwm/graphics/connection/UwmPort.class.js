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

uwm.graphics.connection.UwmPort = function() {
	draw2d.Port.call(this, new uwm.graphics.connection.UwmPortGraphics());
	
	this.setDimension(10, 10);
}

uwm.graphics.connection.UwmPort.prototype = new draw2d.Port;
/**
 * Type identifier of this class.
 */
uwm.graphics.connection.UwmPort.prototype.type = "uwm.graphics.connection.UwmPort";


uwm.graphics.connection.UwmPort.prototype.onDragEnter = function(port) {
	if (port.parentNode.getFigure().getModelObject().connectableWith(this.parentNode.getFigure().getModelObject())) {
		draw2d.Port.prototype.onDragEnter.call(this, port);
	}
}

uwm.graphics.connection.UwmPort.prototype.onDrop = function(port) {
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

uwm.graphics.connection.UwmPort.prototype.getConnectionTypeDecorators = function(connectionType) {
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
