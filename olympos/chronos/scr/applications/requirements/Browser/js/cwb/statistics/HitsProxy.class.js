/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwb.statistics");

/**
 * @class Routes the InfoGrid requests through persistency layer.
 * @param {Array}
 *            objectList List of objects for which the data must be loaded.
 */

cwb.statistics.HitsProxy = function(config) {
	cwb.statistics.HitsProxy.superclass.constructor.call(this, Ext.apply(this, {}, config));
};

Ext.extend(cwb.statistics.HitsProxy, cwb.ObjectsListProxy);

cwb.statistics.HitsProxy.prototype.load = function(params, reader, callback, scope, arg) {
	if (this.fireEvent("beforeload", this, params) !== false) {
		var self = this;
		cwb.persistency.Persistency.getInstance().displayByAlias(this.objectList, function(options, data) {
			self.loadResponse(options, data, callback, scope, arg);
		}, function(options, data) {
			self.loadFailed(options, data, callback, scope, arg);
		})
	} else {
		callback.call(scope || this, null, arg, false);
	}
};
