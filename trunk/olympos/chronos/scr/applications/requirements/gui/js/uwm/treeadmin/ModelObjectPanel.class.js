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

uwm.treeadmin.ModelObjectPanel = function() {
}

uwm.treeadmin.ModelObjectPanel = Ext.extend(Ext.tree.TreePanel, {
	initComponent: function() {
		Ext.apply(this, {
			title: this.modelObject.getLabel(),
			iconCls: this.modelObject.getModelNodeClass().getTreeIcon(),
			layout: "fit",
			autoScroll: true,
			animate: true,
			containerScroll: true,
			root: new Ext.tree.TreeNode(),
			rootVisible: false,
			loader: new uwm.treeadmin.RelationTreeLoader()
		});
		
		uwm.treeadmin.ModelObjectPanel.superclass.initComponent.apply(this, arguments);
		
		var connectionInfos = this.modelObject.getModelNodeClass().getAllConnectionInfo();
		
		for (var i in connectionInfos) {
			var currConnectionInfo = connectionInfos[i];
			
			if (!(currConnectionInfo instanceof Function)) {
				this.getRootNode().appendChild(new uwm.treeadmin.RelationNode({
					modelObject: this.modelObject,
					connectionInfo: currConnectionInfo,
					connectionTarget: i
				}));
			}
		}
	}
});
