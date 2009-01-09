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

uwm.ui.EastPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		this.propertyContainer = new uwm.property.PropertyContainer();
		
		Ext.apply(this, {
			region: "east",
			layout: "border",
			collapsible: true,
			split: true,
			width: 250,
			title: "Perspectives",
			items: [new uwm.ui.Perspective({
				highlight: this.highlight
			}), this.propertyContainer]
		});
		
		uwm.ui.EastPanel.superclass.initComponent.apply(this, arguments);
	}
});

uwm.ui.EastPanel.prototype.getPropertyContainer = function() {
	return this.propertyContainer;
}
