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

Ext.namespace("cwb.ui");

/**
 * TabPanel containing package weight, package tree and InfoGrid tabs
 */
cwb.ui.ModelChooser = function() {
};

cwb.ui.ModelChooser = Ext.extend(Ext.Panel, {
	initComponent: function() {
		
		var self = this;
	
		this.selectModelBox = new Ext.form.ComboBox( {
		    store: new Ext.data.SimpleStore( {
		        fields: [ "oid", "name" ],
		        data: []
		    }),
		    displayField: "name",
		    valueField: "oid",
		    editable: false,
		    mode: "local",
			// removed because it caused an exception, when calling 
			// an undefined listener function in extjs: p.fireFn is undefined
		    /*forceSelection: true,*/
		    triggerAction: 'all',
		    emptyText: cwb.Dict.translate('Select a model...'),
		    selectOnFocus: true
		});
		
		cwb.ObjectContainer.getInstance().loadModelList(this.selectModelBox);
		
		this.loadModelButton = new Ext.Button( {
		    text: cwb.Dict.translate('Report'),
		    type: 'submit',
		    handler: function() {
			    self.loadModel();
		    }
		});
		
		Ext.apply(this, {
		    region: 'north',
		    height: 150,
		    buttonAlign: 'right',
		    bodyStyle: 'background-color:#DFE8F6;',
		    items: [ {
			    html: '<img src="'+cwb.Config.baseHref+'img/logo3.png">'
		    }, this.selectModelBox, this.loadModelButton ]
		});
		
		cwb.ui.ModelChooser.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Starts loading actions.
 */
cwb.ui.ModelChooser.prototype.loadModel = function() {
	var modelOid = this.selectModelBox.getValue();

	var container = cwb.ObjectContainer.getInstance();
	
	if (modelOid) {
		cwb.ui.Workbench.getInstance().showMask();
		cwb.statistics.Overview.getInstance().clear();
		cwb.ui.DiagramPanel.getInstance().clear();
		cwb.ui.StructureTabPanel.getInstance().clear();
		
		var self = this;
		
		container.loadModel(modelOid, function(state) {
			self.handleLoadCallback(state);
		});
	} else {
		Ext.Msg.alert(cwb.Dict.translate("Error"), cwb.Dict.translate("Please select a model."));
	}
};

cwb.ui.ModelChooser.prototype.handleLoadCallback = function(state) {
	switch (state) {
		case 'generated':
			cwb.ui.DiagramPanel.getInstance().showDiagrams();
			cwb.statistics.Overview.getInstance().loadData();
			Ext.Msg.updateProgress(0.5, cwb.Dict.translate("Loading diagrams and statistics"));
			break;
		
		case 'jit':
			cwb.ui.StructureTabPanel.getInstance().showDiagrams();
			Ext.Msg.hide();
			break;
	}
};
