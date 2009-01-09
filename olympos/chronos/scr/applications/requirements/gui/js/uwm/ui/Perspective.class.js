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
		var self = this;
	
		this.defaultButton = new Ext.Toolbar.Button({
			text: "Default",
			enableToggle: true,
			pressed: this.highlight == "default",
			highlight: this.highlight,
			highlightState: "default",
			handler: self.handleClick
		});
		this.adminButton = new Ext.Toolbar.Button({
			text: "Admin",
			enableToggle: true,
			pressed: this.highlight == "admin",
			highlight: this.highlight,
			highlightState: "admin",
			handler: self.handleClick
		});
		
		Ext.apply(this, {
			region: "north",
			collapsible: false,
			split: false,
			items: [this.defaultButton, this.adminButton]
		});
		
		uwm.ui.Perspective.superclass.initComponent.apply(this, arguments);
	}
});

uwm.ui.Perspective.prototype.handleClick = function(button, e) {
	button.toggle(this.highlight == button.highlightState);
	uwm.Uwm.getInstance().switchWorkbench(button.highlightState);
}
