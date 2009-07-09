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
Ext.namespace("cwl.objecttree");

cwl.objecttree.UsedObjectsPackage = function() {
	cwl.objecttree.UsedObjectsPackage.superclass.constructor.call(this, arguments);
	
	this.cwlModelElementId = cwl.objecttree.UsedObjectsPackage.ROOT_PACKAGE_ID;
	this.name = "UsedObjectsPackage";
}

Ext.extend(cwl.objecttree.UsedObjectsPackage, cwl.model.ModelPackage);

cwl.objecttree.UsedObjectsPackage.ROOT_PACKAGE_ID = "cwl.objecttree.UsedObjectPackageId";
