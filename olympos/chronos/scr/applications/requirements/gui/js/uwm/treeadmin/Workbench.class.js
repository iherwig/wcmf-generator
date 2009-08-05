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

uwm.treeadmin.Workbench = function(config) {
	uwm.treeadmin.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		layout: "border",
		items: [uwm.treeadmin.ModelObjectTree.getInstance(), new uwm.ui.EastPanel({
			highlight: "tree"
		}), uwm.treeadmin.ModelObjectContainer.getInstance()]
	}, config));
}

Ext.extend(uwm.treeadmin.Workbench, Ext.Viewport);