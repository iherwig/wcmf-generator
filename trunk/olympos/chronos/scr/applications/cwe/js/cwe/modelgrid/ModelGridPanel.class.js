/*
 * Copyright (c) 2009 The Olympos Development Team.
 *
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */
Ext.namespace("cwe.modelgrid");

/**
 * @class .
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.modelgrid.ModelGridPanel = function() {
}

cwe.modelgrid.ModelGridPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		this.grid = new cwe.modelgrid.ModelGrid();
		this.editors = new cwe.editor.EditorContainer({
			modelNodeClass: this.modelNodeClass
		});
		
		Ext.apply(this, {
			layout: "border",
			title: chi.Dict.translate(this.modelNodeClass),
			iconCls: this.modelNodeClass + "Icon16x16",
			items: [this.grid, this.editors]
		});
		
		cwe.modelgrid.ModelGridPanel.superclass.initComponent.apply(this, arguments);
	}
});
