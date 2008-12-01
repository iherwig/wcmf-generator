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
Ext.namespace("uwm.objecttree");

uwm.objecttree.ObjectTree = Ext.extend(Ext.tree.TreePanel, {

	initComponent: function() {
	
		Ext.apply(this, {
			autoScroll: true,
			animate: true,
			containerScroll: true,
			layout: "fit",
			enableDD: true,
			dragConfig: {
				ddGroup: uwm.Constants.DD_GROUP
			},
			dropConfig: {
				ddGroup: uwm.Constants.DD_GROUP
			}
		});
		
		uwm.objecttree.ObjectTree.superclass.initComponent.apply(this, arguments);
	},
	
	render: function(container, position) {
		uwm.objecttree.ObjectTree.superclass.render.call(this, container, position);

		new uwm.objecttree.DragZone(this, {});
	},
});
