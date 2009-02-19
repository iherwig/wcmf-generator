/*
 * Copyright (c) 2008 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("uwm.diagram");

/**
 * @class Special diagram type for activities.
 *
 * @extends uwm.diagram.AbstractDiagram
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass
 */
uwm.diagram.ActivitySet = function(modelNodeClass) {
	this.supportedGroups=['activity'];
	uwm.diagram.ActivitySet.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.ActivitySet, uwm.diagram.AbstractDiagram);

uwm.diagram.ActivitySet.prototype.getOwnContainer=function(){
	this.containedPackage=this;
}