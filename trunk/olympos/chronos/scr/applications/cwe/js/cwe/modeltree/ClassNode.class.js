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

cwe.modeltree.ClassNode = function(config) {
	cwe.modeltree.ClassNode.superclass.constructor.call(this, Ext.apply(this, {}, config));
	
	var self = this;
	
	this.on("click", function(node, e) {
		self.openModelGrid();
	});
}

Ext.extend(cwe.modeltree.ClassNode, cwe.modeltree.Node);

cwe.modeltree.ClassNode.prototype.openModelGrid = function() {
	cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.getModelElement());
}
