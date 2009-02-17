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
 * @class Positions the connection label at the center of a Manhattan connection.
 * 
 * @extends draw2d.ConnectionLocator
 * @constructor
 * @param {Object} connection
 */
uwm.graphics.connection.MidpointLocator = function(connection) {
	draw2d.ConnectionLocator.call(this, connection);
}

Ext.extend(uwm.graphics.connection.MidpointLocator, draw2d.ConnectionLocator);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.MidpointLocator.prototype.type = "uwm.graphics.connection.MidpointLocator";

/**
 * Moves the connection label to the center of a Manhattan connection.
 * 
 * @private
 * @param {Object} target
 */
uwm.graphics.connection.MidpointLocator.prototype.relocate = function(target) {
	var conn = this.getConnection();
	var p = new draw2d.Point();
	var points = conn.getPoints();
	var index = Math.floor((points.getSize() - 2) / 2);
	var p1 = points.get(index);
	var p2 = points.get(index + 1);
	
	p.x = (p2.x - p1.x) / 2 + p1.x - this.getConnection().getLabel().getWidth() / 2;
	p.y = (p2.y - p1.y) / 2 + p1.y - this.getConnection().getLabel().getHeight() / 2;
	
	target.setPosition(p.x, p.y);
}
