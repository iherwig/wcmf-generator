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
Ext.namespace("uwm.ui");

uwm.ui.Perspective = Ext.extend(Ext.Toolbar, {
	initComponent: function() {
	
		this.defaultButton = new Ext.Toolbar.Button({
			text: "Default",
			enableToggle: true,
			pressed: this.highlight == "default"
		});
		this.tabButton = new Ext.Toolbar.Button({
			text: "Admin Tabs",
			enableToggle: true,
			pressed: this.highlight == "tab"
		});
		this.treeButton = new Ext.Toolbar.Button({
			text: "Admin Tree",
			enableToggle: true,
			pressed: this.highlight == "tree"
		});
		
		Ext.apply(this, {
			region: "north",
			collapsible: false,
			split: false,
			items: [this.defaultButton, this.tabButton, this.treeButton]
		});
		
		uwm.ui.Perspective.superclass.initComponent.apply(this, arguments);
	}
});
