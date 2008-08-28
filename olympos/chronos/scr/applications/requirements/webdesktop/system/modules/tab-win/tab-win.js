QoDesk.TabWindow = Ext.extend(Ext.app.Module, {
	
	moduleType : 'demo',
    moduleId : 'demo-tabs',
    
    init : function(){
        this.launcher = {
            handler : this.createWindow,
            iconCls:'tabs',
            scope: this,
            shortcutIconCls: 'demo-tab-shortcut',
            text: 'Tab Window',
            tooltip: '<b>Tab Window</b><br />A window with tabs'
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('tab-win');
        if(!win){
            win = desktop.createWindow({
                id: 'tab-win',
                title:'Tab Window',
                width:740,
                height:480,
                iconCls: 'tabs',
                shim:false,
                animCollapse:false,
                constrainHeader:true,

                layout: 'fit',
                items:
                    new Ext.TabPanel({
                        activeTab:0,

                        items: [{
                        	autoScroll: true,
                            title: 'Tab Text 1',
                            header:false,
                            html : '<p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p><p>Something useful would be in here.</p>',
                			border:false
                        },{
                            title: 'Tab Text 2',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 3',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        },{
                            title: 'Tab Text 4',
                            header:false,
                            html : '<p>Something useful would be in here.</p>',
                            border:false
                        }]
                    }),
                    taskbuttonTooltip: '<b>Tab Window</b><br />A window with tabs'
            });
        }
        win.show();
    }
});