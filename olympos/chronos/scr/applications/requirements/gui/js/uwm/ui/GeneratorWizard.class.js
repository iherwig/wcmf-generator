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
 * @class The window for exporting domain objects.
 * 
 * @extends Ext.window
 * @constructor
 * @param config
 *            The configuration object.
 * @config oid The oid of the model to export domain object from.
 */
uwm.ui.GeneratorWizard = function(config) {
	var self = this;
	
	this.oid = config.oid;
	
	this.store = new Ext.data.Store( {
	    autoLoad : true,
	    proxy : new uwm.ui.GeneratorWizardProxy()
	});
	
	this.generateButton = new Ext.Button( {
	    text : uwm.Dict.translate("Generate"),
	    disabled: true,
	    handler : function() {
		    var record = self.grid.getSelectionModel().getSelected();
		    
		    var codeName = record.get("name");
		    var codeId = record.get("id");
		    var oid = self.oid;
		    
		    self.destroy();
		    
		    new uwm.ui.LongTaskRunner( {
		        title : uwm.Dict.translate("Generating") + " " + codeName + " ...",
		        call : function(successHandler, errorHandler) {
			        uwm.persistency.Persistency.getInstance().generateCode(codeId, oid, successHandler, errorHandler);
		        },
		        successHandler : function() {
		        },
		        errorHandler : function() {
			        uwm.Util.showMessage(uwm.Dict.translate("Error while generating"), uwm.Dict.translate("The generation was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
		        },
		        isReturningDocument : false
		    }).show();
	    }
	});
	
	this.cancelButton = new Ext.Button( {
	    text : uwm.Dict.translate("Cancel"),
	    handler : function() {
		    self.destroy();
	    }
	});
	
	this.grid = new Ext.grid.GridPanel( {
	    autoHeight : true,
	    store : this.store,
	    colModel : new Ext.grid.ColumnModel( {
		    columns : [ {
		        width : 100,
		        dataIndex : "name"
		    } ]
	    }),
	    viewConfig : {
	        forceFit : true,
	        headersDisabled : true
	    }
	});
	
	this.formPanel = new Ext.FormPanel( {
	    layout : "column",
	    bodyStyle : "padding: 5px;",
	    frame : true,
	    defaults : {
	        columnWidth : 0.5,
	        height : 250,
	        bodyStyle : "padding: 5px;"
	    },
	    items : [ new Ext.form.FieldSet( {
	        title : uwm.Dict.translate("Available Generators"),
	        defaults : {
	            height : 250,
	            width : 220
	        },
	        items : [ this.grid ]
	    }), new Ext.form.FieldSet( {
	        title : uwm.Dict.translate("Information"),
	        labelAlign : "top",
	        labelStyle : "font-weight: bold;",
	        defaults : {
		        minHeight : 50
	        },
	        items : [ new Ext.form.DisplayField( {
	            fieldLabel : uwm.Dict.translate("Target Platform"),
	            name : "targetPlatform"
	        }), new Ext.form.DisplayField( {
	            fieldLabel : uwm.Dict.translate("Description"),
	            name : "description"
	        }) ]
	    }) ],
	    buttons : [ this.generateButton, this.cancelButton ]
	});
	
	this.grid.getSelectionModel().on("rowselect", function(sm, row, rec) {
		self.formPanel.getForm().loadRecord(rec);
		self.formPanel.doLayout();
		self.generateButton.enable();
	})

	uwm.ui.GeneratorWizard.superclass.constructor.call(this, Ext.apply(this, {
	    title : uwm.Dict.translate("Generate Code"),
	    items : [ this.formPanel ],
	    width : 500
	}, config));
	
	this.show();
	this.doLayout();
	this.center();
};

Ext.extend(uwm.ui.GeneratorWizard, Ext.Window);
