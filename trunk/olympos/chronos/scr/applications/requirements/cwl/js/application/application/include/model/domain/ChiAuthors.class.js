/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("application.application.include.model.domain");

/**
 * @class ChiAuthors
 * ChiAuthors description: This class host all the actors actively involved in the project.
 *
 * @constructor
 */
application.application.include.model.domain.ChiAuthors = function(oid, data) {
// PROTECTED REGION ID(application/include/model/domain/ChiAuthorsclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiAuthors');
	return application.application.include.model.domain.ChiAuthors.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.domain.ChiAuthors, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/domain/ChiAuthorsclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.domain.ChiAuthors.prototype.getLabel = function() {
	var label = this.get("Name") + " - " + this.get("Role");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	