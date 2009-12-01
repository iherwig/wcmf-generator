/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("chi.model");

/**
 * @class Loads the data for a model grid.
 * 
 * @extends Ext.data.Store
 * @constructor
 * @see chi.modelgrid.ModelGrid
 * @param {Object}
 *            config The configuration object.
 * @config modelDescription The Model Description to load object of.
 */
chi.model.Store = function(config) {
	this.modelDescription = config.modelDescription;
	
	var exampleRecord = new chi.model.ModelRecord(this.modelDescription);
	
	chi.model.Store.superclass.constructor.call(this, Ext.apply( {
		proxy : new chi.model.Proxy( {
			modelDescription : this.modelDescription
		}),
		fields : exampleRecord.fields,
		remoteSort : true
	}, config));
};

Ext.extend(chi.model.Store, Ext.data.Store);

chi.model.Store.prototype.getModelDescription = function() {
	return this.modelDescription;
};
