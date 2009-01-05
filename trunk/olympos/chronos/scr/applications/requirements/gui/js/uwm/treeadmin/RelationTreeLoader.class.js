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
Ext.namespace("uwm.treeadmin");

uwm.treeadmin.RelationTreeLoader = function(config) {
	uwm.treeadmin.RelationTreeLoader.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.treeadmin.RelationTreeLoader, Ext.tree.TreeLoader);

uwm.treeadmin.RelationTreeLoader.prototype.load = function(node, callback) {
	var self = this;
	
	if (node instanceof uwm.treeadmin.RelationNode) {
		uwm.persistency.Persistency.getInstance().display(node.modelObject.getOid(), 1, function(options, data) {
			self.reformatDisplayData(self, node, callback, data);
		});
	} else if (node instanceof uwm.treeadmin.NewRelationNode) {
		uwm.persistency.Persistency.getInstance().list(node.connectionTarget, function(options, data) {
			self.reformatListData(self, node, callback, data);
		});
	}
}

uwm.treeadmin.RelationTreeLoader.prototype.reformatDisplayData = function(self, node, callback, data) {
	var modelNode = uwm.model.ModelContainer.getInstance().createByDisplayResult(data);
	
	var childNodes = new Array();
	childNodes = this.getFilteredTargets(modelNode.getParentOids(), node.connectionTarget, childNodes, self, node, callback, data);
	if (childNodes === null) {
		return;
	}
	childNodes = this.getFilteredTargets(modelNode.getChildOids(), node.connectionTarget, childNodes, self, node, callback, data);
	if (childNodes === null) {
		return;
	}
	
	for (var i = 0; i < childNodes.length; i++) {
		node.appendChild(new uwm.treeadmin.ModelObjectNode({
			record: {
				uwmClassName: childNodes[i].getUwmClassName(),
				oid: childNodes[i].getOid(),
				Name: childNodes[i].getLabel()
			}
		}));
	}
	
	if (callback instanceof Function) {
		callback(this, node);
	}
}

uwm.treeadmin.RelationTreeLoader.prototype.getFilteredTargets = function(oidList, connectionTarget, childNodes, self, node, callback, data) {
	for (var i = 0; i < oidList.length; i++) {
		if (uwm.Util.getUwmClassNameFromOid(oidList[i]) == connectionTarget) {
			var modelNode = uwm.model.ModelContainer.getInstance().getByOid(oidList[i]);
			if (modelNode) {
				childNodes.push(modelNode);
			} else {
				var self2 = this;
				
				uwm.model.ModelContainer.getInstance().loadByOid(oidList[i], function() {
					self2.reformatDisplayData(self, node, callback, data);
				}, 0);
				
				return null;
			}
		}
	}
	
	return childNodes;
}

uwm.treeadmin.RelationTreeLoader.prototype.reformatListData = function(self, node, callback, data) {
	for (var i = 0; i < data.objects.length; i++) {
		var currObj = data.objects[i];
		
		var currRecord = {
			oid: currObj.oid,
			uwmClassName: currObj.type
		};
		
		for (var j in currObj.values) {
			var currValue = currObj.values[j];
			
			if (!(currValue instanceof Function)) {
				for (var k in currValue) {
					var currElem = currValue[k];
					
					if (!(currElem instanceof Function)) {
						currRecord[k] = currElem;
					}
				}
			}
		}
		
		node.appendChild(new uwm.treeadmin.ModelObjectNode({
			record: currRecord
		}));
	}
	
	if (callback instanceof Function) {
		callback(this, node);
	}
}
