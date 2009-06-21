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
Ext.namespace("cwm.requirements");

cwm.requirements.Requirements = function() {
	cwm.requirements.Requirements.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = "cwm.requirements.Requirements";
	this.name = "requirements";
	this.owningPackageId = cwe.model.RootPackage.ROOT_PACKAGE_ID;
	this.startExpanded = true;
}

Ext.extend(cwm.requirements.Requirements, cwe.model.ModelPackage);

cwe.model.ModelPackageContainer.getInstance().registerPackage(new cwm.requirements.Requirements());
