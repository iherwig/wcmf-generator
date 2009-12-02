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
 * @class ChiController
 * ChiController description: A ChiController, Views and Associations define the application flow. A controller represent the Business logic where a certain flow is physical implemented.
 *
 * @constructor
 */
application.application.include.model.domain.ChiController = function(oid, data) {
// PROTECTED REGION ID(application/include/model/domain/ChiControllerclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiController');
	return application.application.include.model.domain.ChiController.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.domain.ChiController, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/domain/ChiControllerclass.js/Body) ENABLED START
// PROTECTED REGION END
	