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

/**
 * @class Provides a filled diamond as connection end.
 * 
 * @extends draw2d.ConnectionDecorator
 * @constructor
 */
uwm.graphics.connection.FilledDiamondDecorator = function() {
	draw2d.ConnectionDecorator.call(this);
	
	this.setBackgroundColor(new draw2d.Color(0, 0, 0));
}

Ext.extend(uwm.graphics.connection.FilledDiamondDecorator, draw2d.ConnectionDecorator);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.FilledDiamondDecorator.prototype.type = "uwm.graphics.connection.FilledDiamondDecorator";

/**
 * Draws a filled diamond.
 * 
 * @private
 * @param {draw2d.Graphics} g The graphic used for drawing.
 */
uwm.graphics.connection.FilledDiamondDecorator.prototype.paint = function(g) {
	g.setColor(this.backgroundColor);
	g.setStroke(1);
	g.fillPolygon([0, 12, 24, 12], [0, 8, 0, -8]);
}
