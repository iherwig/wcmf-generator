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
 * @class The default connection anchor of UWM.
 * 
 * @extends draw2d.ConnectionAnchor
 * @constructor
 * @param {draw2d.Figure} owner The owning figure.
 */
uwm.graphics.connection.ConnectionAnchor = function(owner) {
	draw2d.ChopboxConnectionAnchor.call(this);
}

Ext.extend(uwm.graphics.connection.ConnectionAnchor, draw2d.ChopboxConnectionAnchor);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.ConnectionAnchor.prototype.type = "uwm.graphics.connection.ConnectionAnchor";

/**
 * Returns the location where the Connection should be anchored in absolute coordinates. 
 * The anchor may use the given reference Point to calculate this location.
 * @param reference The reference Point in absolute coordinates
 * @return The anchor's location
 */
uwm.graphics.connection.ConnectionAnchor.prototype.getLocation=function(/*:draw2d.Point*/ reference)
{
	var owner = this.getOwner(); // draw2d.Port
	
	// count the connections
	var lines = owner.getConnections();
	if (lines.getSize()>1) {
		var conn = this.getConnection();
		var connections = new draw2d.ArrayList();
		var index=0;
		for (var i=0;i<lines.getSize();i++)
		{
			var figure = lines.get(i);
			if (figure.getTarget()==conn.getTarget() || figure.getSource()==conn.getTarget())
			{
				connections.add(figure);
				if (conn==figure)
					index=connections.getSize();
			}
		}
	}

	var r = new draw2d.Dimension();
	r.setBounds(this.getBox());
	r.translate(-1, -1);
	r.resize(1, 1);
	
	var centerX = r.x + r.w/2;
	var centerY = r.y + r.h/2;
	
	if (r.isEmpty() || (reference.x == centerX && reference.y == centerY)) {
		return new /*NAMESPACE*/Point(centerX, centerY);  //This avoids divide-by-zero
	}
	var dx = reference.x - centerX;
	var dy = reference.y - centerY;
	
	//r.width, r.height, dx, and dy are guaranteed to be non-zero. 
	var scale = 0.5 / Math.max(Math.abs(dx) / r.w, Math.abs(dy) / r.h);
	
	dx *= scale;
	dy *= scale;
	centerX += dx;
	centerY += dy;

	if (connections && connections.getSize()>1) {
		var dist = 20;
		var w = (lines.getSize()-1)*dist;
		// determine the spread direction (x or y)
		if (Math.abs(dx/dy) > 1) {
			centerY += -w/2 + (index-1)*dist;
		}
		else {
			centerX += -w/2 + (index-1)*dist;
		}
	}
	return new draw2d.Point(Math.round(centerX), Math.round(centerY));
}

/**
 * Get the connection to which this anchor belongs to. 
 * @return The draw2d.Connection
 */
uwm.graphics.connection.ConnectionAnchor.prototype.getConnection=function()
{
	var owner = this.getOwner();
	if (owner) {
		var connections = owner.getConnections();
		for (var i=0;i<connections.getSize();i++) {
			var conn = connections.get(i);
			if (conn.sourceAnchor == this || conn.targetAnchor == this) {
				return conn;
			}
		}
	}
	return null;
}
