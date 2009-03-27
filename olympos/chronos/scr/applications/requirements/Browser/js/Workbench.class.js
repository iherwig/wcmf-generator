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
	
	/**
	 * Replacement for pie chart when no model is loaded.
	 */
	this.piechartPanelEmpty= new Ext.Panel({
		
		html: uwm.Dict.translate('Please select a model.')
	});
	
	/**
	 * Replacement for bar chart when no model is loaded.
	 */
	this.barchartPanelEmpty = new Ext.Panel({
		
		html:uwm.Dict.translate('Please select a model.')
	});
	
	/**
	 * Panel containing the pie chart in iframe.
	 */
	this.piechartPanel= new Ext.Panel({
	
		layout:'fit',
		html: '<iframe style="height: 100%;width:100%;" src="lib/ofc/piechart.php"/>'
	});
	
	/**
	 * Panel containing the bar chart in iframe.
	 */
	this.barchartPanel = new Ext.Panel({
		
		layout: 'fit',
		html:'<iframe style="height: 100%;width:100%;" src="lib/ofc/barchart.php"/>'
	});
	
	/**
	 * Panel containing either the pie chart or an empty panel.
	 */
    this.piechartContainer=new Ext.Panel({
		region:'center',
		layout: 'fit',
		items: this.piechartPanelEmpty
	});
	
	/**
	 * Panel containing either the bar chart or an empty panel.
	 */
	this.barchartContainer=new Ext.Panel({
		region:'east',
		width:550,
		layout: 'fit',
		items:this.barchartPanelEmpty
	});
	
	/**
	 * Panel containing two diagrams.
	 */
    this.diagramPanel = new Ext.Panel({
        region: 'north',
        height: 250,
        layout: 'border',
        items: [this.piechartContainer, this.barchartContainer]
    });
	
    /**
     * Tab containing treemap (package weight).
     */
    this.weightPanel = new Ext.Panel({
        title: uwm.Dict.translate('Package weight'),
        tabTip: uwm.Dict.translate('Left-click to enter a package or object, right-click to leave it.'),
        html: '<iframe style="height: 100%;width:100%;" src="html/Treemap.html"/>'
    });
    
	/**
	 * Tab containing spacetree (package tree).
	 */
    this.treePanel = new Ext.Panel({
        title: uwm.Dict.translate('Package tree'),
        tabTip: uwm.Dict.translate('Click on an object to see its children.'),
        html: '<iframe style="height: 100%;width:100%;"  src="html/Spacetree.html" />'
    })
    
	/**
	 * TabPanel containing package weight, package tree and InfoGrid tabs
	 */
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

/**
 * Initiates creation of InfoGrid. 
 * @param {String} id Header of the tab which is to be created.
 * @param {Array} objectList Array of oids which shall be shown in the InfoGrid.
 */
Workbench.prototype.createInformationTab=function(id,objectList){
	var proxy=new InfoGridProxy(id,objectList);
	
	var store=new Ext.data.Store({
		proxy: proxy
	});
	
	proxy['store']=store;
	store.load();
}

/**
 * Creates InfoGrid and adds it to structureTabPanel AFTER loading all objects.
 * @param {String} id Header of the tab which is to be created
 * @param {Object} store Ext.data.Store for the InfoGrid.
 * @param {Array} columnList Array containing all columns which are shown in the grid.
 */
Workbench.prototype.addInformationTab = function(id,store,columnList){
    var newTab = new Ext.Panel({
        title: id,
        items: [new InfoGrid(store,columnList)],
        closable: true
    });
    this.structureTabPanel.add(newTab);
    this.structureTabPanel.activate(newTab);
    this.doLayout();
}

/**
 * Starts loading actions.
 */
Workbench.prototype.loadModel = function(){
    var container = ObjectContainer.getInstance();
	container.selectedModelName = this.selectModelBox.getValue();
    
	if (container.setModelOid()) {
		this.showMask();
        this.structureTabPanel.activate(0);
        container.loadModel(container.selectedModel);       
    }
    else {
        Ext.Msg.alert(uwm.Dict.translate("Error"), uwm.Dict.translate("Please select a model."));
    }
    
    
}

Workbench.prototype.showMask = function(){
    Ext.WindowMgr.zseed = 25000;
    
    this.maskTabPanel();
    this.objectDataTable.getEl().mask(uwm.Dict.translate('Loading') + '...');
	this.diagramPanel.getEl().mask(uwm.Dict.translate('Loading')+'...');
    
    Ext.Msg.progress(uwm.Dict.translate("Loading"), uwm.Dict.translate("Loading report..."), uwm.Dict.translate("Package tree"));
}

Workbench.prototype.maskTabPanel=function(){
	this.structureTabPanel.getEl().mask(uwm.Dict.translate('Loading') + '...');
}

Workbench.prototype.unmaskTabPanel=function(){
	this.structureTabPanel.getEl().unmask();
}


/**
 * Sets scroll position to middle of the frame when spacetree is activated.
 * @param {Object} tabPanel this.structureTabPanel
 * @param {Object} tab The Tab which is being activated.
 */
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
