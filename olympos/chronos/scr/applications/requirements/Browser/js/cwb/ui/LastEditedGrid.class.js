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

Ext.namespace("cwb.statistics");

/**
 * @class Displays the information belonging to a certain group of objects
 *        selected in the ObjectDataTable.
 * @extends Ext.grid.GridPanel
 */

cwb.ui.LastEditedGrid = function(config) {
	var self = this;
	
	this.store = new Ext.data.Store( {
	    autoLoad : true,
	    proxy : new cwb.ui.LastEditedProxy( {
	        grid : this,
	        objectList : config.objectList,
	        iconRenderer: this.iconRenderer
	    })
	});
	
	cwb.ui.LastEditedGrid.superclass.constructor.call(this, Ext.apply(this, {
		title : cwb.Dict.translate('Most recently edited Objects')
	}, config));
	
	// create the objectSelected event, if a row is clicked
	this.on('rowclick', function(grid, rowIndex, e) {
		var selectedItem = self.getStore().getAt(rowIndex);
		if (selectedItem) {
			self.fireEvent('objectSelected', selectedItem.get('oid'));
		}
	});
}

Ext.extend(cwb.ui.LastEditedGrid, cwb.ObjectsListGrid);
