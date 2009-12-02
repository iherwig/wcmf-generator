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
Ext.namespace("application.application.include.model");

/**
 * @class ChiBaseStatus
 * ChiBaseStatus description: this classes describes stati that are general valid for all ChiObjects. Special stati enumeration are describes in separates enumeration entities.
 *
 * @constructor
 */
application.application.include.model.ChiBaseStatus = function(oid, data) {
// PROTECTED REGION ID(application/include/model/ChiBaseStatusclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ChiBaseStatus');
	return application.application.include.model.ChiBaseStatus.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.ChiBaseStatus, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/ChiBaseStatusclass.js/Body) ENABLED START
// PROTECTED REGION END
	