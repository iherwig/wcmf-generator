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

uwm.treeadmin.ModelObjectTreeLoader = function(config) {
	uwm.treeadmin.ModelObjectTreeLoader.superclass.constructor.call(this, Ext.apply(this, {}, config));
}

Ext.extend(uwm.treeadmin.ModelObjectTreeLoader, Ext.tree.TreeLoader);

uwm.treeadmin.ModelObjectTreeLoader.prototype.load = function(node, callback) {
	var self = this;
	
	if (node instanceof uwm.treeadmin.ModelClassNode) {
		uwm.persistency.Persistency.getInstance().list(node.modelClass.getUwmClassName(), function(options, data) {
			self.reformatData(self, node, callback, data);
		});
	}
}

uwm.treeadmin.ModelObjectTreeLoader.prototype.reformatData = function(self, node, callback, data) {
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
