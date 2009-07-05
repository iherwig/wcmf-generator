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
			iconCls : this.modelClass.getTreeIconClass(),
			closable : true,
			frame : true,
			autoScroll : true,
			labelAlign : "left",
			labelWidth : 90,
			tbar : [ this.saveButton, this.cancelButton ],
			items : this.modelClass.getEditorItems(),
			msgTarget : "side"
		});
		
		cwe.editor.Editor.superclass.initComponent.apply(this, arguments);
		
		this.on("afterlayout", function(editor, layout) {
			self.doLayout();
		}, undefined, {
			single : true
		});
		
		if (!this.newObject) {
			this.loadFromOid(this.oid);
		}
	}
})

cwe.editor.Editor.prototype.save = function() {
	if (!this.newObject) {
		var record = this.getRecord();
		
		this.getForm().updateRecord(record);
		record.commit();
	} else {
		var record = new cwe.model.ModelRecord(this.modelClass);
		
		this.getForm().updateRecord(record);
		
		var changedFields = record.getChanges();
		
		var self = this;
		
		chi.persistency.Persistency.getInstance().create(this.modelClass.getId(), changedFields, function(data) {
			record.setOid(data.newOid);
			
			self.rawRecords = {};
			self.oid = data.newOid;
			self.rawRecords[data.newOid] = record;
			self.editorContainer.addEditor(data.newOid, self);
		});
		
		this.setTitle(record.getLabel());
		this.newObject = false;
	}
	
}

cwe.editor.Editor.prototype.cancel = function() {
	if (!this.newObject) {
		this.getForm().loadRecord(this.getRecord());
	} else {
		this.findParentBy(function() {
			return true;
		}).remove(this);
	}
}

cwe.editor.Editor.prototype.getRecord = function() {
	return this.rawRecords[this.oid];
}

cwe.editor.Editor.prototype.loadFromOid = function(oid) {
	var self = this;
	
	chi.persistency.Persistency.getInstance().load(oid, 1, function(data) {
		self.rawRecords = data.records;
		self.getForm().loadRecord(data.records[data.oid]);
	});
}
