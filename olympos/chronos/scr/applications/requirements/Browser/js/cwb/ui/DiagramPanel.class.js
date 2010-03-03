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
 * Panel containing two diagrams.
 */
cwb.ui.DiagramPanel = function() {
};

cwb.ui.DiagramPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		var self = this;
		
		/**
		 * Panel containing either the pie chart or an empty panel.
		 */
		this.piechartPanel = new Ext.Panel( {
		    columnWidth: 0.5,
		    layout: 'fit',
		    html: '<div id="'+cwb.ui.DiagramPanel.PIECHART_ID+'" class="cwb-flashDiv">'+
		    	'<div class="noSelectionNote">No model selected</div></div>'
		});
		
		/**
		 * Panel containing either the bar chart or an empty panel.
		 */
		this.barchartPanel = new Ext.Panel( {
		    columnWidth: 0.5,
		    layout: 'fit',
		    html: '<div id="'+cwb.ui.DiagramPanel.BARCHART_ID+'" class="cwb-flashDiv">'+
	    	'<div class="noSelectionNote">No model selected</div></div>'
		});
		
		Ext.apply(this, {
		    region: 'north',
		    height: 250,
		    layout: 'column',
		    items: [ this.piechartPanel, this.barchartPanel ]
		});
		
		cwb.ui.DiagramPanel.superclass.initComponent.apply(this, arguments);
		
		this.on("render", this.adjustPanelSize);
		this.on("resize", this.adjustPanelSize);
	}
});

cwb.ui.DiagramPanel.prototype.adjustPanelSize = function() {
	var height = this.getSize().height;
	
	this.piechartPanel.setHeight(height);
	this.barchartPanel.setHeight(height);
};

cwb.ui.DiagramPanel.prototype.showDiagrams = function() {
	var modelOid = cwb.ObjectContainer.getInstance().getCurrModelOid();
	if (modelOid) {
		
		this.showFlash(cwb.ui.DiagramPanel.PIECHART_ID, "pieData", modelOid);
		this.showFlash(cwb.ui.DiagramPanel.BARCHART_ID, "barData", modelOid);
		
		this.adjustPanelSize();
	}
};

cwb.ui.DiagramPanel.prototype.clear = function() {
	cwb.Util.emptyDiv(cwb.ui.DiagramPanel.PIECHART_ID);
	cwb.Util.emptyDiv(cwb.ui.DiagramPanel.BARCHART_ID);
};

cwb.ui.DiagramPanel.prototype.showFlash = function(divId, action, modelOid) {
	// NOTE: the colon in modelOid is replaced by _ because encoding does not seem to work
	var url = cwb.Config.jsonUrl+"?usr_action=" + action + "%26response_format=JSON%26modelOid=" + modelOid.replace(/:/, '_');
	swfobject.embedSWF(cwb.Config.baseHref+"lib/ofc/open-flash-chart.swf", divId, "100%", "100%", "9.0.0", "expressInstall.swf", {
		"data-file": url
	}, {
		"wmode": "transparent"
	});
};

cwb.ui.DiagramPanel.getInstance = function() {
	if (!cwb.ui.DiagramPanel.instance) {
		cwb.ui.DiagramPanel.instance = new cwb.ui.DiagramPanel();
	}
	return cwb.ui.DiagramPanel.instance;
};

cwb.ui.DiagramPanel.PIECHART_ID = "cwb-piechart-id";
cwb.ui.DiagramPanel.BARCHART_ID = "cwb-barchart-id";
