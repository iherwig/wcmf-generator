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
 * @class A list of all objects of one type in a selected scope.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwe.modelgrid.AssociateButton = function(config) {
}

cwe.modelgrid.AssociateButton = Ext.extend(Ext.Toolbar.Button, {
	initComponent : function() {
		var self = this;
		
		Ext.apply(this, {
			iconCls : this.modelClass.getTreeIconClass(),
			text : chi.Dict.translate("Associate as") + " " + this.roleName + " " + chi.Dict.translate("with") + " " + this.modelClass.getName() + " \"" + this.sourceLabel + "\"",
			handler : function() {
				self.associate();
			}
		});
		
		cwe.modelgrid.AssociateButton.superclass.initComponent.apply(this, arguments);
	}
});

cwe.modelgrid.AssociateButton.prototype.associate = function() {
	var self = this;
	
	var records = this.grid.getSelectionModel().getSelections();
	
	self.sourceHandler(records);
}

cwe.modelgrid.AssociateButton.prototype.isSingleSelect = function() {
	return this.singleSelect;
}
