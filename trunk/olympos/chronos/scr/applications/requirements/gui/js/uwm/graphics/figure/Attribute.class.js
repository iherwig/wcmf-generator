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
Ext.namespace("uwm.graphics.figure");

/**
 * @class Graphical representation of a UML class Attribute.
 * 
 * @extends uwm.graphics.figure.AbstractClassPart
 * @constructor
 * @param {String}
 *            label The label of the figure.
 */
uwm.graphics.figure.Attribute = function(label, modelObject) {
	uwm.graphics.figure.AbstractClassPart.call(this, label, modelObject);
}

Ext.extend(uwm.graphics.figure.Attribute, uwm.graphics.figure.AbstractClassPart);

/**
 * Initiates this figure.
 *
 * @private
 * @param {uwm.diagram.UwmWorkflow} workflow The workflow containing this figure.
 */
uwm.graphics.figure.Attribute.prototype.setWorkflow = function(workflow) {
	uwm.graphics.figure.AbstractClassPart.prototype.setWorkflow.call(this, workflow);
	
	if (workflow != null && this.outPort == null) {
		/**
		 * The output port of this figure.
		 *
		 * @private
		 * @type uwm.graphics.connection.UwmPort
		 */
		this.outPort = new uwm.graphics.connection.UwmPort('OUT');
		this.outPort.setWorkflow(workflow);
		this.addPort(this.outPort, this.width + 11, 0);
		this.outPort.setAlpha(0);
	}
}

/**
 * Set the dimension.
 *
 * @private
 * @param {int} width New width of the figure.
 * @param {int} height New height of the figure.
 */
uwm.graphics.figure.Attribute.prototype.setDimension = function(width, height) {
	uwm.graphics.figure.AbstractClassPart.prototype.setDimension.call(this, width, height);
	
	if (this.outPort != null) {
		this.outPort.setPosition(this.getWidth() + 11, 0);
	}
}

uwm.graphics.figure.Attribute.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.AbstractClassPart.prototype.createHTMLElement.call(this);

	this.label.className = "FigureAttribute"

	return item;
}

/**
 * Show the figure tools (ports etc).
 **/
uwm.graphics.figure.Attribute.prototype.showTools=function() {
	var ports = this.getPorts();
	for(var j=0;j<ports.getSize();j++) {
		var port = ports.get(j);
		port.setAlpha(1);
	}
};

/**
 * Hide the figure tools (ports etc).
 **/
uwm.graphics.figure.Attribute.prototype.hideTools=function() {
	var ports = this.getPorts();
	for(var j=0;j<ports.getSize();j++) {
		var port = ports.get(j);
		port.setAlpha(0);
	}
};

/**
 * Callback method for the mouse enter event. Usefull for mouse hover-effects.
 * Sub classes can override this method to implement their own behaviour.
 **/
uwm.graphics.figure.Attribute.prototype.onMouseEnter=function() {
	uwm.graphics.figure.AbstractClassPart.prototype.onMouseEnter();
	this.showTools();
};

/**
 * Callback method for the mouse leave event. Usefull for mouse hover-effects.
 * 
 **/
uwm.graphics.figure.Attribute.prototype.onMouseLeave=function() {
	uwm.graphics.figure.AbstractClassPart.prototype.onMouseLeave();
	this.hideTools();
};
