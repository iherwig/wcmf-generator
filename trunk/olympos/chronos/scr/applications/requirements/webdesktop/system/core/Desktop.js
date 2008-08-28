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
 * Ext.ux.Notification is based on code from the Ext JS forum.
 * I have made some minor modifications.
 *
 */

// Use our blank image
Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';



Ext.Desktop = function(app){
	
	this.taskbar = new Ext.ux.TaskBar(app);
	var taskbar = this.taskbar;
	
	this.el = Ext.get('x-desktop');
	var desktopEl = this.el;
	
    var taskbarEl = Ext.get('ux-taskbar');
    
    this.shortcuts = new Ext.ux.Shortcuts({
    	renderTo: 'x-desktop',
    	taskbarEl: taskbarEl
    });
	
	this.config = null;
	this.initialConfig = null;

    var windows = new Ext.WindowGroup();
    var activeWindow;
		
    function minimizeWin(win){
        win.minimized = true;
        win.hide();
    }

    function markActive(win){
        if(activeWindow && activeWindow != win){
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win){
        if(win == activeWindow){
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }

    function removeWin(win){
    	taskbar.taskButtonPanel.remove(win.taskButton);
        layout();
    }

    function layout(){
    	desktopEl.setHeight(Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls){
    	var win = new (cls||Ext.Window)(
            Ext.applyIf(config||{}, {
                manager: windows,
                minimizable: true,
                maximizable: true
            })
        );
        win.render(desktopEl);
        win.taskButton = taskbar.taskButtonPanel.add(win);

        win.cmenu = new Ext.menu.Menu({
            items: [

            ]
        });

        win.animateTarget = win.taskButton.el;
        
        win.on({
        	'activate': {
        		fn: markActive
        	},
        	'beforeshow': {
        		fn: markActive
        	},
        	'deactivate': {
        		fn: markInactive
        	},
        	'minimize': {
        		fn: minimizeWin
        	},
        	'close': {
        		fn: removeWin
        	}
        });
        
        layout();
        return win;
    };

    this.getManager = function(){
        return windows;
    };

    this.getWindow = function(id){
        return windows.get(id);
    };
    
    this.getViewHeight = function(){
    	return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
    };
    
    this.getViewWidth = function(){
    	return Ext.lib.Dom.getViewWidth();
    };
    
    this.getWinWidth = function(){
		var width = Ext.lib.Dom.getViewWidth();
		return width < 200 ? 200 : width;
	};
		
	this.getWinHeight = function(){
		var height = (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
		return height < 100 ? 100 : height;
	};
		
	this.getWinX = function(width){
		return (Ext.lib.Dom.getViewWidth() - width) / 2
	};
		
	this.getWinY = function(height){
		return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight() - height) / 2;
	};
	
	this.setBackgroundColor = function(hex){
		if(hex){
			Ext.get(document.body).setStyle('background-color', '#'+hex);
			this.config.styles.backgroundcolor = hex;
		}
	};
	
	this.setFontColor = function(hex){
		if(hex){
			Ext.util.CSS.updateRule('.ux-shortcut-btn-text', 'color', '#'+hex);
			this.config.styles.fontcolor = hex;
		}
	};
	
	this.setTheme = function(o){
		if(o && o.id && o.name && o.pathtofile){
			Ext.util.CSS.swapStyleSheet('theme', o.pathtofile);
			this.config.styles.theme = o;
		}
	};
	
	this.setTransparency = function(b){
		if(String(b) != ""){
			if(b){
				taskbarEl.addClass("transparent");
			}else{
				taskbarEl.removeClass("transparent");
			}
			this.config.styles.transparency = b
		}
	};
	
	this.setWallpaper = function(o){
		if(o && o.id && o.name && o.pathtofile){
			
			var notifyWin = this.showNotification({
				html: 'Loading wallpaper...'
				, title: 'Please wait'
			});
			
			var wp = new Image();
			wp.src = o.pathtofile;
			
			var task = new Ext.util.DelayedTask(verify, this);
			task.delay(200);
			
			this.config.styles.wallpaper = o;
		}
		
		function verify(){
			if(wp.complete){
				task.cancel();
				
				notifyWin.setIconClass('x-icon-done');
				notifyWin.setTitle('Finished');
				notifyWin.setMessage('Wallpaper loaded.');
				this.hideNotification(notifyWin);
				
				document.body.background = wp.src;
			}else{
				task.delay(200);
			}
		}
	};
	
	this.setWallpaperPosition = function(pos){
		if(pos){
			if(pos === "center"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-tile');
				b.addClass('wallpaper-center');
			}else if(pos === "tile"){
				var b = Ext.get(document.body);
				b.removeClass('wallpaper-center');
				b.addClass('wallpaper-tile');
			}			
			this.config.styles.wallpaperposition = pos;
		}
	};
	
	this.showNotification = function(config){
		var win = new Ext.ux.Notification(Ext.apply({
			animateTarget: taskbarEl
			, autoDestroy: true
			, hideDelay: 5000
			, html: ''
			, iconCls: 'x-icon-waiting'
			, title: ''
		}, config));
		win.show();

		return win;
	};
	
	this.hideNotification = function(win, delay){
		if(win){
			(function(){ win.animHide(); }).defer(delay || 3000);
		}
	};
	
	this.addAutoRun = function(id){
		var m = app.getModule(id),
			c = this.config.launchers.autorun;
			
		if(m && !m.autorun){
			m.autorun = true;
			c.push(id);
		}
	};
	
	this.removeAutoRun = function(id){
		var m = app.getModule(id),
			c = this.config.launchers.autorun;
			
		if(m && m.autorun){
			var i = 0;
				
			while(i < c.length){
				if(c[i] == id){
					c.splice(i, 1);
				}else{
					i++;
				}
			}
			
			m.autorun = null;
		}
	};
	
	// Private
	this.addContextMenuItem = function(id){
		var m = app.getModule(id);
		if(m && !m.contextMenuItem){
			/* if(m.moduleType === 'menu'){ // handle menu modules
				var items = m.items;
				for(var i = 0, len = items.length; i < len; i++){
					m.launcher.menu.items.push(app.getModule(items[i]).launcher);
				}
			} */
			this.cmenu.add(m.launcher);
		}
	};

	this.addShortcut = function(id, updateConfig){
		var m = app.getModule(id);
		
		if(m && !m.shortcut){
			var c = m.launcher;
			
			m.shortcut = this.shortcuts.addShortcut({
				handler: c.handler,
				iconCls: c.shortcutIconCls,
				scope: c.scope,
				text: c.text
			});
			
			if(updateConfig){
				this.config.launchers.shortcut.push(id);
			}
		}
		
	};

	this.removeShortcut = function(id, updateConfig){
		var m = app.getModule(id);
		
		if(m && m.shortcut){
			this.shortcuts.removeShortcut(m.shortcut);
			m.shortcut = null;
			
			if(updateConfig){
				var sc = this.config.launchers.shortcut,
					i = 0;
				while(i < sc.length){
					if(sc[i] == id){
						sc.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
	};

	this.addQuickStartButton = function(id, updateConfig){
    	var m = app.getModule(id);
    	
		if(m && !m.quickStartButton){
			var c = m.launcher;
			
			m.quickStartButton = this.taskbar.quickStartPanel.add({
				handler: c.handler,
				iconCls: c.iconCls,
				scope: c.scope,
				text: c.text,
				tooltip: c.tooltip || c.text
			});
			
			if(updateConfig){
				this.config.launchers.quickstart.push(id);
			}
		}
    };
    
    this.removeQuickStartButton = function(id, updateConfig){
    	var m = app.getModule(id);
    	
		if(m && m.quickStartButton){
			this.taskbar.quickStartPanel.remove(m.quickStartButton);
			m.quickStartButton = null;
			
			if(updateConfig){
				var qs = this.config.launchers.quickstart,
					i = 0;
				while(i < qs.length){
					if(qs[i] == id){
						qs.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		}
    };

    layout();
    
    this.cmenu = new Ext.menu.Menu();
    
    desktopEl.on('contextmenu', function(e){
    	if(e.target.id === desktopEl.id){
	    	e.stopEvent();
			if(!this.cmenu.el){
				this.cmenu.render();
			}
			var xy = e.getXY();
			xy[1] -= this.cmenu.el.getHeight();
			this.cmenu.showAt(xy);
		}
	}, this);
	
	/*
	var bogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>';
	this.portal = new Ext.ux.Portal({
		id: 'portal',
		items: [{
			//columnWidth:.9,
			style:'padding:10px 0 10px 10px',
			items:[{
				title: 'Panel 2',
				html: bogusMarkup
				},{
				title: 'Another Panel 2',
				html: bogusMarkup
			}],
			width: 400
		}],
		minWidth: 64,
		renderTo: 'x-desktop',
		width: 204
	}); */
};



Ext.ux.NotificationMgr = {
    positions: []
};

Ext.ux.Notification = Ext.extend(Ext.Window, {
	initComponent : function(){
		Ext.apply(this, {
			iconCls: this.iconCls || 'x-icon-information'
			, width: 200
			, autoHeight: true
			, closable: true
			, plain: false
			, draggable: false
			, bodyStyle: 'text-align:left;padding:10px;'
			, resizable: false
		});
		if(this.autoDestroy){
			this.task = new Ext.util.DelayedTask(this.close, this);
		}else{
			this.closable = true;
		}
		Ext.ux.Notification.superclass.initComponent.call(this);
    }

	, setMessage : function(msg){
		this.body.update(msg);
	}
	
	, setTitle : function(title, iconCls){
        Ext.ux.Notification.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    }

	, onRender : function(ct, position) {
		Ext.ux.Notification.superclass.onRender.call(this, ct, position);
	}

	, onDestroy : function(){
		Ext.ux.NotificationMgr.positions.remove(this.pos);
		Ext.ux.Notification.superclass.onDestroy.call(this);
	}

	, afterShow : function(){
		Ext.ux.Notification.superclass.afterShow.call(this);
		this.on('move', function(){
			Ext.ux.NotificationMgr.positions.remove(this.pos);
			if(this.autoDestroy){
				this.task.cancel();
			}
		}, this);
		if(this.autoDestroy){
			this.task.delay(this.hideDelay || 5000);
		}
	}

	, animShow : function(){
		this.pos = 0;
		while(Ext.ux.NotificationMgr.positions.indexOf(this.pos)>-1){
			this.pos++;
		}
		Ext.ux.NotificationMgr.positions.push(this.pos);
		this.setSize(200,100);
		this.el.alignTo(this.animateTarget || document, "br-tr", [ -1, -1-((this.getSize().height+10)*this.pos) ]);
		this.el.slideIn('b', {
			duration: .7
			, callback: this.afterShow
			, scope: this
		});
	}

	, animHide : function(){
		Ext.ux.NotificationMgr.positions.remove(this.pos);
		this.el.ghost("b", {
			duration: 1
			, remove: true
		});
	}
});