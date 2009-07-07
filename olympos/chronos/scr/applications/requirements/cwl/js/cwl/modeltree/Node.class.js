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
Ext.namespace("cwl.modeltree");

cwl.modeltree.Node = function(config) {
	this.modelElement = config.modelElement;
	
	cwl.modeltree.Node.superclass.constructor.call(this, Ext.apply(this, {
	    text : this.getModelElement().getName(),
	    iconCls : this.getModelElement().getTreeIconClass(),
	    expanded: this.getModelElement().getStartExpanded()
	}, config));
	
}

Ext.extend(cwl.modeltree.Node, Ext.tree.TreeNode);

cwl.modeltree.Node.prototype.getModelElement = function() {
	return this.modelElement;
}
