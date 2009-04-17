/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("uwm.model");

/**
 * @class A persisted Object.
 * 
 * @constructor
 * @param {uwm.model.ModelNodeClass}
 *            modelNodeClass The ModelNodeClass of this ModelNode.
 */
uwm.model.ModelNode = function(modelNodeClass) {
	if (modelNodeClass) {
		this.modelNodeClass = modelNodeClass;
		this.uwmClassName = modelNodeClass.getUwmClassName();
		this.semanticGroup = modelNodeClass.getSemanticGroup();
	}
	
	this.data = new Object();
	
	this.alreadyDeleted = false;
	this.maskedOids = {};
	this.parentOids = [];
	this.childOids = [];
}

uwm.model.ModelNode.prototype.initByDisplayResult = function(node) {
	this.oid = node.oid;
	this.uwmClassName = node.type;
	this.maskedOids = {};
	this.parentOids = this.deMaskOids(node.properties.parentoids);
	this.childOids = this.deMaskOids(node.properties.childoids);
	
	for ( var i in node.values) {
		if (!(node.values[i] instanceof Function)) {
			for ( var j in node.values[i]) {
				if (!(node.values[i][j] instanceof Function)) {
					this.data[j] = node.values[i][j];
				}
			}
		}
	}
}

uwm.model.ModelNode.prototype.deMaskOids = function(oidList) {
	var modelNodeClass = this.getModelNodeClass();
	
	var result = [];
	
	if (oidList) {
		for ( var i = 0; i < oidList.length; i++) {
			var currOid = oidList[i];
			
			var demaskedOid = modelNodeClass.demaskOid(currOid);
			if (!demaskedOid) {
				result.push(currOid);
			} else {
				result.push(demaskedOid);
				
				// Limitation: If Objects A and B have both a xxx and a yyy
				// connection, this fails
				this.maskedOids[demaskedOid] = currOid;
			}
		}
	}
	
	return result;
}

uwm.model.ModelNode.prototype.initByOid = function(oid) {
	this.oid = oid;
	this.parentOids = null;
	this.childOids = null;
	this.maskedOids = {};
}

uwm.model.ModelNode.prototype.initByNameAndOid = function(name, oid) {
	this.oid = oid;
	this.parentOids = null;
	this.childOids = null;
	this.maskedOids = {};
	this.name = name;
}

uwm.model.ModelNode.prototype.getUwmClassName = function() {
	return this.uwmClassName;
}

uwm.model.ModelNode.prototype.getModelNodeClass = function() {
	var result = this.modelNodeClass;
	
	if (!result) {
		this.modelNodeClass = uwm.model.ModelNodeClassContainer.getInstance().getClass(this.uwmClassName);
		
		result = this.modelNodeClass;
	}
	
	return result;
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

uwm.model.ModelNode.prototype.populatePropertyForm = function(form) {
}

uwm.model.ModelNode.prototype.getProperty = function(propertyName) {
	return this.data[propertyName];
}

uwm.model.ModelNode.prototype.changeProperties = function(values) {
	var oldValues = new Object();
	var oldLabels = new Object();
	
	var changedLabel = false;
	
	for ( var i in values) {
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
	this.changeProperties( {
		"Name" : this.getModelNodeClass().getDefaultLabel()
	});
}

uwm.model.ModelNode.prototype.markDeleted = function() {
	this.alreadyDeleted = true;
}

uwm.model.ModelNode.prototype.isDeleted = function() {
	return this.alreadyDeleted;
}

uwm.model.ModelNode.prototype.getMaskedRelatedOid = function(relatedOid) {
	return this.maskedOids[relatedOid];
}

uwm.model.ModelNode.prototype.associate = function(parentModelObject, connectionInfo, nmUwmClassName) {
	var self = this;
	
	var childOid = this.getOid();
	var parentOid = parentModelObject.getOid();
	
	if (connectionInfo && connectionInfo.nmSelf) {
		childOid = this.insertDirectionInOid(childOid, "Source");
		parentOid = this.insertDirectionInOid(parentOid, "Target");
	}
	
	if (!nmUwmClassName) {
		uwm.persistency.Persistency.getInstance().associate(parentOid, childOid, false, function(request, data) {
			uwm.event.EventBroker.getInstance().fireEvent("associate", parentModelObject, self);
		});
	} else {
		var actionSet = new uwm.persistency.ActionSet();
		actionSet.addAssociate(parentOid, childOid, false, function(request, data) {
			uwm.event.EventBroker.getInstance().fireEvent("associate", parentModelObject, self);
		});
		actionSet.addSave("{last_created_oid:" + nmUwmClassName + "}", {
		    relationType : connectionInfo.connectionType,
		    Name : connectionInfo.label
		});
		actionSet.commit();
	}
	
	if (this.parentOids) {
		this.parentOids.push(parentModelObject.getOid());
	}
	if (parentModelObject.childOids) {
		parentModelObject.childOids.push(this.getOid());
	}
}

uwm.model.ModelNode.prototype.insertDirectionInOid = function(oldOid, direction) {
	
	var result = uwm.Util.getUwmClassNameFromOid(oldOid) + direction + ":" + uwm.Util.getNumericFromOid(oldOid);
	
	return result;
}

uwm.model.ModelNode.prototype.disassociate = function(parentModelObject) {
	var self = this;
	
	this.updateOidLists(parentModelObject);
	
	var childOid = this.getOid();
	var parentOid = parentModelObject.getOid();
	
	if (this.getModelNodeClass() == parentModelObject.getModelNodeClass()) {
		childOid = parentModelObject.getOid();
		parentOid = this.getOid();
	}
	
	uwm.persistency.Persistency.getInstance().disassociate(parentOid, childOid, function(request, data) {
		uwm.event.EventBroker.getInstance().fireEvent("disassociate", parentModelObject, self);
	});
}

uwm.model.ModelNode.prototype.updateOidLists = function(parentModelObject) {
	var param;
	
	if (this.childOids) {
		for ( var i = 0; i < this.childOids.length; i++) {
			if (this.childOids[i] == parentModelObject.getOid()) {
				param = i;
			}
		}
		
		this.childOids[param] = 'deleted';
	}
	
	var param;
	if (parentModelObject.parentOids) {
		for ( var i = 0; i < parentModelObject.parentOids.length; i++) {
			
			if (parentModelObject.parentOids[i] == this.getOid()) {
				param = i;
			}
		}
		parentModelObject.parentOids[param] = 'deleted';
	}
}
