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
 * @class The Model Tree (lower left view).
 * 
 * <p>
 * This tree displays models, packages and contained diagrams and model objects.
 * </p>
 * 
 * <p>
 * The Model Tree is a <i>Singleton</i>.
 * </p>
 * 
 * @extends Ext.tree.TreePanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.modeltree.ModelTree = function() {
}

cwe.modeltree.ModelTree = Ext.extend(Ext.tree.TreePanel, {
	initComponent : function() {
		Ext.apply(this, {
		    region : "west",
		    width : 250,
		    collapsible : true,
		    split : true,
		    autoScroll : true,
		    animate : true,
		    containerScroll : true,
		    rootVisible : false,
		    title : chi.Dict.translate("Model Tree")
		});
		
		cwe.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		this.setRootNode(this.loadTree(cwe.model.ModelPackageContainer.getInstance().getRootPackage()));
	}
});

cwe.modeltree.ModelTree.prototype.loadTree = function(currPackage) {
	var currNode = new cwe.modeltree.Node( {
		modelElement : currPackage
	});
	var children = currPackage.getChildren();
	
	var self = this;
	
	children.each( function(currChild) {
		if (currChild instanceof cwe.model.ModelPackage) {
			currNode.appendChild(self.loadTree(currChild));
		} else {
			currNode.appendChild(new cwe.modeltree.ClassNode( {
				modelElement : currChild
			}));
		}
	});
	
	return currNode;
}

/**
 * Returns the instance of ModelTree.
 *
 * @return The instance of ModelTree.
 * @type cwe.modeltree.ModelTree
 */
cwe.modeltree.ModelTree.getInstance = function() {
	if (!cwe.modeltree.ModelTree.instance) {
		cwe.modeltree.ModelTree.instance = new cwe.modeltree.ModelTree();
	}
	
	return cwe.modeltree.ModelTree.instance;
}
