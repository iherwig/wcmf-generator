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
 * @class <i>Singleton</i> defining common characteristics of all (default) Diagrams.
 *
 * @extends uwm.diagram.AbstractDiagram.Class
 * @constructor
 */
uwm.diagram.DiagramClass = function() {
	uwm.diagram.DiagramClass.superclass.constructor.call(this);
	this.uwmClassName = "Diagram";
	this.instanceClassName = 'uwm.diagram.Diagram';
	this.defaultLabel = "New Diagram";
}
Ext.extend(uwm.diagram.DiagramClass, uwm.diagram.AbstractDiagramClass);

uwm.model.ModelNodeClassContainer.getInstance().registerClass(new uwm.diagram.DiagramClass());
