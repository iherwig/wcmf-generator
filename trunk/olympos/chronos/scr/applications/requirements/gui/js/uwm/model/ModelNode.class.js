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

uwm.model.ModelNode = function(modelNodeClass) {
	if (modelNodeClass) {
		this.modelNodeClass = modelNodeClass;
		this.uwmClassName = modelNodeClass.getUwmClassName();
	}
	
	this.data = new Object();
}

uwm.model.ModelNode.prototype.initByDisplayResult = function(node) {
	this.oid = node.oid;
	this.uwmClassName = node.type;
	this.parentOids = node.properties.parentoids;
	this.childOids = node.properties.childoids;
	this.name = node.values[1].Name;
}

uwm.model.ModelNode.prototype.initByOid = function(oid) {
	this.oid = oid;
	this.parentOids = null;
	this.childOids = null;
}

uwm.model.ModelNode.prototype.initByNameAndOid = function(name, oid) {
	this.oid = oid;
	this.parentOids = null;
	this.childOids = null;
	this.name = name;
}

uwm.model.ModelNode.prototype.getUwmClassName = function() {
	return this.uwmClassName;
}

uwm.model.ModelNode.prototype.getModelNodeClass = function() {
	return this.modelNodeClass;
}

uwm.model.ModelNode.prototype.getParentOids = function(preventReload) {
	if (!preventReload && !this.parentOids) {
		this.reload();
	}
	
	return this.parentOids;
}

uwm.model.ModelNode.prototype.getChildOids = function(preventReload) {
	if (!preventReload && !this.childOids) {
		this.reload();
	}
	
	return this.childOids;
}

uwm.model.ModelNode.prototype.getOid = function() {
	return this.oid;
}

uwm.model.ModelNode.prototype.getName = function() {
	var result = this.name;
	
	if (!result) {
		result = this.data.Name;
	}
	
	return result;
}

uwm.model.ModelNode.prototype.getLabel = function() {
	var result = this.getName();
	
	if (!result) {
		result = this.getOid();
	}
	
	return result;
}

uwm.model.ModelNode.prototype.reload = function(callback) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().display(this.oid, 0, function(request, data) {
		self.initByDisplayResult(data.node);
		if (callback instanceof Function) {
			callback(self);
		}
	});
}

uwm.model.ModelNode.prototype.fillPropertyForm = function(form, mask) {
	var self = this;
	
	this.reload(function() {
		self.populatePropertyForm(form);
		
		mask.hide();
	});
}

uwm.model.ModelNode.prototype.populatePropertyForm = function(form) {
}
