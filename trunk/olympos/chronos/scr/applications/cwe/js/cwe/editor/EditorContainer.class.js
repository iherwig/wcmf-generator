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
Ext.namespace("cwe.editor");

/**
 * @class The Model Grid Container contains all model girds.
 *
 * <p>
 * The model grid container is a <i>Singleton</i>.
 * </p>
 *
 * @constructor
 */
cwe.editor.EditorContainer = function() {
}

cwe.editor.EditorContainer = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		/**
		 * List of model grids with oid as key.
		 *
		 * @private
		 * @type list of cwe.editor.Editor
		 */
		this.editors = new Ext.util.MixedCollection();
		
		Ext.apply(this, {
			region: "center",
			xtype: "tabpanel",
			enableTabScroll: true,
		});
		
		cwe.editor.EditorContainer.superclass.initComponent.apply(this, arguments);
		
		var self = this;
		
		this.on("remove", function(tabPanel, tab) {
			self.tabClose(tabPanel, tab);
		});
		
	}
})

/**
 * Handler when tab is closed.
 *
 * @private
 */
cwe.editor.EditorContainer.prototype.tabClose = function(tabPanel, tab) {
	if (tab instanceof cwe.editor.Editor) {
		this.editors.remove(tab);
	}
}

cwe.editor.EditorContainer.prototype.loadOrShow = function(record) {
	var editor = this.editors.get(record.getOid());
	
	if (!editor) {
		editor = new cwe.editor.Editor({
			record : record
		});
		this.editors.add(record.getOid(), editor);
		this.add(editor);
	}
	
	editor.show();
	editor.doLayout();
}
