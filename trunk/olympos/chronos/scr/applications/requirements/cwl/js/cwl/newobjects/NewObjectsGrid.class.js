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
Ext.namespace("cwl.newobjects");

/**
 * @class Shows a list of new Model Objects to be dragged on a Diagram.
 * 
 * @extends Ext.grid.GridPanel
 * @constructor
 * @param {Object}
 *            config The configuration object.
 */
cwl.newobjects.NewObjectsGrid = function() {
}

cwl.newobjects.NewObjectsGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent: function() {
		var self = this;
		
		this.cellActions = new Ext.ux.grid.CellActions({
			listeners: {
				action: function(grid, record, action, value) {
					self.helpClick(grid, record, action, value);
				}
			},
			align: "left"
		});
		
		Ext.apply(this, {
			collapsible: true,
			autoScroll: true,
			height: 250,
			title: chi.Dict.translate("New") + " " + this.semanticGroup,
			layout: "fit",
			enableDrag: true,
			ddGroup: cwl.Constants.DD_GROUP,
			selModel: new Ext.grid.RowSelectionModel({
				singleSelect: true
			}),
			store: this.getStore(),
			plugins: [this.cellActions],
			columns: [{
				header: "",
				width: 24,
				dataIndex: "iconClass",
				sortable: false,
				fixed: true,
				hideable: false,
				menuDisabled: true,
				resizable: false,
				renderer: this.showImage
			}, {
				header: chi.Dict.translate('Title'),
				width: 174,
				dataIndex: "title",
				sortable: true
			}, {
				header: "",
				dataIndex: "none",
				width: 24,
				fixed: true,
				hideable: false,
				menuDisabled: true,
				resizable: false,
				cellActions: {
					iconCls: "uwm-help-icon",
					qtipIndex: "description"
				}
			}, {
				header: "modelClass",
				dataIndex: "modelClass",
				hidden: true,
				hideable: false
			}]
		});
		
		cwl.newobjects.NewObjectsGrid.superclass.initComponent.apply(this, arguments);
	}
})

cwl.newobjects.NewObjectsGrid.prototype.getStore = function() {
	var data = new Array();
	
  data = this.addElements(data, cwl.rule.RuleElementContainer.getInstance().getAllElements());
	
	return new Ext.data.SimpleStore({
		data: data,
		fields: [{
			name: "iconClass",
			mapping: "iconClass",
		}, {
			name: "title",
			mapping: "title"
		}, {
			name: "description",
			mapping: "description"
		}, {
			name: "modelClass",
			mapping: "modelClass"
		}, {
			name: "helpUrl",
			mapping: "helpUrl"
		}]
	});
}

cwl.newobjects.NewObjectsGrid.prototype.addElements = function(data, elements) {
	for (var i = 0; i < elements.getCount(); i++) {
		var currElement = elements.itemAt(i);

		if (currElement instanceof cwl.model.ModelElement && 
        cwl.newobjects.Accordion.CONTAINED_TYPES.indexOf(currElement.getType()) != -1) {
			var semanticGroup = currElement.semanticGroup;
			
			if (!Ext.isArray(semanticGroup)) {
				data = this.addSemanticGroup(data, currElement, semanticGroup);
			} else {
				for (var j = 0; j < semanticGroup.length; j++) {
					data = this.addSemanticGroup(data, currElement, semanticGroup[j]);
				}
			}
		}
	}
  return data;
}

cwl.newobjects.NewObjectsGrid.prototype.addSemanticGroup = function(data, currElement, semanticGroup) {
	if (semanticGroup == this.semanticGroup) {
		data.push({
			iconClass: currElement.getTreeIconClass(),
			title: currElement.getName(),
			description: currElement.getDescription(),
			helpUrl: currElement.getHelpUrl(),
			modelClass: currElement
		});
	}
	
	return data;
}

cwl.newobjects.NewObjectsGrid.prototype.render = function(container, position) {
	cwl.newobjects.NewObjectsGrid.superclass.render.call(this, container, position);
	
	this.initDragZone();
}

cwl.newobjects.NewObjectsGrid.prototype.initDragZone = function() {
	new cwl.newobjects.DragZone(this, {});
}

cwl.newobjects.NewObjectsGrid.prototype.showImage = function(value) {
	return "<div class='uwm-grid-icon " + value + "'>&nbsp;</div>";
}

cwl.newobjects.NewObjectsGrid.prototype.helpClick = function(grid, record, action, value) {
	cwl.ui.HelpViewer.getInstance().loadUrl(record.get("helpUrl"));
}
