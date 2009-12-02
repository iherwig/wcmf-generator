
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

Ext.namespace("application.application.include.model.rules");

application.application.include.model.rules.Rules_package = function() {
	application.application.include.model.rules.Rules_package.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = "application.application.include.model.rules.Rules_package";
	this.name = "rules";
	this.owningPackageId = "application.application.include.model.Model_package";
	this.startExpanded = true;
};

Ext.extend(application.application.include.model.rules.Rules_package, chi.model.ModelPackage);

chi.model.ModelPackageContainer.getInstance().registerPackage(new application.application.include.model.rules.Rules_package());
	