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
cwl.modeltree.ModelTree = function() {
}

cwl.modeltree.ModelTree = Ext.extend(Ext.tree.TreePanel, {
	initComponent : function() {
		Ext.apply(this, {
			width: 250,
			autoScroll: true,
			animate: true,
			containerScroll: true,
			root: new Ext.tree.AsyncTreeNode({
				text: "root",
				draggable: false,
				id: 'root'
			}),
			loader: new cwl.modeltree.Loader(),
			rootVisible: false,
			enableDrag: true,
			dragConfig: {
				ddGroup: cwl.Constants.DD_GROUP
			},
			title: chi.Dict.translate("Model Tree")
		});
		
		cwl.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		// remove this for async loading
		//this.setRootNode(this.loadTree(chi.model.ModelPackageContainer.getInstance().getPackage(chi.model.RootPackage.ROOT_PACKAGE_ID)));
	}
});

cwl.modeltree.ModelTree.prototype.loadTree = function(currPackage) {
	var currNode = new cwl.modeltree.Node( {
		modelElement : currPackage
	});
	var children = currPackage.getChildren();
	
	var self = this;
	
	children.each( function(currChild) {
		if (currChild instanceof chi.model.ModelPackage) {
			currNode.appendChild(self.loadTree(currChild));
		} else {
			currNode.appendChild(new cwl.modeltree.Node( {
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
 * @type cwl.modeltree.ModelTree
 */
cwl.modeltree.ModelTree.getInstance = function() {
	if (!cwl.modeltree.ModelTree.instance) {
		cwl.modeltree.ModelTree.instance = new cwl.modeltree.ModelTree();
	}
	
	return cwl.modeltree.ModelTree.instance;
}
