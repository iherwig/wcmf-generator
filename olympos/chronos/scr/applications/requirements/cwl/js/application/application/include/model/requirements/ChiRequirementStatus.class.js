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
Ext.namespace("application.application.include.model.requirements");

/**
 * @class ChiRequirementStatus
 * ChiRequirementStatus description: 
 *
 * @constructor
 */
application.application.include.model.requirements.ChiRequirementStatus = function(oid, data) {
// PROTECTED REGION ID(application/include/model/requirements/ChiRequirementStatusclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiRequirementStatus');
	return application.application.include.model.requirements.ChiRequirementStatus.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.requirements.ChiRequirementStatus, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/requirements/ChiRequirementStatusclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.requirements.ChiRequirementStatus.prototype.getLabel = function() {
	var label = this.get("Name");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	