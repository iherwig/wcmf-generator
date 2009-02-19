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
 * @class <i>Singleton</i> defining common characteristics of all ActivitySet diagrams.
 * 
 * @extends uwm.diagram.AbstractDiagramClass
 * @constructor
 */
uwm.diagram.ActivitySetClass = function() {
	uwm.diagram.ActivitySetClass.superclass.constructor.call(this);
	this.uwmClassName='ActivitySet';
	this.instanceClassName= 'uwm.diagram.ActivitySet';
	this.defaultLabel = "New ActivitySet";
	this.treeIcon = "FigureActivity";
	}
Ext.extend(uwm.diagram.ActivitySetClass,uwm.diagram.AbstractDiagramClass);
	
uwm.model.ModelNodeClassContainer.getInstance().registerClass(new uwm.diagram.ActivitySetClass());