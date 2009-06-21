/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.editor");

/**
 * @class Abstract base class for all Property forms.
 * 
 * @extends Ext.form.FormPanel
 * @see cwe.editor.PropertyContainer
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.editor.Editor = function() {
}

cwe.editor.Editor = Ext.extend(Ext.form.FormPanel, {
	initComponent : function() {
		var self = this;
		
		this.saveButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Save"),
		    iconCls : "saveButton",
		    handler : function() {
			    self.save();
		    }
		});
		
		this.cancelButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Cancel"),
		    iconCls : "cancelButton",
		    handler : function() {
			    self.cancel();
		    }
		});
		
		Ext.apply(this, {
		    iconCls : this.record.getModelClass().getTreeIconClass(),
		    closable : true,
		    title : this.record.getLabel(),
		    frame : true,
		    autoScroll : true,
		    labelAlign : "left",
		    labelWidth : 90,
		    tbar : [ this.saveButton, this.cancelButton ],
		    items : this.record.getModelClass().getEditorItems(),
		    msgTarget : "side"
		});
		
		cwe.editor.Editor.superclass.initComponent.apply(this, arguments);
		
		this.on("afterlayout", function(editor, layout) {
			self.getForm().loadRecord(this.record);
			self.doLayout();
		}, undefined, {
			single : true
		});
	}
})

cwe.editor.Editor.prototype.save = function() {
	this.getForm().updateRecord(this.record);
	this.record.commit();
}

cwe.editor.Editor.prototype.cancel = function() {
	this.record.reject();
	this.getForm().loadRecord(this.record);
}
