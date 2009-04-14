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
Ext.namespace("uwm.ui");

/**
 * @class The window which shows an export assistent and allows export operations.
 *
 * @extends Ext.window
 * @constructor
 * @param object The object for which the export shall be shown.
 */
uwm.ui.ExportAssistent = function() {

	var radioFormItem = new Ext.FormPanel({
		name: 'formPanel',
		title: uwm.Dict.translate('document format'),
		labelWidth: 70,
		width: 280,
		frame: true,
//		renderTo:'form-ct',
		items: {
			xtype: 'fieldset',
			name: 'fieldset',
			title: ' Export as : ',
			autoHeight: true,
			width: 280,
			defaultType: 'radio', // each item will be a radio button
			items: [{
				labelSeparator: '',
				checked: true,
				boxLabel: 'Microsoft Word',
				inputValue: 'MicrosoftWord',
				name: 'docformat'
			}, {
				labelSeparator: '',
				boxLabel: 'Open Office Writer',
				inputValue: 'OpenOfficeWriter',
				name: 'docformat'
			}, {
				labelSeparator: '',
				boxLabel: 'PDF',
				inputValue: 'PDF',
				name: 'docformat'
			}]
		}
	
	});
	
	var store = new Ext.data.SimpleStore({
		data: [{
			technName: 'test1',
			templateName: 'testest1',
			description: 'testestest1'
		}, {
			technName: 'test2',
			templateName: 'testest2',
			description: 'testestest2'
		}, {
			technName: 'test3',
			templateName: 'testest3',
			description: 'testestest3'
		}],
		fields: [{
			name: 'technName',
			mapping: 'technName'
		}, {
			name: 'templateName',
			mapping: 'templateName'
		}, {
			name: 'description',
			mapping: 'description'
		}]
	});
	
	var grid = new Ext.grid.GridPanel({
		store: store,
		columns: [{
			header: uwm.Dict.translate('Template Name'),
			width: 233,
			dataIndex: 'templateName',
			sortable: true
		}		//'Technical Name'//'Template Name'//'Description'
		],
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true
		}),
		title: uwm.Dict.translate('Please select to show Details.'),
		split: true,
		region: 'west',
		height: 300,
		width: 250,
		frame: true
	
	});

	var detailPanel = {
		id: 'detailPanel',
		title: uwm.Dict.translate('detailed description'),
		html: '<i>' + uwm.Dict.translate('< detailed description >') + '</i>',
		split: true,
		region: 'east',
		height: 170,
		width: 280,
		frame: true,
		bodyStyle: {
			padding: '7px'
		}
	}
	var template = new Ext.Template(['<b><u>Technical Name: </b></u><BR/><BR/><center>{technName}</center><BR/>', '<b><u>Description: </b></u><BR/><BR/><center>{description}</center><BR/>'])
	grid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
		var detailPanel = Ext.getCmp('detailPanel');
		template.overwrite(detailPanel.body, r.data);
	});
	
	var winLayout = {
		title: uwm.Dict.translate('Export Assistant'),
		layout: 'column',
		region: 'center',
		height: 400,
		width: 550,
		items: [grid, detailPanel, radioFormItem]
	};
	
	uwm.ui.ExportAssistent.superclass.constructor.call(this, Ext.apply(this, winLayout));

//	var detailPanel = Ext.getCmp('detailPanel');
	this.addButton( 
		uwm.Dict.translate('Export'),
		function() {
			var doctypeSelected = radioFormItem.getForm().getValues(true).split('docformat=')[1];
			var gridValueSelected = grid.selModel.lastActive ; //.last
			alert('function under construction \n '	+ doctypeSelected + '\n' + gridValueSelected);
			}, 
		[grid, radioFormItem]
	);
	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Cancel'),
		handler: function() {
			this.window.close();
		}
	}));
	
	this.setVisible(true);
	
}
Ext.extend(uwm.ui.ExportAssistent, Ext.Window);

uwm.ui.ExportAssistent.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.ExportAssistent.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('Export successfully.'));
}
