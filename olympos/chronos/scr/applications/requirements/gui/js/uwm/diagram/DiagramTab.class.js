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
Ext.namespace("uwm.diagram");

/**
 * @class One tab containing a Diagram.
 *
 * @constructor
 * @param {Object} config Configuraton of this tab.
 * @config diagram The diagram of this tab.
 */
uwm.diagram.DiagramTab = function(config) {
	uwm.diagram.DiagramTab.superclass.constructor.call(this, Ext.apply(this, {
		elements: "body",
		closable: true
	}, config));
	
	/**
	 * The diagram of this tab.
	 *
	 * @private
	 * @type uwm.diagram.Diagram
	 */
	this.diagram = config.diagram;
	
	var self = this;
	this.on("activate", function(panel) {
		self.restoreScrollPosition();
	});
	this.on("deactivate", function(panel) {
		self.saveScrollPosition();
	});
}

Ext.extend(uwm.diagram.DiagramTab, Ext.Panel);

/**
 * Initiates the contained diagram.
 *
 * @private
 */
uwm.diagram.DiagramTab.prototype.render = function() {
	uwm.diagram.DiagramTab.superclass.render.apply(this, arguments);
	
	this.diagram.initWorkflow();
	this.diagram.initDropZone();
	this.diagram.loadFigures();
}

uwm.diagram.DiagramTab.prototype.getDiagram = function() {
	return this.diagram;
}

uwm.diagram.DiagramTab.prototype.saveScrollPosition = function() {
	this.scrollX = this.getDiagram().getWorkflow().getScrollLeft();
	this.scrollY = this.getDiagram().getWorkflow().getScrollTop();
}

uwm.diagram.DiagramTab.prototype.restoreScrollPosition = function() {
	if (this.scrollX) {
		this.getDiagram().getWorkflow().scrollTo(this.scrollX, this.scrollY, true);
	}
}
