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
 * @class Provides a simple arrow as connection end.
 * 
 * @extends draw2d.ConnectionDecorator
 * @constructor
 */
uwm.graphics.connection.ArrowDecorator = function() {
	draw2d.ConnectionDecorator.call(this);

	this.setBackgroundColor(new draw2d.Color(255, 255, 255));
}

Ext.extend(uwm.graphics.connection.ArrowDecorator, draw2d.ConnectionDecorator);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.ArrowDecorator.prototype.type = "uwm.graphics.connection.ArrowDecorator";

/**
 * Draws a simple arrow.
 * 
 * @param {draw2d.Graphics} g The graphics object to draw with.
 */
uwm.graphics.connection.ArrowDecorator.prototype.paint = function(g) {
	g.setColor(this.color);
	g.setStroke(1);
	g.drawLine(12, 8, 0, 0);
	g.drawLine(0, 0, 12, -8);
}
