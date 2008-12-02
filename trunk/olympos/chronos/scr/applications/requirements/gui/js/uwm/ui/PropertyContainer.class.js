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

uwm.ui.PropertyContainer = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			region: "east",
			layout: "fit",
			collapsible: true,
			split: true,
			width: 250,
			autoScroll: true,
			title: "Properties",
		})
		
		uwm.ui.PropertyContainer.instance = this;
		
		uwm.ui.PropertyContainer.superclass.initComponent.apply(this, arguments);
		
		this.currentOid = null;
	},
	
	showProperty: function(modelNode) {
		if (modelNode != null) {
			var oid = modelNode.getOid();
			
			if (oid != null && this.currentOid != oid) {
				this.currentOid = modelNode.getOid();
				
				var items = this.items;
				while(items && items.getCount() > 0) {
					this.remove(items.get(0), true);
				}
				
				var form = this.add(modelNode.getModelNodeClass().getPropertyForm());
				this.doLayout();
				
				var mask = new Ext.LoadMask(form.getEl());
				mask.show();
				
				modelNode.fillPropertyForm(form, mask);
			}
		}
	}
})

uwm.ui.PropertyContainer.getInstance = function() {
	return uwm.ui.PropertyContainer.instance;
}
