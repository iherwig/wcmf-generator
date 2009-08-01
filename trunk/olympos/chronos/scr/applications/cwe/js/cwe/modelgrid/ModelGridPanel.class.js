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
 * @class A panel combining a model grid and the associated editors.
 * 
 * @extends Ext.Panel
 * @constructor
 * @see cwe.modelgrid.ModelGrid
 * @param {Object}
 *            config The configuration object.
 * @config modelClass The Model Class of the grid and editors.
 */
cwe.modelgrid.ModelGridPanel = function() {
}

cwe.modelgrid.ModelGridPanel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		/**
		 * The editors.
		 * 
		 * @private
		 * @type cwe.editor.EditorContainer
		 */
		this.editors = new cwe.editor.EditorContainer( {
			modelClass : this.modelClass
		});
		
		/**
		 * The grid.
		 * 
		 * @private
		 * @type cwe.modelgrid.ModelGrid
		 */
		this.grid = new cwe.modelgrid.ModelGrid( {
			modelClass : this.modelClass,
			editors : this.editors
		});
		
		Ext.apply(this, {
			layout : "border",
			title : chi.Dict.translate(this.modelClass.getName()),
			iconCls : this.modelClass.getTreeIconClass(),
			items : [ this.grid, this.editors ],
			closable : true
		});
		
		cwe.modelgrid.ModelGridPanel.superclass.initComponent.apply(this, arguments);
	}
});

/**
 * Returns the Model Grid.
 * 
 * @return The model grid.
 * @type cwe.modelgrid.ModelGrid.
 */
cwe.modelgrid.ModelGridPanel.prototype.getGrid = function() {
	return this.grid;
}

/**
 * Returns the Editor Container.
 * 
 * @return The Editor Container.
 * @type cwe.editor.EditorContaine
 */
cwe.modelgrid.ModelGridPanel.prototype.getEditors = function() {
	return this.editors;
}
