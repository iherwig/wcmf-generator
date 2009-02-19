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
 * @class Special diagram type for requirements (default diagram).
 * 
 * @extends uwm.diagram.AbstractDiagram
 * @constructor
 * @param {uwm.model.ModelNodeClass}
 *            modelNodeClass
 */
uwm.diagram.Diagram = function(modelNodeClass) {
	this.supportedGroups = [ 'UseCases', 'requirements', 'domain' ];
	uwm.diagram.Diagram.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.diagram.Diagram, uwm.diagram.AbstractDiagram);

