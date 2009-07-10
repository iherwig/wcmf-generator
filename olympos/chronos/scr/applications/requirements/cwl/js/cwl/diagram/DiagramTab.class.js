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
Ext.namespace("cwl.diagram");

/**
 * @class One tab containing a Diagram.
 * 
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config Configuraton of this tab.
 * @config diagram The diagram of this tab.
 */
cwl.diagram.DiagramTab = function(config) {
	cwl.diagram.DiagramTab.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
		closable: true,
		isHelpViewer: false
	}, config));
	
	var self = this;
	this.on("activate", function(panel) {
		self.restoreScrollPosition();
	});
	this.on("deactivate", function(panel) {
		self.saveScrollPosition();
	});
}

Ext.extend(cwl.diagram.DiagramTab, Ext.Panel);

cwl.diagram.DiagramTab.prototype.saveScrollPosition = function() {
	this.scrollX = this.getWorkflow().getScrollLeft();
	this.scrollY = this.getWorkflow().getScrollTop();
}

cwl.diagram.DiagramTab.prototype.restoreScrollPosition = function() {
	if (this.scrollX) {
		this.getWorkflow().scrollTo(this.scrollX, this.scrollY, true);
	}
}
