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
 * @class Graphical representation of an inherited UML class Attribute.
 * 
 * @extends uwm.graphics.figure.Attribute
 * @constructor
 * @param {String}
 *            label The label of the figure.
 */
uwm.graphics.figure.InheritedAttribute = function(label, modelObject) {
	uwm.graphics.figure.Attribute.call(this, label, modelObject);
}

Ext.extend(uwm.graphics.figure.InheritedAttribute, uwm.graphics.figure.Attribute);


uwm.graphics.figure.InheritedAttribute.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.Attribute.prototype.createHTMLElement.call(this);

	this.label.className = this.label.className + " InheritedFigureAttribute";

	return item;
}