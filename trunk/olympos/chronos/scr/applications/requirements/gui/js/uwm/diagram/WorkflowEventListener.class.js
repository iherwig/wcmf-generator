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
}
