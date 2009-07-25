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
Ext.namespace("cwe.model");

/**
 * @class The root package of the Model Tree.
 * 
 * @extends cwe.model.ModelPackage
 * @constructor
 * @see cwe.modeltree.ModelTree
 */
cwe.model.RootPackage = function() {
	cwe.model.RootPackage.superclass.constructor.call(this, arguments);
	
	this.cweModelElementId = cwe.model.RootPackage.ROOT_PACKAGE_ID;
	this.name = "RootPackage";
	this.owningPackageId = null;
}

Ext.extend(cwe.model.RootPackage, cwe.model.ModelPackage);

/**
 * The unique id of the root package.
 * 
 * <p>
 * Refer to this id for all Model Elements at root level.
 * </p>
 * 
 * @type String
 */
cwe.model.RootPackage.ROOT_PACKAGE_ID = "cwe.model.RootPackageId";

cwe.model.ModelPackageContainer.getInstance().registerPackage(new cwe.model.RootPackage());
