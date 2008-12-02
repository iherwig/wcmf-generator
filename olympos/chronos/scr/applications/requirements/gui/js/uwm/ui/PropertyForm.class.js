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

uwm.ui.PropertyForm = Ext.extend(Ext.FormPanel, {
	initComponent: function() {
		Ext.apply(this, {
			labelWidth: 90,
			frame: true,
			labelAlign: "top",
			autoScroll: true,
			defaults: {
				width: 220
			},
			defaultType: "textfield",
			msgTarget: "side"
		})
		
		uwm.ui.PropertyForm.superclass.initComponent.apply(this, arguments);
	}
})
