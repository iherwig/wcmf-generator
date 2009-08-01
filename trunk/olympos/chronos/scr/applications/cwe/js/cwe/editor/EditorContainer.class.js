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
 * @class The Model Editor Container contains all editors of one Model Class.
 * 
 * @constructor
 * @extends Ext.TabPanel
 * @see cwe.editor.Editor
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class of the editors.
 */
cwe.editor.EditorContainer = function() {
}

cwe.editor.EditorContainer = Ext.extend(Ext.TabPanel, {
	initComponent: function() {
		/**
		 * List of editors oid as key.
		 * 
		 * @private
		 * @type Ext.util.MixedCollection
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
		this.on("show", function(container) {
			container.ownerCt.ownerCt.setActiveTab(container.ownerCt);
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
		tab.removeAllAssociateButtons();
		this.editors.remove(tab);
	}
}

/**
 * Load or shows (if already loaded) an editor for the object with the selected
 * oid.
 * 
 * @param {String}
 *            oid The oid of the object to show. <code>null</code> for new
 *            objects.
 * @param {String}
 *            label The label to use as title for the editor tab.
 * @param {boolean}
 *            newObject whether to edit a new object.
 */
cwe.editor.EditorContainer.prototype.loadOrShow = function(oid, label, newObject) {
	var editor = this.editors.get(oid);
	
	if (!editor) {
		editor = new cwe.editor.Editor({
			oid : oid,
			title: label || chi.Dict.translate("(no label)"),
			newObject: newObject,
			modelClass: this.modelClass,
			editorContainer: this
		});
		this.addEditor(oid, editor);
		this.add(editor);
	}
	
	editor.show();
	editor.doLayout();
}

/**
 * Adds an editor to the container.
 * 
 * @private
 * @param {String}
 *            oid The oid of the edited object.
 * @param {cwe.editor.Editor}
 *            editor The editor to ad..
 */
cwe.editor.EditorContainer.prototype.addEditor = function(oid, editor) {
	this.editors.add(oid, editor);
}

/**
 * Removes an editor by oid.
 * 
 * @param {String}
 *            oid The oid of the edited object to remove the editor.
 */
cwe.editor.EditorContainer.prototype.removeEditor = function(oid) {
	var editor = this.editors.removeKey(oid);
	this.remove(editor);
}
