/*
 * qWikiOffice Desktop 0.7
 * Copyright(c) 2007-2008, Integrated Technologies, Inc.
 * licensing@qwikioffice.com
 * 
 * http://www.qwikioffice.com/license
 */

QoDesk.QoPreferences = Ext.extend(Ext.app.Module, {
	
	moduleType : 'system',
	moduleId : 'qo-preferences',
	
	actions : null,
	cards : [
		'pref-win-card-1', // navigation
		'pref-win-card-2', // quickstart
		'pref-win-card-3', // color and appearance
		'pref-win-card-4', // wallpaper
		'pref-win-card-5', // autorun
		'pref-win-card-6'  // shortcuts
	],
	contentPanel : null,
	cardHistory : [
		'pref-win-card-1' // default
	],
	layout: null,
	win : null,
	
    init : function(){
        this.launcher = {
        	iconCls: 'pref-icon',
            handler : this.createWindow,
            scope: this,
            shortcutIconCls: 'pref-shortcut-icon',
            text: 'Preferences',
            tooltip: '<b>Preferences</b><br />Allows you to modify your desktop'
        }
    },

    createWindow : function(){
    	var desktop = this.app.getDesktop();
        this.win = desktop.getWindow(this.moduleId);
        
        if(!this.win){
        	var winWidth = 610;
			var winHeight = 460;
			
			this.contentPanel = new Ext.Panel({
				activeItem: 0,
                border: false,
				id: 'pref-win-content',
				items: [
                	new QoDesk.QoPreferences.NavPanel({owner: this, id: 'pref-win-card-1'}),
                	new QoDesk.QoPreferences.Shortcuts({owner: this, id: 'pref-win-card-6'}),
                	new QoDesk.QoPreferences.AutoRun({owner: this, id: 'pref-win-card-5'}),
                	new QoDesk.QoPreferences.QuickStart({owner: this, id: 'pref-win-card-2'}),
                	new QoDesk.QoPreferences.Appearance({owner: this, id: 'pref-win-card-3'}),
                	new QoDesk.QoPreferences.Background({owner: this, id: 'pref-win-card-4'})
                ],
				layout: 'card',
				tbar: [{
					disabled: true,
                	handler: this.navHandler.createDelegate(this, [-1]),
                	id: 'back',
                	scope: this,
                	text: 'Back'
                },{
                	disabled: true,
                	handler: this.navHandler.createDelegate(this, [1]),
                	id: 'next',
                	scope: this,
                	text: 'Next'
                }]
			});
			
            this.win = desktop.createWindow({
            	animCollapse: false,
                constrainHeader: true,
                id: this.moduleId,
                height: winHeight,
                iconCls: 'pref-icon',
                items: this.contentPanel,
                layout: 'fit',
                shim: false,
                taskbuttonTooltip: '<b>Preferences</b><br />Allows you to modify your desktop',
                title: 'Preferences',
                width: winWidth
            });
            
			this.layout = this.contentPanel.getLayout();
        }
        
        this.win.show();
    },
    
    handleButtonState : function(){
    	var cards = this.cardHistory, activeId = this.layout.activeItem.id,
    		items = this.contentPanel.getTopToolbar().items, back = items.get(0), next = items.get(1);
    	
    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			if(i <= 0){
    				back.disable();
    				next.enable();
    			}else if(i >= (len-1)){
    				back.enable();
    				next.disable();
    			}else{
    				back.enable();
    				next.enable();
    			}
    			break;
    		}
    	}
    },
    
    navHandler : function(index){
    	var cards = this.cardHistory,
    		activeId = this.layout.activeItem.id,
    		nextId;
    	
    	for(var i = 0, len = cards.length; i < len; i++){
    		if(cards[i] === activeId){
    			nextId = cards[i+index];
    			break;
    		}
    	}
    	
    	this.layout.setActiveItem(nextId);
    	this.handleButtonState();
    },
    
    save : function(params){    	
    	var desktop = this.app.getDesktop();
    	var notifyWin = desktop.showNotification({
			html: 'Saving your data...'
			, title: 'Please wait'
		});
	    var callback = params.callback || null;
		var callbackScope = params.callbackScope || this;
		
		params.moduleId = this.moduleId;
		params.fileName = 'Preferences.php';
		
	    Ext.Ajax.request({
			url: this.app.connection,
			/* Could also pass moduleId and fileName in querystring like this
			 * instead of in the params config option.
			 *
			 * url: this.app.connection+'?moduleId='+this.id+'&fileName=Preferences.php', */
			params: params,
			success: function(o){
				if(o && o.responseText && Ext.decode(o.responseText).success){
					saveComplete('Finished', 'Save complete.');
				}else{
					saveComplete('Error', 'Errors encountered on the server.');
				}
			},
			failure: function(){
				saveComplete('Error', 'Lost connection to server.');
			},
			scope: this
		});
		
		function saveComplete(title, msg){
			notifyWin.setIconClass('x-icon-done');
			notifyWin.setTitle(title);
			notifyWin.setMessage(msg);
			desktop.hideNotification(notifyWin);
			
			if(callback){
				callback.call(callbackScope);
			}
		}
	},
    
    viewCard : function(card){
		this.layout.setActiveItem(card);
	    if(this.cardHistory.length > 1){
	    	this.cardHistory.pop();
	    }
	    this.cardHistory.push(card);
	    this.handleButtonState();
	}
});



QoDesk.QoPreferences.NavPanel = function(config){
	this.owner = config.owner;
	
	QoDesk.QoPreferences.NavPanel.superclass.constructor.call(this, {
		autoScroll: true,
		bodyStyle: 'padding:15px',
		border: false,
		html: '<ul id="pref-nav-panel"> \
				<li> \
					<img src="'+Ext.BLANK_IMAGE_URL+'" class="icon-pref-autorun"/> \
					<a id="viewShortcuts" href="#">Shortcuts</a><br /> \
					<span>Choose which applications appear in your shortcuts.</span> \
				</li> \
				<li> \
					<img src="'+Ext.BLANK_IMAGE_URL+'" class="icon-pref-autorun"/> \
					<a id="viewAutoRun" href="#">Auto Run Apps</a><br /> \
					<span>Choose which applications open automatically once logged in.</span> \
				</li> \
				<li> \
					<img src="'+Ext.BLANK_IMAGE_URL+'" class="icon-pref-quickstart"/> \
					<a id="viewQuickstart" href="#">Quick Start Apps</a><br /> \
					<span>Choose which applications appear in your Quick Start panel.</span> \
				</li> \
				<li> \
					<img src="'+Ext.BLANK_IMAGE_URL+'" class="icon-pref-appearance"/> \
					<a id="viewAppearance" href="#">Window Color and Appearance</a><br /> \
					<span>Fine tune window color and style of your windows.</span> \
				</li> \
				<li> \
					<img src="'+Ext.BLANK_IMAGE_URL+'" class="icon-pref-wallpaper"/> \
					<a id="viewWallpapers" href="#">Desktop Background</a><br /> \
					<span>Choose from available wallpapers or colors to decorate you desktop.</span> \
				</li> \
			</ul>',
		id: config.id
	});
	
	this.actions = {
		'viewShortcuts' : function(owner){
			owner.viewCard('pref-win-card-6');
		},
		
		'viewAutoRun' : function(owner){
			owner.viewCard('pref-win-card-5');
		},
		
		'viewQuickstart' : function(owner){
	   		owner.viewCard('pref-win-card-2');
	   	},
	   	
	   	'viewAppearance' : function(owner){
	   		owner.viewCard('pref-win-card-3');
	   	},
	   	
	   	'viewWallpapers' : function(owner){
	   		owner.viewCard('pref-win-card-4');
	   	}
	};
};

Ext.extend(QoDesk.QoPreferences.NavPanel, Ext.Panel, {
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
		
		QoDesk.QoPreferences.NavPanel.superclass.afterRender.call(this); // do sizing calcs last
	},
	
	doAction : function(e, t){
    	e.stopEvent();
    	this.actions[t.id](this.owner);  // pass owner for scope
    }
});



QoDesk.QoPreferences.AutoRun = function(config){
	this.owner = config.owner;
	this.app = this.owner.app;
	
	var ms = this.app.modules,
		ids = this.app.desktop.config.launchers.autorun,
		nodes = expandNodes(ms, ids);
				
	QoDesk.QoPreferences.AutoRun.superclass.constructor.call(this, {
		autoScroll: true,
		bodyStyle: 'padding:10px',
		border: false,
		buttons: [{
			handler: onSave,
			scope: this,
			text: 'Save'
		},{
			handler: onClose,
			scope: this,
			text: 'Close'
		}],
		cls: 'pref-card pref-check-tree',
		id: config.id,
		lines: false,
		listeners: {
			'checkchange': {
				fn: onCheckChange,
				scope: this
			}
		},
		loader: new Ext.tree.TreeLoader(),
		rootVisible: false,
		root: new Ext.tree.AsyncTreeNode({
			text: 'Auto Run Apps',
			children: nodes
		}),
		title: 'Auto Run Apps'
	});
	
	new Ext.tree.TreeSorter(this, {dir: "asc"});
			
	function expandNodes(ms, ids){
		var nodes = [];
		
		for(var i = 0, len = ms.length; i < len; i++){
			var o = ms[i].launcher ? ms[i].launcher : ms[i];
			if(o.menu){
				/* nodes.push({
					leaf: false,
					text: o.text || o.menuText,
					children: this.expandNodes(o.menu.items, ids)
				}); */
			}else{
				nodes.push({
		           	checked: isChecked(ms[i].moduleId, ids) ? true : false,
		           	iconCls: ms[i].launcher.iconCls,
		           	id: ms[i].moduleId,
		           	leaf: true,
		           	selected: true,
		           	text: o.text || o.menuText
				});
			}
		}
		
		return nodes;
	}
	
	function isChecked(id, ids){
		for(var i = 0, len = ids.length; i < len; i++){
			if(id == ids[i]){
				return true;
			}
		}
	}

	function onCheckChange(node, checked){
		if(node.leaf && node.id){
    		if(checked){
				this.app.desktop.addAutoRun(node.id, true);
    		}else{
				this.app.desktop.removeAutoRun(node.id, true);
    		}
    	}
    	node.ownerTree.selModel.select(node);
    }
    
    function onClose(){
		this.owner.win.close();
	}
	
    function onSave(){
    	this.buttons[0].disable();
    	this.owner.save({
    		callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, task: 'save'
    		, what: 'autorun'
    		, ids: Ext.encode(this.app.desktop.config.launchers.autorun)
    	});
    }
};

Ext.extend(QoDesk.QoPreferences.AutoRun, Ext.tree.TreePanel);



QoDesk.QoPreferences.Shortcuts = function(config){
	this.owner = config.owner;
	this.app = this.owner.app;
	
	var ms = this.app.modules,
		ids = this.app.desktop.config.launchers.shortcut,
		nodes = expandNodes(ms, ids);
	
	QoDesk.QoPreferences.Shortcuts.superclass.constructor.call(this, {
		autoScroll: true,
		bodyStyle: 'padding:10px',
		border: false,
		buttons: [{
			handler: onSave,
			scope: this,
			text: 'Save'
		},{
			handler: onClose,
			scope: this,
			text: 'Close'
		}],
		cls: 'pref-card pref-check-tree',
		id: config.id,
		lines: false,
		listeners: {
			'checkchange': {
				fn: onCheckChange,
				scope: this
			}
		},
		loader: new Ext.tree.TreeLoader(),
		rootVisible: false,
		root: new Ext.tree.AsyncTreeNode({
			text: 'Shortcuts',
			children: nodes
		}),
		title: 'Shortcuts'
	});
	
	new Ext.tree.TreeSorter(this, {dir: "asc"});
			
	function expandNodes(ms, ids){
		var nodes = [];
		
		for(var i = 0, len = ms.length; i < len; i++){
			var o = ms[i].launcher ? ms[i].launcher : ms[i];
			if(o.menu){
				/* nodes.push({
					leaf: false,
					text: o.text || o.menuText,
					children: this.expandNodes(o.menu.items, ids)
				}); */
			}else{
				nodes.push({
		           	checked: isChecked(ms[i].moduleId, ids) ? true : false,
		           	iconCls: ms[i].launcher.iconCls,
		           	id: ms[i].moduleId,
		           	leaf: true,
		           	selected: true,
		           	text: o.text || o.menuText
				});
			}
		}
		
		return nodes;
	}
	
	function isChecked(id, ids){
		for(var i = 0, len = ids.length; i < len; i++){
			if(id == ids[i]){
				return true;
			}
		}
	}

	function onCheckChange(node, checked){
		if(node.leaf && node.id){
    		if(checked){
				this.app.desktop.addShortcut(node.id, true);
    		}else{
				this.app.desktop.removeShortcut(node.id, true);
    		}
    	}
    	node.ownerTree.selModel.select(node);
    }
    
    function onClose(){
		this.owner.win.close();
	}
	
    function onSave(){
    	this.buttons[0].disable();
    	this.owner.save({
    		callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, task: 'save'
    		, what: 'shortcut'
    		, ids: Ext.encode(this.app.desktop.config.launchers.shortcut)
    	});
    }
};

Ext.extend(QoDesk.QoPreferences.Shortcuts, Ext.tree.TreePanel);



QoDesk.QoPreferences.QuickStart = function(config){
	this.owner = config.owner;
	this.app = this.owner.app;
	
	var ms = this.app.modules,
		ids = this.app.desktop.config.launchers.quickstart,
		nodes = expandNodes(ms, ids);
				
    QoDesk.QoPreferences.QuickStart.superclass.constructor.call(this, {
    	autoScroll: true,
		bodyStyle: 'padding:10px',
		border: false,
		buttons: [{
			handler: onSave,
			scope: this,
			text: 'Save'
		},{
			handler: onClose,
			scope: this,
			text: 'Close'
		}],
		cls: 'pref-card pref-check-tree',
		id: config.id,
		lines: false,
		listeners: {
			'checkchange': {
				fn: onCheckChange,
				scope: this
			}
		},
		loader: new Ext.tree.TreeLoader(),
		rootVisible: false,
		root: new Ext.tree.AsyncTreeNode({
			text: 'Quick Start Apps',
			children: nodes
		}),
		title: 'Quick Start Apps'
    });
    
    new Ext.tree.TreeSorter(this, {dir: "asc"});
			
	function expandNodes(ms, ids){
		var nodes = [];
		
		for(var i = 0, len = ms.length; i < len; i++){
			var o = ms[i].launcher ? ms[i].launcher : ms[i];
			if(o.menu){
				/* nodes.push({
					leaf: false,
					text: o.text || o.menuText,
					children: this.expandNodes(o.menu.items, ids)
				}); */
			}else{
				nodes.push({
		           	checked: isChecked(ms[i].moduleId, ids) ? true : false,
		           	iconCls: ms[i].launcher.iconCls,
		           	id: ms[i].moduleId,
		           	leaf: true,
		           	selected: true,
		           	text: o.text || o.menuText
				});
			}
		}
		
		return nodes;
	}
	
	function isChecked(id, ids){
		for(var i = 0, len = ids.length; i < len; i++){
			if(id == ids[i]){
				return true;
			}
		}
	}
	
	function onCheckChange(node, checked){
		if(node.leaf && node.id){
    		if(checked){
				this.app.desktop.addQuickStartButton(node.id, true);
    		}else{
				this.app.desktop.removeQuickStartButton(node.id, true);
    		}
    	}
    	node.ownerTree.selModel.select(node);
    }
    
    function onClose(){
		this.owner.win.close();
	}
	
    function onSave(){
    	this.buttons[0].disable();
    	this.owner.save({
    		callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, task: 'save'
    		, what: 'quickstart'
    		, ids: Ext.encode(this.app.desktop.config.launchers.quickstart)
    	});
    }
};

Ext.extend(QoDesk.QoPreferences.QuickStart, Ext.tree.TreePanel);



QoDesk.QoPreferences.Appearance = function(config){
	this.owner = config.owner;
	this.app = this.owner.app;
	
	var desktop = this.app.getDesktop();
	
	var store = new Ext.data.JsonStore({
		baseParams: {
			moduleId: this.owner.moduleId,
			fileName: 'Preferences.php',
			task: 'load',
			what: 'themes'
		},
		fields: ['id', 'name', 'pathtothumbnail', 'pathtofile'],
		id: 'id',
		root: 'images',
		url: this.app.connection
	});
	
	this.store = store;
	
	store.on('load', function(store, records){
		if(records){
			defaults.setTitle('Themes Available (' + records.length + ')');
			
			var id = this.app.desktop.config.styles.theme.id;
			if(id){
				view.select('theme-'+id);
			}
		}				
	}, this);
	
	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="pref-view-thumb-wrap" id="theme-{id}">',
				'<div class="pref-view-thumb"><img src="{pathtothumbnail}" title="{name}" /></div>',
			'<span>{shortName}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
	);

	var view = new Ext.DataView({
		autoHeight:true,
		cls: 'pref-thumnail-view',
		emptyText: 'No themes to display',
		itemSelector:'div.pref-view-thumb-wrap',
		loadingText: 'loading...',
		singleSelect: true,
		overClass:'x-view-over',
		prepareData: function(data){
			data.shortName = Ext.util.Format.ellipsis(data.name, 17);
			return data;
		},
		store: store,
		tpl: tpl
	});
	view.on('selectionchange', onSelectionChange, this);
	
	var defaults = new Ext.Panel({
		animCollapse: false,
		baseCls:'collapse-group',
		border: false,
		cls: 'pref-thumbnail-viewer',
		collapsible: true,
		hideCollapseTool: true,
		id: 'pref-theme-view',
		items: view,
		title: 'Default Themes',
		titleCollapse: true
	});
	
	var themes = new Ext.Panel({
		autoScroll: true,
		bodyStyle: 'padding:10px',
		border: true,
		cls: 'pref-card-subpanel',
		id: 'themes',
		items: defaults,
		margins: '10 15 0 15',
		region: 'center'
	});
	
	var checkBox = new Ext.form.Checkbox({
		checked: this.app.desktop.config.styles.transparency ? true : false,
		x: 150,
		y: 15
	});
	checkBox.on('check', toggleTransparency, this);
	
	var formPanel = new Ext.FormPanel({
		border: false,
		height: 70,
		items: [
			{x: 15, y: 15, xtype: 'label', text: 'Taskbar Transparency'},
			checkBox
		],
		layout: 'absolute',
		split: false,
		region: 'south'
	});
	
	QoDesk.QoPreferences.Appearance.superclass.constructor.call(this, {
		border: false,
		buttons: [{
			handler: onSave,
			scope: this,
			text: 'Save'
			},{
			handler: onClose,
			scope: this,
			text: 'Close'
		}],
		cls: 'pref-card',
		id: config.id,
		items: [
			themes,
			formPanel
		],
		layout: 'border',
		title: 'Window Color And Appearance'
	});
	
	function onClose(){
		this.owner.win.close();
	}
	
	function onSave(){
		var c = this.app.desktop.config.styles;
		
		this.buttons[0].disable();
    	this.owner.save({
    		callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, task: 'save'
    		, what: 'appearance'
    		, backgroundcolor: c.backgroundcolor
    		, fontcolor: c.fontcolor
    		, theme: c.theme.id
    		, transparency: c.transparency
    		, wallpaper: c.wallpaper.id
    		, wallpaperposition: c.wallpaperposition
    	});
	}
	
	function onSelectionChange(view, sel){
		if(sel.length > 0){
			var cId = this.app.desktop.config.styles.theme.id,
				r = view.getRecord(sel[0]),
				d = r.data;
			
			if(parseInt(cId) !== parseInt(r.id)){
				if(r && r.id && d.name && d.pathtofile){
					desktop.setTheme({
						id: r.id,
						name: d.name,
						pathtofile: d.pathtofile
					});
				}
			}
		}
	}
	
	function toggleTransparency(field, checked){
		desktop.setTransparency(checked);
	}
};

Ext.extend(QoDesk.QoPreferences.Appearance, Ext.Panel, {
	afterRender : function(){
		QoDesk.QoPreferences.Appearance.superclass.afterRender.call(this);
		
		this.on('show', this.loadStore, this, {single: true});
	},
	
	loadStore : function(){
		this.store.load();
	}
});



QoDesk.QoPreferences.Background = function(config){
	this.owner = config.owner;
	this.app = this.owner.app;
	
	var desktop = this.app.getDesktop();
	
	var store = new Ext.data.JsonStore({
		baseParams: {
			moduleId: this.owner.moduleId,
			fileName: 'Preferences.php',
			task: 'load',
			what: 'wallpapers'
		},
		fields: ['id', 'name', 'pathtothumbnail', 'pathtofile'],
		id: 'id',
		root: 'images',
		url: this.app.connection
	});
	
	this.store = store;
	
	store.on('load', function(store, records){
		if(records){
			defaults.setTitle('Default Wallpapers (' + records.length + ')');
			
			var id = this.app.desktop.config.styles.wallpaper.id;
			if(id){
				view.select('wallpaper-'+id);
			}
		}				
	}, this);

	var tpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="pref-view-thumb-wrap" id="wallpaper-{id}">',
				'<div class="pref-view-thumb"><img src="{pathtothumbnail}" title="{name}" /></div>',
			'<span>{shortName}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
	);

	var view = new Ext.DataView({
		autoHeight:true,
		cls: 'pref-thumnail-view',
		emptyText: 'No wallpapers to display',
		itemSelector:'div.pref-view-thumb-wrap',
		loadingText: 'loading...',
		singleSelect: true,
		overClass:'x-view-over',
		prepareData: function(data){
			data.shortName = Ext.util.Format.ellipsis(data.name, 17);
			return data;
		},
		store: store,
		tpl: tpl
	});
	view.on('selectionchange', onSelectionChange, this);
	
	var defaults = new Ext.Panel({
		animCollapse: false,
		baseCls:'collapse-group',
		border: false,
		cls: 'pref-thumbnail-viewer',
		collapsible: true,
		hideCollapseTool: true,
		id: 'pref-wallpaper-view',
		items: view,
		title: 'Default Wallpapers',
		titleCollapse: true
	});
	
	var wallpapers = new Ext.Panel({
		autoScroll: true,
		bodyStyle: 'padding:10px',
		border: true,
		cls: 'pref-card-subpanel',
		id: 'wallpapers',
		items: defaults,
		margins: '10 15 0 15',
		region: 'center'
	});
	
	var wpp = this.app.desktop.config.styles.wallpaperposition;
	var tileRadio = createRadio('tile', wpp == 'tile' ? true : false, 90, 40);
	var centerRadio = createRadio('center', wpp == 'center' ? true : false, 200, 40);
	
	var position = new Ext.FormPanel({
		border: false,
		height: 140,
		id: 'position',
		items: [{
				border: false,
				items: {border: false, html:'How should the wallpaper be positioned?'},
				x: 15,
				y: 15
			},{
				border: false,
				items: {border: false, html: '<img class="bg-pos-tile" src="'+Ext.BLANK_IMAGE_URL+'" width="64" height="44" border="0" alt="" />'},
				x: 15,
				y: 40
			},
				tileRadio,
			{
				border: false,
				items: {border: false, html: '<img class="bg-pos-center" src="'+Ext.BLANK_IMAGE_URL+'" width="64" height="44" border="0" alt="" />'},
				x: 125,
				y: 40
			},
				centerRadio,
			{
				border: false,
				items: {border: false, html:'Choose a background color'},
				x: 245,
				y: 15
			},{
				border: false,
				items: new Ext.ColorPalette({
					listeners: {
						'select': {
							fn: onColorSelect
							, scope: this
						}
					}
				}),
				/* items: new Ext.Button({
					handler: onChangeBgColor,
					scope: this,
					text: 'Background color'
				}), */
				x: 245,
				y: 40
			},{
				border: false,
				items: {border: false, html:'Choose a font color'},
				x: 425,
				y: 15
			},{
				border: false,
				items: new Ext.ColorPalette({
					listeners: {
						'select': {
							fn: onFontColorSelect
							, scope: this
						}
					}
				}),
				x: 425,
				y: 40
				
		}],
		layout: 'absolute',
		region: 'south',
		split: false
	});

	QoDesk.QoPreferences.Background.superclass.constructor.call(this, {
		border: false,
		buttons: [{
			handler: onSave,
			scope: this,
			text: 'Save'
			},{
			handler: onClose,
			scope: this,
			text: 'Close'
		}],
		cls: 'pref-card',
		id: config.id,
		items: [
			wallpapers,
			position
		],
		layout: 'border',
		title: 'Desktop Background'
	});
	
	function createRadio(value, checked, x, y){
		if(value){
			radio = new Ext.form.Radio({
				name: 'position',
				inputValue: value,
				checked: checked,
				x: x,
				y: y
			});
			
			radio.on('check', togglePosition, radio);
			
			return radio;
		}
	}
    
    /* function onChangeBgColor(){
    	var dialog = Ext.getCmp('qo-color-picker');
    	
    	if(!dialog){
	    	dialog = new Ext.ux.ColorDialog({
				title: 'Background Color',
				closable: true,
				height:232,
				id: 'qo-color-picker',
				modal: false,
				shadow: true,
				width: 362,
				x: desktop.getWinX(362),
				y: desktop.getWinY(232)
			});
		}
		
		//dialog.on('pickcolor', onPickColor, this);
    	dialog.show();
    } */
    
	function onClose(){
		this.owner.win.close();
	}
	
	function onColorSelect(p, hex){
		desktop.setBackgroundColor(hex);
	}
	
	function onFontColorSelect(p, hex){
		desktop.setFontColor(hex);
	}
	
	function onSave(){
		var c = this.app.desktop.config.styles;
		
		this.buttons[0].disable();
    	this.owner.save({
    		callback: function(){
    			this.buttons[0].enable();
    		}
    		, callbackScope: this
    		, task: 'save'
    		, what: 'appearance'
    		, backgroundcolor: c.backgroundcolor
    		, fontcolor: c.fontcolor
    		, theme: c.theme.id
    		, transparency: c.transparency
    		, wallpaper: c.wallpaper.id
    		, wallpaperposition: c.wallpaperposition
    	});
	}
	
	function onSelectionChange(view, sel){
		if(sel.length > 0){
			var cId = this.app.desktop.config.styles.wallpaper.id,
				r = view.getRecord(sel[0]),
				d = r.data;
			
			if(parseInt(cId) !== parseInt(r.id)){
				if(r && r.id && d.name && d.pathtofile){
					desktop.setWallpaper({
						id: r.id,
						name: d.name,
						pathtofile: d.pathtofile
					});
				}
			}
		}
	}
	
	function togglePosition(field, checked){
		if(checked === true){
			desktop.setWallpaperPosition(field.inputValue);
		}
	}
};

Ext.extend(QoDesk.QoPreferences.Background, Ext.Panel, {
	afterRender : function(){
		QoDesk.QoPreferences.Background.superclass.afterRender.call(this);
		
		this.on('show', this.loadStore, this, {single: true});
	},
	
	loadStore : function(){
		this.store.load();
	}
});



/* 
 * Will ensure that the checkchange event is fired on 
 * node double click
 */
Ext.override(Ext.tree.TreeNodeUI, {
	toggleCheck : function(value){		
        var cb = this.checkbox;
        if(cb){
            cb.checked = (value === undefined ? !cb.checked : value);
            this.fireEvent('checkchange', this.node, cb.checked);
        }
    }
});