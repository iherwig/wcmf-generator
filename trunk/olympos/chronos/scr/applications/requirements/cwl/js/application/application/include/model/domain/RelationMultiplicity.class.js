
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
Ext.namespace("application.application.include.model.domain");

application.application.include.model.domain.RelationMultiplicity = function(oid, data) {
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('RelationMultiplicity');
	return application.application.include.model.domain.RelationMultiplicity.superclass.constructor.call(this, modelDescription, oid, data);
// PROTECTED REGION ID(application.application.include.model.domain.RelationMultiplicity.class.js/Constructor) ENABLED START
// PROTECTED REGION END
};

// PROTECTED REGION ID(application.application.include.model.domain.RelationMultiplicity.class.js/Body) ENABLED START
// PROTECTED REGION END

Ext.extend(application.application.include.model.domain.RelationMultiplicity, chi.model.ModelRecord);
	