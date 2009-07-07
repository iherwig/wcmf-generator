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
Ext.namespace("cwl.model");

cwl.model.RootPackage = function() {
	cwl.model.RootPackage.superclass.constructor.call(this, arguments);
	
	this.cwlModelElementId = cwl.model.RootPackage.ROOT_PACKAGE_ID;
	this.name = "RootPackage";
	this.owningPackageId = null;
}

Ext.extend(cwl.model.RootPackage, cwl.model.ModelPackage);

cwl.model.RootPackage.ROOT_PACKAGE_ID = "cwl.model.RootPackageId";

cwl.model.ModelElementContainer.getInstance().registerElement(new cwl.model.RootPackage());

