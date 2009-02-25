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
		//store: this.getStore(),
		layout: 'border',
		height: 350,
		width: 550,
		title: uwm.Dict.translate('Object History'),
		selection: this.getSelectionModel()
	}));
	
	this.store = new Ext.data.Store({
			proxy: new uwm.ui.HistoryProxy(object),
			start: 0,
			limit: 3
		});
	this.store.load({
		params: {
			start: 0,
			limit: 3
		}
	});
	this.window = this;
	this.setPosition(200, 200);
	this.selection = this.getSelectionModel();
	this.toolbar = this.getToolbar();
	this.grid = this.getGrid(object);
	this.add(this.grid);
	
	this.addButton(new Ext.Button({
		selection: this.selection,
		text: uwm.Dict.translate('Undo selected'),
		handler: this.undoSelected
	}));
	this.addButton(new Ext.Button({
		selection: this.selection,
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
	result = ['id', 'date', 'author', 'propertyString', 'changedProperty', 'oldValue', 'newValue'];
	return result;
}

uwm.ui.History.prototype.getToolbar = function() {
	var window = this.window;
	var selection = this.selection;
	var result = new Ext.PagingToolbar({
		window: window,
		selection: selection,
		onRender: function(ct, position) {
			Ext.PagingToolbar.superclass.onRender.call(this, ct, position);
			this.first = this.addButton({
				tooltip: this.firstText,
				iconCls: "x-tbar-page-first",
				disabled: true,
				handler: this.onClick.createDelegate(this, ["first"])
			});
			this.prev = this.addButton({
				tooltip: this.prevText,
				iconCls: "x-tbar-page-prev",
				disabled: true,
				handler: this.onClick.createDelegate(this, ["prev"])
			});
			this.addSeparator();
			this.add(this.beforePageText);
			this.field = Ext.get(this.addDom({
				tag: "input",
				type: "text",
				size: "3",
				value: "1",
				cls: "x-tbar-page-number"
			}).el);
			this.field.on("keydown", this.onPagingKeydown, this);
			this.field.on("focus", function() {
				this.dom.select();
			});
			this.afterTextEl = this.addText(String.format(this.afterPageText, 1));
			this.field.setHeight(18);
			this.addSeparator();
			this.next = this.addButton({
				tooltip: this.nextText,
				iconCls: "x-tbar-page-next",
				disabled: true,
				handler: this.onClick.createDelegate(this, ["next"])
			});
			this.last = this.addButton({
				tooltip: this.lastText,
				iconCls: "x-tbar-page-last",
				disabled: true,
				handler: this.onClick.createDelegate(this, ["last"])
			});
			this.addSeparator();
			this.loading = this.addButton({
				id: 'refresh',
				tooltip: this.refreshText,
				iconCls: "x-tbar-loading",
				handler: this.onClick.createDelegate(this, ["refresh"]),
				hidden: true
			});
			
			if (this.displayInfo) {
				this.displayEl = Ext.fly(this.el.dom).createChild({
					cls: 'x-paging-info'
				});
			}
			if (this.dsLoaded) {
				this.onLoad.apply(this, this.dsLoaded);
			}
		},
		
		pageSize: 3,
		store: this.store,
		displayInfo: false,
		emptyMsg: uwm.Dict.translate("No changes have been made.")
	});
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
			dataIndex: 'date',
			displayField: 'date',
			width: 100,
			sortable: true
		}, {
			header: uwm.Dict.translate("Author"),
			dataIndex: 'author',
			width: 150,
			hidden: false,
			sortable: true
		}, {
			header: uwm.Dict.translate("Items changed"),
			dataIndex: 'propertyString',
			width: 250,
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
	var sm = this.selection;
	if (sm.getSelections().length == 0) {
		alert("No items selected.")
		return;
	}
	if ((sm.getSelections().length > 1)) {
		alert("Only one item may be selected.");
	} else {
		var selectedItem = sm.getSelections()[0];
		
		uwm.persistency.Persistency.getInstance().restorehiststate(selectedItem.id, function(options, data) {
			//self.loadResponse(options, data, callback, scope, arg);
			alert("success")
		}, function(options, data, errorMsg) {
			alert("error");
		});
	}
	
}

uwm.ui.History.prototype.undoSelected = function() {
	if (this.selection.getSelections().length == 0) {
		alert("No items selected.")
		return;
	}
	var selectedItems = this.selection.getSelections();
	var selectedIds = new Array();
	for (var i = 0; i < selectedItems.length; i++) {
		selectedIds.push(selectedItems[i].data.id);
	}
	
	uwm.persistency.Persistency.getInstance().restorehistfields(selectedIds, function(options, data) {
			//self.loadResponse(options, data, callback, scope, arg);
			alert("success")
		}, function(options, data, errorMsg) {
			//self.loadFailed(options, data, errorMsg, callback, scope, arg)
			alert("error")
		});
}
