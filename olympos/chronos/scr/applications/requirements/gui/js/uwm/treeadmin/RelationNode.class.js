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
Ext.namespace("uwm.treeadmin");

uwm.treeadmin.RelationNode = function(config) {
	this.modelObject = config.modelObject;
	this.connectionInfo = config.connectionInfo;
	this.connectionTarget = config.connectionTarget;
	
	uwm.treeadmin.RelationNode.superclass.constructor.call(this, Ext.apply(this, {
		text: this.connectionInfo.label,
		leaf: false
	}, config));
	
	this.appendChild(new uwm.treeadmin.NewRelationNode({
		modelObject: this.modelObject,
		connectionInfo: this.connectionInfo,
		connectionTarget: this.connectionTarget
	}));
}

Ext.extend(uwm.treeadmin.RelationNode, Ext.tree.AsyncTreeNode);
