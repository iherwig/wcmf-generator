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
 * @class Activity
 * Activity description: An activity is the specification of a parameterized sequence of behaviour. An activity is shown as a round-cornered rectangle enclosing all the actions, control flows and other elements that make up the activity.
 *
 * @constructor
 */
application.application.include.model.activity.Activity = function(oid, data) {
// PROTECTED REGION ID(application/include/model/activity/Activityclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('Activity');
	return application.application.include.model.activity.Activity.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.activity.Activity, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/activity/Activityclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.activity.Activity.prototype.getLabel = function() {
	var label = this.get("Name");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	