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
 * @class Changes the property view to the appropriate ModelObject when clicked on it in the diagram.
 * 
 * @constructor
 * @param {uwm.diagram.Diagram} diagram The diagram of this Selection Listener.
 * @see uwm.property.PropertyContainer
 */
uwm.diagram.SelectionListener = function(diagram) {
	/**
	 * The containing diagram.
	 * 
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = diagram;
}

/**
 * Handler for changed selection in diagram.
 * 
 * @param {uwm.graphics.figure.BaseFigure} figure The graphical figure the user clicked on.
 */
uwm.diagram.SelectionListener.prototype.onSelectionChanged = function(figure) {
	if (figure) {
		if (this.diagram.isPropertyDisplay()) {
			uwm.property.PropertyContainer.getInstance().showProperty(figure.getFigure().getModelObject());
		}
	}
}
