
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
Ext.namespace("application.JsonTest");

application.JsonTest.JsonTest_package = function() {
	application.JsonTest.JsonTest_package.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "application.JsonTest.JsonTest_package";
	this.name = "model";
	this.owningPackageId = cwe.model.RootPackage.ROOT_PACKAGE_ID;
	this.startExpanded = true;
};

Ext.extend(application.JsonTest.JsonTest_package, cwe.model.ModelPackage);

cwe.model.ModelPackageContainer.getInstance().registerPackage(new application.JsonTest.JsonTest_package());
	