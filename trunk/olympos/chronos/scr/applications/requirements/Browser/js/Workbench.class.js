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
/**
 * @class The workbench which contains all diagrams and tables
 * @extends Ext.Viewport
 */
Workbench = function(){
    var self = this;
    
    this.selectModelBox = new Ext.form.ComboBox({
        store: ObjectContainer.getInstance().getModels()['name'],
        editable: false,
        forceSelection: true,
        triggerAction: 'all',
        emptyText: uwm.Dict.translate('Select a model...'),
        selectOnFocus: true
    });
    this.loadModelButton = new Ext.Button({
        text: 'Report',
        type: 'submit',
        handler: function(){
            self.loadModel();
        }
    });
    
    this.diagramPanel = new Ext.Panel({
        region: 'north',
        height: 250,
        layout: 'border',
        items: [{
            region: 'center',
            html: '<iframe style="height: 100%;width:100%;" src="lib/ofc/piechart.php"/>'
        }, {
            region: 'east',
            width: 550,
            html: '<iframe style="height: 100%;width:100%;" src="lib/ofc/barchart.php"/>'
        }]
    })
    
    this.weightPanel = new Ext.Panel({
        title: uwm.Dict.translate('Package weight'),
        tabTip: uwm.Dict.translate('Left-click to enter a package or object, right-click to leave it.'),
        html: '<iframe style="height: 100%;width:100%;" src="html/Treemap.html"/>'
    });
    
    this.treePanel = new Ext.Panel({
        title: uwm.Dict.translate('Package tree'),
        tabTip: uwm.Dict.translate('Click on an object to see its children.'),
        html: '<iframe style="height: 100%;width:100%;"  src="html/Spacetree.html" />'
    })
    
    this.structureTabPanel = new Ext.TabPanel({
        region: 'center',
        activeTab: 0,
        items: [this.weightPanel, this.treePanel]
    
    });
    
    this.structureTabPanel.on("tabchange", function(tabPanel, tab){
        self.handleTabChange(tabPanel, tab)
    });
    
    this.objectDataTable = new ObjectDataTable(this)
    
    Workbench.superclass.constructor.call(this, Ext.apply(this, {
        layout: "border",
        items: [{
            region: 'west',
            width: 307,
            layout: 'border',
            items: [new Ext.Panel({
                region: 'north',
                height: 150,
                buttonAlign: 'right',
                bodyStyle: 'background-color:#DFE8F6;',
                items: [{
                    html: '<img src="img/logo3.png">'
                }, this.selectModelBox, this.loadModelButton]
            
            }), {
                region: 'center',
                title: uwm.Dict.translate('Object information'),
                layout: 'fit',
                items: this.objectDataTable
            }]
        }, {
            region: 'center',
            layout: 'border',
            items: [this.diagramPanel, this.structureTabPanel]
        }]
    }));
    this.initWorkbench();
    
}
Ext.extend(Workbench, Ext.Viewport);

Workbench.prototype.initWorkbench = function(){
    Ext.QuickTips.init();
}

Workbench.prototype.addInformationTab = function(id, uwmClassName){
    var newTab = new Ext.Panel({
        title: id,
        items: [new InfoGrid(uwmClassName)],
        closable: true
    });
    this.structureTabPanel.add(newTab);
    this.structureTabPanel.activate(newTab);
    this.doLayout();
}

Workbench.prototype.loadModel = function(){
    var container = ObjectContainer.getInstance();
	container.modelLoaded=true;
    container.selectedModelName = this.selectModelBox.getValue();
    if (container.setModelOid()) {
		 this.showMask();
        this.structureTabPanel.activate(0);
		container.loadReport();
        container.loadModel(container.selectedModel);
       
    }
    else {
        Ext.Msg.alert(uwm.Dict.translate("Error"), uwm.Dict.translate("Please select a model."));
    }
    
    
}

Workbench.prototype.showMask = function(){
    Ext.WindowMgr.zseed = 25000;
    
    this.structureTabPanel.getEl().mask(uwm.Dict.translate('Loading') + '...');
    this.objectDataTable.getEl().mask(uwm.Dict.translate('Loading') + '...');
	this.diagramPanel.getEl().mask(uwm.Dict.translate('Loading')+'...');
    
    Ext.Msg.progress(uwm.Dict.translate("Loading"), uwm.Dict.translate("Loading report..."), uwm.Dict.translate("Package tree"))
}

Workbench.prototype.scrollSpacetree = function(){
    this.scroll(0, 800);
}

Workbench.prototype.handleTabChange = function(tabPanel, tab){
    if (tab == tabPanel.getActiveTab()) {
        if (frames[3]) {
            frames[3].window.scroll(0, 1000 - (frames[3].window.innerHeight / 2));
        }
    }
}

Workbench.getInstance = function(){
    if (!(Workbench.instance)) {
        Workbench.instance = new Workbench();
    }
    return Workbench.instance;
}
