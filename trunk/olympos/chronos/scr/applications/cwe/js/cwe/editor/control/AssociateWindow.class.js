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
Ext.namespace("cwe.editor.control");

/**
 * @class A form field for associating multiple targets.
 * 
 * <p>
 * Displays a grid as form field. The grid contains the label of each associated
 * object. Provides buttons for associating and disassociating objects. If the
 * associate button is clicked, the model grid of the target Model Class is
 * opened, including a button to add selected elements to this form field. If
 * the disassociate button is clicked, all selected elements of this form field
 * are removed.
 * </p>
 * 
 * <p>
 * it is expected that initially set target objects are contained in this form
 * field's editor's rawRecord attribute.
 * </p>
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config fieldLabel The label of this form field.
 * @config name The name of this form field.
 * @config dataIndex The name of the record field containing this form field's
 *         value. Must be of type {@link cwe.model.ModelReferenceList}.
 * @config targetCweModelElementId The CweModelElementId of the target Model
 *         Class,
 */
cwe.editor.control.AssociateWindow = function(config) {
};

cwe.editor.control.AssociateWindow = Ext.extend(Ext.Window, {
	initComponent : function() {
		var self = this;
		
		this.objectPerPage = 25;
		
		/**
		 * The button for switching to full grid.
		 * 
		 * @private
		 * @type Ext.Toolbar.Button
		 */
		this.fullGridButton = new Ext.Toolbar.Button( {
		    text : chi.Dict.translate("Expand to full grid"),
		    iconCls : "expandButton",
		    handler : function() {
			    self.openFullGrid();
		    }
		});
		
		/**
		 * The store holding the objects.
		 * 
		 * @private
		 * @type cwe.model.ModelStore
		 */
		this.store = new cwe.model.Store( {
			modelClass : this.modelClass
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
		
		this.grid = new Ext.grid.GridPanel( {
		    loadMask : true,
		    selModel : new Ext.grid.RowSelectionModel( {
		        singleSelect : this.singleSelect,
		        listeners : {
			        "selectionchange" : function(selModel) {
				        // self.updateAssociateButton();
			}
		}
		    }),
		    columns : this.modelClass.getLabelColumns(),
		    store : this.store,
		    viewConfig : {
		        forceFit : true,
		        markDirty : false
		    },
		    bbar : this.pagingBar
		});
		
		this.associateButton = new Ext.Button( {
		    text : chi.Dict.translate("Associate"),
		    iconCls : "associateButton",
		    handler : function() {
			    self.sourceHandler(self.grid.getSelectionModel().getSelections());
			    self.destroy();
		    }
		});
		
		this.cancelButton = new Ext.Button( {
		    text : chi.Dict.translate("Cancel"),
		    iconClas : "cancelButton",
		    handler : function() {
			    self.destroy();
		    }
		});
		
		this.label = chi.Dict.translate("Associate as ${1} with ${2} \"${3}\"", this.roleName, this.editor.modelClass.getName(), this.editor.getLabel());
		
		Ext.apply(this, {
		    title : this.label,
		    layout : "fit",
		    width : 600,
		    height : 400,
		    tbar : [ this.fullGridButton ],
		    items : [ this.grid ],
		    buttons : [ this.associateButton, this.cancelButton ]
		});
		
		cwe.editor.control.AssociateWindow.superclass.initComponent.apply(this, arguments);
		
		this.on("show", function() {
			self.store.load( {
				params : {
				    start : 0,
				    limit : self.objectPerPage
				}
			});
			self.doLayout();
		});
	}
});

cwe.editor.control.AssociateWindow.prototype.openFullGrid = function() {
	var self = this;
	
	var grid = cwe.modelgrid.ModelGridContainer.getInstance().loadOrShow(this.modelClass).getGrid();
	
	var button = new cwe.modelgrid.AssociateButton( {
	    modelClass : this.editor.getModelClass(),
	    singleSelect : this.singleSelect,
	    label : this.label,
	    sourceHandler : function(records) {
		    self.sourceHandler(records);
		    
		    grid.removeAssociateButton(button);
		    self.editor.removeAssociateButton(button);
		    self.editor.show();
	    }
	});
	
	grid.addAssociateButton(button);
	
	this.editor.addAssociateButton(grid, button);
	
	this.destroy();
};
