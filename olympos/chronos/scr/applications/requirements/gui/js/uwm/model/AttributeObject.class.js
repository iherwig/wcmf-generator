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
 * @class Parent class of all Attribute Objects representing UML Class
 *        attributes.
 * 
 * <p>
 * This class should not be instantiated, but extended.
 * </p>
 * 
 * @extends uwm.model.ModelNode
 * @constructor
 */
uwm.model.AttributeObject = function(modelNodeClass) {
	uwm.model.AttributeObject.superclass.constructor.call(this, modelNodeClass);
}

Ext.extend(uwm.model.AttributeObject, uwm.model.ModelObject);


uwm.model.AttributeObject.prototype.validateMapping = function(mappingObject) {
	var connectedObjectOid = mappingObject.getProperty("reference_value");
	var connectedObjectParentOid = mappingObject.getProperty("reference_type");
	
	var self = this;
	uwm.persistency.Persistency.getInstance().doesClassContainAttribute(connectedObjectParentOid, connectedObjectOid, function (request, data) {
			self.handleValidateMapping(data);
		});
}

uwm.model.AttributeObject.prototype.handleValidateMapping = function(data) {
	if (!data.attributeFound) {
		uwm.event.EventBroker.getInstance().fireEvent("mappingBroken", this);
	}
}