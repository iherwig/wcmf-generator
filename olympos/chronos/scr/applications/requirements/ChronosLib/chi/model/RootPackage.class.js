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
Ext.namespace("chi.model");

/**
 * @class The root package of the Model Tree.
 * 
 * @extends chi.model.ModelPackage
 * @constructor
 * @see chi.modeltree.ModelTree
 */
chi.model.RootPackage = function() {
	chi.model.RootPackage.superclass.constructor.call(this, arguments);
	
	this.chiModelElementId = chi.model.RootPackage.ROOT_PACKAGE_ID;
	this.name = "RootPackage";
	this.owningPackageId = null;
};

Ext.extend(chi.model.RootPackage, chi.model.ModelPackage);

/**
 * The unique id of the root package.
 * 
 * <p>
 * Refer to this id for all Model Elements at root level.
 * </p>
 * 
 * @type String
 */
chi.model.RootPackage.ROOT_PACKAGE_ID = "chi.model.RootPackageId";

chi.model.ModelPackageContainer.getInstance().registerPackage(new chi.model.RootPackage());
