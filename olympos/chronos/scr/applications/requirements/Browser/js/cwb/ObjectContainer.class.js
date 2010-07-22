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

Ext.namespace("cwb");

/**
 * @class Loads and handles all data which comes from backend & converts it in
 *        JSON for the Jit.
 * 
 * @constructor
 */
cwb.ObjectContainer = function(){
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
	this.jitLoaded = false;
	
	/**
	 * The number of objects in the biggest package of the current model
	 */
	this.maxTreeContent = 1;
};


/**
 * Loads models from persistency into this.models. Used for navigation.
 */
cwb.ObjectContainer.prototype.loadModelList = function(dropdown){
	var self = this;
	
	cwb.persistency.Persistency.getInstance().loadChildren('root', function(options, data){
		self.handleLoadedModelList(options, data, dropdown);
	}, function(){
	});
};

cwb.ObjectContainer.prototype.handleLoadedModelList = function(options, data, dropdown){
	for (i in data.objects) {
		if (!(data.objects[i] instanceof Function)) {
			var recordTemplate = [
					data.objects[i].oid,
					data.objects[i].text
			];
			
			this.models.push(recordTemplate);
		}
	}

	dropdown.store.loadData(this.models);
};

cwb.ObjectContainer.prototype.loadModel = function(modelOid, useCache, callback){
	this.modelLoaded = false;
	this.jitLoaded = false;
	this.currModelOid = modelOid;
	
	var self = this;
	
	var longTaskRunner = new cwb.ui.LongTaskRunner( {
			title : cwb.Dict.translate('Generating Data ...'),
			call : function(successHandler, errorHandler) {
				cwb.persistency.Persistency.getInstance().loadAllStatisticsOverview(modelOid, useCache, successHandler, errorHandler);
			},
			successHandler : function(data) {
				longTaskRunner.close();
				self.modelUmlGenerated(callback);
			},
			errorHandler : function(data) {
				cwb.Util.showMessage(cwb.Dict.translate("Error while copying"), cwb.Dict.translate("The process was unsuccessful. Please try again."), cwb.Util.messageType.ERROR);
			},
			isReturningDocument : false
	}).show();
};

cwb.ObjectContainer.prototype.modelUmlGenerated = function(callback) {
	this.modelLoaded = true;

	callback('generated');
};

/**
 * Loads a model by its oid into two identical variables.
 * Starts loadObject to load the model's objects.
 *
 * @param {String} oid The oid of the model which is to be loaded.
 */
cwb.ObjectContainer.prototype.loadJitData = function(oid, callback){
	if (!this.jitLoaded) {
		this.objectsForTreemap = [];
		this.objectsForTreemap[0] = {  
			id: oid,  
			name: this.selectedModelName,  
			data: {  
				$area: 0,
				$color: 1
			},  
			children: [],
			parentOid: 'root',
			uwmClassName: 'Model'
		};
	
		this.objectsForSpacetree = [];
		this.objectsForSpacetree[0] = {  
			id: oid,  
			name: this.selectedModelName,  
			data: {  
				$area: 0,
				$color: 1
			},  
			children: [],
			parentOid: 'root',
			uwmClassName: 'Model'
		};
	
		this.loadJitObject(oid, callback);
	} else {
		callback("jit");
	}
};

/**
 * Recursively loads the objects of the current model.
 * Each object is first saved in the root part of the arrays, not in a hierarchical structure.
 *
 * Calls further functions on the trees and reloads the tab panels when finished.
 *
 * @param {String} oid The oid of the object which is to be loaded.
 */
cwb.ObjectContainer.prototype.loadJitObject = function(oid, callback){
	var self = this;
	
	this.objectsToLoad++;
	
	cwb.persistency.Persistency.getInstance().loadChildren(oid, function(options, data){
		self.handleLoadedJitObject(options, data, oid, callback);
	});
};

cwb.ObjectContainer.prototype.handleLoadedJitObject = function(options, data, oid, callback){
	for (var i = 0; i < data.objects.length; i++) {
		if (!(data.objects[i] instanceof Function)) {
			var childOid = data.objects[i].oid;
			var arrayPosition = this.objectsForTreemap.length;
			
			var uwmClass = cwb.Util.getUwmClassNameFromOid(childOid);

			this.objectsForTreemap[arrayPosition] = {  
				id: childOid,  
				name: data.objects[i].text,  
				data: {  
					$area: 0,
					$color: 1
				},  
				children: [],
				parentOid: oid,
				uwmClassName: uwmClass
			};
			this.objectsForSpacetree[arrayPosition] = {  
				id: childOid,  
				name: data.objects[i].text,  
				data: {  
					$area: 0,
					$color: 1
				},  
				children: [],
				parentOid: oid,
				uwmClassName: uwmClass
			};

			if (uwmClass == "Package") {
				this.loadJitObject(childOid, callback);
			}
		}
	}
	
	this.objectsToLoad--;
	
	if (this.objectsToLoad == 0) {
		this.objectsForSpacetree = this.arrangeTree(this.objectsForSpacetree);
		this.objectsForTreemap = this.arrangeTree(this.objectsForTreemap);
		
		this.setAreaData(this.objectsForTreemap);
		this.setWeightColors(this.objectsForTreemap);
		
		callback('jit');
		this.jitLoaded = true;
	}
};

/**
 * Creates a hierarchical structure from a list of objects with attributes
 * children and parentOid.
 */
cwb.ObjectContainer.prototype.arrangeTree = function(objects) {
	var arrayPosition;
	for (var i = 0; i < objects.length; i++) {
		if (!(objects[i] instanceof Function)) {
			var parentOid = objects[i].parentOid;
			if (!(parentOid == 'root')) {
				objects[this.getObjectPosition(parentOid, objects)].children.push(objects[i]);
			}
			else {
				arrayPosition = i;
			}
		}
	}
	return objects[arrayPosition];
};

/**
 * Recursively inserts area information in treemap data.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
cwb.ObjectContainer.prototype.setAreaData = function(objectList){
	var result = 0;
	
	if (objectList.children.length == 0) {
		objectList.data.$area = 1;
		result = 1;
	}
	else {
		for (var j = 0; j < objectList.children.length; j++) {
			if (!(objectList.children[j] instanceof Function)) {
				result += this.setAreaData(objectList.children[j]);
			}
		}
		objectList.data.$area = result;
	}
	return result;
};

/**
 * Inserts color information in data for treemap.
 */
cwb.ObjectContainer.prototype.setWeightColors = function(){
	this.maxTreeContent = 0;
	this.getMaxContent(this.objectsForTreemap);
	
	this.setColor(this.objectsForTreemap);
};

/**
 * Recursively calculates the size of the biggest package which contains only leaves.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
cwb.ObjectContainer.prototype.getMaxContent = function(objectList){
	if (objectList.data.$area == objectList.children.length) {
		if (objectList.children.length > this.maxTreeContent && this.containsLeaves(objectList.children)) {
			this.maxTreeContent = objectList.children.length;
		}
	}
	else {
		for (var i = 0; i < objectList.children.length; i++) {
			if (!(objectList.children[i] instanceof Function)) {
				this.getMaxContent(objectList.children[i]);
			}
		}
	}
};

/**
 * Checks if a subtree contains only leaves.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 * @return <code>true</code> if the sublist contains only leaves, <code>false</code> otherwise.
 * @type boolean
 */
cwb.ObjectContainer.prototype.containsLeaves = function(objectList){
	var result = true;
	for (var i = 0; i < objectList.length; i++) {
		if (!(objectList[i] instanceof Function)) {
			if (objectList[i].children.length != 0) {
				result = false;
			}
		}
	}
	return result;
};

/**
 * Recursively determines which color an object and its children have by comparing their size to the size of the biggest package.
 * @param {Array} objectList A sublist of this.objectsForTreemap.
 */
cwb.ObjectContainer.prototype.setColor = function(objectList, parentLength){
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
	
	objectList.data.$color = colorValue;
	
	for (var j = 0; j < objectList.children.length; j++) {
		this.setColor(objectList.children[j], objectList.children.length);
	}
};

/**
 * Checks which position an object has in an array by its oid.
 * @param {String} oid The oid of the object.
 * @param {Array} objectList An unstructured array with object information
 * @return The position in the array.
 * @type int
 */
cwb.ObjectContainer.prototype.getObjectPosition = function(oid, objectList){
	for (var i = 0; i < objectList.length; i++) {
		if (!(objectList[i] instanceof Function)) {
			if (objectList[i].id == oid) {
				return i;
			}
		}
	}
};

cwb.ObjectContainer.prototype.getModels = function(){
	return this.models;
};

/**
 * Gets the oid of the model which was selected in navigation
 * @return The oid of the selected object.
 * @type String
 */
cwb.ObjectContainer.prototype.setModelOid = function(modelOid){
	this.selectedModel = modelOid;

	return true;
};

cwb.ObjectContainer.prototype.getCurrModelOid = function() {
	return this.currModelOid;
};
 
cwb.ObjectContainer.getInstance = function(){
	if (!cwb.ObjectContainer.instance) {
		cwb.ObjectContainer.instance = new cwb.ObjectContainer();
	}
	return cwb.ObjectContainer.instance;
};
