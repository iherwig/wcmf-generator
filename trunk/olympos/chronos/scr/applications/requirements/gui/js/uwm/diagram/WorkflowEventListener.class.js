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
 * @class Initiates all changes coming from the draw2d event system.
 * 
 * @extends draw2d.CommandStackEventListener
 * @constructor
 * @param {uwm.diagram.Diagram} diagram The Diagram containing this listener.
 */
uwm.diagram.WorkflowEventListener = function(diagram) {
	/**
	 * The containing Diagram.
	 *
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = diagram;
	
	draw2d.CommandStackEventListener.call(this);
}

Ext.extend(uwm.diagram.WorkflowEventListener, draw2d.CommandStackEventListener);

/**
 * Handler for all events of the draw2d event system.
 *
 * @private
 * @param {draw2d.Event} stackEvent The draw2d Event.
 */
uwm.diagram.WorkflowEventListener.prototype.stackChanged = function(stackEvent) {
	if (this.diagram.isEventHandler()) {
		if (stackEvent.isPostChangeEvent()) {
			var command = stackEvent.getCommand();
			
			if (command instanceof draw2d.CommandConnect) {
				var source = command.source.getParent().getFigure().getModelObject();
				var target = command.target.getParent().getFigure().getModelObject();
				
				var connectionInfo = command.connectionInfo;
				var nmUwmClassName = command.nmUwmClassName;
				
				var newSource = source;
				var newTarget = target;
				
				if (connectionInfo.invertBackendRelation) {
					newSource = target;
					newTarget = source;
				}
				
				newTarget.associate(newSource, connectionInfo, nmUwmClassName, command.connection);
					
			} else if (command instanceof draw2d.CommandMove) {
				var figure = command.figure;
				
				if (figure instanceof uwm.graphics.figure.BaseFigure || figure instanceof uwm.graphics.figure.ClassFigure) {
					var modelObject = command.figure.getFigure();
					
					modelObject.changeProperties({
						PositionX: command.newX,
						PositionY: command.newY
					});
				}
			} else if (command instanceof draw2d.CommandResize) {
				var modelObject = command.figure.getFigure();
				
				modelObject.changeProperties({
					Width: command.newWidth,
					Height: command.newHeight
				});
			} else if (command instanceof draw2d.CommandDelete) {
				var figure = command.figure;
				
				if (figure instanceof uwm.graphics.figure.BaseFigure || figure instanceof uwm.graphics.figure.ClassFigure) {
					var persistencyFigure = figure.getFigure();
					
					if (!persistencyFigure.getModelObject().isDeleted()) {
						uwm.model.ModelContainer.getInstance().deleteByModelNode(persistencyFigure);
					}

					var oid = persistencyFigure.getModelObject().getOid();
					this.diagram.figures.removeKey(oid);
					this.diagram.objects.removeKey(oid);
				} else if (figure instanceof uwm.graphics.connection.BaseConnection){
					var source = figure.getSource().getParent().getFigure().getModelObject();
					var target = figure.getTarget().getParent().getFigure().getModelObject();
					
					var connectionInfo = source.getModelNodeClass().getConnectionInfo(target.getModelNodeClass());
					var relationObject = null;
					
					if (connectionInfo.nmUwmClassName) {
						relationObject = figure.getRelationObject();
						
						if (relationObject) {
							var connectionType = relationObject.getProperty("relationType");
							
							for (var i in connectionInfo.connections) {
								var currConnection = connectionInfo.connections[i];
								
								if (!(currConnection instanceof Function)) {
									if (currConnection.connectionType == connectionType) {
										connectionInfo = currConnection;
										break;
									}
								}
							}
						}
					}
					
					var newSource = source;
					var newTarget = target;
				
					if (connectionInfo.invertBackendRelation) {
						newSource = target;
						newTarget = source;
					}
					
					newSource.disassociate(newTarget, connectionInfo, relationObject);
				} else if (figure instanceof uwm.graphics.figure.AbstractClassPart) {
					var modelObject = figure.getModelObject();
					
					uwm.model.ModelContainer.getInstance().deleteByModelNode(modelObject);
				}
			}
		}
	}
}