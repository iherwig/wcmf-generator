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
Ext.namespace("uwm.newobjects");

/**
 * @class The Accordion containing the new objects.
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config The configuration object.
 */
uwm.newobjects.Accordion = function() {
}

uwm.newobjects.Accordion = Ext.extend(Ext.Panel, {

	initComponent: function() {
		Ext.apply(this, {
			region: 'north',
			layout: "accordion",
			height: 280,
			split: true,
			layoutConfig: {
				animate: true
			}
		});
		
		uwm.newobjects.Accordion.superclass.initComponent.apply(this, arguments);
		
		
		this.data = new Array(0);
		
		var classes = uwm.model.ModelNodeClassContainer.getInstance().getAllClasses();
		
		for (var i = 0; i < classes.getCount(); i++) {
			var currClass = classes.itemAt(i);
			
			if (currClass instanceof uwm.model.ModelClass) {
				var semanticGroup = currClass.getSemanticGroup();
				
				if (!Ext.isArray(semanticGroup)) {
					this.addSemanticGroup(semanticGroup);
				} else {
					for (var j = 0; j < semanticGroup.length; j++) {
						this.addSemanticGroup(semanticGroup[j]);
					}
				}
			}
		}
		
		for (var i = 0; i < this.data.length; i++) {
			this.add(new uwm.newobjects.NewObjectsGrid({
				semanticGroup: this.data[i]
			}));
		}
	}
});

uwm.newobjects.Accordion.prototype.addSemanticGroup = function(semanticGroup) {
	var newGroup = true;
	for (var j = 0; j < this.data.length; j++) {
		
		if (semanticGroup == this.data[j]) {
			newGroup = false;
		}
	}
	if (newGroup) {
		this.data.push(semanticGroup);
	}
}

uwm.newobjects.Accordion.prototype.getGroupArray = function() {
	return this.data;
}
