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
 * @class ChiBusinessPartner
 * ChiBusinessPartner description: A ChiBusinesPartner is an external person that has a Business relation with the enterprise.
 *
 * @constructor
 */
application.application.include.model.UseCases.ChiBusinessPartner = function(oid, data) {
// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessPartnerclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiBusinessPartner');
	return application.application.include.model.UseCases.ChiBusinessPartner.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.UseCases.ChiBusinessPartner, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/UseCases/ChiBusinessPartnerclass.js/Body) ENABLED START
// PROTECTED REGION END
	