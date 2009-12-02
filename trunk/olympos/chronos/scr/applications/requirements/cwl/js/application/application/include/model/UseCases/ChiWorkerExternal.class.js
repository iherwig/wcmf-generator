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
Ext.namespace("application.application.include.model.UseCases");

/**
 * @class ChiWorkerExternal
 * ChiWorkerExternal description: A Chi External Worker is an employee that interacts directly with ChiBusinesPartner outside the enterprise.
 *
 * @constructor
 */
application.application.include.model.UseCases.ChiWorkerExternal = function(oid, data) {
// PROTECTED REGION ID(application/include/model/UseCases/ChiWorkerExternalclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiWorkerExternal');
	return application.application.include.model.UseCases.ChiWorkerExternal.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.UseCases.ChiWorkerExternal, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/UseCases/ChiWorkerExternalclass.js/Body) ENABLED START
// PROTECTED REGION END
	