/*
 * Copyright (c) 2009 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 * 
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code, this
 * entire header must remain intact.
 */
Ext.namespace("cwe.modelgrid");

/**
 * @class A button for associating objects as target.
 * 
 * @extends Ext.Toolbar.Button
 * @constructor
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class of the source object.
 * @config roleName The name of the role the target object has in the source
 *         object.
 * @config role The name of the field the target object is associated to in the
 *         source object.
 * @config isParent Whether the target object should be the parent in the
 *         association.
 * @config sourceOid The oid of the source object.
 * @config sourceHandler The handler function to be called when the button is
 *         pressed. Passing the selected records as only parameter.
 * @config sourceLabel The label of the source object.
 * @config singleSelect Whether this is a single select or multi select target.
 * 
 */
cwe.modelgrid.AssociateButton = function(config) {
};

cwe.modelgrid.AssociateButton = Ext.extend(Ext.Toolbar.Button, {
	initComponent : function() {
		var self = this;
		
		Ext.apply(this, {
		    iconCls : this.modelClass.getTreeIconClass(),
		    text : chi.Dict.translate("Associate as ${1} with ${2} \"${3}\"", this.roleName, this.modelClass.getName(), this.sourceLabel),
		    handler : function() {
			    self.associate();
		    }
		});
		
		cwe.modelgrid.AssociateButton.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Handler when the button is clicked.
 * 
 * <p>
 * Calls the passed <code>sourceHandler</code>.
 */
cwe.modelgrid.AssociateButton.prototype.associate = function() {
	var self = this;
	
	var records = this.grid.getSelectionModel().getSelections();
	
	self.sourceHandler(records);
};

/**
 * Returns whether the target object should be the parent in the association.
 * 
 * @return Whether the target object should be the parent in the association.
 * @type boolean
 */
cwe.modelgrid.AssociateButton.prototype.isSingleSelect = function() {
	return this.singleSelect;
};
