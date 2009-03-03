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

/**
 * @class Container for showing perspective switching buttons and Property View.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.ui.EastPanel = function() {
}

uwm.ui.EastPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		this.propertyContainer = new uwm.property.PropertyContainer();

		Ext.apply(this, {
			region :"east",
			layout :"border",
			collapsible :true,
			split :true,
			width :250,
			title :uwm.Dict.translate('Perspectives'),
			items : [ new uwm.ui.Perspective( {
				highlight :this.highlight
			}), this.propertyContainer ]
		});

		uwm.ui.EastPanel.superclass.initComponent.apply(this, arguments);

		this.myCollapsed = false;

		var self = this;

		this.on("collapse", function() {
			self.myCollapsed = true;
		});
		this.on("expand", function() {
			self.myCollapsed = false;
		});
	}
});

uwm.ui.EastPanel.prototype.isCollapsed = function() {
	return this.myCollapsed;
}

uwm.ui.EastPanel.prototype.getPropertyContainer = function() {
	return this.propertyContainer;
}
