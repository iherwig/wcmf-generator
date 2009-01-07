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

Ext.namespace("uwm.model");

uwm.model.ModelClass = function() {
}

uwm.model.ModelClass.prototype = new uwm.model.ModelNodeClass;

uwm.model.ModelClass.prototype.getConstraints = function() {
	return this.constraints;
}

uwm.model.ModelClass.prototype.getDescription = function() {
	return this.description;
}

uwm.model.ModelClass.prototype.getHelpUrl = function() {
	return this.helpUrl;
}

uwm.model.ModelClass.prototype.getFigureIcon = function() {
	return this.figureIcon;
}

uwm.model.ModelNodeClass.prototype.getFigureClass = function() {
	return this.figureClass;
}

uwm.model.ModelClass.prototype.getConnectionInfo = function(otherClass) {
	return this.connectionInfo[otherClass.getUwmClassName()];
}

uwm.model.ModelClass.prototype.getAllConnectionInfo = function() {
	return this.connectionInfo;
}

uwm.model.ModelNodeClass.prototype.getGridTabIconClass = function() {
	return this.gridTabIconClass;
}

uwm.model.ModelNodeClass.prototype.getGridTabTip = function() {
	return this.gridTabTip;
}

uwm.model.ModelNodeClass.prototype.getGridFields = function() {
	return this.gridFields;
}

uwm.model.ModelNodeClass.prototype.getGridColumns = function() {
	return this.gridColumns;
}

uwm.model.ModelNodeClass.prototype.getGraphics = function(label, figure) {
	return eval("new " + this.getFigureClass() + "(label, this)");
}
