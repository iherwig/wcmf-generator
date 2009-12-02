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
 * @class InputType
 * InputType description: this class hosts all the allowed input types like text, password, textarea, select, radio, checkbox, file, fileex, fckeditor, filebrowser, linkbrowser, date ...
 *
 * @constructor
 */
application.application.include.model.domain.InputType = function(oid, data) {
// PROTECTED REGION ID(application/include/model/domain/InputTypeclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('InputType');
	return application.application.include.model.domain.InputType.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.domain.InputType, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/domain/InputTypeclass.js/Body) ENABLED START
// PROTECTED REGION END
	