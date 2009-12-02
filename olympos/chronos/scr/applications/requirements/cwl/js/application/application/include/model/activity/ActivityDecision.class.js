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
 * @class ActivityDecision
 * ActivityDecision description: A Decision is used to represent a choice amongst several possibilities.  Each transition usually is labeled with a text describing the response to the question posed by the Decision point.
 *
 * @constructor
 */
application.application.include.model.activity.ActivityDecision = function(oid, data) {
// PROTECTED REGION ID(application/include/model/activity/ActivityDecisionclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('ActivityDecision');
	return application.application.include.model.activity.ActivityDecision.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.activity.ActivityDecision, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/activity/ActivityDecisionclass.js/Body) ENABLED START
// PROTECTED REGION END
	