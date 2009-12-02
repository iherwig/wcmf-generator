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
Ext.namespace("application.application.include.model.wcmf");

/**
 * @class Translation
 * Translation description: Instances of this class are used to localize entity attributes. Each instance defines a translation of one attribute of one entity into one language.
 *
 * @constructor
 */
application.application.include.model.wcmf.Translation = function(oid, data) {
// PROTECTED REGION ID(application/include/model/wcmf/Translationclass.js/Constructor) ENABLED START
// PROTECTED REGION END
	var modelDescription = chi.model.ModelDescriptionContainer.getInstance().getDescription('Translation');
	return application.application.include.model.wcmf.Translation.superclass.constructor.call(this, modelDescription, oid, data);
};
Ext.extend(application.application.include.model.wcmf.Translation, chi.model.ModelRecord);

// PROTECTED REGION ID(application/include/model/wcmf/Translationclass.js/Body) ENABLED START
// PROTECTED REGION END
	