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
 * @class An ActivitySet in the Model Tree.
 * 
 * @extends uwm.modeltree.AbstractDiagramNode
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.modeltree.ActivitySetNode = function(config) {
	this.modelNode = uwm.model.ModelContainer.getInstance().createByClassAndOid("ActivitySet", config.oid);
	
	uwm.modeltree.ActivitySetNode.superclass.constructor.call(this, Ext.apply(this, {
		id: config.oid,
		iconCls: this.modelNode.getModelNodeClass().getTreeIcon(),
		allowDrop: false
	}, config));
	
	}

Ext.extend(uwm.modeltree.ActivitySetNode, uwm.modeltree.AbstractDiagramNode);