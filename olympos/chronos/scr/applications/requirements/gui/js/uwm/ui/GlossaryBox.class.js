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
 * @class The window which shows a Glossary
 * 
 * @extends Ext.window
 * @constructor
 * @param object
 *            The objects for which the Glossary shall be shown.
 */
uwm.ui.GlossaryBox = function(uwmClassName, oid) {
	var self = this;
	this.uwmClassName = uwmClassName;
	this.oid = oid;
	
	uwm.persistency.Persistency.getInstance().glossary( function(options, data) {
		self.JsonSuccess(options, data);
	}, function(options, data, errorMessage) {
		Ext.MessageBox.alert('Error', errorMessage);
	});

}
Ext.extend(uwm.ui.GlossaryBox, Ext.Window);

uwm.ui.GlossaryBox.prototype.JsonSuccess = function(options, data) {
	var box = this;
	var datapart = [];
	var fieldspart = [];
	var gloss = data.glossary;
	var gescount = data.gescount;
	
	for ( var i = 0; i < gloss.length; i++) {
		datapart.push( {
		    'name' : gloss[i].name,
		});
	}
	
	fieldspart.push( {
			name: 'name',
			mapping: 'name'
		});
	
	var eastore = new Ext.data.SimpleStore( {
		data: datapart,
		fields: fieldspart
	});
	
	var grid = new Ext.grid.GridPanel( {
	    store : eastore,
	    columns : [{
	        header : uwm.Dict.translate('name'),
	        width : 500,
	        dataIndex : 'name',
	        sortable : true
	    }],
		width : 550,
	    height : 350
	});
	
	var winLayout = {
		height: 350,
		width: 550,
		title: uwm.Dict.translate('Glossary'),
		items : [grid]
	};

	uwm.ui.GlossaryBox.superclass.constructor.call(this, Ext.apply(this, winLayout));
	
	this.addButton(uwm.Dict.translate('Add'), function() {
		alert('under construction');
	}, this);
	
	this.addButton(uwm.Dict.translate('Edit'), function() {
		alert('coming soon');
	}, this);
	
	this.addButton(uwm.Dict.translate('Cancel'), function() {
		this.close();
	}, this);
	
	this.setVisible(true);

}

uwm.ui.GlossaryBox.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.GlossaryBox.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('ok'));
}
