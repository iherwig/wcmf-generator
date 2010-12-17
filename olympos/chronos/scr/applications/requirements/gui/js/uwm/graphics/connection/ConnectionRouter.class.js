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
 * @class The default connection router of UWM.
 * 
 * @extends draw2d.ManhattanConnectionRouter
 * @constructor
 */
uwm.graphics.connection.ConnectionRouter = function(owner) {
	draw2d.ManhattanConnectionRouter.call(this);
}

Ext.extend(uwm.graphics.connection.ConnectionRouter, draw2d.ManhattanConnectionRouter);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.ConnectionRouter.prototype.type = "uwm.graphics.connection.ConnectionRouter";

/**
 * Returns the location where the Connection should be anchored in absolute coordinates. 
 * The anchor may use the given reference Point to calculate this location.
 * @param reference The reference Point in absolute coordinates
 * @return The anchor's location
 */
uwm.graphics.connection.ConnectionRouter.prototype.route=function(/*:draw2d.Connection*/ conn)
{
	// use bigger mindist for self relations
	if (conn.sourceAnchor.getOwner().parentNode == conn.targetAnchor.getOwner().parentNode) {
		this.MINDIST = 30;
	}
	draw2d.ManhattanConnectionRouter.prototype.route.call(this, conn);
}
