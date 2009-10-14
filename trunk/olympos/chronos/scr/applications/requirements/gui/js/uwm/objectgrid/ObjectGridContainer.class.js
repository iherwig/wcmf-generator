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
Ext.namespace("uwm.objectgrid");

/**
 * @class Logical container for managing all Object Grids.
 * 
 * @see uwm.objectgrid.ObjectGrid
 * @constructor
 */
uwm.objectgrid.ObjectGridContainer = function() {
	this.items = new Object();
	this.containersInScope = new Array();
	this.dataContainers = new Array();
	
	var self = this;
	uwm.event.EventBroker.getInstance().addListener({
		"delete": function(modelObject) {
			self.handleDeleteEvent(modelObject);
		},
		"changeLabel": function(modelObject, oldLabel) {
			self.handleChangeLabelEvent(modelObject, oldLabel);
		},
		"associate": function(parentModelObject, childModelObject) {
			self.handleAssociateEvent(parentModelObject, childModelObject);
		}
	});
}

uwm.objectgrid.ObjectGridContainer.prototype.registerGrid = function(objectGrid) {
	this.items[objectGrid.getUwmClassName()] = objectGrid;
	if (objectGrid instanceof uwm.objectgrid.ObjectGrid) {
		this.dataContainers[objectGrid.getUwmClassName()] = new Array();
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.handleDeleteEvent = function(modelObject) {
	var objectGrid = this.items[modelObject.getUwmClassName()];
	
	if (objectGrid) {
		var record = objectGrid.getStore().query("oid", modelObject.getOid());
		
		if (record.getCount() > 0) {
			objectGrid.getStore().remove(record.get(0));
		}
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.handleChangeLabelEvent = function(modelObject, oldLabel) {
	// don't update nodes, if they are translated into a different language
	if (modelObject.getLanguage() != uwm.i18n.Localization.getInstance().getModelLanguage()) {
		return;
	}

	var objectGrid = this.items[modelObject.getUwmClassName()];
	
	if (objectGrid) {
		var record = objectGrid.getStore().query("oid", modelObject.getOid());
		
		if (record.getCount() > 0) {
			record.get(0).set("label", modelObject.getLabel());
			// avoid showing a dirty mark in grid
			objectGrid.getStore().commitChanges();
		}
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.handleAssociateEvent = function(parentModelObject, childModelObject) {
	var container = this.containersInScope[parentModelObject.getOid()];
	
	if (container) {
		var objectGrid = this.items[childModelObject.getUwmClassName()];
		
		if (objectGrid) {
			objectGrid.getStore().loadData([childModelObject.getGridData()], true);
		}
		else if (childModelObject instanceof uwm.model.builtin.Package) {
			this.containersInScope[childModelObject.getOid()] = childModelObject;
		}
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.loadScope = function(modelNode) {
	this.rootModelNode = modelNode;
	
	var self = this;
	
	// initialize containers
	this.dataContainers = new Object();
	this.containersInScope = new Array();
	for (var i in this.items) {
		var currGrid = this.items[i];
		
		if (currGrid instanceof uwm.objectgrid.ObjectGrid) {
			this.dataContainers[i] = new Array();
		}
	}
	
	var longTaskRunner = new uwm.ui.LongTaskRunner( {
			title : uwm.Dict.translate('Loading Scope ...'),
			call : function(successHandler, errorHandler) {
				uwm.persistency.Persistency.getInstance().batchdisplay(modelNode.getOid(), 
					uwm.i18n.Localization.getInstance().getModelLanguage(), successHandler, errorHandler);
			},
			progressHandler : function(data) {
				if (data.objects) {
					self.handleLoadedScopePart(data.objects);
				}
			},
			successHandler : function(data) {
				if (data.objects) {
					self.handleLoadedScopePart(data.objects);
				}
				self.handleLoadedScope();
				longTaskRunner.close();
			},
			errorHandler : function(data) {
				uwm.Util.showMessage(uwm.Dict.translate("Error while loading scope"), uwm.Dict.translate("The process was unsuccessful. Please try again."), uwm.Util.messageType.ERROR);
			},
			isReturningDocument : false
	}).show();
}

uwm.objectgrid.ObjectGridContainer.prototype.handleLoadedScopePart = function(objects) {
	var modelContainer = uwm.model.ModelContainer.getInstance();
	for (var i=0; i<objects.length; i++) {
		var modelNode = modelContainer.createByDisplayResult({node: objects[i]});
		this.collectData(modelNode);
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.handleLoadedScope = function() {
	for (var i in this.items) {
		var currGrid = this.items[i];
		
		if (currGrid instanceof uwm.objectgrid.ObjectGrid) {
			currGrid.getStore().loadData(this.dataContainers[i]);
			currGrid.hideInfoMask();
		}
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.collectData = function(modelNode) {
	this.containersInScope[modelNode.getOid()] = modelNode;

	var modelNodeUwmClassName = modelNode.getUwmClassName();	
	var container = this.dataContainers[modelNodeUwmClassName];
	if (container) {
		container.push(modelNode.getGridData());
	}
}

uwm.objectgrid.ObjectGridContainer.prototype.isGridAvailable = function(modelObject, parentOid) {
	var result = false;
	
	var objectGrid = this.items[modelObject.getUwmClassName()]; 
	
	if (objectGrid) {
		if (!parentOid) {
			var parentOids = modelObject.getParentOids();
			
			for (var i = 0; i < parentOids.length; i++) {
				var currOid = parentOids[i];
				
				if (uwm.Util.getUwmClassNameFromOid(currOid) == "Package") {
					parentOid = currOid;
					
					break;
				}
			}
		}
		
		result = this.containersInScope[parentOid] ? true : false;
	}
	
	return result;
}

uwm.objectgrid.ObjectGridContainer.prototype.selectRow = function(modelObject) {
	var objectGrid = this.items[modelObject.getUwmClassName()];
	
	if (objectGrid) {
		objectGrid.show();

		var record = objectGrid.getStore().query("oid", modelObject.getOid());
		
		if (record.getCount() > 0) {
			objectGrid.getSelectionModel().selectRecords([record.get(0)], false);
		}
	}
}

uwm.objectgrid.ObjectGridContainer.getInstance = function() {
	if (!uwm.objectgrid.ObjectGridContainer.instance) {
		uwm.objectgrid.ObjectGridContainer.instance = new uwm.objectgrid.ObjectGridContainer();
	}
	
	return uwm.objectgrid.ObjectGridContainer.instance;
}

