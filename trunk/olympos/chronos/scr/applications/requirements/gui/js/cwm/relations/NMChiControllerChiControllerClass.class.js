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

cwm.relations.NMChiControllerChiControllerClass = function() {
	cwm.relations.NMChiControllerChiControllerClass.superclass.constructor.call(this);
	
	this.uwmClassName = "NMChiControllerChiController";
	this.instanceClassName = "cwm.relations.NMChiControllerChiController";
	this.treeIcon = "Figure";
	this.labelProperties = {};
	
	this.maskInfo = {
	    "ChiControllerSource" : "ChiController",
	    "ChiControllerTarget" : "ChiController"
	};
}

Ext.extend(cwm.relations.NMChiControllerChiControllerClass, uwm.model.RelationClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new cwm.relations.NMChiControllerChiControllerClass());
