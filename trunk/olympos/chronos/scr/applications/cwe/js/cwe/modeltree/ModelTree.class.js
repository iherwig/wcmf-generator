/*
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwe.modeltree");

/**
 * @class The Model Tree (lower left view).
 *
 * <p>This tree displays models, packages and contained diagrams and model objects.</p>
 *
 * <p>The Model Tree is a <i>Singleton</i>.</p>
 *
 * @extends Ext.tree.TreePanel
 * @constructor
 * @param {Object} config The configuration object.
 */
cwe.modeltree.ModelTree = function() {
}

cwe.modeltree.ModelTree = Ext.extend(Ext.tree.TreePanel, {
	initComponent: function() {
		Ext.apply(this, {
			region: "west",
			width: 250,
			collapsible: true,
			split: true,
			autoScroll: true,
			animate: true,
			containerScroll: true,
			root: new Ext.tree.TreeNode({
				text: "root",
				id: "root"
			}),
			rootVisible: false,
			title: chi.Dict.translate("Model Tree")
		});
		
		cwe.modeltree.ModelTree.superclass.initComponent.apply(this, arguments);
		
		this.requirements = new Ext.tree.TreeNode({
			text: "Requirements",
			cls: "folder"
		});
		this.getRootNode().appendChild(this.requirements);

		this.requirements.appendChild(new Ext.tree.TreeNode({
			text: "ChiGoal",
			iconCls: "ChiGoalTreeIcon16x16"
		}));
		this.requirements.appendChild(new Ext.tree.TreeNode({
			text: "ChiRequirement",
			iconCls: "ChiRequirementTreeIcon16x16"
		}));
		this.requirements.appendChild(new Ext.tree.TreeNode({
			text: "ChiFeature",
			iconCls: "ChiFeatureTreeIcon16x16"
		}));
		this.requirements.appendChild(new Ext.tree.TreeNode({
			text: "ChiIssue",
			iconCls: "ChiIssueTreeIcon16x16"
		}));
	}
	
})

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
