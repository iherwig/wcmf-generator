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
	// default calculation of parent class
	var defaultLocation = draw2d.ChopboxConnectionAnchor.prototype.getLocation.call(this, reference);
	
	// multiple connections support:	
	var owner = this.getOwner(); // draw2d.Port
	var myConnection = this.getConnection();
	var isOnVerticalEdge = this.IsOnVerticalEdge(defaultLocation);
	
	// get the connections with same source or target
	// and determine the position of myConnection in this set
	var ownerConnections = owner.getConnections();
	if (ownerConnections.getSize() > 1) {
		var sameConnections = new draw2d.ArrayList();
		var index = 0;
		for (var i=0; i<ownerConnections.getSize(); i++)
		{
			var curConnection = ownerConnections.get(i);
			if (curConnection.getTarget() == myConnection.getTarget() || curConnection.getSource() == myConnection.getTarget())
			{
				sameConnections.add(curConnection);
				if (myConnection == curConnection) {
					index = sameConnections.getSize();
				}
			}
		}
	}

	// spread anchors along the owner in case of multiple selections
	if (sameConnections && sameConnections.getSize() > 1) {
		var dist = 20;
		var w = (ownerConnections.getSize()-1)*dist;
		if (isOnVerticalEdge) {
			defaultLocation.y += Math.round(-w/2 + (index-1)*dist);
		}
		else {
			defaultLocation.x += Math.round(-w/2 + (index-1)*dist);
		}
	}

	// move target anchor in case of self relation
	var owningFigure = owner.parentNode;
	if (myConnection.sourceAnchor.getOwner().parentNode == owningFigure && 
			myConnection.targetAnchor.getOwner().parentNode == owningFigure) {
		if (myConnection.targetAnchor == this) {
			if (isOnVerticalEdge) {
				defaultLocation.y += 20;
			}
			else {
				defaultLocation.x += 20;
			}
		}
	}

	return defaultLocation;
}

/**
 * Get the connection to which this anchor belongs to. 
 * @return The draw2d.Connection
 */
uwm.graphics.connection.ConnectionAnchor.prototype.getConnection=function()
{
	if (this.connection == null) {
		var owner = this.getOwner();
		if (owner) {
			var connections = owner.getConnections();
			for (var i=0;i<connections.getSize();i++) {
				var conn = connections.get(i);
				if (conn.sourceAnchor == this || conn.targetAnchor == this) {
					this.connection = conn;
				}
			}
		}
	}
	return this.connection;
}

/**
 * Check if the givn point is on a vertical edge of the owning figure's bounding box 
 * @return Boolean
 */
uwm.graphics.connection.ConnectionAnchor.prototype.IsOnVerticalEdge=function(p)
{
	var bounds = this.getBox();
	// check if the point is nearer to a vertical of to a horizontal edge
	var minVerticalDistance = Math.min(Math.abs(p.x-bounds.x), Math.abs(p.x-(bounds.x+bounds.w)));
	var minHorizontalDistance = Math.min(Math.abs(p.y-bounds.y), Math.abs(p.y-(bounds.y+bounds.h)));
	return minVerticalDistance < minHorizontalDistance;
}
