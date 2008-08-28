QoDesk.BogusModule = Ext.extend(Ext.app.Module, {

	moduleType : 'demo',
	moduleId : 'demo-bogus',
	
	detailModule : null,
	
	init : function(){		
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'bogus',
			scope: this,
			shortcutIconCls: 'demo-bogus-shortcut',
			text: 'Requirements',
			tooltip: '<b>Chronos Web Modelling</b><br />A Chronos Web Modelling'
		}
		
		this.detailModule = new QoDesk.BogusDetailModule();
	},

	createWindow : function(){
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('bogus-win');

        /*
        if (!win) {
            win = desktop.createWindow({
                autoScroll: true,
                id: 'bogus-win',
                title: 'Chronos Requirements',
                width: 850,
                height: 650,
                iconCls: 'bogus',
                items: new QoDesk.BogusModule.NavPanel({
                    owner: this,
                    id: 'nav-panel'
                }),
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                maximizable: true,
                taskbuttonTooltip: '<b>Chronos Requirements</b><br />Chronos Requirements'
            });
        }
		*/
		var iframe = '../62/requirements4/gui/index.html';		
		
        if (!win) {
			win = desktop.createWindow({
				id: 'bogus-win',
				title: 'Chronos Web Modelling',
				width: 800,
				height: 600,
				iconCls: 'bogus',
				html: '<iframe width="99%" height="98%" id="msn-content" name="mybrowsecontent" src="' + iframe + '"></iframe>',
				iconCls: 'bogus',
				shim: false,
				animCollapse: false,
				constrainHeader: true
			});
		}
		
        win.show();
    },
    
    openDetail : function(id){
		this.detailModule.createWindow(this.app, id);
    },
    
    showDialog : function(){
    	if(!this.dialog){
            this.dialog = new Ext.Window({
            	bodyStyle:'padding:10px',
                layout:'fit',
                width:800,
                height:600,
                closeAction:'hide',
                plain: true,
                html: 'Bogus dialog window',
                buttons: [{
                    text:'Submit',
                    disabled:true
                },{
                    text: 'Close',
                    handler: function(){
                        this.dialog.hide();
                    },
                    scope: this
                }],
                modal: true
            });
        }
        this.dialog.show();
    }
});



QoDesk.BogusModule.NavPanel = function(config){
	this.owner = config.owner;
	var iframe = '../62/requirements/application/main.php';		
	QoDesk.BogusModule.NavPanel.superclass.constructor.call(this, {
		width: 800,
                height: 600,
                html : '<iframe width="99%" height="98%" id="msn-content" name="mybrowsecontent" src="'+iframe+'"></iframe>',
                iconCls: 'bogus',
                shim:false,
                animCollapse:false,
                constrainHeader:true,
        html : '<iframe width="99%" height="98%" id="msn-content" name="mybrowsecontent" src="'+iframe+'"></iframe>',
		id: config.id
	});
	
	this.actions = {
		'openDetailOne' : function(owner){
			owner.openDetail(1);
		},
		
		'openDetailTwo' : function(owner){
			owner.openDetail(2);
		},
		
		'openDetailThree' : function(owner){
	   		owner.openDetail(3);
	   	}
	};
};

Ext.extend(QoDesk.BogusModule.NavPanel, Ext.Panel, {
	afterRender : function(){
		this.body.on({
			'mousedown': {
				fn: this.doAction,
				scope: this,
				delegate: 'a'
			},
			'click': {
				fn: Ext.emptyFn,
				scope: null,
				delegate: 'a',
				preventDefault: true
			}
		});
		
		QoDesk.BogusModule.NavPanel.superclass.afterRender.call(this); // do sizing calcs last
	},
	
	doAction : function(e, t){
    	e.stopEvent();
    	this.actions[t.id](this.owner);  // pass owner for scope
    }
});



QoDesk.BogusDetailModule = Ext.extend(Ext.app.Module, {

	moduleType : 'demo',
	moduleId : 'demo-bogus-detail',
	
	init : function(){
		this.launcher = {
			handler: this.createWindow,
			iconCls: 'bogus',
			scope: this,
			shortcutIconCls: 'demo-bogus-shortcut',
			text: 'Bogus Detail Window',
			tooltip: '<b>Bogus Detail Window</b><br />A bogus detail window'
		}
	},

	createWindow : function(app, id){
		this.moduleId = 'demo-bogus-detail-'+id;
		
		var desktop = app.getDesktop();
		var win = desktop.getWindow('bogus-detail'+id);
		var iframe = 'http://localhost/62/requirements/application/main.php';		
		
        if(!win){
            win = desktop.createWindow({
                id: 'bogus-detail'+id,
                title: 'Detail Window '+id,
                width: 800,
                height: 600,
                html : '<iframe width="99%" height="98%" id="msn-content" name="mybrowsecontent" src="'+iframe+'"></iframe>',
                iconCls: 'bogus',
                shim:false,
                animCollapse:false,
                constrainHeader:true
            });
        }
        win.show();
    }
});