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
}

cwb.ui.DiagramPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		var self = this;
		
		/**
		 * Replacement for pie chart when no model is loaded.
		 */
		this.piechartPanelEmpty = new Ext.Panel( {
			html : cwb.Dict.translate('Please select a model.')
		});
		
		/**
		 * Replacement for bar chart when no model is loaded.
		 */
		this.barchartPanelEmpty = new Ext.Panel( {
			html : cwb.Dict.translate('Please select a model.')
		});
		
		/**
		 * Panel containing the pie chart in iframe.
		 */
		this.piechartPanel = new Ext.Panel( {
		    layout : 'fit',
		    html : '<div id="' + cwb.ui.DiagramPanel.PIECHART_ID + '" class="cwb-flashDiv"></div>'
		});
		
		/**
		 * Panel containing the bar chart in iframe.
		 */
		this.barchartPanel = new Ext.Panel( {
		    layout : 'fit',
		    html : '<div id="' + cwb.ui.DiagramPanel.BARCHART_ID + '" class="cwb-flashDiv"></div>'
		});
		
		/**
		 * Panel containing either the pie chart or an empty panel.
		 */
		this.piechartContainer = new Ext.Panel( {
		    columnWidth : 0.5,
		    layout : 'fit',
		    items : this.piechartPanelEmpty
		});
		
		/**
		 * Panel containing either the bar chart or an empty panel.
		 */
		this.barchartContainer = new Ext.Panel( {
		    columnWidth : 0.5,
		    layout : 'fit',
		    items : this.barchartPanelEmpty
		});
		
		Ext.apply(this, {
		    region : 'north',
		    height : 250,
		    layout : 'column',
		    items : [ this.piechartContainer, this.barchartContainer ]
		});
		
		cwb.ui.DiagramPanel.superclass.initComponent.apply(this, arguments);
		
		this.on("render", this.adjustPanelSize);
		this.on("resize", this.adjustPanelSize);
	}
})

cwb.ui.DiagramPanel.prototype.adjustPanelSize = function() {
	var height = this.getSize().height;
	
	this.piechartContainer.setHeight(height);
	this.barchartContainer.setHeight(height);
}

cwb.ui.DiagramPanel.prototype.showDiagrams = function() {
	var modelOid = cwb.ObjectContainer.getInstance().getCurrModelOid();
	
	this.piechartContainer.remove(this.piechartPanelEmpty);
	this.piechartContainer.remove(this.piechartPanel);
	this.piechartContainer.add(this.piechartPanel);
	this.barchartContainer.remove(this.barchartPanelEmpty);
	this.barchartContainer.remove(this.barchartPanel);
	this.barchartContainer.add(this.barchartPanel);
	
	this.doLayout();
	
	this.showFlash(cwb.ui.DiagramPanel.PIECHART_ID, "pieData", modelOid);
	this.showFlash(cwb.ui.DiagramPanel.BARCHART_ID, "barData", modelOid);
	
	this.adjustPanelSize();
}

cwb.ui.DiagramPanel.prototype.clear = function() {
	cwb.Util.emptyDiv(cwb.ui.DiagramPanel.PIECHART_ID);
	cwb.Util.emptyDiv(cwb.ui.DiagramPanel.BARCHART_ID);
}

cwb.ui.DiagramPanel.prototype.showFlash = function(divId, action, modelId) {
	swfobject.embedSWF("lib/ofc/open-flash-chart.swf", divId, "100%", "100%", "9.0.0", "expressInstall.swf", {
		"data-file" : "../application/main.php?usr_action=" + action + "&response_format=JSON&modelOid=" + encodeURI(modelId)
	}, {
		"wmode" : "transparent"
	});
}

cwb.ui.DiagramPanel.getInstance = function() {
	if (!cwb.ui.DiagramPanel.instance) {
		cwb.ui.DiagramPanel.instance = new cwb.ui.DiagramPanel();
	}
	return cwb.ui.DiagramPanel.instance;
}

cwb.ui.DiagramPanel.PIECHART_ID = "cwb-piechart-id";
cwb.ui.DiagramPanel.BARCHART_ID = "cwb-barchart-id";
