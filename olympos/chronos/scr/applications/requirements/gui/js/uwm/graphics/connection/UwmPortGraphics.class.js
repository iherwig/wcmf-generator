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

uwm.graphics.connection.UwmPortGraphics = function() {
	draw2d.VectorFigure.call(this);
	this.setDimension(10, 10);
}

uwm.graphics.connection.UwmPortGraphics.prototype = new draw2d.VectorFigure;

uwm.graphics.connection.UwmPortGraphics.prototype.type = "uwm.graphics.connection.UwmPortGraphics";

uwm.graphics.connection.UwmPortGraphics.prototype.paint = function() {
	draw2d.VectorFigure.prototype.paint.call(this);
	
	var width = this.getWidth();
	var height = this.getHeight();
	
	
	this.graphics.drawLine(0, height / 2, width, height / 2);
	this.graphics.drawLine(width / 2, 0, width, height / 2);
	this.graphics.drawLine(width / 2, height, width, height / 2);
	
	this.graphics.paint();
	
}
