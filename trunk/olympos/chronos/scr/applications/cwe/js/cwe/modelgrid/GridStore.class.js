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
Ext.namespace("cwe.modelgrid");

/**
 * @class Loads the data for a model grid.
 * 
 * @extends Ext.data.Store
 * @constructor
 * @see cwe.modelgrid.ModelGrid
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class to load object of.
 */
cwe.modelgrid.GridStore = function(config) {
	this.modelClass = config.modelClass;
	
	var exampleRecord = new cwe.model.ModelRecord(this.modelClass);
	
	cwe.modelgrid.GridStore.superclass.constructor.call(this, Ext.apply( {
		proxy : new cwe.modelgrid.GridProxy( {
			modelClass : this.modelClass
		}),
		fields : exampleRecord.fields,
		remoteSort : true
	}, config));
}

Ext.extend(cwe.modelgrid.GridStore, Ext.data.Store);

cwe.modelgrid.GridStore.prototype.getModelClass = function() {
	return this.modelClass;
}
