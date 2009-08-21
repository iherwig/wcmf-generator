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
	this.language = null;
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

uwm.model.ModelNode.prototype.getSemanticGroup = function() {
	return this.semanticGroup;
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
	// TODO: Removed. Check if necessary
	/*
	if (!preventReload && !this.parentOids) {
		this.reload();
	}
	*/
	return this.parentOids;
}

uwm.model.ModelNode.prototype.getChildOids = function(preventReload) {
	// TODO: Removed. Check if necessary
	/*
	if (!preventReload && !this.childOids) {
		this.reload();
	}
	*/	
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

uwm.model.ModelNode.prototype.getLanguage = function() {
	// set the default value lazily, because the default language 
	// may not be defined in the beginning
	if (this.language == null) {
		this.language = uwm.i18n.Localization.getInstance().getUserLanguage();
	}
	return this.language;
}

uwm.model.ModelNode.prototype.reload = function(callback) {
	var self = this;
	
	uwm.persistency.Persistency.getInstance().display(this.oid, 0, this.getLanguage(), 
		function(request, data) {
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

/**
 * Change one or more properties of the node.
 * @param values An associative array with the property names as keys and the new values
 * as values. Fires the changePropery and changeLabel event.
 */
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
	
	uwm.persistency.Persistency.getInstance().save(this.getOid(), values, this.getLanguage(), 
		function(request, data) {
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

uwm.model.ModelNode.prototype.associate = function(otherModelObject, connectionInfo, nmUwmClassName, connection, ownUwmClassName, otherUwmClassName) {
	var self = this;
	
	var childOid = this.getOid();
	var parentOid = otherModelObject.getOid();
	
	if (connectionInfo && connectionInfo.nmSelf) {
		if (ownUwmClassName) {
			childOid = ownUwmClassName + ":" + uwm.Util.getNumericFromOid(childOid);
			parentOid = otherUwmClassName + ":" + uwm.Util.getNumericFromOid(parentOid);
		} else {
			childOid = this.insertDirectionInOid(childOid, "Source");
			parentOid = this.insertDirectionInOid(parentOid, "Target");
		}
	}
	
	if (!nmUwmClassName) {
		uwm.persistency.Persistency.getInstance().associate(parentOid, childOid, false, function(request, data) {
			self.fillInRelationObject(connection, data);
			uwm.event.EventBroker.getInstance().fireEvent("associate", otherModelObject, self);
		});
	} else {
		var actionSet = new uwm.persistency.ActionSet();
		actionSet.addAssociate(parentOid, childOid, false, function(request, data) {
			self.fillInRelationObject(connection, data);

			//Workaround until last_created_oid is working in wCMF with relations
			connection.getRelationObject().changeProperties( {
			    relationType : connectionInfo.connectionType,
			    Name : connectionInfo.label
			});
			
			uwm.event.EventBroker.getInstance().fireEvent("associate", otherModelObject, self);
		});
		
		/*
		actionSet.addSave("{last_created_oid:" + nmUwmClassName + "}", {
		    relationType : connectionInfo.connectionType,
		    Name : connectionInfo.label
		});
		*/
		actionSet.commit();
	}
	
	if (this.parentOids) {
		this.parentOids.push(otherModelObject.getOid());
	}
	if (otherModelObject.childOids) {
		otherModelObject.childOids.push(this.getOid());
	}
}

uwm.model.ModelNode.prototype.fillInRelationObject = function(connection, data) {
	if (data.manyToMany) {
		var temp = {};
		for ( var i in data.manyToMany) {
			temp.node = data.manyToMany[i][0];
			break;
		}
		
		var relationObject = uwm.model.ModelContainer.getInstance().createByDisplayResult(temp);
		connection.setRelationObject(relationObject);
	}
}

uwm.model.ModelNode.prototype.insertDirectionInOid = function(oldOid, direction) {
	
	var result = uwm.Util.getUwmClassNameFromOid(oldOid) + direction + ":" + uwm.Util.getNumericFromOid(oldOid);
	
	return result;
}

uwm.model.ModelNode.prototype.disassociate = function(otherModelObject, connectionInfo, relationObject) {
	var self = this;
	
	this.updateOidLists(otherModelObject);
	otherModelObject.updateOidLists(this);
	
	var childOid = this.getOid();
	var parentOid = otherModelObject.getOid();
	
	if (this.getModelNodeClass() == otherModelObject.getModelNodeClass()) {
		childOid = otherModelObject.getOid();
		parentOid = this.getOid();
	}
	
	if (connectionInfo && connectionInfo.nmSelf) {
		childOid = this.insertDirectionInOid(childOid, "Source");
		parentOid = this.insertDirectionInOid(parentOid, "Target");
	}
	
	uwm.persistency.Persistency.getInstance().disassociate(parentOid, childOid, function(request, data) {
		if (connectionInfo && connectionInfo.nmSelf && relationObject) {
			uwm.model.ModelContainer.getInstance().deleteObject(relationObject);
		}
		
		uwm.event.EventBroker.getInstance().fireEvent("disassociate", otherModelObject, self);
	});
}

/**
 * Remove otherModelObject from the object's oid lists and vice versa
 */
uwm.model.ModelNode.prototype.updateOidLists = function(otherModelObject) {
	if (this.childOids) {
		var newList = [];
		for ( var i = 0; i < this.childOids.length; i++) {
			if (this.childOids[i] != otherModelObject.getOid()) {
				newList.push(this.childOids[i]);
			}
		}
		this.childOids = newList;
	}
	
	if (otherModelObject.parentOids) {
		var newList = [];
		for ( var i = 0; i < otherModelObject.parentOids.length; i++) {
			if (otherModelObject.parentOids[i] != this.getOid()) {
				newList.push(otherModelObject.parentOids[i]);
			}
		}
		otherModelObject.parentOids = newList;
	}
}
