/*
 * qWikiOffice Desktop 0.7.1
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 *
 * NOTE:
 * This code is based on code from the original Ext JS desktop demo.
 * I have made many modifications/additions.
 *
 * The Ext JS licensing can be viewed here:
 *
 * Ext JS Library 2.0 Beta 2
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 *
 */

Ext.app.App = function(cfg){
    Ext.apply(this, cfg);
    this.addEvents({
        'ready' : true,
        'beforeunload' : true
    });

    Ext.onReady(this.initApp, this);
};

Ext.extend(Ext.app.App, Ext.util.Observable, {
    isReady : false,
    modules : null,
    /*
	 * The the URL of the script that allows a module to connect to its 
	 * server script without knowing the path.
	 * 
	 * Example ajax call:
	 * 
	 * Ext.Ajax.request({
	 *     url: this.app.connection,
	 *     // Could also pass moduleId and fileName in querystring like this,
	 *     // instead of in the params config option.
	 *      
	 *     // url: this.app.connection+'?moduleId='+this.id+'&fileName=Preferences.php',
	 *      params: {
	 *			moduleId: this.id,
	 *			fileName: 'Preferences.php',
	 *
	 *			...
	 *		},
	 *		success: function(){
	 *			...
	 *		},
	 *		failure: function(){
	 *			...
	 *		},
	 *		scope: this
	 *	});
	 */
	connection : 'connect.php',
    
    initApp : function(){
    	// prevent backspace (history -1) shortcut
		var map = new Ext.KeyMap(document, [
		{
			key: Ext.EventObject.BACKSPACE,
			stopEvent: true,
			fn: function(key, e){
				var t = e.target.tagName;
				if(t != "INPUT" && t != "TEXTAREA"){
					e.stopEvent();
				}
			}
		}]);
		
    	this.startConfig = this.startConfig || this.getStartConfig();
        this.desktop = new Ext.Desktop(this);
		
		this.modules = this.getModules();
        if(this.modules){
            this.initModules(this.modules);
            this.initDesktopConfig();
        }

        this.init();

        Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
		this.fireEvent('ready', this);
        this.isReady = true;
    },

	getModules : Ext.emptyFn,
    getStartConfig : Ext.emptyFn,
    getLogoutButtonConfig : Ext.emptyFn,
	getDesktopConfig : Ext.emptyFn,
    init : Ext.emptyFn,

    initModules : function(ms){
		for(var i = 0, len = ms.length; i < len; i++){
            ms[i].app = this;
        }
    },
    
    initDesktopConfig : function(o){
    	if(!o){
			this.getDesktopConfig();
		}else{
			var l = o.launchers;
			
			l.contextmenu = l.contextmenu || [];
			l.startmenu  = l.startmenu || [];
			l.startmenutool = l.startmenutool || [];
			l.quickstart = l.quickstart || [];
			l.shortcut = l.shortcut || [];
			o.styles = o.styles || [];
			l.autorun = l.autorun || [];
			
			this.desktop.config = o;
			this.desktop.initialConfig = o;
			
			this.initContextMenu(l.contextmenu);
			this.initStartMenu(l.startmenu, false);
	        this.initStartMenu(l.startmenutool, true);
	        this.initLogoutButton();
	        this.initQuickStart(l.quickstart);
	        this.initShortcuts(l.shortcut);
	        this.initStyles(o.styles);
	        this.initAutoRun(l.autorun);
		}
    },
    
    initAutoRun : function(mIds){
    	if(mIds){
    		for(var i = 0, len = mIds.length; i < len; i++){
	            var m = this.getModule(mIds[i]);
	            if(m){
	            	m.autorun = true;
	            	m.createWindow();
	            }
			}
		}
    },

    initContextMenu : function(mIds){
    	if(mIds){
    		for(var i = 0, len = mIds.length; i < len; i++){
    			this.desktop.addContextMenuItem(mIds[i]);
	        }
    	}
    },
    
    initLogoutButton : function(){
    	var config = this.getLogoutButtonConfig();
    	this.desktop.taskbar.startMenu.addTool(config);
    },

    initShortcuts : function(mIds){
		if(mIds){
			for(var i = 0, len = mIds.length; i < len; i++){
	            this.desktop.addShortcut(mIds[i], false);
	        }
		}
    },
    
    initStartMenu : function(mIds, tool){		
		var startMenu = this.desktop.taskbar.startMenu;
		
		if(mIds){	        
	        for(var i = 0, iLen = mIds.length; i < iLen; i++){
				var m = this.getModule(mIds[i]);
	            if(m){
	            	var app = this;
	            	addItems(startMenu, m);
				}
	        }
		}
		
		function addItems(menu, m){ // recursive function, allows sub menus
			if(m.moduleType == 'menu' && m.items){
				var items = m.items;
				for(var j = 0, jLen = items.length; j < jLen; j++){
					var item = app.getModule(items[j]);
					if(item){
						addItems(m.menu, item);
					}
				}
			}
			if(m.launcher){
				if(tool === true){
					menu.addTool(m.launcher);
				}else{
					menu.add(m.launcher);
				}
			}		
		}
    },

	initQuickStart : function(mIds){
		if(mIds){
			for(var i = 0, len = mIds.length; i < len; i++){
	            this.desktop.addQuickStartButton(mIds[i], false);
	        }
		}
    },
    
    initStyles : function(s){
    	this.desktop.setBackgroundColor(s.backgroundcolor);
    	this.desktop.setFontColor(s.fontcolor);
    	this.desktop.setTheme({
    		id: s.themeid,
    		name: s.themename,
    		pathtofile: s.themefile
    	});
    	this.desktop.setTransparency(s.transparency);
    	this.desktop.setWallpaper({
    		id: s.wallpaperid,
    		name: s.wallpapername,
    		pathtofile: s.wallpaperfile
    	});
    	this.desktop.setWallpaperPosition(s.wallpaperposition);
    },
    
    getModule : function(v){
    	var ms = this.modules;
    	for(var i = 0, len = ms.length; i < len; i++){
    		if(ms[i].moduleId == v || ms[i].moduleType == v){
    			return ms[i];
			}
        }
        return '';
    },

    onReady : function(fn, scope){
        if(!this.isReady){
            this.on('ready', fn, scope);
        }else{
            fn.call(scope, this);
        }
    },

    getDesktop : function(){
        return this.desktop;
    },

    onUnload : function(e){
        if(this.fireEvent('beforeunload', this) === false){
            e.stopEvent();
        }
    }
});