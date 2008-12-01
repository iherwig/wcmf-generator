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

uwm.ui.HtmlEditor = Ext.extend(Ext.form.HtmlEditor, {
	initComponent: function() {
		Ext.apply(this, {
			enableAlignments: false,
			enableColors: false,
			enableFont: false,
			enableFontSize: false,
			enableLinks: false,
			enableSourceEdit: false
		})
		
		uwm.ui.HtmlEditor.superclass.initComponent.apply(this, arguments);
	}
})
