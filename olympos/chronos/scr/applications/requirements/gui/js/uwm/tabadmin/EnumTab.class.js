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
Ext.namespace("uwm.tabadmin");

/**
 * @class One tab in admin view, allowing management of a class of TechnicalObjcts.
 * 
 * @extends Ext.grid.GridPanel
 * @see uwm.model.TechnicalObject
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.tabadmin.EnumTab = function(config) {
	this.modelClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(config.uwmClassName);
	
	var self = this;
	
	this.addEntryButton = new Ext.Toolbar.Button({
		id: "addEntry",
		text: uwm.Dict.translate('Add new entry'),
		handler: function(e, toolEl, panel) {
			self.addEntry();
		}
	});
	this.removeEntryButton = new Ext.Toolbar.Button({
		id: "removeEntry",
		text: uwm.Dict.translate('Remove entry'),
		disabled: true,
		handler: function(e, toolEl, panel) {
			self.removeEntry();
		}
	});
	
	uwm.tabadmin.EnumTab.superclass.constructor.call(this, Ext.apply(this, {
		layout: "fit",
		selModel: new Ext.grid.RowSelectionModel({
			singleSelect: true
		}),
		title: this.modelClass.getUwmClassName(),
		//iconCls: this.modelClass.getGridTabIconClass(),
		columns: [{
			header: uwm.Dict.translate('Label'),
			dataIndex: "label",
			width: 255,
			sortable: true
		}],
		store: new Ext.data.Store({
			autoLoad: true,
			proxy: new uwm.tabadmin.GridProxy({
				listType: config.uwmClassName,
				actionSet: config.actionSet
			})
		}),
		tbar: [this.addEntryButton, this.removeEntryButton]
	}, config));
	
	this.on("rowclick", function(grid, rowIndex, e) {
		self.handleRowClick(grid, rowIndex, e);
	});
	
	uwm.event.EventBroker.getInstance().addListener({
		"changeLabel": function(modelObject, oldLabel) {
			self.handleChangeLabelEvent(modelObject, oldLabel);
		},
		"create": function(modelObject) {
			self.handleCreateEvent(modelObject);
		},
		"delete": function(modelObject) {
			self.handleDeleteEvent(modelObject);
		}
	});
}

Ext.extend(uwm.tabadmin.EnumTab, Ext.grid.GridPanel);

uwm.tabadmin.EnumTab.prototype.handleRowClick = function(grid, rowIndex, e) {
	this.removeEntryButton.setDisabled(false);
	
	var record = this.getStore().getAt(rowIndex);
	var modelObject = this.getModelObjectByRecord(record);
	
	uwm.property.PropertyContainer.getInstance().showProperty(modelObject);
}

uwm.tabadmin.EnumTab.prototype.handleChangeLabelEvent = function(modelObject, oldLabel) {
	var record = this.getRecordByModelObject(modelObject);
	if (record) {
		record.set("Name", modelObject.getProperty("Name"));
		record.commit();
	}
}

uwm.tabadmin.EnumTab.prototype.handleCreateEvent = function(modelObject) {
	if (modelObject.getUwmClassName() == this.modelClass.getUwmClassName()) {
		this.getStore().add([new Ext.data.Record({
			oid: modelObject.getOid(),
			uwmClassName: modelObject.getUwmClassName(),
			Name: modelObject.getProperty("Name")
		})]);
	}
}

uwm.tabadmin.EnumTab.prototype.handleDeleteEvent = function(modelObject) {
	var record = this.getRecordByModelObject(modelObject);
	if (record) {
		this.getStore().remove(record);
	}
}

uwm.tabadmin.EnumTab.prototype.addEntry = function() {
	uwm.model.ModelContainer.getInstance().createModelObject(this.modelClass.getUwmClassName());
}

uwm.tabadmin.EnumTab.prototype.removeEntry = function() {
	var record = this.getSelectionModel().getSelected();
	if (record) {
		var modelObject = this.getModelObjectByRecord(record);
		uwm.model.ModelContainer.getInstance().deleteByModelNode(modelObject);
	}
	
	this.removeEntryButton.setDisabled(true);
}

uwm.tabadmin.EnumTab.prototype.getModelObjectByRecord = function(record) {
	return uwm.model.ModelContainer.getInstance().createByClassAndOid(record.get("uwmClassName"), record.get("oid"));
}

uwm.tabadmin.EnumTab.prototype.getRecordByModelObject = function(modelObject) {
	return this.getStore().getAt(this.getStore().find("oid", modelObject.getOid()));
}
