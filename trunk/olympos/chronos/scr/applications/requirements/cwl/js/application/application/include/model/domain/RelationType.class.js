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
 * @class RelationType
 * RelationType description: this class host all the relations type hosted by relation. Like Generalizzation, realization, aggregation, composition, etc.
 *
 * @constructor
 */
application.application.include.model.domain.RelationType = function(oid, data) {
// PROTECTED REGION ID(application/include/model/domain/RelationTypeclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('RelationType');
	return application.application.include.model.domain.RelationType.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.domain.RelationType, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/domain/RelationTypeclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.domain.RelationType.prototype.getLabel = function() {
	var label = this.get("Name");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	