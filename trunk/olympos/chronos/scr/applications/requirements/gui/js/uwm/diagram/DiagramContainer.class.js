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
 * @class The Diagram Container contains all diagrams.
 * 
 * <p>The Diagram Container handles all creations and deletions of diagrams.</p>
 * 
 * <p>The Diagram container is a <i>Singleton</i>.</p>
 * 
 * @constructor
 */
uwm.diagram.DiagramContainer = function() {
	/**
	 * List of diagrams with oid as key.
	 * 
	 * @private
	 * @type list of uwm.diagram.Diagram
	 */
	this.items = new Ext.util.MixedCollection();
	
	/**
	 * Ext TabPanel containing all diagram tabs.
	 * 
	 * @private
	 * @type uwm.diagram.DiagramTabPanel
	 */
	this.tabPanel = new uwm.diagram.DiagramTabPanel({
		diagramContainer: this
	});
}

/**
 * Returns a diagram by oid.
 * 
 * @param {String} oid The oid if the diagram to return.
 * @return The Diagram with <code>oid</code> or <code>null</code> if no such diagram exists.
 * @type uwm.diagram.Diagram
 */
uwm.diagram.DiagramContainer.prototype.getByOid = function(oid) {
	return this.items.get(oid);
}

/**
 * Returns the Diagram Tab Panel.
 * 
 * @return The Diagram Tab Panel.
 * @type uwm.diagram.DiagramTabPanel
 */
uwm.diagram.DiagramContainer.prototype.getTabPanel = function() {
	return this.tabPanel;
}

/**
 * Creates a new Diagram.
 * 
 * @return The new Diagram.
 * @type uwm.diagram.Diagram
 */
uwm.diagram.DiagramContainer.prototype.createNewDiagram = function() {
	var result = new uwm.diagram.Diagram(this.getDiagramClass());
	
	result.init();
	
	this.items.add(result);
	
	this.tabPanel.activate(result.getTab());
	
	return result;
}

/**
 * Returns the DiagramClass instance.
 * 
 * @private
 * @return The DiagramClass instance.
 * @type uwm.diagram.DiagramClass
 */
uwm.diagram.DiagramContainer.prototype.getDiagramClass = function() {
	return uwm.model.ModelNodeClassContainer.getInstance().getClass("Diagram");
}

uwm.diagram.DiagramContainer.prototype.loadDiagram = function(modelObject) {
	modelObject.init();
	
	this.items.add(modelObject);
	
	this.tabPanel.activate(modelObject.getTab());
}

/**
 * Returns the instance of DiagramContainer.
 * 
 * @return The instance of DiagramContainer.
 * @type uwm.diagram.DiagramContainer
 */
uwm.diagram.DiagramContainer.getInstance = function() {
	if (!uwm.diagram.DiagramContainer.instance) {
		/**
		 * The instance of DiagramContainer.
		 * 
		 * @private
		 */
		uwm.diagram.DiagramContainer.instance = new uwm.diagram.DiagramContainer();
	}
	
	return uwm.diagram.DiagramContainer.instance;
}
