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
 * @class Displays the model information which is generated in backend.
 * @param {Object}
 *            workbench The workbench this table belongs to.
 * @extends Ext.grid.GridPanel
 */
cwb.statistics.Overview = function() {
};

cwb.statistics.Overview = Ext.extend(Ext.ux.maximgb.tg.EditorGridPanel, {
	initComponent: function() {
		var self = this;
		
		this.store = new Ext.ux.maximgb.tg.AdjacencyListStore({
 			autoLoad: false,
			proxy: new cwb.statistics.OverviewProxy()
 		});
		// add dummy record
		this.store.add([
			new Ext.data.Record({
				_id: 0,
				_parent: null,
				_is_leaf: true,
				object: '<div class="noSelectionNote">No model selected</div>'
			}, 0)
		]);

		Ext.apply(this, {
		    region: 'center',
		    title: cwb.Dict.translate('Statistical Data'),
		    store: this.store,
		    master_column_id: 'object',
		    columns: [ {
		        id: 'object',
		        header: "Object",
		        width: 170,
		        sortable: false,
		        dataIndex: 'object',
		        renderer: function(value, metadata, record, rowIndex, colIndex, store) {
		            metadata.attr = 'ext:qtip="' + record.get('toolTip') + '"';
		            return value;
		        }
		    }, {
		        header: "Quantity",
		        width: 50,
		        sortable: false,
		        dataIndex: 'quantity'
		    }, {
		        header: "",
		        width: 21,
		        sortable: false,
		        dataIndex: 'status',
		        renderer: self.statusRenderer
		    } ],
		    viewConfig: {
			    forceFit: true,
		        getRowClass: function(record, index) {
					var objectList = record.get('objectList');
					if (objectList instanceof Array && objectList.length > 0) {
		                return 'clickableRow';
		            }
		        }		    
			},
		    sm: new Ext.grid.RowSelectionModel( {
			    singleSelect: true
		    }),
		    stripeRows: true
		});
		
		cwb.statistics.Overview.superclass.initComponent.apply(this, arguments);
		
		this.on('rowclick', function(grid, rowIndex, e) {
			var record = self.getStore().getAt(rowIndex);
			var objectList = record.get('objectList');
			if (objectList instanceof Array && objectList.length > 0) {
				cwb.ui.StructureTabPanel.getInstance().createHitsGrid(record.get('id'), 
						record.get('object'), record.get('objectList'));
			}
		});
	}
});

cwb.statistics.Overview.prototype.statusRenderer = function(value) {
	var result = "";
	if (value !== null && value !== '' && value !== -1) {
		result = "<img src='"+cwb.Config.baseHref+"img/signal"+value+".png' />";
	}
	
	return result;
};

cwb.statistics.Overview.prototype.loadData = function() {
	this.clear();
	this.reload(cwb.ObjectContainer.getInstance().getCurrModelOid());
};

cwb.statistics.Overview.prototype.clear = function() {
	this.store.removeAll();
};

cwb.statistics.Overview.prototype.reload = function(modelOid) {
	this.store.load( {
		modelOid: modelOid
	});
};

cwb.statistics.Overview.getInstance = function() {
	if (!cwb.statistics.Overview.instance) {
		cwb.statistics.Overview.instance = new cwb.statistics.Overview();
	}
	return cwb.statistics.Overview.instance;
};
