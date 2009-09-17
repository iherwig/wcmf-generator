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
 * @class The window which shows an export assistent and allows export
 *        operations.
 * 
 * @extends Ext.window
 * @constructor
 * @param object
 *            The object for which the export shall be shown.
 */
uwm.ui.ExportAssistent = function(uwmClassName, oid) {
	var self = this;
	
	this.uwmClassName = uwmClassName;
	this.oid = oid;
	
	uwm.persistency.Persistency.getInstance().templatelist(function(options, data) {
		self.JsonSuccess(options, data);
	}, function(options, data, errorMessage) {
		Ext.MessageBox.alert('Error', errorMessage);
	});
	
}
Ext.extend(uwm.ui.ExportAssistent, Ext.Window);

uwm.ui.ExportAssistent.prototype.JsonSuccess = function(options, data) {
	
	var assistant = this;
	
	var docTypeFormItem = new Ext.FormPanel( {
	    name : 'formPanel',
	    title : uwm.Dict.translate('document format'),
	    labelWidth : 70,
	    width : 280,
	    frame : true,
	    // renderTo:'form-ct',
	    items : [{
	        xtype : 'fieldset',
	        name : 'fieldsetDocFormat',
	        id : 'fieldsetDocFormat',
	        title : ' Export as : ',
	        autoHeight : true,
	        width : 280,
	        defaultType : 'radio', // each item will be a radio button
	        items : [ {
	            labelSeparator : '',
	            checked : true,
	            boxLabel : 'Microsoft Word',
	            inputValue : 'doc',
	            name : 'docformat'
	        }, {
	            labelSeparator : '',
	            boxLabel : 'Open Office Writer',
	            inputValue : 'odt',
	            name : 'docformat'
	        }, {
	            labelSeparator : '',
	            boxLabel : 'PDF',
	            inputValue : 'pdf',
	            name : 'docformat'
	        } ]
	    }, {
	        xtype : 'fieldset',
	        name : 'fieldsetDiagrams',
	        id : 'fieldsetDiagrams',
	        title : ' Diagrams : ',
	        autoHeight : true,
	        width : 280,
	        defaultType : 'radio', // each item will be a radio button
	        items : [ {
	            labelSeparator : '',
	            checked : true,
	            boxLabel : 'no diagrams',
	            inputValue : 'ignore',
	            name : 'diagrams'
	        }, {
	            labelSeparator : '',
	            boxLabel : 'virtual packages',
	            inputValue : 'virtual',
	            name : 'diagrams'
	        } ]
	    }
			]
	});
	
	// prepare fieldsetDiagrams for diagram-only export
	if (this.uwmClassName == 'Diagram') {
		var diagramField = docTypeFormItem.findById('fieldsetDiagrams');
		diagramField.items.each(function(i) {
				if (i.inputValue == 'virtual') {
					i.setValue(true);
				}
		}, this);
	}
	
	var datapart = [];
	var fieldspart = [];
	
	var technicalNames = data.technicalNames;
	var titles = data.titles;
	var descriptions = data.descriptions;
	
	for ( var i = 0; i < technicalNames.length; i++) {
		datapart.push( {
		    'technName' : technicalNames[i],
		    'templateName' : titles[i],
		    'description' : descriptions[i]
		});
	}
	
	fieldspart.push( {
	    name : 'technName',
	    mapping : 'technName'
	}, {
	    name : 'templateName',
	    mapping : 'templateName'
	}, {
	    name : 'description',
	    mapping : 'description'
	});
	
	var eastore = new Ext.data.SimpleStore( {
	    data : datapart,
	    fields : fieldspart
	});
	
	var grid = new Ext.grid.GridPanel( {
	    store : eastore,
	    columns : [ {
	        header : uwm.Dict.translate('Template Name'),
	        width : 233,
	        dataIndex : 'templateName',
	        sortable : true
	    } // 'Technical Name'// 'Template Name'//'Description'
	    ],
	    sm : new Ext.grid.RowSelectionModel( {
		    singleSelect : true
	    }),
	    title : uwm.Dict.translate('Please select to show Details.'),
	    split : true,
	    region : 'west',
	    height : 300,
	    width : 250,
	    frame : true
	
	});
	
	var detailPanel = {
	    id : 'detailPanel',
	    title : uwm.Dict.translate('detailed description'),
	    html : '<i>' + uwm.Dict.translate('< detailed description >') + '</i>',
	    split : true,
	    region : 'east',
	    height : 170,
	    width : 280,
	    frame : true,
	    bodyStyle : {
		    padding : '7px'
	    }
	}
	var template = new Ext.Template( [ '<b><u>Technical Name: </b></u><BR/><BR/><center>{technName}</center><BR/>', '<b><u>Description: </b></u><BR/><BR/><center>{description}</center><BR/>' ])
	grid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
		var detailPanel = Ext.getCmp('detailPanel');
		template.overwrite(detailPanel.body, r.data);
	});
	
	var winLayout = {
	    title : uwm.Dict.translate('Export Assistant'),
	    layout : 'column',
	    region : 'center',
	    height : 500,
	    width : 550,
	    items : [ grid, detailPanel, docTypeFormItem ]
	};
	
	uwm.ui.ExportAssistent.superclass.constructor.call(this, Ext.apply(this, winLayout));
	
	// var detailPanel = Ext.getCmp('detailPanel');
	this.addButton(uwm.Dict.translate('Export'), function() {
		var doctypeSelected = docTypeFormItem.getForm().getValues().docformat;
		var diagramSelected = docTypeFormItem.getForm().getValues().diagrams;
		var gridSelectedIndex = grid.selModel.lastActive;
		var templateSelected = grid.getStore().getAt(gridSelectedIndex).get("technName");
		
		assistant.close();
		
		var startModel = '';
		var startPackage = '';
		if (assistant.uwmClassName == 'Model')
			startModel = assistant.oid;
		else if (assistant.uwmClassName == 'Package')
			startPackage = assistant.oid;
		else if (assistant.uwmClassName == 'Diagram')
			startPackage = assistant.oid;
		
		var localization = uwm.i18n.Localization.getInstance();
		var userLanguage = localization.getModelLanguage();
		
		new uwm.ui.LongTaskRunner( {
		    title : uwm.Dict.translate('Exporting Documentation ...'),
		    call : function(successHandler, errorHandler) {
			    uwm.persistency.Persistency.getInstance().exportDoc(templateSelected, startModel, startPackage, doctypeSelected, diagramSelected, userLanguage, successHandler, errorHandler);
		    },
		    successHandler : function(data) {},
		    errorHandler : function(data) {
			    uwm.Util.showMessage(uwm.Dict.translate("Error while exporting"), uwm.Dict.translate("The export was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
		    },
		    isReturningDocument : true
		}).show();
	}, [ grid, docTypeFormItem ]);
	
	this.addButton(uwm.Dict.translate('Cancel'), function() {
		this.close();
	}, this);
	
	this.setVisible(true);
	
}

uwm.ui.ExportAssistent.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.ExportAssistent.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('Export successfully.'));
}
