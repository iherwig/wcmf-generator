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
 * @class Graphical representation of a UML class property.
 * 
 * @extends uwm.graphics.figure.AbstractClassPart
 * @constructor
 * @param {String}
 *            label The label of the figure.
 */
uwm.graphics.figure.Property = function(label, modelObject) {
	uwm.graphics.figure.AbstractClassPart.call(this, label, modelObject);
}

Ext.extend(uwm.graphics.figure.Property, uwm.graphics.figure.AbstractClassPart);

uwm.graphics.figure.Property.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.AbstractClassPart.prototype.createHTMLElement.call(this);

	this.label.className = "FigureProperty"

	return item;
}