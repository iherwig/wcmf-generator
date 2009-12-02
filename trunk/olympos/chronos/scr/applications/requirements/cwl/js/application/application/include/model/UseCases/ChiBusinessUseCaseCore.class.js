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
 * @class ChiBusinessUseCaseCore
 * ChiBusinessUseCaseCore description: A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
 *
 * @constructor
 */
application.application.include.model.UseCases.ChiBusinessUseCaseCore = function(oid, data) {
// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessUseCaseCoreclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiBusinessUseCaseCore');
	return application.application.include.model.UseCases.ChiBusinessUseCaseCore.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.UseCases.ChiBusinessUseCaseCore, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessUseCaseCoreclass.js/Body) ENABLED START
// PROTECTED REGION END
	