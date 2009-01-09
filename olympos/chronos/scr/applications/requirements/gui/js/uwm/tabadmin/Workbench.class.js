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
Ext.namespace("uwm.tabadmin");

uwm.tabadmin.Workbench = function(config) {
	this.tabPanel = new Ext.TabPanel({
		region: "center"
	});
	this.eastPanel = new uwm.ui.EastPanel({
		highlight: "admin"
	})
	
	uwm.tabadmin.Workbench.superclass.constructor.call(this, Ext.apply(this, {
		items: [this.tabPanel, this.eastPanel]
	}, config));
	
	
	this.tabPanel.activate(this.tabPanel.add(new uwm.tabadmin.EnumTab({
		uwmClassName: "ChiFeatureStatus"
	})));
	this.tabPanel.add(new uwm.tabadmin.EnumTab({
		uwmClassName: "ChiRequirementType"
	}));
}

Ext.extend(uwm.tabadmin.Workbench, uwm.ui.AbstractWorkbench);
