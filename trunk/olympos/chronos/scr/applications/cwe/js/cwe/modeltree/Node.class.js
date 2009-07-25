/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.modeltree");

/**
 * @class A Model Tree node.
 * 
 * <p>
 * This class is both the parent class for all specific Model Tree node classes
 * and the concrete class for packages at the same time.
 * </p>
 * @constructor
 * @extends Ext.tree.TreeNode
 * @see cwe.modeltree.ModelTree
 * @param {Object}
 *            config The configuration object.
 * @config modelElement The model element corresponding to this node.
 */
cwe.modeltree.Node = function(config) {
	/**
	 * The model element corresponding to this node.
	 * 
	 * @type cwe.model.ModelElement
	 */
	this.modelElement = config.modelElement;
	
	cwe.modeltree.Node.superclass.constructor.call(this, Ext.apply(this, {
		text : this.getModelElement().getName(),
		iconCls : this.getModelElement().getTreeIconClass(),
		expanded : this.getModelElement().getStartExpanded ? this.getModelElement().getStartExpanded() : false
	}, config));
	
}

Ext.extend(cwe.modeltree.Node, Ext.tree.TreeNode);

/**
 * Returns the model element corresponding to this node.
 * 
 * @return The model element corresponding to this node.
 * @type cwe.model.ModelElement
 */
cwe.modeltree.Node.prototype.getModelElement = function() {
	return this.modelElement;
}
