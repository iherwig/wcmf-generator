/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwm.relations");

cwm.relations.NMChiNodeChiMany2ManyClass = function() {
	cwm.relations.NMChiNodeChiMany2ManyClass.superclass.constructor.call(this);
	
	this.uwmClassName = "NMChiNodeChiMany2Many";
	this.instanceClassName = "cwm.relations.NMChiNodeChiMany2Many";
	this.treeIcon = "Figure";
	this.labelProperties = {};
	
	this.maskInfo = {
	    "NMChiNodeChiMany2ManyChiNodeEnd" : "ChiController",
	    "ChiNodeManyToMany" : "ChiNodeManyToMany"
	};
}

Ext.extend(cwm.relations.NMChiNodeChiMany2ManyClass, uwm.model.EditableRelationClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.NMChiNodeChiMany2ManyClass());
