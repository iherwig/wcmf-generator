/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.ui");

/**
 * @class A list of all objects of one type in a selected scope.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
uwm.ui.Glossary = function() {
}

uwm.ui.Glossary = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		Ext.apply(this, {
		    layout : "fit",
		    enableDragDrop : false,
		    selModel : new Ext.grid.RowSelectionModel( {
			    singleSelect : true
		    }),
		    iconCls : self.getTreeIcon(),
		    tabTip : uwm.Dict.translate("Lists all glossary terms."),
		    columns : [ {
		        header : "Term",
		        dataIndex : "name",
		        width : 100,
		        sortable : false,
		        hideable : false,
		        renderer : function(value, p, record) {
			        return self.renderer(value, p, record);
		        }
		    } ],
		    hideHeaders : true,
		    store : new Ext.data.Store( {
			    //autoLoad : true,
			        proxy : new uwm.ui.GlossaryProxy()
		        }),
		    viewConfig : {
			    forceFit : true
		    },
		    loadMask: true
		});
		
		uwm.ui.Glossary.superclass.initComponent.apply(this, arguments);
		
		this.buildContextMenu();
		
		this.on("rowclick", function(grid, rowIndex, e) {
			self.showProperties(grid, rowIndex, e);
		});
		
		this.on("rowcontextmenu", function(grid, rowIndex, e) {
			self.showContextMenu(grid, rowIndex, e);
		});
		
		this.on("contextmenu", function(e) {
			self.showContextMenu(undefined, null, e);
		});
		
		this.on("show", function(grid) {
			this.getStore().load();
		}, undefined, {
			single : true
		});

		this.on('show', function() {
			uwm.ui.ExistingContentContainer.getInstance().showPanel(self);
		});
		
		uwm.event.EventBroker.getInstance().addListener( {
		    "changeProperty" : function(modelObject, oldLabel) {
			    self.handleChangePropertyEvent(modelObject, oldLabel);
		    },
		    "create" : function(modelObject) {
			    self.handleCreateEvent(modelObject);
		    },
		    "delete" : function(modelObject) {
			    self.handleDeleteEvent(modelObject);
		    }
		});
	}
})

uwm.ui.Glossary.prototype.buildContextMenu = function() {
	var self = this;
	
	this.contextMenu = new Ext.menu.Menu( {
		items : [ new Ext.menu.Item( {
		    text : uwm.Dict.translate('Add entry'),
		    handler : function(item, e) {
			    self.addEntry(item, e);
		    }
		}), new Ext.menu.Item( {
		    id : uwm.ui.Glossary.CONTEXTMENU_DELETE_ID,
		    text : uwm.Dict.translate('Delete entry'),
		    handler : function(item, e) {
			    self.deleteEntry(item, e);
		    }
		}) ]
	});
}

uwm.ui.Glossary.prototype.showContextMenu = function(grid, rowIndex, e) {
	this.contextMenu.rowIndex = rowIndex;
	
	var deleteEntry = this.contextMenu.items.get(uwm.ui.Glossary.CONTEXTMENU_DELETE_ID);
	
	deleteEntry.setDisabled(rowIndex === null);
	
	this.contextMenu.showAt( [ e.getXY()[0] + 2, e.getXY()[1] + 2 ]);
	
	e.preventDefault();
}

uwm.ui.Glossary.prototype.getSelectedModelObject = function(callback) {
	var oid = this.getStore().getAt(this.contextMenu.rowIndex).get("oid");
	
	uwm.model.ModelContainer.getInstance().loadByOid(oid, callback, 0);
}

uwm.ui.Glossary.prototype.showProperties = function(grid, rowIndex, e) {
	var oid = this.getStore().getAt(rowIndex).get("oid");
	
	var modelObject = uwm.model.ModelContainer.getInstance().createByClassAndOid("Glossary", oid);
	
	uwm.property.PropertyContainer.getInstance().showProperty(modelObject);
	
}

uwm.ui.Glossary.prototype.addEntry = function(item, e) {
	uwm.model.ModelContainer.getInstance().createModelObject("Glossary");
}

uwm.ui.Glossary.prototype.deleteEntry = function(item, e) {
	this.getSelectedModelObject( function(modelObject) {
		uwm.model.ModelContainer.getInstance().deleteByModelNode(modelObject);
	});
}

uwm.ui.Glossary.prototype.getTreeIcon = function() {
	return "glossaryTabIcon";
}
uwm.ui.Glossary.prototype.getName = function() {
	return "Glossary";
}

uwm.ui.Glossary.prototype.renderer = function(value, p, record) {
	return "<dl class='glossary'><dt>" + record.get("name") + "</dt><dd><p><i>" + record.get("entrytype") + "</i></p>" + record.get("notes") + "</dd></dl>";
}

uwm.ui.Glossary.prototype.handleChangePropertyEvent = function(modelObject, oldLabel) {
	var record = this.getRecordByModelObject(modelObject);
	if (record) {
		record.set("name", modelObject.getProperty("Name"));
		record.set("entrytype", modelObject.getProperty("entryType"));
		record.set("notes", modelObject.getProperty("Notes"));
		record.commit();
	}
}

uwm.ui.Glossary.prototype.handleCreateEvent = function(modelObject) {
	if (modelObject.getUwmClassName() == "Glossary") {
		this.getStore().add( [ new Ext.data.Record( {
		    oid : modelObject.getOid(),
		    name : modelObject.getProperty("Name"),
		    entrytype : modelObject.getProperty("entryType"),
		    notes : modelObject.getProperty("Notes")
		}) ]);
	}
}

uwm.ui.Glossary.prototype.handleDeleteEvent = function(modelObject) {
	var record = this.getRecordByModelObject(modelObject);
	if (record) {
		this.getStore().remove(record);
	}
}

uwm.ui.Glossary.prototype.getRecordByModelObject = function(modelObject) {
	return this.getStore().getAt(this.getStore().find('oid', modelObject.getOid()));
}

uwm.ui.Glossary.CONTEXTMENU_DELETE_ID = "deleteGlossaryTerm";
