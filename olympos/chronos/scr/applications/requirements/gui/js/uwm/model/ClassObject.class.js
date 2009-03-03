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
Ext.namespace("uwm.model");

/**
 * @class Parent class of all Model Objects representing UML Classes.
 * 
 * <p>
 * This class should not be instantiated, but extended.
 * </p>
 * 
 * @extends uwm.model.ModelObject
 * @constructor
 */
uwm.model.ClassObject = function(modelNodeClass) {
	uwm.model.ClassObject.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.ClassObject, uwm.model.ModelObject);

uwm.model.ClassObject.prototype.addAttribute = function() {
	throw new Error("uwm.model.ClassObject.addAttribute must be overwritten");
}

uwm.model.ClassObject.prototype.addOperation = function() {
	throw new Error("uwm.model.ClassObject.addOperation must be overwritten");
}

uwm.model.ClassObject.prototype.updateChildLabel = function(childModelNode,
		figure) {
	var graphics = figure.getGraphics();

	var childGraphics = this.getChildGraphicsByOid(graphics, childModelNode
			.getOid());
	if (childGraphics) {
		childGraphics.setLabel(childModelNode.getLabel());
	}
}

uwm.model.ClassObject.prototype.removeChild = function(childModelNode, figure) {
	var graphics = figure.getGraphics();

	var childGraphics = this.getChildGraphicsByOid(graphics, childModelNode
			.getOid());
	if (childGraphics) {
		graphics.removeChildElement(childGraphics, true);
	}
}

uwm.model.ClassObject.prototype.getChildGraphicsByOid = function(graphics, oid) {
	var result = null;

	var childGraphics = graphics.getChildElements();

	for ( var i = 0; i < childGraphics.length; i++) {
		var currChildGraphics = childGraphics[i];

		if (currChildGraphics.getModelObject().getOid() == oid) {
			result = currChildGraphics;

			break;
		}
	}

	return result;
}
