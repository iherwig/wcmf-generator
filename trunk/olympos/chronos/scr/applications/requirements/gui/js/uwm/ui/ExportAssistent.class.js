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

	var radioFormItem = this.getRadioFormItem();

	uwm.ui.ExportAssistent.superclass.constructor.call(this, Ext.apply(this, this.getWindowLayout(this.setSelMode(this.getGrid(this.getStore()), this.getTemplate()), this.getDetailPanelItem(), radioFormItem )));
	
	this.addButtons(radioFormItem);
	this.setVisible(true);
	
}
Ext.extend(uwm.ui.ExportAssistent, Ext.Window);

uwm.ui.ExportAssistent.prototype.getRadioFormItem = function(){
	

//return  new Ext.form.RadioGroup({
        
	return {
                    xtype:'fieldset',
                    title: ' Export as : ',
//					id: 'radioGroup',
					autoHeight: true,
//					width: 280,
					width: 300,
                    defaultType: 'radio',  // each item will be a radio button
                    value:'leer',
                    items: [{
						labelSeparator: '', checked: true,
                        boxLabel: 'Microsoft Word',
                        inputValue: 'MicrosoftWord',
						name: 'docformat'
                    },{
						labelSeparator: '',
                        boxLabel: 'Open Office Writer',
                        inputValue: 'OpenOfficeWriter',
						name: 'docformat'
                    },{
						labelSeparator: '',
                        boxLabel: 'PDF',
                        inputValue: 'PDF',
						name: 'docformat'
                    }]
                }
//				)
}

uwm.ui.ExportAssistent.prototype.getTemplate = function() {

	return new Ext.Template([
	'<b><u>Technical Name: </b></u><BR/><BR/><center>{technName}</center><BR/>', 
	//'<b><u>Template Name: </b></u><BR/><BR/><center>{templateName}</center><BR/>', 
	'<b><u>Description: </b></u><BR/><BR/><center>{description}</center><BR/>'])
	
}

uwm.ui.ExportAssistent.prototype.setSelMode = function(grid, Tpl) {

	grid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
		var detailPanel = Ext.getCmp('detailPanel');
		Tpl.overwrite(detailPanel.body, r.data);
	});
	return grid;
}

uwm.ui.ExportAssistent.prototype.getWindowLayout = function(grid, detailPanelItem, radioFormItem) {

	return {
		title: uwm.Dict.translate('Export Assistant'),
		layout: 'column',
		region: 'center',
		height: 330,
		width: 550,
		items: [grid, detailPanelItem, radioFormItem ]
	}
	
}

uwm.ui.ExportAssistent.prototype.getDetailPanelItem = function() {

	return {
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
	
}

uwm.ui.ExportAssistent.prototype.getStore = function() {

	return new Ext.data.SimpleStore({
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
	
}

uwm.ui.ExportAssistent.prototype.getGrid = function(store) {

	return new Ext.grid.GridPanel({
		store: store,
		columns: [{
			header: uwm.Dict.translate('Template Name'),
			width: 233,
			dataIndex: 'templateName',
			sortable: true
		}//, 
		//{ header: uwm.Dict.translate('Technical Name')},
		//{ header: uwm.Dict.translate('Template Name'), width: 233, dataIndex: 'templateName', sortable: true }, 
		//{ header: uwm.Dict.translate('Description'), width: 233, dataIndex: 'description', sortable: true }
		],
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true
		}),
		title: uwm.Dict.translate('Please select to show Details.'),
		split: true,
		region: 'west',
		height: 250,
		width: 250,
		frame: true
	
	});
	
}

uwm.ui.ExportAssistent.prototype.addButtons = function(radioFormItem) {

	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Export'),
		handler: function(radioFormItem) {
			alert('function under construction \n ' 		
			//+ radioFormItem.getValue()
			
			+ radioFormItem.items
			
			);
		}
	}));
	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Cancel'),
		handler: function() {
			this.window.close();
		}
	}));
	
}

uwm.ui.ExportAssistent.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.ExportAssistent.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('Export successfully.'));
}
