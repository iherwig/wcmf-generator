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
 * @class ChiNode
 * ChiNode description: A Domain Object type used in Chronos. ChiNodes and ChiValues define the application data model.
 *
 * @constructor
 */
application.application.include.model.domain.ChiNode = function(oid, data) {
// PROTECTED REGION ID(application/include/model/domain/ChiNodeclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiNode');
	return application.application.include.model.domain.ChiNode.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.domain.ChiNode, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/domain/ChiNodeclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.domain.ChiNode.prototype.getLabel = function() {
	var label = this.get("Name");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	