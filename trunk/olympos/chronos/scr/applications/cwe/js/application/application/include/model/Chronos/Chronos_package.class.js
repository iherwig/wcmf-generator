
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
Ext.namespace("application.application.include.model.Chronos");

application.application.include.model.Chronos.Chronos_package = function() {
	application.application.include.model.Chronos.Chronos_package.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "application.application.include.model.Chronos.Chronos_package";
	this.name = "Chronos";
	this.owningPackageId = "application.application.include.model.Model_package";
	this.startExpanded = true;
}

Ext.extend(application.application.include.model.Chronos.Chronos_package, cwe.model.ModelPackage);

cwe.model.ModelPackageContainer.getInstance().registerPackage(new application.application.include.model.Chronos.Chronos_package());
	