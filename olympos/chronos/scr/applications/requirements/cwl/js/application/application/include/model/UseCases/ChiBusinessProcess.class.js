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
 * @class ChiBusinessProcess
 * ChiBusinessProcess description: A Business Process is a sum of actions that produces a business advantage to the enterprise. It is composed by one or many ChiBusinessUseCases.
 *
 * @constructor
 */
application.application.include.model.UseCases.ChiBusinessProcess = function(oid, data) {
// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessProcessclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiBusinessProcess');
	return application.application.include.model.UseCases.ChiBusinessProcess.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.UseCases.ChiBusinessProcess, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessProcessclass.js/Body) ENABLED START
// PROTECTED REGION END
	