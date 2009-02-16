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

uwm.model.ModelObject = function(modelNodeClass) {
	uwm.model.ModelNode.call(this, modelNodeClass);
}

uwm.model.ModelObject.prototype = new uwm.model.ModelNode;

uwm.model.ModelObject.prototype.connectableWith = function(otherObject) {
	var result = false;
	if (this.getModelNodeClass().getConnectionInfo(otherObject.getModelNodeClass()) != null) {
		if (this.checkCardinality(otherObject) && otherObject.checkCardinality(this)) {
			result = true;
		}
		
	}
	return result;
}

uwm.model.ModelObject.prototype.checkCardinality = function(otherObject) {
	var result = false;
	var connections = this.getNumberOfConnections(otherObject);
	
	
	var allowedConnections = this.getModelNodeClass().getConnectionInfo(otherObject.getModelNodeClass()).number;
	
	if (connections < allowedConnections || allowedConnections == -1 || !allowedConnections) {
		result = true;
	}
	
	return result;
}

uwm.model.ModelObject.prototype.getNumberOfConnections = function(otherObject) {
	parentOids = this.getParentOids();
	childOids = this.getChildOids();
	
	var result = 0;
	if (parentOids) {
		for (var i = 0; i < parentOids.length; i++) {
			var parentClassName = uwm.Util.getUwmClassNameFromOid(parentOids[i]);
			var targetClassName = otherObject.getUwmClassName();
			if (parentClassName == targetClassName) {
				result++;
			}
		}
	}
	if (childOids) {
		for (var i = 0; i < childOids.length; i++) {
			var childClassName = uwm.Util.getUwmClassNameFromOid(childOids[i]);
			var targetClassName = otherObject.getUwmClassName();
			if (childClassName == targetClassName) {
				result++;
			}
		}
	}
	return result;
}
