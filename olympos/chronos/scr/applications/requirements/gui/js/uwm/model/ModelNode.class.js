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
	
	for (var i in node.values) {
		if (!(node.values[i] instanceof Function)) {
			for (var j in node.values[i]) {
				if (!(node.values[i][j] instanceof Function)) {
					this.data[j] = node.values[i][j];
				}
			}
		}
	}
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
	var result = this.data.Name;
	
	if (!result) {
		result = this.name;
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

uwm.model.ModelNode.prototype.changeProperties = function(values) {
	var oldValues = new Object();
	var oldLabels = new Object();
	
	var changedLabel = false;
	
	for (var i in values) {
		if (!(values[i] instanceof Function)) {
			oldValues[i] = this.data[i];
			this.data[i] = values[i];
			
			if (this.getModelNodeClass().isLabelProperty(i)) {
				oldLabels[i] = oldValues[i];
				changedLabel = true;
			}
		}
	}
	
	var self = this;
	
	uwm.persistency.Persistency.getInstance().save(this.getOid(), values, function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("changeProperty", self, oldValues);
		
		if (changedLabel) {
			uwm.event.EventBroker.getInstance().fireEvent("changeLabel", self, oldLabels);
		}
	});
}

uwm.model.ModelNode.prototype.setDefaultLabel = function() {
	this.changeProperties({
		"Name": this.getModelNodeClass().getDefaultLabel()
	});
}

uwm.model.ModelNode.prototype.associate = function(parentModelObject) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().associate(parentModelObject.getOid(), self.getOid(), false, function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("associate", parentModelObject, self);
	});
}

uwm.model.ModelNode.prototype.disassociate = function(parentModelObject) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().disassociate(parentModelObject.getOid(), self.getOid(), function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("disassociate", parentModelObject, self);
	});
}
