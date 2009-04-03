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
/**
 * @class Loads and handles all data which comes from backend & converts it in
 *		JSON for the Jit.
 * 
 * @constructor
 */
ObjectContainer = function(){
	/**
	 * List of models which can be loaded.
	 */
	this.models = [];
	
	/**
	 * Two lists containing the object information for Package weight (treemap)
	 * and Package tree (spacetree)
	 */
	this.objectsForTreemap = [];
	this.objectsForSpacetree = [];
	
	this.selectedModel = null;
	this.selectedModelName = null;
	
	this.objectsToLoad = 0;
	this.modelLoaded = false;
	
	/**
	 * The number of objects in the biggest package of the current model
	 */
	this.maxTreeContent = 1;
}


/**
 * Loads models from persistency into this.models. Used for navigation.
 * Creates the workbench when finished.
 */
ObjectContainer.prototype.loadModelList = function(){
	var self = this;
	
	uwm.persistency.Persistency.getInstance().loadChildren('root', function(options, data){
		self.handleLoadedModelList(options, data);
	}, function(){
	});
}

ObjectContainer.prototype.handleLoadedModelList = function(options, data){
	for (i in data.objects) {
		if (!(data.objects[i] instanceof Function)) {
			var recordTemplate = [
					data.objects[i].oid,
					data.objects[i].text
			];
			
			this.models.push(recordTemplate);
		}
	}
	Workbench.getInstance();
}

ObjectContainer.prototype.loadModel=function(oid){
	this.modelLoaded=true;
	this.loadDiagram(oid);
	this.loadStructurePanel(oid, oid);
// this.loadReport(oid);
}

ObjectContainer.prototype.loadDiagram=function(modelOid){
	var workbench=Workbench.getInstance();
	
	workbench.piechartContainer.remove(workbench.piechartPanelEmpty);
	workbench.piechartContainer.add(workbench.piechartPanel);
	workbench.barchartContainer.remove(workbench.barchartPanelEmpty);
	workbench.barchartContainer.add(new Ext.Panel( {
	    
	    layout : 'fit',
	    html : '<iframe class="flashDoc" src="chart/barchart.php?modelOid=' + modelOid + '"/>'
	}));
	workbench.diagramPanel.doLayout();
}

/**
 * Loads a model by its oid into two identical variables.
 * Starts loadObject to load the model's objects.
 *
 * @param {String} oid The oid of the model which is to be loaded.
 */
ObjectContainer.prototype.loadStructurePanel = function(oid, modelOid){
	var uwmClass = 'Model';
	this.objectsForTreemap = null;
	this.objectsForTreemap = [];
	this.objectsForTreemap[0] = [];
	this.objectsForTreemap[0]['parentOid'] = 'root';
	this.objectsForTreemap[0]['children'] = [];
	this.objectsForTreemap[0]['id'] = oid;
	this.objectsForTreemap[0]['uwmClassName'] = uwmClass;
	this.objectsForTreemap[0]['name'] = this.selectedModelName;
	this.objectsForTreemap[0]['data'] = [{
		'key': 'content',
		'value': 0
	}, {
		'key': 'color',
		'value': 1
	}];
	this.objectsForSpacetree = null;
	this.objectsForSpacetree = [];
	this.objectsForSpacetree[0] = [];
	this.objectsForSpacetree[0]['parentOid'] = 'root';
	this.objectsForSpacetree[0]['children'] = [];
	this.objectsForSpacetree[0]['id'] = oid;
	this.objectsForSpacetree[0]['uwmClassName'] = uwmClass;
	this.objectsForSpacetree[0]['name'] = this.selectedModelName;
	this.objectsForSpacetree[0]['data'] = [{
		'key': 'content',
		'value': 0
	}, {
		'key': 'color',
		'value': 1
	}];
	this.loadObject(oid, modelOid);
}

/**
 * Recursively loads the objects of the current model.
 * Each object is first saved in the root part of the arrays, not in a hierarchical structure.
 *
 * Calls further functions on the trees and reloads the tab panels when finished.
 *
 * @param {String} oid The oid of the object which is to be loaded.
 */
ObjectContainer.prototype.loadObject = function(oid, modelOid){
	var self = this;
	
	this.objectsToLoad++;
	
	uwm.persistency.Persistency.getInstance().loadChildren(oid, function(options, data){
		self.handleLoadedObject(options, data, oid, modelOid)
	});
}

/**
 * Replacement for the upper load method which does only one JSON call and uses display. 
 * Is much faster, but currently has no working successhandler.
 * 
 * @param {String} oid The oid of the object which is to be loaded.
 */
ObjectContainer.prototype.loadOBJECT=function(oid){
	var self = this;
	
	var oid = oid;
	uwm.persistency.Persistency.getInstance().display(oid,-1,function(options, data){
		self.handleLoadedObject(options, data, oid)
	});
}

ObjectContainer.prototype.handleLoadedObject = function(options, data, oid, modelOid){
	for (var i = 0; i < data.objects.length; i++) {
		if (!(data.objects[i] instanceof Function)) {
			var childOid = data.objects[i].oid;
			var arrayPosition = this.objectsForTreemap.length;
			
			var uwmClass = uwm.Util.getUwmClassNameFromOid(childOid);
			this.objectsForTreemap[arrayPosition] = [];
			this.objectsForTreemap[arrayPosition]['uwmClassName'] = uwmClass;
			this.objectsForTreemap[arrayPosition]['children'] = [];
			this.objectsForTreemap[arrayPosition]['parentOid'] = oid;
			this.objectsForTreemap[arrayPosition]['id'] = childOid;
			this.objectsForTreemap[arrayPosition]['name'] = data.objects[i].text;
			this.objectsForTreemap[arrayPosition]['data'] = [{
				'key': 'content',
				'value': 0
			}, {
				'key': 'color',
				'value': 1
			}];
			this.objectsForSpacetree[arrayPosition] = [];
			this.objectsForSpacetree[arrayPosition]['uwmClassName'] = uwmClass;
			this.objectsForSpacetree[arrayPosition]['children'] = [];
			this.objectsForSpacetree[arrayPosition]['parentOid'] = oid;
			this.objectsForSpacetree[arrayPosition]['id'] = childOid;
			this.objectsForSpacetree[arrayPosition]['name'] = data.objects[i].text;
			this.objectsForSpacetree[arrayPosition]['data'] = [{
				'key': 'content',
				'value': 0
			}, {
				'key': 'color',
				'value': 1
			}];
			if (uwmClass == "Package") {
				this.loadObject(childOid, modelOid);
			}
		}
	}
	this.objectsToLoad--;
	if (this.objectsForSpacetree.length>8){
		Ext.Msg.updateProgress(0.25,uwm.Dict.translate("Package weight"));
	}
	if (this.objectsToLoad == 0) {
		this.arrangeTreeList(this.selectedModel);
		this.arrangeWeightList(this.selectedModel);
		
		Workbench.getInstance().unmaskTabPanel();
		Ext.Msg.updateProgress(0.5,uwm.Dict.translate("Object information"))
		
		
		/**
		 * Reloads treemap window.
		 */
		frames[0].window.location.reload();
		/**
		 * Reloads frametree window if it has already been rendered.
		 */
		if (frames[3]) {
			frames[3].window.location.reload();
		}
		
		Ext.Msg.hide();

		this.loadReport(modelOid);
	}
}

/**
 * Inserts image information and creates hierarchical structure inthe spacetree data.
 *
 * @param {String} rootOid The oid of the object which is to be the root of the tree.
 */
ObjectContainer.prototype.arrangeTreeList = function(rootOid){
	var objects = this.objectsForSpacetree;
	var arrayPosition;
	for (var i = 0; i < objects.length; i++) {
		if (!(objects[i] instanceof Function)) {
		
			objects[i]['name'] = '<img align="left" hspace=6 vspace=6 src="../img/icons/' + objects[i]['uwmClassName'] + '.png">' + objects[i]['name'];
			
			var parentOid = objects[i]['parentOid'];
			if (!(parentOid == 'root')) {
				objects[this.getObjectPosition(parentOid, this.objectsForSpacetree)]['children'].push(objects[i]);
			}
			else {
				arrayPosition = i;
			}
		}
	}
	objects = objects[arrayPosition];
	this.objectsForSpacetree = objects;
}

/**
 * Creates hierarchical structure in treemap data.
 *
 * @param {Object} rootOid The oid of the object which is to be the root of the tree.
 */
ObjectContainer.prototype.arrangeWeightList = function(rootOid){
	var objects = this.objectsForTreemap;
	var arrayPosition;
	for (var i = 0; i < objects.length; i++) {
		if (!(objects[i] instanceof Function)) {
			var parentOid = objects[i]['parentOid'];
			if (!(parentOid == 'root')) {
				objects[this.getObjectPosition(parentOid, this.objectsForTreemap)]['children'].push(objects[i]);
			}
			else {
				arrayPosition = i;
			}
		}
	}
	objects = objects[arrayPosition];
	
	this.objectsForTreemap = objects;
	
	this.setContentData(this.objectsForTreemap);
	this.setWeightColors(this.objectsForTreemap);
}

/**
 * Recursively inserts content information in treemap data.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
ObjectContainer.prototype.setContentData = function(objectList){
	var result = 0;
	
	if (objectList['children'].length == 0) {
		objectList['data'][0]['value'] = 1;
		result = 1;
	}
	else {
		for (var j = 0; j < objectList['children'].length; j++) {
			if (!(objectList['children'][j] instanceof Function)) {
				result += this.setContentData(objectList['children'][j]);
			}
		}
		objectList['data'][0]['value'] = result;
	}
	return result;
}

/**
 * Inserts color information in data for treemap.
 */
ObjectContainer.prototype.setWeightColors = function(){
	this.maxTreeContent = 0;
	this.getMaxContent(this.objectsForTreemap);
	
	this.setColor(this.objectsForTreemap);
}

/**
 * Recursively calculates the size of the biggest package which contains only leaves.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
ObjectContainer.prototype.getMaxContent = function(objectList){
	if (objectList.data[0].value == objectList.children.length) {
		if (objectList.children.length > this.maxTreeContent && this.containsLeaves(objectList.children)) {
			this.maxTreeContent = objectList.children.length
		}
	}
	else {
		for (var i = 0; i < objectList.children.length; i++) {
			if (!(objectList.children[i] instanceof Function)) {
				this.getMaxContent(objectList.children[i]);
			}
		}
	}
}

/**
 * Checks if a subtree contains only leaves.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 * @return <code>true</code> if the sublist contains only leaves, <code>false</code> otherwise.
 * @type boolean
 */
ObjectContainer.prototype.containsLeaves = function(objectList){
	var result = true;
	for (var i = 0; i < objectList.length; i++) {
		if (!(objectList[i] instanceof Function)) {
			if (objectList[i].children.length != 0) {
				result = false;
			}
		}
	}
	return result;
}

/**
 * Recursively determines which color an object and its children have by comparing their size to the size of the biggest package.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
ObjectContainer.prototype.setColor = function(objectList, parentLength){
	var contentLength;
	if (objectList.children.length == 0) {
		contentLength = parentLength / this.maxTreeContent;
	}
	else {
		contentLength = objectList.children.length / this.maxTreeContent;
	}
	var colorValue = 5;
	
	if (contentLength > 0.9) {
		colorValue = 1;
	}
	else 
		if (contentLength > 0.7) {
			colorValue = 2;
		}
		else 
			if (contentLength > 0.5) {
				colorValue = 3;
			}
			else 
				if (contentLength > 0.3) {
					colorValue = 4;
				}
	
	objectList.data[1]['value'] = colorValue;
	
	for (var j = 0; j < objectList.children.length; j++) {
		this.setColor(objectList.children[j], objectList.children.length);
	}
	
	
}

/**
 * Checks which position an object has in an array by its oid.
 * @param {String} oid The oid of the object.
 * @param {Array} objectList An unstructured array with object information
 * @return The position in the array.
 * @type int
 */
ObjectContainer.prototype.getObjectPosition = function(oid, objectList){
	for (var i = 0; i < objectList.length; i++) {
		if (!(objectList[i] instanceof Function)) {
			if (objectList[i].id == oid) {
				return i;
			}
		}
	}
}

ObjectContainer.prototype.getModels = function(){
	return this.models;
}

/**
 * Gets the oid of the model which was selected in navigation
 * @return The oid of the selected object.
 * @type String
 */
ObjectContainer.prototype.setModelOid = function(modelOid){
	this.selectedModel = modelOid;

	return true;
}

/**
 * Should load the ObjectDataTable when backend generator for that is finished. 
 * Currently only shows dummy data.
 */
ObjectContainer.prototype.loadReport = function(modelOid){
	Workbench.getInstance().objectDataTable.reload(modelOid);
	Workbench.getInstance().objectDataTable.getEl().unmask();
	Workbench.getInstance().diagramPanel.getEl().unmask();
}

/**
 * Supposed to load the report data for the ObjectDataTable. Currently only shows the dummy data.
 */
ObjectContainer.prototype.getTableData = function(){
	var result;
	if (this.modelLoaded){
		result=[
	['Goals',["ChiGoal:15270","ChiGoal:21669"],'Goals', '<u>4</u>', '<img src="img/signal2.png">'],  
	['Achieved Goals',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;achieved', '<u>1</u>', '<img src="img/signal5.png">'], 
	['Not achieved Goals',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not achieved', '<u>3</u>', '<img src="img/signal1.png">'], 
	['Goals without Requirements',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Requirements', '<u>1</u>', '<img src="img/signal3.png">'],
	['Goals without valid priority',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without valid priority', '<u>2</u>','<img src="img/signal2.png">'],
	['Requirements',["ChiGoal:15270","ChiGoal:21669"],'Requirements', '<u>6</u>', '<img src="img/signal4.png">'], 
	['Satisfied Requirements',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;satisfied', '<u>2</u>', '<img src="img/signal4.png">'], 
	['Not satisfied Requirements',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not satisfied', '<u>4</u>', '<img src="img/signal2.png">'], 
	['Requirements without Goal',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Goal', '<u>0</u>', '<img src="img/signal5.png">'], 
	['Requirements without Feature',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Feature', '<u>1</u>', '<img src="img/signal3.png">'], 
	['Requirements with Issue',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with Issue', '<u>2</u>', '<img src="img/signal1.png">'],
	['Requirements without Proofreader',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Proofreader', '<u>0</u>','<img src="img/signal2.png">'],
	['Not validated Requirements',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not validated', '<u>1</u>', '<img src="img/signal2.png">'],
	['Features',["ChiGoal:15270","ChiGoal:21669"],'Features', '<u>10</u>','<img src="img/signal5.png">'],
	['Features without Requirement',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Requirement','<u>1</u>','<img src="img/signal1.png">'],
	['Implemented Features',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;implemented','<u>6</u>','<img src="img/signal5.png">'],
	['Implemented Features without UseCase',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without UseCase','<u>1','<img src="img/signal2.png">'],
	['Not implemented Features',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;not implemented', '<u>4</u>','<img src="img/signal3.png">'],
	['Issues',["ChiGoal:15270","ChiGoal:21669"],'Issues', '<u>5</u>', '<img src="img/signal2.png">'],
	['UseCases',["ChiGoal:15270","ChiGoal:21669"],'UseCases', '<u>8</u>','<img src="img/signal4.png">'],
	['UseCases without Actors',["ChiGoal:15270","ChiGoal:21669"],'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;without Actors', '<u>2</u>','<img src="img/signal2.png">'],
	['Actors',["ChiGoal:15270","ChiGoal:21669"],'Actors', '<u>7</u>','<img src="img/signal5.png">']
	];
	}else{
		result=[['','',uwm.Dict.translate('Please select a model.'),'','']];
	}
	return result;
}

ObjectContainer.getInstance = function(){
	if (!ObjectContainer.instance) {
		ObjectContainer.instance = new ObjectContainer();
	}
	return ObjectContainer.instance;
}

