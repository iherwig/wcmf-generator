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
 * @class Graphical representation of a UML class Operation.
 * 
 * @extends uwm.graphics.figure.AbstractClassPart
 * @constructor
 * @param {String}
 *            label The label of the figure.
 */
uwm.graphics.figure.Operation = function(label, modelObject) {
	uwm.graphics.figure.AbstractClassPart.call(this, label, modelObject);
}

Ext.extend(uwm.graphics.figure.Operation, uwm.graphics.figure.AbstractClassPart);

uwm.graphics.figure.Operation.prototype.createHTMLElement = function() {
	var item = uwm.graphics.figure.AbstractClassPart.prototype.createHTMLElement.call(this);

	this.label.className = "FigureOperation"

	return item;
}

/**
 * Overidden in order to add "()" to the displayed label
 */
uwm.graphics.figure.Operation.prototype.setLabel = function(newText) {
	var result = uwm.graphics.figure.AbstractClassPart.prototype.setLabel.call(this, newText);

	this.addBracketsToDisplay();
	return result;
}

/**
 * Overidden in order to add "()" to the displayed label
 */
uwm.graphics.figure.Operation.prototype.paint = function() {
	uwm.graphics.figure.AbstractClassPart.prototype.paint.call(this);

	this.addBracketsToDisplay();
}

/**
 * Add "()" to the displayed label
 */
uwm.graphics.figure.Operation.prototype.addBracketsToDisplay = function() {
	var ops = Ext.query('.FigureOperation', this.html);
	if (ops) {
		for (var i=0; i<ops.length; i++) {
			ops[i].innerHTML += "()";
		}
	}
}
