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
 * @class Counter
 * Counter description: the class counter hosts counter properties for all the objects actually supportedby the system.
 * This class is a single tone and exisst only one time in each CWM instance.
 *
 * @constructor
 */
application.application.include.model.Counter = function(oid, data) {
// PROTECTED REGION ID(application/include/model/Counterclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('Counter');
	return application.application.include.model.Counter.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.Counter, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/Counterclass.js/Body) ENABLED START
// PROTECTED REGION END

/**
 * Returns the label of this record.
 * 
 * @return The label of this record.
 * @type String
 */
application.application.include.model.Counter.prototype.getLabel = function() {
	var label = this.get("");
	if (label == undefined || label.length == 0) {
		label = this.getOid(); 
	}
	return label;
};
	