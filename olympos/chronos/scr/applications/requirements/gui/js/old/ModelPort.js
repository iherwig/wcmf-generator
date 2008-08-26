/* This notice must be untouched at all times.
 Open-jACOB Draw2D
 The latest version is available at
 http://www.openjacob.org
 Copyright (c) 2006 Andreas Herz. All rights reserved.
 Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )
 LICENSE: LGPL
 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License (LGPL) as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.
 You should have received a copy of the GNU Lesser General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
 or see http://www.gnu.org/copyleft/lesser.html
 */
/**
 *
 * @version 0.9.17
 * @author Andreas Herz
 * @constructor
 */
ModelPort = function(){
	draw2d.Port.call(this, new PortGraphics());
	
	this.setDimension(10, 10);
}

ModelPort.prototype = new draw2d.Port;
/** @private **/
ModelPort.prototype.type = "ModelPort";


ModelPort.prototype.onDragEnter = function(/*:draw2d.Port*/port){
	var connectionData = getConnectionData(port.parentNode.getClassName(), this.parentNode.getClassName());
	
	if (connectionData != null && this.checkConnection(port, this, connectionData)) {
		draw2d.Port.prototype.onDragEnter.call(this, port);
	}
}
/**
 * @private
 * @param {draw2d.Port} port The port on which this port has been droped
 **/
ModelPort.prototype.onDrop = function(/*:draw2d.Port*/port){
	if (this.parentNode.id == port.parentNode.id) {
		// same parentNode -> do nothing
	}
	else {
		var connectionData = getConnectionData(this.parentNode.getClassName(), port.parentNode.getClassName());
		
		if (connectionData != null && this.checkConnection(this, port, connectionData)) {
			if (connectionData.inverse) {
				var startPort = port;
				var endPort = this;
			}
			else {
				var startPort = this;
				var endPort = port;
			}
			
			var command = new draw2d.CommandConnect(this.parentNode.workflow, startPort, endPort);
			command.setConnection(new ModelConnection(connectionData.label));
			this.parentNode.workflow.getCommandStack().execute(command);
		}
		
	}
}

ModelPort.prototype.checkConnection = function(sourcePort, targetPort, connectionData){
	var result = true;
	
	var sourceConnections = 0;
	var targetConnections = 0;
	
	var sourceClass = targetPort.parentNode.getClassName();
	var targetClass = sourcePort.parentNode.getClassName();
	

	result = this.testConnections(sourcePort, targetPort, sourceClass, connectionData.sourceMaxConns);	
	
	if (result) {
		result = this.testConnections(targetPort, sourcePort, targetClass, connectionData.targetMaxConns);
	}
		
	return result;
}

ModelPort.prototype.testConnections = function(thisPort, otherPort, className, maxConns) {
	var result = true;

	var connections = thisPort.getConnections();

	for (var i = 0; i < connections.getSize(); i++) {
		var connection = connections.get(i);
		if ((connection.targetPort == otherPort || connection.sourcePort == otherPort)) {
			result = false;
			break;
		}
		
		var connCount = 0;
		
		if (maxConns != -1) {
			var foreignPort = connection.targetPort != thisPort ? connection.targetPort : connection.sourcePort;
			
			if (foreignPort.parentNode.getClassName() == className) {
				connCount++;
				if (connCount >= maxConns) {
					result = false;
					break;
				}
			}
		}
	}
	
	return result;
}
