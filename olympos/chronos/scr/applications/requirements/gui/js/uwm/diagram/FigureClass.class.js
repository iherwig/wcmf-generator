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
 * @class Defines common characteristics of all Figures.
 * 
 * @extends uwm.Model.ModelNodeClass
 * @constructor
 */
uwm.diagram.FigureClass = function() {
	uwm.model.ModelNodeClass.call(this);
	
	this.uwmClassName = "Figure";
	this.instanceClassName = "uwm.diagram.Figure";
	this.treeIcon = "FigureFigure";
	this.labelProperties = {};
}

uwm.diagram.FigureClass.prototype = new uwm.model.ModelNodeClass;

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new uwm.diagram.FigureClass());
