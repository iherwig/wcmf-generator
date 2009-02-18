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
Ext.namespace("uwm.modeltree");

/**
 * @class A diagram in the Model Tree.
 * 
 * @extends uwm.objecttree.Node
 * @see uwm.modeltree.ModelTree
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.DiagramNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndOid("Diagram", config.oid);
	
	uwm.modeltree.DiagramNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		allowDrop: false,
		leaf: true
	}, config));
	
}

Ext.extend(uwm.modeltree.DiagramNode, uwm.modeltree.StandardDiagramNode);