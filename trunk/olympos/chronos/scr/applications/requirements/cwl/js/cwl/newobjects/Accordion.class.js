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
Ext.namespace("cwl.newobjects");

/**
 * @class The Accordion containing the new objects.
 *
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config The configuration object.
 */
cwl.newobjects.Accordion = function() {
}

cwl.newobjects.Accordion = Ext.extend(Ext.Panel, {

	initComponent: function() {
		Ext.apply(this, {
			layout: 'accordion',
			height: 280,
			layoutConfig: {
				animate: true
			}
		});
		
    cwl.newobjects.Accordion.superclass.initComponent.apply(this, arguments);
    
    this.data = new Array(0);
    
    this.addElements(cwl.rule.RuleElementContainer.getInstance().getAllElements());
    this.addElements(cwl.model.ModelElementContainer.getInstance().getAllElements());

    for (var i = 0; i < this.data.length; i++) {
      this.add(new cwl.newobjects.NewObjectsGrid({
        semanticGroup: this.data[i]
      }));
    }
  }
});

cwl.newobjects.Accordion.prototype.addElements = function(elements) {
  for (var i = 0; i < elements.getCount(); i++) {
    var currElement = elements.itemAt(i);
    
    if (currElement instanceof cwl.model.ModelElement && 
        cwl.newobjects.Accordion.CONTAINED_TYPES.indexOf(currElement.getType()) != -1) {
      var semanticGroup = currElement.getSemanticGroup();
      
      if (!Ext.isArray(semanticGroup)) {
        this.addSemanticGroup(semanticGroup);
      } else {
        for (var j = 0; j < semanticGroup.length; j++) {
          this.addSemanticGroup(semanticGroup[j]);
        }
      }
    }
  }
}

cwl.newobjects.Accordion.prototype.addSemanticGroup = function(semanticGroup) {
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

cwl.newobjects.Accordion.prototype.getGroupArray = function() {
	return this.data;
}

cwl.newobjects.Accordion.CONTAINED_TYPES = ['RuleComponent', 'ChiNode'];

