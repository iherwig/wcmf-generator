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

uwm.graphics.connection.FilledDiamondDecorator = function() {
	this.setBackgroundColor(new draw2d.Color(0, 0, 0));
}

uwm.graphics.connection.FilledDiamondDecorator.prototype = new draw2d.ConnectionDecorator;

uwm.graphics.connection.FilledDiamondDecorator.prototype.type = "uwm.graphics.connection.FilledDiamondDecorator";

uwm.graphics.connection.FilledDiamondDecorator.prototype.paint = function(g) {
	g.setColor(this.backgroundColor);
	g.setStroke(1);
	g.fillPolygon([0, 12, 24, 12], [0, 8, 0, -8]);
}
