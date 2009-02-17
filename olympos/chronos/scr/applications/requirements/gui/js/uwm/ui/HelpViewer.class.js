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
 * @class Viewer for Help Files.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.ui.HelpViewer = function(config) {
	uwm.ui.HelpViewer.superclass.constructor.call(this, Ext.apply(this, {
		closable: true,
		title: uwm.Dict.translate('Help Viewer'),
		autoDestroy: false,
		isHelpViewer: true,
		html: "<iframe id='" + uwm.ui.HelpViewer.IFRAME_ID + "' class='uwm-helpViewer-frame' src='" + uwm.Session.getInstance().getHelpUrl() + "'/>"
	}, config));
}

Ext.extend(uwm.ui.HelpViewer, Ext.Panel);

uwm.ui.HelpViewer.prototype.loadUrl = function(url) {
	var tabPanel = uwm.diagram.DiagramContainer.getInstance().getTabPanel();
	
	var tab = tabPanel.findById(this.getItemId());
	if (!tab) {
		tab = tabPanel.add(this);
	}
	tabPanel.activate(tab);

	var iframe = Ext.get(uwm.ui.HelpViewer.IFRAME_ID);
	if (!iframe) {
		iframe = this.body.insertHtml("afterBegin", "<iframe id='" + uwm.ui.HelpViewer.IFRAME_ID + "' class='uwm-helpViewer-frame' />", true);
	}
	
	iframe.dom.src = url;
}

uwm.ui.HelpViewer.getInstance = function() {
	if (!uwm.ui.HelpViewer.instance) {
		uwm.ui.HelpViewer.instance = new uwm.ui.HelpViewer();
	}
	
	return uwm.ui.HelpViewer.instance;
}

uwm.ui.HelpViewer.IFRAME_ID = "uwm.ui.HelpViewer_iframe";