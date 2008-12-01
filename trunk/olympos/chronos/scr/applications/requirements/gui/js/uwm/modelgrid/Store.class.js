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
Ext.namespace("uwm.modelgrid");

// UNFINISHED WORK IN PROGRESS!!!

uwm.modelgrid.Store = function(config) {

	var fields = config.fields;
	fields.push({
		name: "parentoids",
		mapping: "properties.parentoids"
	});
	fields.push({
		name: "childoids",
		mapping: "properties.childoids"
	});
	
	uwm.modelgrid.Store.superclass.constructor.calss(this, Ext.apply(this, {
		reader: new uwm.modelgrid.Reader({
			fields: fields
		})
	}, config));
}


Ext.extend(uwm.modelgrid.Store, Ext.data.Store, {
})
