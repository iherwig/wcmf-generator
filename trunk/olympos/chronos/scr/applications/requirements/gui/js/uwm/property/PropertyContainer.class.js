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
Ext.namespace("uwm.property");

uwm.property.PropertyContainer = Ext.extend(Ext.Panel, {
    initComponent: function(){
        Ext.apply(this, {
            region: "center",
            layout: "fit",
            collapsible: false,
            split: false,
            width: 250,
            autoScroll: true,
            title: "Properties"
        })
        
        uwm.property.PropertyContainer.instance = this;
        
        uwm.property.PropertyContainer.superclass.initComponent.apply(this, arguments);
        
        this.currentOid = null;
        
        this.on("afterlayout", this.showInfoMask);
    },
    
    showInfoMask: function(){
        this.mask = new uwm.ui.InfoMask(this.body, {
            msg: "This panel shows the properties of each object selected by a single click."
        });
        this.mask.show();
		
		this.un("afterlayout", this.showInfoMask);
    },
    
    showProperty: function(modelNode){
        if (modelNode != null) {
            var oid = modelNode.getOid();
            
            if (oid != null && this.currentOid != oid) {
                if (this.mask) {
					this.mask.hide();
				}
                
                this.currentOid = modelNode.getOid();
                
                var items = this.items;
                while (items && items.getCount() > 0) {
                    this.remove(items.get(0), true);
                }
                
                var form = this.add(modelNode.getModelNodeClass().getPropertyForm(modelNode));
                this.doLayout();
                
                var mask = new Ext.LoadMask(form.getEl());
                mask.show();
                
                modelNode.fillPropertyForm(form, mask);
            }
        }
    }
})

uwm.property.PropertyContainer.getInstance = function(){
    return uwm.Uwm.getInstance().getActiveWorkbench().getEastPanel().getPropertyContainer();
}
