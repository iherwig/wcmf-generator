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
Ext.namespace("cwe.modelgrid");

/**
 * @class A list of all objects of one class.
 * 
 * <p>
 * Shows a grid with all objects of the selected class. Supports paging.
 * Provides buttons for creating a new object, editing the selected object(s)
 * and deleting the selected object(s). Additionally, it supports linking an
 * object of this class as target to another object.
 * </p>
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config modelDescription The ModelDescription of this grid.
 * @config editors The Editor Container as target of object of this grid.
 */
cwe.modelgrid.ModelGrid = function(config) {
};

cwe.modelgrid.ModelGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		var self = this;
		
		/**
		 * Number of objects per page.
		 * 
		 * @private
		 * @type int
		 */
		this.objectPerPage = 25;
		
		/**
		 * The currently displayed associate button, if any.
		 * 
		 * @private
		 * @type cwe.modelgrid.AssociateButton
		 */
		this.associateButton = null;
		
		/**
		 * The store holding the objects.
		 * 
		 * @private
		 * @type chi.model.ModelStore
		 */
		this.store = new chi.model.Store( {
			modelDescription : this.modelDescription
		});
		
		/**
		 * The paging toolbar.
		 * 
		 * @private
		 * @type Ext.PagingToolbar
		 */
		this.pagingBar = new Ext.PagingToolbar( {
		    pageSize : this.objectPerPage,
		    store : this.store,
		    displayInfo : true,
		    displayMsg : chi.Dict.translate("Displaying objects {0} &ndash; {1} of {2}"),
		    emptyMsg : chi.Dict.translate("No objects to display")
		});
		
		/**
		 * The button for creating a new object of this class.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.createButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Create"),
		    iconCls : "createButton",
		    handler : function() {
			    self.createNew();
		    }
		});
		
		/**
		 * The button for editing the selected object(s).
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.editButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Edit"),
		    iconCls : "editButton",
		    handler : function() {
			    var records = self.getSelectionModel().getSelections();
			    
			    for ( var i = 0; i < records.length; i++) {
				    self.editors.loadOrShow(records[i].getOid(), records[i].getLabel());
			    }
		    }
		});
		
		/**
		 * The button for deleting the selected object(s).
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.deleteButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Delete"),
		    iconCls : "deleteButton",
		    handler : function() {
			    self.deleteSelected();
		    }
		});
		
		Ext.apply(this, {
		    region : "north",
		    height : 250,
		    split : true,
		    tbar : [ this.createButton, this.editButton, this.deleteButton ],
		    loadMask : true,
		    selModel : new Ext.grid.RowSelectionModel( {
		        singleSelect : false,
		        listeners : {
			        "selectionchange" : function(selModel) {
				        self.updateAssociateButton();
			        }
		        }
		    }),
		    columns : this.modelDescription.getGridColumns(),
		    store : this.store,
		    plugins : [ new Ext.ux.grid.RowEditor( {
		        saveText : chi.Dict.translate("Save"),
		        cancelText : chi.Dict.translate("Cancel"),
		        clicksToEdit : 2,
		        listeners : {
			        "afteredit" : function() {
				        self.store.commitChanges();
			        }
		        }
		    }) ],
		    viewConfig : {
		        forceFit : true,
		        markDirty : false
		    },
		    bbar : this.pagingBar
		});
		
		cwe.modelgrid.ModelGrid.superclass.initComponent.apply(this, arguments);
		
		this.store.load( {
			params : {
			    start : 0,
			    limit : this.objectPerPage
			}
		});
	}
});

/**
 * Creates the form for entering a new object of this class.
 * 
 * <p>
 * The object is actually created only when the user clicks the save button.
 * </p>
 */
cwe.modelgrid.ModelGrid.prototype.createNew = function() {
	var self = this;
	
	self.editors.loadOrShow(null, "<i>" + self.modelDescription.getNewLabel() + "</i>", true);
};

/**
 * Deletes the selected objects.
 * 
 * <p>
 * The user has to confirm the deletion in a pop-up box prior to actual
 * deletion.
 * </p>
 */
cwe.modelgrid.ModelGrid.prototype.deleteSelected = function() {
	var records = this.getSelectionModel().getSelections();
	
	var self = this;
	
	if (records.length > 0) {
		
		var msgText = "<p>" + chi.Dict.translate("Are you sure you want to delete the following instances of ${1}:", this.modelDescription.getName()) + "</p><ul class='deleteMsgBox'>";
		for ( var i = 0; i < records.length; i++) {
			msgText += "<li>" + records[i].getLabel() + "</li>";
		}
		msgText += "</ul>";
		
		Ext.MessageBox.show( {
		    title : chi.Dict.translate("Delete Objects"),
		    msg : msgText,
		    buttons : Ext.MessageBox.YESNO,
		    fn : function(buttonId) {
			    if (buttonId == "yes") {
				    var actionSet = new chi.persistency.ActionSet();
				    
				    for ( var i = 0; i < records.length; i++) {
					    actionSet.addDestroy(records[i].getOid());
				    }
				    
				    actionSet.commit(function(data) {
					    var store = self.getStore();
					    
					    for ( var i = 0; i < records.length; i++) {
						    store.remove(records[i]);
						    
						    self.editors.removeEditor(records[i].getOid());
					    }
				    });
			    }
		    }
		});
	}
};

/**
 * Opens an editor of the selected object.
 * 
 * <p>
 * Handler to doubleclick on a row.
 * </p>
 * 
 * @param {cwe.modelgrid.ModelGrid}
 *            grid The grid which was doubleclicked, i. e. <code>this</code>.
 * @param rowIndex
 *            {int} Index of the doubleclicked row.
 * @param e
 *            {Ext.Event} Event object.
 */
cwe.modelgrid.ModelGrid.prototype.openEditor = function(grid, rowIndex, e) {
	var store = this.getStore();
	var record = store.getAt(rowIndex);
	
	this.editors.loadOrShow(record.getOid(), record.getLabel());
};

/**
 * Adds a button for associating objects of this grid as target.
 * 
 * <p>
 * Only one associate button is allowed per grid, thus all previous buttons are
 * removed.
 * </p>
 * <p>
 * The grid selection is cleared.
 * </p>
 * 
 * @param {cwe.modelgrid.AssociateButton}
 *            button The button to add.
 */
cwe.modelgrid.ModelGrid.prototype.addAssociateButton = function(button) {
	if (this.associateButton) {
		this.getTopToolbar().remove(this.associateButton);
	}
	
	button.grid = this;
	
	this.associateButton = button;
	
	this.getTopToolbar().add(button);
	
	this.getSelectionModel().clearSelections();
	
	this.doLayout();
};

/**
 * Removes the associate button.
 */
cwe.modelgrid.ModelGrid.prototype.removeAssociateButton = function() {
	if (this.associateButton) {
		this.getTopToolbar().remove(this.associateButton);
	}
};

/**
 * Enables or disables the associate button according to grid selection status.
 * 
 * <p>
 * If nothing is selected, the button is disabled. If the button is a single
 * select button, the button is only enabled if only one row is selected. If the
 * button is a multi select button it is enabled as long as at least one row is
 * selected.
 * </p>
 * 
 * @private
 */
cwe.modelgrid.ModelGrid.prototype.updateAssociateButton = function() {
	if (this.associateButton) {
		var count = this.getSelectionModel().getCount();
		
		if (count == 0 || this.associateButton.isSingleSelect() && count > 1) {
			this.associateButton.disable();
		} else {
			this.associateButton.enable();
		}
	}
};
