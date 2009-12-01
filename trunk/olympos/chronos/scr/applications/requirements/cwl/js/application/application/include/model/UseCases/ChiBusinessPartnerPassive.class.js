
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
Ext.namespace("application.application.include.model.UseCases");

application.application.include.model.UseCases.ChiBusinessPartnerPassive = function(oid, data) {
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiBusinessPartnerPassive');
	return application.application.include.model.UseCases.ChiBusinessPartnerPassive.superclass.constructor.call(this, modelDescription, oid, data);
// PROTECTED REGION ID(application.application.include.model.UseCases.ChiBusinessPartnerPassive.class.js/Constructor) ENABLED START
// PROTECTED REGION END
};

// PROTECTED REGION ID(application.application.include.model.UseCases.ChiBusinessPartnerPassive.class.js/Body) ENABLED START
// PROTECTED REGION END

Ext.extend(application.application.include.model.UseCases.ChiBusinessPartnerPassive, chi.model.ModelRecord);
	