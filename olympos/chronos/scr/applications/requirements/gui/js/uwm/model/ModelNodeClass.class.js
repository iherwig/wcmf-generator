/*
 * Copyright (c) 2008 The Olympos Development Team. *  * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */Ext.namespace("uwm.model");

uwm.model.ModelNodeClass = function() {
}

uwm.model.ModelNodeClass.prototype.getUwmClassName = function() {
	return this.uwmClassName;
}

uwm.model.ModelNodeClass.prototype.getInstanceClassName = function() {
	return this.instanceClassName;
}

uwm.model.ModelNodeClass.prototype.getTreeIcon = function() {
	return this.treeIcon;
}

uwm.model.ModelNodeClass.prototype.getPropertyForm = function() {
}

uwm.model.ModelNodeClass.prototype.getDefaultLabel = function() {
	return this.defaultLabel;
}

uwm.model.ModelNodeClass.prototype.isLabelProperty = function(propertyName) {
	return this.labelProperties[propertyName] != undefined;
}

uwm.model.ModelNodeClass.prototype.getGridTabIconClass = function() {
	return this.gridTabIconClass;
}

uwm.model.ModelNodeClass.prototype.demaskOid = function(orgOid) {
	var result = orgOid;
	
	var uwmClassName = uwm.Util.getUwmClassNameFromOid(orgOid);

	if (this.realUwmClassName && this.uwmClassName == uwmClassName) {
		result = this.realUwmClassName + ":" + uwm.Util.getNumericFromOid(orgOid);
	} else if (this.maskInfo) {
		var demaskedUwmClassName = this.maskInfo[uwmClassName];
		if (demaskedUwmClassName) {
			result = demaskedUwmClassName + ":" + uwm.Util.getNumericFromOid(orgOid);
		}
	}
	
	return result;
}

uwm.model.ModelNodeClass.prototype.getRealModelClass = function() {
	var result = this;
	
	if (this.realUwmClassName) {
		result = uwm.model.ModelNodeClassContainer.getInstance().getClass(this.realUwmClassName);
	}
	
	return result;
}

uwm.model.ModelNodeClass.prototype.getGraphics = function(label, figure) {
	return eval("new " + this.getFigureClass() + "(label, figure)");
}

