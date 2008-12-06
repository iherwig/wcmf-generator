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
 * @constructor
 * @param {uwm.model.ModelNodeClass} modelNodeClass
 */
uwm.diagram.Diagram = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

uwm.diagram.Diagram.prototype = new uwm.diagram.DiagramBase;

uwm.diagram.Diagram.prototype.init = function() {
	var container = uwm.diagram.DiagramContainer.getInstance();
	
	this.tab = new uwm.diagram.DiagramTab({
		title: "New Diagram",
		diagram: this
	});
	
	this.snapToObjects = false;
	this.workspaceWidth = 10000;
	this.workspaceHeight = 10000;
	
	container.getTabPanel().add(this.tab);
}

uwm.diagram.Diagram.prototype.initWorkflow = function() {
	this.viewPort = this.tab.getEl();
	this.viewPort.applyStyles({
		overflow: "auto",
		display: "block",
		position: "fixed"
	});
	
	var canvas = Ext.DomHelper.append(this.viewPort, {
		tag: "div"
	}, true);
	canvas.applyStyles({
		width: this.workspaceWidth + "px",
		height: this.workspaceHeight + "px"
	})
	
	uwm.Util.setElementUnselectable(this.viewPort.dom);
	
	this.workflow = new uwm.diagram.UwmWorkflow(canvas.id, this);
	
	this.workflow.diagram = this;
	
	this.workflow.setViewPort(this.viewPort.id);
	
	//this.workflow.scrollTo(this.workspaceHeight / 2, this.workspaceWidth / 2);
	
	var workflow = this.workflow;
	var height = this.workspaceHeight / 2;
	var width = this.workspaceWidth / 2;
	
	var self = this;
	
	setTimeout(function() {
		workflow.scrollTo(height, width, true);
	}, 500);
	
	this.selectionListener = new uwm.diagram.SelectionListener(this);
	this.workflow.addSelectionListener(this.selectionListener);
	
	this.workflowEventListener = new uwm.diagram.WorkflowEventListener(this);
	this.workflow.getCommandStack().addCommandStackEventListener(this.workflowEventListener);
	
	this.layouter = new uwm.diagram.autolayout.Layouter(this.workflow);
}

uwm.diagram.Diagram.prototype.getTab = function() {
	return this.tab;
}

uwm.diagram.Diagram.prototype.initDropZone = function() {
	var self = this;
	this.dropZone = new uwm.diagram.DropZone(this.viewPort, {
		diagram: this
	});
}

uwm.diagram.Diagram.prototype.loadFigures = function() {
	//alert("TODO: load figures");
}

uwm.diagram.Diagram.prototype.containsByOid = function(oid) {
	return false;
}

uwm.diagram.Diagram.prototype.getWorkflow = function() {
	return this.workflow;
}

uwm.diagram.Diagram.prototype.isSnapToObjects = function() {
	return this.snapToObjects;
}

uwm.diagram.Diagram.prototype.setSnapToObjects = function(snapToObjects) {
	this.snapToObjects = snapToObjects;
}

uwm.diagram.Diagram.prototype.doLayout = function() {
	this.layouter.doLayout();
}

uwm.diagram.Diagram.prototype.getContextMenuPosition = function(x, y) {
	var scroll = this.viewPort.getScroll();
	var xy = this.viewPort.getXY();
	
	return [x - scroll.left + xy[0] + 2, y - scroll.top + xy[1] + 2];
}

uwm.diagram.Diagram.prototype.addExistingObject = function(modelObject, x, y) {
	var newFigure = this.getFigure();
	
	newFigure.createExistingObject(this, modelObject, x, y);
}

uwm.diagram.Diagram.prototype.createNewObject = function(newObject, x, y) {
	var newFigure = this.getFigure();
	
	newFigure.createNewObject(this, newObject, x, y);
}

uwm.diagram.Diagram.prototype.getFigure = function() {
	return new uwm.diagram.Figure(uwm.Session.getInstance().getModelNodeClassContainer().getClass("Figure"));
}
