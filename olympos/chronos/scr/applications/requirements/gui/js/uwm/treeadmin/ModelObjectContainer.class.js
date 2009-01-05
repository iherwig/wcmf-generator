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

uwm.treeadmin.ModelObjectContainer = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		Ext.apply(this, {
			region: "center"
		});
		
		uwm.treeadmin.ModelObjectContainer.superclass.initComponent.apply(this, arguments);
	}
});

uwm.treeadmin.ModelObjectContainer.getInstance = function() {
	if (!uwm.treeadmin.ModelObjectContainer.instance) {
		uwm.treeadmin.ModelObjectContainer.instance = new uwm.treeadmin.ModelObjectContainer();
	}
	
	return uwm.treeadmin.ModelObjectContainer.instance;
}
