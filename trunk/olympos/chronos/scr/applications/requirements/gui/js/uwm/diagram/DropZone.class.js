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
Ext.namespace("uwm.diagram");

uwm.diagram.DropZone = function(el, config) {
	uwm.diagram.DropZone.superclass.constructor.call(this, el, Ext.apply(this, {
		ddGroup: uwm.Constants.DD_GROUP
	}, config));
	
	this.diagram = config.diagram;
}

Ext.extend(uwm.diagram.DropZone, Ext.dd.DropZone, {
	getTargetFromEvent: function(e) {
		return e.getTarget();
	},
	
	onNodeOver: function(target, dd, e, data) {
	
		return this.checkDropable(data.data);
	},
	
	onNodeDrop: function(target, dd, e, data) {
		oid = null;
		
		var modelData = data.data;
		
		var result = this.checkDropable(modelData);
		
		if (result) {
			var xOffset = this.diagram.getWorkflow().getAbsoluteX();
			var yOffset = this.diagram.getWorkflow().getAbsoluteY();
			var scrollLeft = this.diagram.getWorkflow().getScrollLeft();
			var scrollTop = this.diagram.getWorkflow().getScrollTop();
			
			var x = e.xy[0] - xOffset + scrollLeft;
			var y = e.xy[1] - yOffset + scrollTop;
			
			if (modelData instanceof uwm.model.ModelObject) {
				this.diagram.addExistingObject(modelData, x, y);
			}
			else {
				this.diagram.createNewObject(modelData, x, y);
			}
		}
		
		return result;
	},
	
	checkDropable: function(modelData) {
		var result = false;
		
		if (modelData instanceof uwm.model.ModelObject) {
			var oid = modelData.getOid();
			
			if (!this.diagram.containsByOid(oid)) {
				result = Ext.dd.DropZone.prototype.dropAllowed;
			}
		}
		else if (modelData instanceof uwm.model.ModelClass) {
			result = Ext.dd.DropZone.prototype.dropAllowed;
		}
		
		return result;
	}
	
})
