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
 * @class ChiWorkerInternal
 * ChiWorkerInternal description: A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.
 *
 * @constructor
 */
application.application.include.model.UseCases.ChiWorkerInternal = function(oid, data) {
// PROTECTED REGION ID(application/include/model/UseCases/ChiWorkerInternalclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiWorkerInternal');
	return application.application.include.model.UseCases.ChiWorkerInternal.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.UseCases.ChiWorkerInternal, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/UseCases/ChiWorkerInternalclass.js/Body) ENABLED START
// PROTECTED REGION END
	