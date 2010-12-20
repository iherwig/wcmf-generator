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
 * @class The default connection of UWM.
 * 
 * @extends draw2d.Connection
 * @constructor
 * @param {String} label Label of this connection.
 * @param {Array} decorators Array of 0..2 draw2d.ConnectionDecorator objects.
 */
uwm.graphics.connection.MappingConnection = function(label, decorators) {
	uwm.graphics.connection.BaseConnection.call(this, label, decorators);
	
	this.setRouter(new draw2d.NullConnectionRouter());
}

Ext.extend(uwm.graphics.connection.MappingConnection, uwm.graphics.connection.BaseConnection);

/**
 * Type identifier of this class.
 */
uwm.graphics.connection.MappingConnection.prototype.type = "uwm.graphics.connection.MappingConnection";
