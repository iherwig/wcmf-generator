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
Ext.namespace("application.application.include.model.activity");

/**
 * @class ActivityInitial
 * ActivityInitial description: An initial or start node is depicted by a large black spot.
 *
 * @constructor
 */
application.application.include.model.activity.ActivityInitial = function(oid, data) {
// PROTECTED REGION ID(application/include/model/activity/ActivityInitialclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ActivityInitial');
	return application.application.include.model.activity.ActivityInitial.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.activity.ActivityInitial, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/activity/ActivityInitialclass.js/Body) ENABLED START
// PROTECTED REGION END
	