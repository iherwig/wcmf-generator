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

uwm.diagram.DiagramContainer = function() {
	this.items = new Ext.util.MixedCollection();
	
	this.tabPanel = new uwm.diagram.DiagramTabPanel({
		diagramContainer: this
	});
}

uwm.diagram.DiagramContainer.prototype.getByOid = function(oid) {
	return this.items.get(oid);
}

uwm.diagram.DiagramContainer.prototype.getTabPanel = function() {
	return this.tabPanel;
}

uwm.diagram.DiagramContainer.prototype.createNewDiagram = function() {
	var result = new uwm.diagram.Diagram(this.getDiagramClass());
	
	result.init();
	
	this.items.add(result);
	
	this.tabPanel.activate(result.getTab());
	
	return result;
}

uwm.diagram.DiagramContainer.prototype.getDiagramClass = function() {
	return uwm.Session.getInstance().getModelNodeClassContainer().getClass("Diagram");
}

uwm.diagram.DiagramContainer.getInstance = function() {
	if (!uwm.diagram.DiagramContainer.instance) {
		uwm.diagram.DiagramContainer.instance = new uwm.diagram.DiagramContainer();
	}
	
	return uwm.diagram.DiagramContainer.instance;
}
