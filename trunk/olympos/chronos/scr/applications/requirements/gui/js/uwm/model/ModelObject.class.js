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

/**
 * @class Parent class of all Model Objects.
 * 
 * <p>
 * A Model Object is everything the user can place on a diagram by
 * drag&amp;drop. It also exists as a leaf in Model Tree. It is always
 * persisted.
 * </p>
 * 
 * <p>
 * This class should not be instantiated, but extended.
 * </p>
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 */
uwm.model.ModelObject = function(modelNodeClass) {
	uwm.model.ModelObject.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.ModelObject, uwm.model.ModelNode);

uwm.model.ModelObject.prototype.connectableWith = function(otherObject) {
	var result = false;
	if (this.getModelNodeClass().getConnectionInfo(
			otherObject.getModelNodeClass()) != null) {
		if (this.checkCardinality(otherObject)
				&& otherObject.checkCardinality(this)) {
			result = true;
		}

	}
	if (this.isConnected(otherObject)){
		result=false;
	}
	return result;
}

/**
 * Checks if the object cardinality allows the connection.
 * 
 * <p>
 * The cardinality defines with how many <code>modelObjects</code> of a
 * certain class an object may be connected.
 * </p>
 * 
 * @param {Object}
 *            otherObject The <code>modelObject</code> this ojcect shall be
 *            connected with.
 * @return <code>true</code> if the cardinality allows this connection,
 *         <code>false</code> otherwise.
 * @type boolean
 */
uwm.model.ModelObject.prototype.checkCardinality = function(otherObject) {
	var result = false;
	var connections = this.getNumberOfConnections(otherObject);

	var allowedConnections = this.getModelNodeClass().getConnectionInfo(
			otherObject.getModelNodeClass()).cardinality;

	if (connections < allowedConnections || allowedConnections == -1
			|| !allowedConnections) {
		result = true;
	}

	return result;
}

/**
 * Counts the existing connections from this object to objects of the same class
 * as the other object.
 * 
 * @private
 * @param {Object}
 *            otherObject The <code>modelObject</code> this ojcect shall be
 *            connected with.
 * @return The number of existing connections.
 * @type int
 */
uwm.model.ModelObject.prototype.getNumberOfConnections = function(otherObject) {
	var parentOids = this.getParentOids();
	var childOids = this.getChildOids();

	var result = 0;
	result += this.getConnections(parentOids, otherObject.getUwmClassName());
	result += this.getConnections(childOids, otherObject.getUwmClassName());

	return result;
}

/**
 * Counts the Oids in the list which link to an object object of the named type.
 * 
 * @private
 * @param oidList
 *            The list of Oids which is compared.
 * @param otherObjectClassName
 *            Name of the class to which the counted connections lead.
 * @return The number of fitting Oids.
 * @type int
 */
uwm.model.ModelObject.prototype.getConnections = function(oidList,
		otherObjectClassName) {
	var result = 0;
	if (oidList) {
		for ( var i = 0; i < oidList.length; i++) {
			var childClassName = uwm.Util.getUwmClassNameFromOid(oidList[i]);
			if (childClassName == otherObjectClassName) {
				result++;
			}
		}
	}
	return result;
}

uwm.model.ModelObject.prototype.isConnected = function(otherObject){
	var result = false;
	var otherOid=otherObject.getOid();
	if (this.parentOids) {
		for (var i = 0; i < this.parentOids.length; i++) {
			if (this.parentOids[i] == otherOid) {
				result = true;
			}
		}
	}
	if (this.childOids) {
		for (var i = 0; i < this.childOids.length; i++) {
			if (this.childOids[i] == otherOid) {
				result = true;
			}
		}
	}
	return result;
}
