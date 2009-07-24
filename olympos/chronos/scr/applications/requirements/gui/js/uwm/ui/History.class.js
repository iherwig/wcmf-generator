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
Ext.namespace("uwm.ui");

/**
 * @class The window which shows an object's history and allows undo operations.
 *
 * @extends Ext.window
 * @constructor
 * @param object The object for which the history shall be shown.
 */
uwm.ui.History = function(object) {
	uwm.ui.History.superclass.constructor.call(this, Ext.apply(this, {
		layout: 'border',
		height: 350,
		width: 550,
		title: uwm.Dict.translate('Object History'),
		selection: this.getSelectionModel()
	}));
	
	this.proxy = new uwm.ui.HistoryProxy(object);
	
	this.store = new Ext.data.Store({
		loadRecords: function(o, options, success) {
			if (!o || success === false) {
				if (success !== false) {
					this.fireEvent("load", this, [], options);
				}
				if (options.callback) {
					options.callback.call(options.scope || this, [], options, false);
				}
				return;
			}
			var r = o.records, t = o.totalRecords || r.length;
			if (!options || options.add !== true) {
				if (this.pruneModifiedRecords) {
					this.modified = [];
				}
				for (var i = 0, len = r.length; i < len; i++) {
					r[i].join(this);
				}
				if (this.snapshot) {
					this.data = this.snapshot;
					delete this.snapshot;
				}
				this.data.clear();
				this.data.addAll(r);
				//this.totalLength = t;
				this.applySort();
				this.fireEvent("datachanged", this);
			} else {
				this.totalLength = Math.max(t, this.data.length + r.length);
				this.add(r);
			}
			this.fireEvent("load", this, r, options);
			if (options.callback) {
				options.callback.call(options.scope || this, r, options, true);
			}
		},
		proxy: this.proxy
	});
	
	this.store.proxy['store'] = this.store;
	
	this.store.load({
		params: {
			start: 0,
			limit: 11
		}
	});
	
	this.window = this;
	this.setPosition(200, 200);
	this.selection = this.getSelectionModel();
  
  this.toolbar = new Ext.PagingToolbar({
    pageSize: 11,
    store: this.store,
    displayInfo: false,
    emptyMsg: uwm.Dict.translate("No changes have been made.")
  });

	this.grid = this.getGrid(object);
	this.add(this.grid);
	
	this.addButton(new Ext.Button({
		window: this.window,
		selection: this.selection,
		object: object,
		text: uwm.Dict.translate('Undo selected'),
		handler: this.undoSelected
	}));
	this.addButton(new Ext.Button({
		window: this.window,
		selection: this.selection,
		object: object,
		text: uwm.Dict.translate('Undo all changes since'),
		handler: this.undoAll
	}));
	this.addButton(new Ext.Button({
		window: this,
		text: uwm.Dict.translate('Cancel'),
		handler: function() {
			this.window.close();
		}
	}));
	this.grid.show();
	this.show();
	this.center();
	this.setVisible(true);
	
}
Ext.extend(uwm.ui.History, Ext.Window);


uwm.ui.History.prototype.getFields = function() {
	result = ['id', 'timestamp', 'author', 'propertyString', 'changedProperty', 'oldValue', 'newValue'];
	return result;
}

uwm.ui.History.prototype.getSelectionModel = function() {
	if (this.selection) {
		var result = this.selection;
	} else {
		var result = new Ext.grid.CheckboxSelectionModel();
	}
	return result;
}

uwm.ui.History.prototype.getExpander = function() {
	var result = new Ext.grid.RowExpander({
		tpl: new Ext.Template(""),
		getBodyContent: function(record, index) {
			var result = '';
			result += '<TABLE class="uwm-historyGrid-tableWidth">';
			result += '<THEAD><TR><TH class="uwm-historyGrid-propertyWidth">' + uwm.Dict.translate('Property') + '</TH><TH class="uwm-historyGrid-valueWidth">' + uwm.Dict.translate('Old value') + '</TH><TH class="uwm-historyGrid-valueWidth">' + uwm.Dict.translate('New value') + '</TH></TR></THEAD><TBODY>';
			for (var i = 0; i < record.data.changedProperty.length; i++) {
				if (i % 2 == 1) {
					var color = ' class="uwm-historyGrid-changes-second"';
				} else {
					var color = ' class="uwm-historyGrid-changes-first"';
				}
				result += "<TR" + color + ">";
				result += "<TD>" + record.data.changedProperty[i] + "</TD>";
				result += "<TD>" + record.data.oldValue[i] + "</TD>";
				result += "<TD>" + record.data.newValue[i] + "</TD>";
				result += "</TR>";
			}
			result += "</TBODY></TABLE>";
			return result;
		}
	});
	return result;
}

uwm.ui.History.prototype.getGrid = function(object) {
	var toolbar = this.toolbar;
	var expander = this.getExpander();
	var result = new Ext.grid.GridPanel({
		height: 300,
		width: 500,
		iconCls: object.getModelNodeClass().getTreeIcon(),
		title: object.getLabel(),
		region: 'center',
		store: this.store,
		trackMouseOver: false,
		disableSelection: false,
		cls: "uwm-historyGrid",
		loadMask: true,
		plugins: expander,
		sm: this.getSelectionModel(),
		columns: [expander, {
			header: uwm.Dict.translate("Date"),
			dataIndex: 'timestamp',
			displayField: 'date',
			width: 170,
			sortable: true
		}, {
			header: uwm.Dict.translate("Author"),
			dataIndex: 'author',
			width: 150,
			hidden: false,
			sortable: true
		}, {
			header: uwm.Dict.translate("Changed Items"),
			dataIndex: 'propertyString',
			width: 180,
			align: 'right',
			sortable: true
		}, this.getSelectionModel()],
		viewConfig: {
			forceFit: true
		},
		bbar: toolbar
	});
	result.show();
	return result;
}

uwm.ui.History.prototype.undoAll = function() {
	var self = this;
	
	var sm = this.selection;
	if (sm.getSelections().length == 0) {
		Ext.MessageBox.alert("Error", "No items selected.");
	} else {
		if ((sm.getSelections().length > 1)) {
			Ext.MessageBox.alert("Error", "Only one item may be selected.");
		} else {
			var selectedItem = sm.getSelections()[0];
			
			uwm.persistency.Persistency.getInstance().restorehistliststate(selectedItem.data.id, function(options, data) {
				self.window.restoreSuccess(options, data, self.object)
			}, function(options, data, errorMsg) {
				self.window.restoreError(options, data, errorMsg);
			});
		}
		
		this.window.close();
	}
}

uwm.ui.History.prototype.undoSelected = function() {
	var self = this;
	
	if (this.selection.getSelections().length == 0) {
		Ext.MessageBox.alert("Error", "No items selected.");
	} else {
		var selectedItems = this.selection.getSelections();
		var selectedIds = new Array();
		for (var i = 0; i < selectedItems.length; i++) {
			selectedIds.push(selectedItems[i].data.id);
		}
		
		uwm.persistency.Persistency.getInstance().restorehistlistfields(selectedIds, function(options, data) {
			self.window.restoreSuccess(options, data, self.object)
		}, function(options, data, errorMsg) {
			self.window.restoreError(options, data, errorMsg);
		});
		
		this.window.close();
	}
}

uwm.ui.History.prototype.restoreError = function(options, data, errorMsg, callback, scope, arg) {
	this.fireEvent("loadexception", this, options, data);
	callback.call(scope, null, arg, false);
}

uwm.ui.History.prototype.restoreSuccess = function(options, data, object) {
	Ext.MessageBox.alert('Success', uwm.Dict.translate('The selected properties have been successfully restored.'));
	var oldLabel = object.getLabel();
	if (oldLabel != data.NewName) {
		uwm.event.EventBroker.getInstance().fireEvent("changeLabel", object, null, data.NewName);
	}
	
	uwm.property.PropertyContainer.getInstance().handleDeleteEvent(object);
}
